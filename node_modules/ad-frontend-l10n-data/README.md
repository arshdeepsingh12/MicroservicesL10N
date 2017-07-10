# ad-frontend-l10n-data

Keeps generated localization data for consumption in `ad-frontend`

## Updating set of data

- Set up a `$AD_HOME` env variable pointing to your clone of the [AppDirect repo](github.com/AppDirect/AppDirect)
- cd into `$AD_HOME/appdirect-parent/appdirect`
- run `gulp build:l10n` to re-generate localization files from current translation data
- Clone this repo, cd into its cloned folder, then run:
- `npm install`
- `npm start`

### Publish a new version

- `npm version patch`
- Push both the generated commit and tag to your upstream git remote
- Run [appdirect-npm-release](http://jenkins.appdirect.com:8080/view/Front-End/job/appdirect-npm-release) jenkins task with `ad-frontend-l10n-data` as parameter

## Helper API

A helper module is available to make it easier to find/consume localization data with the help of the provided mapping data.

### Simple Usage

```js
const l10n = require('ad-frontend-l10n-data/helper')();
l10n.getFilename(null, 'deutsche', 'de'); // returns l10n_deutsche_de.json
l10n.getL10nData(null, 'deutsche', 'de'); // returns key/value l10n obj for deutsche_de theme
```

### helper(options)

Initializer method, accepts the following options:

- `mapData` Object; Allows for overriding the provided map json data
- `fileOutput` Object that might contain:
  - `prefix` String; Prefix to be used on filenames, defaults to `l10n`
  - `separator` String; Separator to be used between variation, theme, locale, defaults to `_`
  - `extension` String; File extension to be used, defaults to `json`

#### Usage

```js
const helper = require('ad-frontend-l10n-data/helper');
const l10n = helper({
    fileOutput: {
        extension: 'js'
    }
});
l10n.getFilename(); // returns l10n_en.js
```

### helper.getFilename(variation, theme, locale)

Gets a localization filename from a set of given variation, theme, locale.

- `variation` String, A partner theme variation code, defaults to `null`
- `theme` String, A valid partner theme code, defaults to `null`
- `locale` String, A valid locale, defaults to `en`

#### Usage

```js
const l10n = require('ad-frontend-l10n-data/helper')();
l10n.getFilename(null, null, 'fr-CA'); // returns l10n_fr_CA.json
```

### helper.getL10nData(variation, theme, locale)

Gets a localization data (a key/values object) from a set of given variation, theme, locale.

- `variation` String, A partner theme variation code, defaults to `null`
- `theme` String, A valid partner theme code, defaults to `null`
- `locale` String, A valid locale, defaults to `en`

#### Usage

```js
const l10n = require('ad-frontend-l10n-data/helper')();
l10n.getL10nData(); // returns standard (en) localization data 
```

### More info

For more supported use cases check the [test file](./test.js).

