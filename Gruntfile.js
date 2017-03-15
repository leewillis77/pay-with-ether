module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			pwejs: {
				files: {
			        'js/pay-with-ether.min.js': ['js/pay-with-ether.js']
			    }
			}
		},
		watch: {
			js: {
				files: [
					'js/pay-with-ther.js'
				],
				tasks: [ 'uglify' ]
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['uglify']);

};
