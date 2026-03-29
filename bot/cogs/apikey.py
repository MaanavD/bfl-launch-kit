import logging

import discord
from discord import app_commands
from discord.ext import commands

log = logging.getLogger("fluxbot.apikey")


class ApiKey(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.storage = bot.storage

    @app_commands.command(
        name="setkey",
        description="Set a shared BFL API key for this server — covers all members (admin only)",
    )
    @app_commands.describe(key="Your BFL API key from dashboard.bfl.ai")
    @app_commands.default_permissions(administrator=True)
    async def setkey_cmd(self, interaction: discord.Interaction, key: str):
        if not interaction.guild:
            await interaction.response.send_message(
                "This command can only be used in a server.", ephemeral=True
            )
            return

        await self.storage.set_api_key(interaction.guild_id, key)
        log.info(f"Server API key set for guild {interaction.guild_id} by {interaction.user.id}")
        await interaction.response.send_message(
            "✅ **Server API key saved!** All members can now generate images using this key.\n"
            "Individual members can still override it with `/mykey` if they want to use their own.\n\n"
            "Try `/generate prompt: a sunset over mountains` to test it out!",
            ephemeral=True,
        )

    @app_commands.command(
        name="removekey",
        description="Remove the server's shared BFL API key (admin only)",
    )
    @app_commands.default_permissions(administrator=True)
    async def removekey_cmd(self, interaction: discord.Interaction):
        if not interaction.guild:
            await interaction.response.send_message(
                "This command can only be used in a server.", ephemeral=True
            )
            return

        await self.storage.remove_api_key(interaction.guild_id)
        log.info(f"Server API key removed for guild {interaction.guild_id} by {interaction.user.id}")
        await interaction.response.send_message(
            "✅ **Server key removed.** Members will need their own `/mykey` to generate images.",
            ephemeral=True,
        )

    @app_commands.command(
        name="mykey",
        description="Set your personal BFL API key (billed to you instead of the server)",
    )
    @app_commands.describe(key="Your BFL API key from dashboard.bfl.ai")
    async def mykey_cmd(self, interaction: discord.Interaction, key: str):
        await self.storage.set_user_api_key(interaction.user.id, key)
        log.info(f"Personal API key set by user {interaction.user.id}")
        await interaction.response.send_message(
            "✅ **Personal API key saved!** Your generations will now use your own key "
            "(billed to your account, not the server's).\n"
            "Use `/removemykey` to go back to using the server's shared key.",
            ephemeral=True,
        )

    @app_commands.command(name="removemykey", description="Remove your personal BFL API key")
    async def removemykey_cmd(self, interaction: discord.Interaction):
        await self.storage.remove_user_api_key(interaction.user.id)
        log.info(f"Personal API key removed by user {interaction.user.id}")
        await interaction.response.send_message(
            "✅ **Personal key removed.** You'll now use the server's shared key (if one is set).",
            ephemeral=True,
        )

    @app_commands.command(
        name="keyinfo",
        description="Check which API key FluxBot will use for your generations",
    )
    async def keyinfo_cmd(self, interaction: discord.Interaction):
        _, source = await self.storage.resolve_api_key(
            interaction.user.id, interaction.guild_id
        )

        if source == "user":
            msg = (
                "🔑 **Using your personal key.**\n"
                "Generations are billed to your own BFL account.\n"
                "Use `/removemykey` to switch to the server's shared key."
            )
        elif source == "server":
            msg = (
                "🔑 **Using this server's shared key** (set by an admin).\n"
                "All your generations are covered by the server owner's account.\n"
                "Use `/mykey` to use your own key instead."
            )
        else:
            msg = (
                "⚠️ **No API key configured.**\n"
                "Either:\n"
                "• A server admin runs `/setkey` to set a shared key for everyone, or\n"
                "• You run `/mykey` to use your own personal key\n\n"
                "Get a key at **[dashboard.bfl.ai](https://dashboard.bfl.ai)**"
            )

        await interaction.response.send_message(msg, ephemeral=True)


async def setup(bot: commands.Bot):
    await bot.add_cog(ApiKey(bot))
