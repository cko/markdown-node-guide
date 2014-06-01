module.exports = function (grunt) {

    // define a couple of tasks
    grunt.initConfig({

        // create output directory in case it doesn't exist yet
        mkdir: {
            all: {
                options: {
                    create: ['output']
                }
            }
        },

        // replace the md-links in main.md with the content of the linked files (chapter1.md, chapter2.md)
        combine: {
            single: {
                input: 'main.md',
                output: 'output/combined.md',
                tokens: [
                    // atm grunt-combine doesn't accept regex placeholder in the file attribute
                    // so for now they must be listed explicitely
                    //https://github.com/mcgaryes/grunt-combine/blob/master/tasks/combine.js
                    {token: '\\(chapter1.md\\)', file: 'chapter1.md'},
                    {token: '\\(chapter2.md\\)', file: 'chapter2.md'},
                    // remove the remaining link text, of course this could also be included in
                    // the previous line, but the code looks cleaner this way if it are more files
                    {token: '\\[([a-zA-Z0-9]*)\\.md\\]', string: ' '}
                ]
            }
        },

        //convert everything to html
        markdown: {
            all: {
                files: [
                    {
                        expand: true,
                        src: 'output/combined.md',
                        dest: './',
                        ext: '.html'
                    }
                ]
            }
        },

        // copy images and css files to the output directory
        copy: {
            main: {
                files: [
                    {src: 'img/image1.jpg', dest: 'output/image1.jpg'},
                    {src: ['css/*'], dest: 'output/'}
                ]
            }
        }
    });

    // load all required task
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-combine');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // define in which order the tasks should be executed
    grunt.registerTask('default', ['mkdir', 'copy', 'combine:single', 'markdown']);
};
