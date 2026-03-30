import os
import logging
import aiosqlite

log = logging.getLogger("fluxbot.storage")


def _resolve_db_path() -> str:
    """Pick a persistent DB path. Railway volumes mount at /data by default."""
    explicit = os.getenv("FLUXBOT_DB_PATH")
    if explicit:
        return explicit
    # Prefer a mounted volume so keys survive container restarts
    volume_dir = os.getenv("RAILWAY_VOLUME_MOUNT_PATH", "/data")
    if os.path.isdir(volume_dir):
        return os.path.join(volume_dir, "fluxbot.db")
    return "fluxbot.db"


DB_PATH = _resolve_db_path()


class Storage:
    """Async SQLite storage for user styles, server API keys, and user API keys.

    Keys are also cached in-memory so they survive brief DB hiccups.
    """

    _initialized = False
    # In-memory caches - populated from DB on init and kept in sync
    _guild_keys: dict[int, str] = {}
    _user_keys: dict[int, str] = {}
    _user_styles: dict[int, str] = {}

    async def init(self):
        if Storage._initialized:
            return
        async with aiosqlite.connect(DB_PATH) as db:
            await db.execute(
                """CREATE TABLE IF NOT EXISTS api_keys (
                    guild_id INTEGER PRIMARY KEY,
                    api_key TEXT NOT NULL
                )"""
            )
            await db.execute(
                """CREATE TABLE IF NOT EXISTS user_api_keys (
                    user_id INTEGER PRIMARY KEY,
                    api_key TEXT NOT NULL
                )"""
            )
            await db.execute(
                """CREATE TABLE IF NOT EXISTS user_styles (
                    user_id INTEGER PRIMARY KEY,
                    style TEXT NOT NULL
                )"""
            )
            await db.commit()

            # Hydrate in-memory caches from DB
            cursor = await db.execute("SELECT guild_id, api_key FROM api_keys")
            async for row in cursor:
                Storage._guild_keys[row[0]] = row[1]
            cursor = await db.execute("SELECT user_id, api_key FROM user_api_keys")
            async for row in cursor:
                Storage._user_keys[row[0]] = row[1]
            cursor = await db.execute("SELECT user_id, style FROM user_styles")
            async for row in cursor:
                Storage._user_styles[row[0]] = row[1]

        Storage._initialized = True
        log.info(
            f"Database initialized at {DB_PATH} "
            f"(loaded {len(Storage._guild_keys)} server keys, "
            f"{len(Storage._user_keys)} user keys)"
        )

    # --- API Keys (per server) ---

    async def set_api_key(self, guild_id: int, api_key: str):
        await self.init()
        Storage._guild_keys[guild_id] = api_key
        try:
            async with aiosqlite.connect(DB_PATH) as db:
                await db.execute(
                    "INSERT OR REPLACE INTO api_keys (guild_id, api_key) VALUES (?, ?)",
                    (guild_id, api_key),
                )
                await db.commit()
        except Exception:
            log.exception("Failed to persist guild key to DB (still cached in memory)")

    async def get_api_key(self, guild_id: int) -> str | None:
        await self.init()
        return Storage._guild_keys.get(guild_id)

    async def remove_api_key(self, guild_id: int):
        await self.init()
        Storage._guild_keys.pop(guild_id, None)
        try:
            async with aiosqlite.connect(DB_PATH) as db:
                await db.execute("DELETE FROM api_keys WHERE guild_id = ?", (guild_id,))
                await db.commit()
        except Exception:
            log.exception("Failed to remove guild key from DB")

    # --- User API Keys (per person) ---

    async def set_user_api_key(self, user_id: int, api_key: str):
        await self.init()
        Storage._user_keys[user_id] = api_key
        try:
            async with aiosqlite.connect(DB_PATH) as db:
                await db.execute(
                    "INSERT OR REPLACE INTO user_api_keys (user_id, api_key) VALUES (?, ?)",
                    (user_id, api_key),
                )
                await db.commit()
        except Exception:
            log.exception("Failed to persist user key to DB (still cached in memory)")

    async def get_user_api_key(self, user_id: int) -> str | None:
        await self.init()
        return Storage._user_keys.get(user_id)

    async def remove_user_api_key(self, user_id: int):
        await self.init()
        Storage._user_keys.pop(user_id, None)
        try:
            async with aiosqlite.connect(DB_PATH) as db:
                await db.execute("DELETE FROM user_api_keys WHERE user_id = ?", (user_id,))
                await db.commit()
        except Exception:
            log.exception("Failed to remove user key from DB")

    # --- Key Resolution (user key > server key) ---

    async def resolve_api_key(self, user_id: int, guild_id: int | None) -> tuple[str | None, str]:
        """Get the API key to use: user's personal key first, then server key.

        Returns (api_key, source) where source is 'user', 'server', or 'none'.
        """
        user_key = await self.get_user_api_key(user_id)
        if user_key:
            return user_key, "user"
        if guild_id:
            server_key = await self.get_api_key(guild_id)
            if server_key:
                return server_key, "server"
        return None, "none"

    # --- User Styles ---

    async def set_user_style(self, user_id: int, style: str):
        await self.init()
        Storage._user_styles[user_id] = style
        try:
            async with aiosqlite.connect(DB_PATH) as db:
                await db.execute(
                    "INSERT OR REPLACE INTO user_styles (user_id, style) VALUES (?, ?)",
                    (user_id, style),
                )
                await db.commit()
        except Exception:
            log.exception("Failed to persist user style to DB")

    async def get_user_style(self, user_id: int) -> str | None:
        await self.init()
        return Storage._user_styles.get(user_id)

    async def clear_user_style(self, user_id: int):
        await self.init()
        Storage._user_styles.pop(user_id, None)
        try:
            async with aiosqlite.connect(DB_PATH) as db:
                await db.execute("DELETE FROM user_styles WHERE user_id = ?", (user_id,))
                await db.commit()
        except Exception:
            log.exception("Failed to remove user style from DB")
