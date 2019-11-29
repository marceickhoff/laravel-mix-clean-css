const mix = require('laravel-mix');
const path = require('path');
const escapeStringRegexp = require('escape-string-regexp');

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
	 * @param  {String|Array} filter One or more source stylesheet files
	 * @return {void}
	 */
	register(options, filter) {
		this.options = options;
		this.filter = filter;
	}

	/**
	 * Rules to be merged with the master webpack loaders.
	 *
	 * @return {Object}
	 */
	webpackRules() {
		// Create regular expression for file test
		let test = /\.(s[ac]|le)ss|styl(us)?$/; // All source stylesheets by default
		if (typeof this.filter !== 'undefined') { // File filter is given
			if (typeof this.filter === 'string') { // Only one file path given
				this.filter = [this.filter]; // Cast to array
			}
			if (Array.isArray(this.filter)) {
				let filters = [];
				this.filter.forEach((filter) => { // Iterate over given file filters
					if (!path.isAbsolute(filter)) {
						filter = path.resolve(filter);
					}
					filters.push(escapeStringRegexp(filter));
				});
				test = new RegExp(filters.join('|')); // Create regular expression from string
			}
			else {
				console.log(`laravel-mix-clean-css: Filter must be array or string, was ${typeof this.filter}, skipping`);
			}
		}

		// Return clean-css rule
		return {
			test: test,
			use: [{
				loader: "clean-css-loader",
				options: this.options
			}]
		}
	}
}

mix.extend('cleanCss', new CleanCss());