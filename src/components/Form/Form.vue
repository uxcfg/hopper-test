<template>
	<div class="container form__wrap">
		<form class="form" @submit.prevent="onSendForm" ref="form">
			<div class="form__inner">
				<div class="form__header">
					<h1 class="form__title">Анкета соискателя</h1>
					<div class="form__subtitle">
						Допускается загрузка документов в форматах PDF, JPG,
						JPEG, PNG
					</div>
				</div>
				<div
					v-for="item in formData"
					:key="item.name"
					class="form__item"
				>
					<FormInput
						:classInput="[
							{
								'form__input--complete': form[item.value],
							},
						]"
						classSuptitle="form__suptitle"
						v-model.trim="form[item.value]"
						:placeholder="item.name"
						:type="item.type"
					/>
				</div>

				<div class="form__item search">
					<FormInput
						:classInput="[
							{ 'form__input--complete': form.locality },
							'search__field',
						]"
						classSuptitle="form__suptitle"
						v-model="form.locality"
						placeholder="Адрес фактического проживания"
						:imgLink="require(`../../assets/locality-icon.svg`)"
					/>

					<div
						v-if="isSearchOpen"
						ref="search-result"
						class="search-result"
					>
						<div class="search-result__wrap">
							<div
								v-for="item in localityData"
								:key="item.id"
								class="search-result__item"
								@click="selectLocation(item.label)"
							>
								<div class="search-result__text">
									{{ item.label }}
								</div>
							</div>

							<p
								class="search-result__error"
								v-if="!localityData.length"
							>
								Ничего не найдено
							</p>
						</div>
					</div>
				</div>

				<div class="form__item">
					<FormRangeInput v-model="form.levelOfJs" />
				</div>

				<div class="form__item">
					<FormRadioButton
						:radioData="radioData"
						title="Вид трудовой книжки"
						v-model="form.typeOfWorkBook"
						:checked="form.typeOfWorkBook"
					/>
				</div>

				<div class="form__item">
					<FormFileInput
						title="Трудовая книжка / выписка из электронной книжки"
						:imgLinkAdd="require(`../../assets/file-icon.svg`)"
						:imgLinkClose="
							require(`../../assets/file-close-icon.svg`)
						"
						label="Прикрепить файл"
						@change="fileSelected"
						:fileOfWorkBook="Boolean(form.fileOfWorkBook)"
					/>
				</div>

				<FormButton className="form__btn">Отправить</FormButton>
			</div>
		</form>
	</div>
</template>

<script>
import FormInput from "./FormInput.vue";
import FormRadioButton from "./FormRadioButton.vue";
import FormFileInput from "./FormFileInput.vue";
import FormButton from "./FormButton.vue";
import FormRangeInput from "./FormRangeInput.vue";
import axios from "axios";

export default {
	name: "Form",
	components: {
		FormInput,
		FormRadioButton,
		FormFileInput,
		FormButton,
		FormRangeInput,
	},
	props: {
		formData: {
			type: Array,
			required: true,
		},
	},

	initForm: {
		fio: "",
		birthDate: "",
		email: "",
		phone: "",
		locality: "",
		levelOfJs: "25",
		typeOfWorkBook: "Электронная",
		fileOfWorkBook: "",
	},

	data: () => ({
		form: {
			fio: "",
			birthDate: "",
			email: "",
			phone: "",
			locality: "",
			levelOfJs: "25",
			typeOfWorkBook: "Электронная",
			fileOfWorkBook: "",
		},
		radioData: [
			{ name: "type", title: "Электронная" },
			{ name: "type", title: "Бумажная" },
		],
		tempSelect: "",
		localityData: [],
		isSearchOpen: false,
	}),

	created() {
		this.form = {
			...this.$options.initForm,
			...this.getLocalStorageForm(),
		};
	},

	mounted() {
		this.onCloseSearchResult();
	},

	methods: {
		onSendForm(e) {
			const data = JSON.parse(JSON.stringify(this.form));
			console.log(data);
			this.form = {
				fio: "",
				birthDate: "",
				email: "",
				phone: "",
				locality: "",
				levelOfJs: "25",
				typeOfWorkBook: "Электронная",
				fileOfWorkBook: "",
			};
			console.log("Hello");
		},

		// Search Close Result
		closeSearchResult() {
			this.isSearchOpen = false;
		},

		onCloseSearchResult() {
			const vm = this;

			document.addEventListener("click", (e) => {
				if (e.target !== vm.$refs["search-result"]) {
					this.closeSearchResult();
				}
			});
		},

		// Location funcs
		selectLocation(item) {
			this.tempSelect = item;
			this.form.locality = item;
			this.isSearchOpen = false;
		},

		onSearch(value) {
			if (!this.form.locality) {
				this.isSearchOpen = false;
			}

			clearTimeout(this.timerId);
			this.timerId = setTimeout(() => {
				if (this.tempSelect == this.form.locality) {
					this.tempSelect = "";
				} else {
					this.tempSelect = value;
					if (value) {
						this.searchLocality(value);
					}
				}
			}, 500);
		},

		async searchLocality(searchQuery) {
			try {
				this.isSearchOpen = true;
				const data = await axios.get(
					`https://app.geocodeapi.io/api/v1/autocomplete?apikey=${process.env.VUE_APP_API_KEY}&text=${searchQuery}`
				);

				let arr = [];
				for (let i of data.data.features) {
					arr.push(i.properties);
				}

				this.localityData = arr;
			} catch (error) {
				this.isSearchOpen = false;
				console.log(error.message);
			}
		},

		// File
		fileSelected(e) {
			this.form.fileOfWorkBook = e;
		},

		//Local Storage
		getLocalStorageForm() {
			return JSON.parse(localStorage.getItem("form"));
		},

		setLocalStorageForm(form) {
			localStorage.setItem("form", JSON.stringify(form));
		},

		updateLocalStorageForm() {
			let storeForm = this.getLocalStorageForm();
			if (!storeForm) storeForm = {};

			storeForm = JSON.parse(JSON.stringify(this.form));
			this.setLocalStorageForm(storeForm);
		},
	},

	watch: {
		"form.locality": "onSearch",
		form: {
			handler() {
				this.updateLocalStorageForm();
			},
			deep: true,
		},
	},
};
</script>

<style lang="scss">
.form__wrap {
	display: flex;
	align-items: center;
	justify-content: center;
}

.form {
	background-color: $white;
	padding: 40px 60px;
	box-shadow: 0px 0px 20px rgba(0, 30, 130, 0.05);
}

.form__header {
	margin-bottom: 32px;
	text-align: center;
}

.form__title {
	font-size: 32px;
	font-weight: 300;
	letter-spacing: 1px;
	color: $blue;
	text-transform: uppercase;

	margin-bottom: 12px;
}

.form__subtitle {
	font-weight: 400;
	font-size: 16px;
	line-height: 20px;
	color: $prompt;

	width: 70%;
	margin: 0 auto;
}

.form__item {
	margin-bottom: 24px;
}

.form__input--complete {
	color: $blue;
}

.search {
	position: relative;
}

.search-result {
	position: absolute;
	width: 100%;
	height: 100vh;
	max-height: 156px;
	bottom: -160px;
	left: 0;

	border: 1.5px solid $grey-l;
	box-shadow: 0px 4px 16px 0px #0e1e5314;
	border-radius: 0 0 4px 4px;
	background-color: $white;

	z-index: 3;
	overflow-y: scroll;
}

.search-result__wrap {
	padding: 12px 0;
}

.search-result__item {
	cursor: pointer;
	transition: background-color 0.1s linear;

	&:hover {
		background-color: $violet-l;
	}
}

.search-result__text {
	font-size: 16px;
	font-weight: 400;
	color: $blue;
	padding: 12px 16px;
}

.search-result__error {
	text-align: center;
	font-size: 16px;
	color: $blue;
}

@media (max-width: 575.98px) {
	.container.form__wrap {
		padding-left: 0;
		padding-right: 0;
	}

	.form {
		padding: 32px 16px;
	}

	.form__header {
		margin-bottom: 24px;
	}
	.form__title {
		font-size: 24px;
		line-height: 24px;
		margin-bottom: 8px;
	}

	.form__subtitle {
		font-size: 14px;
		line-height: 16px;
		width: 90%;
	}

	.search-result__text {
		max-width: 90%;
		font-size: 14px;
		text-overflow: ellipsis;
		padding: 10px 14px;
	}

	.search-result__error {
		font-size: 14px;
	}
}
</style>
