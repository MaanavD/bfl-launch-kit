import logging
from io import BytesIO

import discord
from discord import app_commands
from discord.ext import commands

from flux_api import generate_image, MODELS

log = logging.getLogger("fluxbot.generate")


class Generate(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.storage = bot.storage

    @app_commands.command(name="generate", description="Generate an image from a text prompt")
    @app_commands.describe(
        prompt="Describe the image you want to create",
        model="Which FLUX model to use (default: pro)",
    )
    @app_commands.choices(
        model=[
            app_commands.Choice(name="Pro (best balance)", value="pro"),
            app_commands.Choice(name="Max (highest quality)", value="max"),
            app_commands.Choice(name="Klein (fastest)", value="klein"),
            app_commands.Choice(name="Flex (most control)", value="flex"),
        ]
    )
    async def generate_cmd(
        self,
        interaction: discord.Interaction,
        prompt: str,
        model: str = "pro",
    ):
        # Check for API key (user's personal key takes priority over server key)
        api_key = await self.storage.resolve_api_key(interaction.user.id, interaction.guild_id)
        if not api_key:
            await interaction.response.send_message(
                "**No API key set!** Either:\n"
                "• A server admin runs `/setkey` to set a shared key, or\n"
                "• You run `/mykey` to use your own personal key\n\n"
                "Get your key at **[dashboard.bfl.ai](https://dashboard.bfl.ai)**",
                ephemeral=True,
            )
            return

        await interaction.response.defer()

        # Merge user style with prompt
        user_style = await self.storage.get_user_style(interaction.user.id)
        full_prompt = f"{user_style}, {prompt}" if user_style else prompt

        try:
            image_bytes = await generate_image(
                api_key, full_prompt, model=model
            )
        except (ValueError, TimeoutError) as e:
            await interaction.followup.send(f"**Generation failed:** {e}")
            return

        file = discord.File(BytesIO(image_bytes), filename="fluxbot.jpg")
        embed = discord.Embed(color=0x7C3AED)
        embed.set_author(name=f"{interaction.user.display_name}'s generation", icon_url=interaction.user.display_avatar.url)
        embed.description = f"**Prompt:** {prompt}"
        if user_style:
            embed.set_footer(text=f"Style: {user_style}")
        embed.set_image(url="attachment://fluxbot.jpg")
        await interaction.followup.send(embed=embed, file=file)


async def setup(bot: commands.Bot):
    await bot.add_cog(Generate(bot))
