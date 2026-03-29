import os
import asyncio
import logging

import discord
from discord.ext import commands
from dotenv import load_dotenv

from storage import Storage

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
log = logging.getLogger("fluxbot")

DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")
if not DISCORD_TOKEN:
    raise RuntimeError("DISCORD_TOKEN environment variable is required")


intents = discord.Intents.default()
bot = commands.Bot(command_prefix="!", intents=intents)
bot.storage = Storage()


@bot.event
async def on_ready():
    log.info(f"FluxBot is online! Connected to {len(bot.guilds)} servers.")
    await bot.storage.init()
    # Load cogs
    await bot.load_extension("cogs.generate")
    await bot.load_extension("cogs.restyle")
    await bot.load_extension("cogs.styles")
    await bot.load_extension("cogs.apikey")
    # Sync slash commands
    synced = await bot.tree.sync()
    log.info(f"Synced {len(synced)} commands: {', '.join(c.name for c in synced)}")


@bot.event
async def on_guild_join(guild: discord.Guild):
    log.info(f"Joined server: {guild.name} (id: {guild.id})")


async def main():
    async with bot:
        await bot.start(DISCORD_TOKEN)


if __name__ == "__main__":
    asyncio.run(main())
