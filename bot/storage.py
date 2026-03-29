import os
import json
import logging
import aiosqlite

log = logging.getLogger("fluxbot.storage")

DB_PATH = os.getenv("FLUXBOT_DB_PATH", "fluxbot.db")


class Storage:
    """Simple async SQLite storage for user styles, server API keys, and user API keys."""

    _initialized = False

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
        Storage._initialized = True
        log.info(f"Database initialized at {DB_PATH}")

    # --- API Keys (per server) ---

    async def set_api_key(self, guild_id: int, api_key: str):
        await self.init()
        async with aiosqlite.connect(DB_PATH) as db:
            await db.execute(
                "INSERT OR REPLACE INTO api_keys (guild_id, api_key) VALUES (?, ?)",
                (guild_id, api_key),
            )
            await db.commit()

    async def get_api_key(self, guild_id: int) -> str | None:
        await self.init()
        async with aiosqlite.connect(DB_PATH) as db:
            cursor = await db.execute(
                "SELECT api_key FROM api_keys WHERE guild_id = ?", (guild_id,)
            )
            row = await cursor.fetchone()
            return row[0] if row else None

    async def remove_api_key(self, guild_id: int):
        await self.init()
        async with aiosqlite.connect(DB_PATH) as db:
            await db.execute("DELETE FROM api_keys WHERE guild_id = ?", (guild_id,))
            await db.commit()

    # --- User API Keys (per person) ---

    async def set_user_api_key(self, user_id: int, api_key: str):
        await self.init()
        async with aiosqlite.connect(DB_PATH) as db:
            await db.execute(
                "INSERT OR REPLACE INTO user_api_keys (user_id, api_key) VALUES (?, ?)",
                (user_id, api_key),
            )
            await db.commit()

    async def get_user_api_key(self, user_id: int) -> str | None:
        await self.init()
        async with aiosqlite.connect(DB_PATH) as db:
            cursor = await db.execute(
                "SELECT api_key FROM user_api_keys WHERE user_id = ?", (user_id,)
            )
            row = await cursor.fetchone()
            return row[0] if row else None

    async def remove_user_api_key(self, user_id: int):
        await self.init()
        async with aiosqlite.connect(DB_PATH) as db:
            await db.execute("DELETE FROM user_api_keys WHERE user_id = ?", (user_id,))
            await db.commit()

    # --- Key Resolution (user key > server key) ---

    async def resolve_api_key(self, user_id: int, guild_id: int | None) -> str | None:
        """Get the API key to use: user's personal key first, then server key."""
        user_key = await self.get_user_api_key(user_id)
        if user_key:
            return user_key
        if guild_id:
            return await self.get_api_key(guild_id)
        return None

    # --- User Styles ---

    async def set_user_style(self, user_id: int, style: str):
        await self.init()
        async with aiosqlite.connect(DB_PATH) as db:
            await db.execute(
                "INSERT OR REPLACE INTO user_styles (user_id, style) VALUES (?, ?)",
                (user_id, style),
            )
            await db.commit()

    async def get_user_style(self, user_id: int) -> str | None:
        await self.init()
        async with aiosqlite.connect(DB_PATH) as db:
            cursor = await db.execute(
                "SELECT style FROM user_styles WHERE user_id = ?", (user_id,)
            )
            row = await cursor.fetchone()
            return row[0] if row else None

    async def clear_user_style(self, user_id: int):
        await self.init()
        async with aiosqlite.connect(DB_PATH) as db:
            await db.execute("DELETE FROM user_styles WHERE user_id = ?", (user_id,))
            await db.commit()
