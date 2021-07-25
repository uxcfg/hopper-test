<template>
	<header class="header">
		<div class="container header__wrap">
			<div class="header__column header-column__left">
				<a class="desktop-logo" href="/">
					<img src="../../assets/desktop-logo.svg" alt="Hopper" />
				</a>

				<a class="mobile-logo" href="/">
					<img src="../../assets/mobile-logo.svg" alt="Hopper" />
				</a>
			</div>

			<div class="header-column header-columb__left">
				<div class="telegram">
					<a
						class="telegram__link"
						target="_blank"
						href="https://t.me/bot_Hopper"
					>
						<img
							class="telegram__icon"
							src="../../assets/telegram-icon.svg"
							alt="telegram"
						/>
						<div class="telegram__text">@bot_Hopper</div>
					</a>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default {};
</script>

<style lang="scss">
.header {
	padding-top: 32px;
}

.header__wrap {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.header-columb__left {
	display: none;
}

.mobile-logo {
	display: none;
}

.telegram__link {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.telegram__icon {
	margin-right: 6px;
}

.telegram__text {
	color: $violet;
	font-size: 14px;
}

@media (max-width: 767.98px) {
	.header {
		padding: 15px 0;
	}

	.header__wrap {
		align-items: flex-start;
	}

	.header-column__left {
		display: flex;
		align-items: center;
	}

	.desktop-logo {
		display: none;
	}

	.mobile-logo {
		display: block;
	}

	.header-columb__left {
		display: block;
	}
}
</style>
