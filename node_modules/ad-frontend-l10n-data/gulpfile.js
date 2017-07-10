const path = require('path');
const gulp = require('gulp');
const rimraf = require('rimraf');
const adFolder = process.env.AD_HOME;

(function validateEnvironmentVariable() {
	if (!adFolder) {
		console.error(`You need to configure $AD_HOME environment variable,
	pointing to your AppDirect repo folder location`);
		process.exit(1);
	}
})();

(function loadBuildL10nTask() {
	const commonGulpTasks = 'appdirect-parent/appdirect/gulp-tasks/common';
	const gulpPaths = require(path.join(adFolder, commonGulpTasks, '_paths'));
	gulpPaths.L10N_TARGET = './data';

	require(path.join(adFolder, commonGulpTasks, 'build-l10n'))(
		gulp,
		null,
		require(path.join(adFolder, commonGulpTasks, '_utils')),
		gulpPaths,
		{
			template: { header: '', footer: '' },
			fileOutput: {
				extension: 'json'
			},
			includeAll: true
		}
	);
})();

gulp.task('build:clean-l10n', (done) => {
	rimraf('*.js|!gulpfile.js', done);
});

gulp.task('default', ['build:l10n']);

