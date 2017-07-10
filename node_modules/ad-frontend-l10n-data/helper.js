'use strict';

const path = require('path');


function helper(options) {
	var opts = options || {};
	var dataFolderLocation = path.join(__dirname, 'data');
	var map = opts.mapData || require('./');
	var fileOutput = Object.assign({}, {
		prefix: 'l10n',
		separator: '_',
		extension: 'json'
	}, opts.fileOutput);

	function validateLocale(locale) {
		return locale in map ? locale : 'en';
	}

	function getExtendedLocale(locale) {
		var result = locale;
		var normalizedLocale = locale.replace('-', '_');
		if (normalizedLocale in map) {
			result = normalizedLocale;
		} else {
			result = validateLocale(locale.split('-')[0]);
		}
		return result;
	}

	function isExtendedLocale(locale) {
		return locale && (locale.indexOf('-') > -1 || locale.indexOf('_') > -1);
	}

	function getLocale(locale) {
		var result = 'en';
		// ensure locale uses underscore
		if (isExtendedLocale(locale)) {
			result = getExtendedLocale(locale);
		} else if (!locale) {
			result = 'en';
		} else {
			result = validateLocale(locale);
		}
		return result;
	}

	function getTheme(locale, theme) {
		return theme in map[locale]
			&& map[locale][theme]
			? (theme + fileOutput.separator) : '';
	}

	function getVariation(locale, theme, variation) {
		return theme in map[locale]
			&& variation in map[locale][theme]
			&& map[locale][theme][variation]
			? (variation + fileOutput.separator) : '';
	}

	function getFilename(variation, theme, locale) {
		var resultLocale = getLocale(locale);
		var resultTheme = getTheme(resultLocale, theme);
		var resultVariation = getVariation(resultLocale, theme, variation);

		// allows for fallback to simple locale if extended locale does not have a theme
		if (!resultTheme && isExtendedLocale(resultLocale)) {
			var simpleLocale = validateLocale(resultLocale.split('_')[0]);
			var simpleLocaleTheme = getTheme(simpleLocale, theme);
			if (simpleLocaleTheme) {
				resultTheme = simpleLocaleTheme;
				resultLocale = simpleLocale;
			}
		}

		return [
			fileOutput.prefix,
			fileOutput.separator,
			resultVariation,
			resultTheme,
			resultLocale,
			'.',
			fileOutput.extension
		].join('');
	}

	function getL10nData(variation, theme, locale) {
		var filename = getFilename(variation, theme, locale);
		return require(path.join(dataFolderLocation, filename));
	}

	return {
		getFilename: getFilename,
		getL10nData: getL10nData
	};
};

module.exports = helper;

