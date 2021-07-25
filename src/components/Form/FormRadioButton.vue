<template>
	<div class="radio">
		<div class="title radio__title">
			{{ title }}
		</div>

		<div
			class="radio__item pretty p-default p-round"
			v-for="item in radioData"
			:key="item.title"
		>
			<input
				class="radio__field"
				type="radio"
				@input="$emit('input', $event.target.value)"
				:value="item.title"
				v-bind="$attrs"
				:name="item.name"
				id="item.title"
				:checked="item.title == checked"
			/>
			<div class="state">
				<label class="radio__label" for="item.title">
					{{ item.title }}
				</label>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "FormRadioButton",
	inheritAttrs: false,
	props: {
		title: {
			type: String,
			required: true,
		},
		radioData: {
			type: Array,
			required: true,
		},
		checked: {
			type: String,
			default: "",
		},
	},
};
</script>

<style lang="scss">
.radio {
	display: flex;
	flex-direction: column;
}

.radio__title {
	margin-bottom: 16px;
}

.radio .pretty {
	margin-bottom: 8px;
}

.radio__label {
	font-size: 16px;
	font-weight: 400;
	color: $blue;
	cursor: pointer;
}

.radio .pretty .state label:before,
.radio .pretty .state label:after {
	width: 16px;
	height: 16px;

	top: 0;
}

.radio .pretty .state label::before {
	border-color: $prompt;
	border-width: 1.5px;
}

.radio .pretty.p-default input:checked ~ .state label:after {
	background-color: $violet !important;
}

.radio .pretty.p-default input:checked ~ .state label::before {
	border-color: $violet;
}

@media (max-width: 575.98px) {
	.radio__label {
		font-size: 14px;
	}

	.radio .pretty .state label:before,
	.radio .pretty .state label:after {
		width: 14px;
		height: 14px;

		top: 2px;
	}
}
</style>
