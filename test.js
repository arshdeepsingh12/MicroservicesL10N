'use strict';

const assert = require('assert');
const helper = require('./helper');

describe('ad-frontend-l10n-data', function() {
	const mockMapData = {"da":{"$content":true,"telia":{"$content":true}},"de":{"$content":true,"ibm":{"$content":true},"swisscom":{"$content":true},"wacom":{"$content":true},"deutsche":{"$content":true,"tsystems":{"$content":true}},"cancom":{"$content":true},"dtpoc":{"$content":true},"vfgroup":{"$content":true},"vodafone":{"$content":true},"appdirectapp":{"$content":true}},"es_419":{"$content":true,"nextel":{"$content":true}},"es":{"$content":true,"ibm":{"$content":true},"nextel":{"$content":true},"wacom":{"$content":true}},"fi":{"$content":true,"elisa":{"$content":true},"sonerafi":{"$content":true},"telia":{"$content":true}},"fr_CA":{"$content":true},"fr":{"$content":true,"ibm":{"$content":true},"appcel":{"$content":true},"swisscom":{"$content":true},"rogers":{"$content":true},"bell":{"$content":true},"wacom":{"$content":true},"amex":{"$content":true},"constant":{"$content":true},"elisa":{"$content":true},"liberty":{"$content":true},"rackspace":{"$content":true},"sfr":{"$content":true},"appdirectapp":{"$content":true}},"it":{"$content":true,"vfgroup":{"$content":true},"vfitaly":{"$content":true},"swisscom":{"$content":true},"wacom":{"$content":true},"vodafone":{"$content":true}},"ja":{"$content":true,"wacom":{"$content":true},"softbank":{"$content":true}},"ko":{"$content":true},"pt":{"$content":true},"ru":{"$content":true,"teolt":{"$content":true}},"sv":{"$content":true,"elisa":{"$content":true},"ibm":{"$content":true},"telia":{"$content":true},"dustin":{"$content":true},"sonerafi":{"$content":true}},"zh_CN":{"$content":true,"wacom":{"$content":true}},"zh_HK":{"$content":true,"wacom":{"$content":true}},"zh_TW":{"$content":true,"wacom":{"$content":true}},"en":{"$content":true,"ibm":{"$content":true},"appcel":{"$content":true},"cloudfoundry":{"$content":true},"deutsche":{"$content":true,"tsystems":{"$content":true}},"netcom":{"$content":true},"openshift":{"$content":true},"staples":{"$content":true},"swisscom":{"$content":true},"telia":{"$content":true},"telstra":{"$content":true},"teolt":{"$content":true},"rogers":{"$content":true},"bt":{"$content":true},"att":{"$content":true},"bell":{"$content":true},"comcast":{"$content":true},"rackspace":{"$content":true},"sugarcrm":{"$content":true},"fico":{"$content":true},"nextel":{"$content":true},"wacom":{"$content":true},"tmus":{"$content":true},"vfgroup":{"$content":true},"zendesk":{"$content":true},"adp":{"$content":true},"acme":{"$content":true,"dt":{"$content":true}},"amdocs":{"$content":true},"amex":{"$content":true},"cancom":{"$content":true},"constant":{"$content":true},"dtpoc":{"$content":true},"dustin":{"$content":true},"elisa":{"$content":true},"genesys":{"$content":true},"globetelecom":{"$content":true},"hawaiiantel":{"$content":true},"hexagon":{"$content":true},"icims":{"$content":true},"incontact":{"$content":true},"jaguar":{"$content":true},"liberty":{"$content":true},"litmos":{"$content":true},"pcmall":{"$content":true},"sbw":{"$content":true},"sfr":{"$content":true},"skykit":{"$content":true},"softbank":{"$content":true},"sonerafi":{"$content":true},"spark":{"$content":true},"temenos":{"$content":true},"tripwire":{"$content":true},"vodafone":{"$content":true},"wacomdemo":{"$content":true},"appdirectapp":{"$content":true}},"lt":{"$content":true,"teolt":{"$content":true}},"no":{"$content":true,"netcom":{"$content":true},"telia":{"$content":true},"dustin":{"$content":true}},"es_MX":{"$content":true,"nextel":{"$content":true}},"en_AU":{"$content":true},"tsystems_de":{"$content":true}};

	describe('helper', function() {
		describe('getFilename', function () {
			it('should return valid filename for locale only', function() {
				assert.equal(helper({ mapData: mockMapData }).getFilename(null, null, 'fr'), 'l10n_fr.json');
			});
			it('should return valid filename for extended locales', function() {
				assert.equal(helper({ mapData: mockMapData }).getFilename(null, null, 'zh_CN'), 'l10n_zh_CN.json');
			});
			it('should return valid filename for extended locales using dashes', function() {
				assert.equal(helper({ mapData: mockMapData }).getFilename(null, null, 'zh-CN'), 'l10n_zh_CN.json');
			});
			it('should return valid filename for non valid extended locales', function() {
				assert.equal(helper({ mapData: mockMapData }).getFilename(null, null, 'en_US'), 'l10n_en.json');
			});
			it('should return valid filename for locale and theme', function() {
				assert.equal(helper({ mapData: mockMapData }).getFilename(null, 'rogers', 'en'), 'l10n_rogers_en.json');
			});
			it('should return valid filename for locale and non-existing theme', function() {
				assert.equal(helper({ mapData: mockMapData }).getFilename(null, 'aldjfo02jfdajsal', 'en'), 'l10n_en.json');
			});
			it('should return valid filename for locale, theme and variation', function() {
				assert.equal(helper({ mapData: mockMapData }).getFilename('tsystems', 'deutsche', 'de'), 'l10n_tsystems_deutsche_de.json');
			});
			it('should return valid filename by default', function() {
				assert.equal(helper({ mapData: mockMapData }).getFilename(), 'l10n_en.json');
			});
			it('should default to simple locale if provided theme is not available on extended', function() {
				assert.equal(helper({ mapData: mockMapData }).getFilename(null, 'rogers', 'fr-CA'), 'l10n_rogers_fr.json');
			});
			it('should return valid filename for extended locale and theme', function () {
				assert.equal(helper({ mapData: mockMapData }).getFilename(null, 'nextel', 'es_MX'), 'l10n_nextel_es_MX.json');
			});
			it('should return valid filename for simple locale and theme', function () {
				assert.equal(helper({ mapData: mockMapData }).getFilename(null, 'nextel', 'es'), 'l10n_nextel_es.json');
			});
			it('should default to simple locale when extended locale does not exists', function () {
				assert.equal(helper({ mapData: mockMapData }).getFilename(null, null, 'pt-BR'), 'l10n_pt.json');
			});
		});
		describe('getL10nData', function () {
			it('should return valid l10n data', function() {
				assert.deepStrictEqual(helper({ mapData: mockMapData }).getL10nData(), require('./data/l10n_en.json'));
			});
			it('should return valid l10n data for a different locale', function() {
				assert.deepStrictEqual(helper({ mapData: mockMapData }).getL10nData(null, null, 'fr'), require('./data/l10n_fr.json'));
			});
		});
	});
});

