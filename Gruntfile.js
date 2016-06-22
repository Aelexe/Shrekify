module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
		    all: ['src/*.js']
		},
		jscs: {
			main: ['src/*.js'],
			options: {
		        config: ".jscs.json"
			}
		},
	    clean: ['dist/shrekify.zip', 'dist/shrekify.xpi'],
	    compress: {
	    	main: {
	    		options: {
		    		archive: 'dist/shrekify.zip'
		    	},
		    	files: [
		    	    {src: ['src/**'], dest: '/'},
		    	    {src: ['libs/**'], dest: '/'},
		    	    {src: ['manifest.json'], dest: '/'}
		        ]
	    	}
	    },
	    copy: {
	    	main: {
	    		src: 'dist/shrekify.zip',
	    		dest: 'dist/shrekify.xpi'
	    	}
	    },
	    clean: ['dist/shrekify.zip'],
	 });
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	grunt.registerTask('default', ['jshint', 'jscs', 'clean', 'compress', 'copy', 'clean']);
};