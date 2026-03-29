import logging

import discord
from discord import app_commands
from discord.ext import commands

log = logging.getLogger("fluxbot.styles")

MAX_STYLE_LENGTH = 500


class Styles(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.storage = bot.storage

    @app_commands.command(name="setstyle", description="Set your personal image style")
    @app_commands.describe(style="Your style (e.g. 'cyberpunk anime, neon lighting, 4k')")
    async def setstyle_cmd(self, interaction: discord.Interaction, style: str):
        if len(style) > MAX_STYLE_LENGTH:
            await interaction.response.send_message(
                f"Style is too long ({len(style)} chars). Max is {MAX_STYLE_LENGTH}.",
                ephemeral=True,
            )
            return

        await self.storage.set_user_style(interaction.user.id, style)
        await interaction.response.send_message(
            f"✅ **Style saved!** Your generations will now use:\n"
            f'> "{style}"\n\n'
            f"Use `/clearstyle` to reset.",
            ephemeral=True,
        )

    @app_commands.command(name="clearstyle", description="Reset your personal image style")
    async def clearstyle_cmd(self, interaction: discord.Interaction):
        await self.storage.clear_user_style(interaction.user.id)
        await interaction.response.send_message(
            "✅ **Style cleared.** Your generations will use default settings.",
            ephemeral=True,
        )

    @app_commands.command(name="mystyle", description="Show your current personal style")
    async def mystyle_cmd(self, interaction: discord.Interaction):
        style = await self.storage.get_user_style(interaction.user.id)
        if style:
            await interaction.response.send_message(
                f"🎨 **Your current style:**\n> \"{style}\"",
                ephemeral=True,
            )
        else:
            await interaction.response.send_message(
                "No style set. Use `/setstyle` to create one!",
                ephemeral=True,
            )


async def setup(bot: commands.Bot):
    await bot.add_cog(Styles(bot))
