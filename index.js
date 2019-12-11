const mix = require('laravel-mix');
const path = require('path');

class CleanCss {

	/**
	 * All dependencies that should be installed by Mix.
	 *
	 * @return {Array}
	 */
	dependencies() {
		return ['clean-css-loader'];
	}

	/**
	 * Register the component.
	 *
	 * @param  {Object} options CleanCSS configuration object
	 * @param  {String|Array} files (optional) Files to apply clean-css to
	 * @return {void}
	 */
	register(options, files = null) {

		// Convert single given file to array
		if (typeof files === 'string') files = [files];

		// Make every file path absolute
		if (Array.isArray(files)) {
			Object.keys(files).forEach(function (key) {
				if (!path.isAbsolute(files[key])) {
					files[key] = path.resolve(files[key]);
				}
			});
		}

		// Create properties
		this.options = options;
		this.files = files;
	}

	/**
	 * Insert the clean-css-loader into the generated webpack configuration.
	 *
	 * @param  {Object} webpackConfig
	 * @return {void}
	 */
	webpackConfig(webpackConfig) {
		let options = this.options;
		let files = this.files;

		// Where to insert the clean-css-loader
		const insertBefore = "postcss-loader";

		// Go through all rules
		webpackConfig.module.rules.forEach(function (rule) {

			// Skip rules without loaders or files that are not in the file list
			if (typeof rule.use === "undefined" || (files && !files.includes(rule.test))) return;

			// Go through all loaders of a rule
			rule.use.forEach(function (loader) {

				// Search for postcss-loader
				if (typeof loader === "object" && loader.loader === insertBefore) {

					// Insert clean-css right before
					rule.use.splice(rule.use.indexOf(insertBefore) - 1, 0, {
						loader: "clean-css-loader",
						options: options
					});
				}
			});
		});
	}
}

mix.extend('cleanCss', new CleanCss());