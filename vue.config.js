module.exports = {
	css: {
		loaderOptions: {
			sass: {
				additionalData: `
              @import "@/assets/styles/_variables.scss";
			  @import '~pretty-checkbox/src/pretty-checkbox.scss';
            `,
			},
		},
	},
	publicPath: process.env.NODE_ENV === "production" ? "/hopper-test/" : "/",
};
