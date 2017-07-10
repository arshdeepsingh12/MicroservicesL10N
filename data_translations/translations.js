const l10n = require('ad-frontend-l10n-data/helper')();

var locale, partner, variation, fileName, l10nDataObj;

function getL10nTranslationObject(reqObj) {
	//fpr locale
	if (reqObj.locale === undefined) {
		locale = null;
	} else {
		locale = reqObj.locale;
	}

	// for partner
	if (reqObj.partner === undefined) {
		partner = null;
	} else {
		partner = reqObj.partner;
	}

	// for variation
	if (reqObj.variation === undefined) {
		variation = null;
	} else {
		variation = reqObjvariation;
	}

	// as per the business logic when there is no variation the function accepts partner as the second argument
	if (variation != null) {
		fileName = l10n.getFilename(partner, variation, locale);
		l10nDataObj = l10n.getL10nData(partner, variation, locale);
	} else {
		fileName = l10n.getFilename(null, partner, locale);
		l10nDataObj = l10n.getL10nData(null, partner, locale);
	}

	return {
		fileName: fileName,
		l10nDataObj: l10nDataObj
	};

}

module.exports = {
	getL10nTranslationObject: getL10nTranslationObject
}
