<template>
	<div class="range">
		<FormInput
			id="formInput"
			:classInput="[
				'range-input',
				{
					'form__input--complete': value,
				},
			]"
			classSuptitle="form__suptitle"
			placeholder="Уровень владения JavaScript"
			type="text"
			@input="$emit('input', $event)"
			:value="value"
		/>

		<div class="progress">
			<div
				id="progress-done"
				:class="filterOfSkills"
				class="progress__done"
			></div>
		</div>
	</div>
</template>

<script>
import FormInput from "./FormInput.vue";
export default {
	components: { FormInput },

	props: {
		value: {
			type: String,
		},
	},

	computed: {
		filterOfSkills() {
			if (this.value < 26) {
				return "width25";
			}

			if (this.value > 25 && this.value < 51) {
				return "width50";
			}

			if (this.value < 76 && this.value > 50) {
				return "width75";
			}

			if (this.value > 75) {
				return "width100";
			}
		},
	},
};
</script>

<style lang="scss">
.range {
	position: relative;
}

.range-input {
	border-bottom: none;
}

.progress {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 7px;
}

.progress__done {
	width: 100%;
	height: 100%;
	background: linear-gradient(90deg, #001e82 0%, #001e82 100%);

	transition: width 0.3s linear;
}

.width25 {
	width: 25%;
}
.width50 {
	width: 50%;
}
.width75 {
	width: 75%;
}
.width100 {
	width: 100%;
}

@media (max-width: 575.98px) {
	.progress {
		height: 5px;
	}
}
</style>
