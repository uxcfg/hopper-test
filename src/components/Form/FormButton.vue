<template>
	<button :class="['btn', className]">
		<slot></slot>
	</button>
</template>

<script>
export default {
	props: {
		className: {
			type: String,
			default: "",
		},
	},
};
</script>

<style lang="scss">
.btn {
	padding: 12px 24px;
	color: $white;
	font-size: 16px;
	font-weight: 400;
	background-color: $violet;
	border: none;
	border-radius: 4px;

	transition: all 0.1s linear;

	&:hover {
		background-color: #654de1;
		box-shadow: 4px 4px 12px 0px #7b61ff4d;
	}
}

@media (max-width: 575.98px) {
	.btn {
		width: 100%;
		font-size: 14px;
	}
}
</style>
