<template>
	<div class="input">
		<span v-if="value" :class="['input__suptitle', classSuptitle]">
			{{ placeholder }}
		</span>

		<input
			:class="['input__field', classInput]"
			v-bind="$attrs"
			:type="type"
			:value="value"
			@input="$emit('input', $event.target.value)"
			:placeholder="placeholder"
		/>

		<span v-if="imgLink" class="input__locality-icon">
			<img :src="imgLink" alt="img" />
		</span>
	</div>
</template>

<script>
export default {
	name: "FormInput",
	inheritAttrs: false,
	props: {
		value: [String, Number],
		classInput: {
			type: [String, Array],
			default: "",
		},
		classSuptitle: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			required: true,
		},
		imgLink: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			default: "text",
		},
	},
};
</script>

<style lang="scss">
.input {
	position: relative;
}

.input__field {
	overflow: hidden;
	width: 100%;
	padding: 18px 16px 12px;

	color: $prompt;
	background-color: $violet-l;
	font-weight: 400;
	font-size: 16px;

	border: none;
	border-bottom: 2px solid $blue;
	outline: none;

	z-index: 1;

	transition: background-color 0.1s linear;

	&:hover {
		background-color: $grey-l;
	}

	&:focus {
		color: $blue;
		border-color: $violet;
	}

	&::placeholder {
		font-size: 16px;
		color: $prompt;
	}
}

.input__suptitle {
	position: absolute;
	top: 6px;
	left: 16px;
	color: $prompt;
	height: fit-content;

	font-size: 12px;
	font-weight: 400;
}

.input__locality-icon {
	position: absolute;
	top: 50%;
	right: 18px;
	transform: translateY(-50%);
}

@media (max-width: 575.98px) {
	.input {
		font-size: 14px;
	}

	.input__field {
		padding: 16px 12px 12px;
		font-size: 14px;

		&::placeholder {
			font-size: 12px;
		}
	}

	.form__suptitle {
		top: 3px;
		left: 12px;
	}

	.input__locality-icon {
		right: 12px;
		transform: translateY(-40%);
	}
}
</style>
