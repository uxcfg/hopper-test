<template>
	<div class="file">
		<h3 class="title file__title">{{ title }}</h3>
		<div class="file__wrap">
			<input
				ref="fileUpload"
				class="file__input"
				type="file"
				name=""
				id="fl-inp"
				accept=".jpg,.pdf,.jpeg,.png"
				@change="onFileSelect"
			/>
			<label class="file__label" for="fl-inp">
				<img class="file__icon" :src="imgLinkAdd" alt="add" />
				{{ label }}
			</label>
			<div v-if="fileOfWorkBook" class="file__name">
				<p class="file__text">{{ fileName }}</p>
				<svg
					class="file__close-icon"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					@click="onDeleteFile"
				>
					<path
						d="M12.1583 6.66663L9.99996 8.82496L7.84163 6.66663L6.66663 7.84163L8.82496 9.99996L6.66663 12.1583L7.84163 13.3333L9.99996 11.175L12.1583 13.3333L13.3333 12.1583L11.175 9.99996L13.3333 7.84163L12.1583 6.66663ZM9.99996 1.66663C5.39163 1.66663 1.66663 5.39163 1.66663 9.99996C1.66663 14.6083 5.39163 18.3333 9.99996 18.3333C14.6083 18.3333 18.3333 14.6083 18.3333 9.99996C18.3333 5.39163 14.6083 1.66663 9.99996 1.66663ZM9.99996 16.6666C6.32496 16.6666 3.33329 13.675 3.33329 9.99996C3.33329 6.32496 6.32496 3.33329 9.99996 3.33329C13.675 3.33329 16.6666 6.32496 16.6666 9.99996C16.6666 13.675 13.675 16.6666 9.99996 16.6666Z"
						fill="#808FC0"
						stroke="#F2F3F6"
						stroke-width="0.2"
					/>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		imgLinkAdd: {
			type: String,
			default: "",
		},
		imgLinkClose: {
			type: String,
			default: "",
		},
		fileOfWorkBook: Boolean,
	},

	data: () => {
		return {
			fileName: "",
			file: null,
		};
	},
	methods: {
		onFileSelect(e) {
			this.fileName = e.target.files[0].name;
			this.file = e.target.files;
			this.$emit("change", this.file[0]);
			this.$refs.fileUpload.value = null;
		},
		onDeleteFile() {
			this.fileName = "";
			this.file = null;
			this.$emit("change", "");
		},
	},
};
</script>

<style lang="scss">
.file {
	position: relative;
}

.file__title {
	margin-bottom: 14px;
}

.file__wrap {
	display: flex;
	flex-wrap: wrap;
}

.file__input {
	display: none;
}

.file__label {
	width: 100%;
	max-width: 187px;
	height: 32px;
	margin-right: 15px;

	display: flex;
	align-items: center;

	border-radius: 4px;
	color: $violet;
	background-color: $violet-l;
	font-size: 16px;
	font-weight: 400;
	border: 1.5px solid transparent;

	transition: border 0.1s linear;
	cursor: pointer;

	&:hover {
		border: 1.5px solid $violet;
	}
}

.file__icon {
	display: inline-block;
}

.file__name {
	width: 100%;
	max-width: 210px;
	background-color: $main-bg;
	border-radius: 25px;
	padding: 6px 16px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	cursor: pointer;
}

.file__close-icon path {
	transition: fill 0.1s linear;
}

.file__name:hover .file__close-icon path {
	fill: $violet;
}

.file__text {
	max-width: 90%;
	text-overflow: ellipsis;
	overflow: hidden;
	line-height: 20px;
}

@media (max-width: 575.98px) {
	.file__label {
		font-size: 14px;
		margin-bottom: 10px;
	}

	.file__text {
		font-size: 14px;
	}
}
</style>
