const mix = require('laravel-mix');

class CleanCss {

	/**
	 * All dependencies that should be installed by Mix.
	 *
	 * @return {Array}
	 */
	dependencies() {
		return ['clean-css-loader', 'escape-string-regexp'];
	}

	/**
	 * Register the component.
	 *
	 * @param  {Object} options CleanCSS configuration object
	 * @return {void}
	 */
	register(options) {
		this.options = options;
	}

	/**
	 * Insert the clean-css-loader into the generated webpack configuration.
	 *
	 * @param  {Object} webpackConfig
	 * @return {void}
	 */
	webpackConfig(webpackConfig) {
		let options = this.options;

		// Where to insert the clean-css-loader
		const insertBefore = "postcss-loader";

		// Go through all rules
		webpackConfig.module.rules.forEach(function (rule) {

			// Skip rules without loaders
			if (typeof rule.loaders === "undefined") return;

			// Go through all loaders of a rule
			rule.loaders.forEach(function (loader) {

				// Search for postcss-loader
				if (typeof loader === "object" && loader.loader === insertBefore) {

					// Insert clean-css right before
					rule.loaders.splice(rule.loaders.indexOf(insertBefore) - 1, 0, {
						loader: "clean-css-loader",
						options: options
					});
				}
			});
		});
	}
}

mix.extend('cleanCss', new CleanCss());