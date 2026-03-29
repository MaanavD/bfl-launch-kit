import logging

import discord
from discord import app_commands
from discord.ext import commands

from storage import Storage

log = logging.getLogger("fluxbot.apikey")


class ApiKey(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.storage = Storage()

    @app_commands.command(name="setkey", description="Set the BFL API key for this server (admin only)")
    @app_commands.describe(key="Your BFL API key from api.bfl.ai")
    @app_commands.default_permissions(administrator=True)
    async def setkey_cmd(self, interaction: discord.Interaction, key: str):
        if not interaction.guild:
            await interaction.response.send_message(
                "This command can only be used in a server.", ephemeral=True
            )
            return

        await self.storage.set_api_key(interaction.guild_id, key)
        log.info(f"API key set for guild {interaction.guild_id} by {interaction.user.id}")
        await interaction.response.send_message(
            "✅ **API key saved!** FluxBot is ready to generate images in this server.\n"
            "Try `/generate prompt: a sunset over mountains` to test it out!",
            ephemeral=True,
        )

    @app_commands.command(name="removekey", description="Remove the BFL API key from this server (admin only)")
    @app_commands.default_permissions(administrator=True)
    async def removekey_cmd(self, interaction: discord.Interaction):
        if not interaction.guild:
            await interaction.response.send_message(
                "This command can only be used in a server.", ephemeral=True
            )
            return

        await self.storage.remove_api_key(interaction.guild_id)
        log.info(f"API key removed for guild {interaction.guild_id} by {interaction.user.id}")
        await interaction.response.send_message(
            "✅ **API key removed.** FluxBot will no longer generate images until a new key is set.",
            ephemeral=True,
        )

    @app_commands.command(name="mykey", description="Set your personal BFL API key (used instead of the server key)")
    @app_commands.describe(key="Your BFL API key from api.bfl.ai")
    async def mykey_cmd(self, interaction: discord.Interaction, key: str):
        await self.storage.set_user_api_key(interaction.user.id, key)
        log.info(f"Personal API key set by user {interaction.user.id}")
        await interaction.response.send_message(
            "✅ **Personal API key saved!** Your generations will now use your own key.\n"
            "This overrides the server key for your requests only.\n"
            "Use `/removemykey` to go back to using the server key.",
            ephemeral=True,
        )

    @app_commands.command(name="removemykey", description="Remove your personal BFL API key")
    async def removemykey_cmd(self, interaction: discord.Interaction):
        await self.storage.remove_user_api_key(interaction.user.id)
        log.info(f"Personal API key removed by user {interaction.user.id}")
        await interaction.response.send_message(
            "✅ **Personal key removed.** You'll now use the server's shared key.",
            ephemeral=True,
        )


async def setup(bot: commands.Bot):
    await bot.add_cog(ApiKey(bot))
