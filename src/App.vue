<template>
	<div id="app">
		<Header />
		<Form :formData="inputData" />
	</div>
</template>

<script>
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
export default {
	name: "App",
	components: { Header, Form },
	data: () => {
		return {
			inputData: [
				{ name: "Имя Фамилия", value: "fio", type: "text" },
				{ name: "Дата рождения", value: "birthDate", type: "text" },
				{ name: "Почта", value: "email", type: "email" },
				{ name: "Телефон", value: "phone", type: "tel" },
			],
		};
	},
};
</script>

<style lang="scss">
@font-face {
	font-family: "SuisseIntl";
	src: local("SuisseIntl Light"), local("SuisseIntl-Light"),
		url("~@/assets/fonts/SuisseIntl-Light.woff") format("woff");
	font-weight: 300;
	font-style: normal;
}

@font-face {
	font-family: "SuisseIntl";
	src: local("SuisseIntl Regular"), local("SuisseIntl-Regular"),
		url("~@/assets/fonts/SuisseIntl-Regular.woff") format("woff");
	font-weight: 400;
	font-style: normal;
}

@font-face {
	font-family: "SuisseIntl";
	src: local("SuisseIntl Medium"), local("SuisseIntl-Medium"),
		url("~@/assets/fonts/SuisseIntl-Medium.woff") format("woff");
	font-weight: 500;
	font-style: normal;
}

* {
	margin: 0;
	padding: 0;
	bottom: 0;
}

*,
*::before,
*::after {
	box-sizing: border-box;
}

*:focus,
*:active {
	outline: none;
}

ul li,
ol li {
	list-style: none;
}

html,
body {
	font-family: SuisseIntl;
	font-weight: 400;
	min-height: 100vh;
	scroll-behavior: smooth;
	color: $blue;
	line-height: 1;
	font-size: 16px;
	background-color: $main-bg;
}

a,
a:visited {
	text-decoration: none;
}

h1,
h2,
h3,
h3,
h5,
h6 {
	font-size: inherit;
	font-weight: 400;
}

img {
	max-width: 100%;
	display: block;
}

input,
button,
textarea,
select {
	font: inherit;
}

button {
	cursor: pointer;
}

.container {
	width: 100%;
	max-width: 1472px;
	margin: 0 auto;
	padding: 0 16px;
}

.title {
	color: $blue;
	font-weight: 500;
	font-size: 16px;
}

@media (max-width: 575.98px) {
	.title {
		font-size: 14px;
	}
}
</style>
