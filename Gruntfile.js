module.exports = function(grunt) {

    var imports = require('rework-import');
    var vars = require('rework-vars');
    var references = require('rework-plugin-references');
    var urlPlugin = require('rework-plugin-url');
    var calc = require('rework-calc');
    var colors = require('rework-plugin-colors');
    var ease = require('rework-plugin-ease');
    var prefixSelectors = require('rework-plugin-prefix-selectors');
    var breakpoints = require('rework-breakpoints');
    var flip = require('css-flip');
    var autoprefixer = require('autoprefixer-core');
    var mixin = require('rework-plugin-mixin');
    var mixins = require('rework-mixins');
    var inherit = require('rework-inherit');

    var custom_mixins = require('./lib/mixins.js');

    var url = function (url) {
        return '//domain.x' + url;
    };

  // Project configuration.
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ["build", "css"],
    concat: {
        basic: {
            src: ['build/*.ltr.css'],
            dest: 'css/styles.css'
        },
        rtl: {
            src: ['build/*.rtl.css'],
            dest: 'css/styles.rtl.css'
        }
    },
    postcss: {
        options: {
            processors: [
                autoprefixer({ browsers: ['last 2 version'] }).postcss
            ]
        },
        dist: { src: 'build/*.css' }
    },
    rework: {
        build: {
            options: {
                toString: {compress: true},
                use: [
                    imports(),
                    vars(),
                    references(),
                    calc,
                    mixin(mixins),
                    mixin(custom_mixins),
                    inherit(),
                    colors(),
                    urlPlugin(url),
                    ease(),
                    breakpoints
                ]
            },
            files: [
                {src: ['*.css'], dest: 'build/',ext: '.ltr.css', cwd: 'css-raw', expand: true}
            ]
        },
        rtl: {
            options: {
                toString: {
                    compress: true
                },
                use: [
                    flip.rework(),
                    prefixSelectors('.RTL')
                ]
            },
            files: [
                {src: ['*.ltr.css'], dest: 'build/',ext: '.rtl.css', cwd: 'build', expand: true}
            ]
        }
    }
});

    grunt.loadNpmTasks('grunt-rework');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask('default', ['clean','rework:build', 'rework:rtl','postcss','concat:basic','concat:rtl']);
};