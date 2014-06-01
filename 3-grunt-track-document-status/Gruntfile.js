module.exports = function (grunt) {

    grunt.initConfig({
        // make sure the output directory exists
        mkdir: {
            all: {
                options: {
                    create: ['output']
                }
            }
        },
        //provide one or more source files to update_status_table
        update_status_table: {
            main: {
                files: [
                    {src: ['main.md']}
                ]
            }
        },
        // transform markdown to html
        markdown: {
            all: {
                files: [
                    {
                        expand: true,
                        src: 'main.md',
                        dest: 'output',
                        ext: '.html'
                    }
                ]
            }
        },
        // copy css and js files to the output folder
        copy: {
            main: {
                files: [
                    {src: ['js/**'], dest: 'output/'},
                    {src: ['css/**'], dest: 'output/'}
                ]
            }
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // define the order in which tasks should be called
    grunt.registerTask('default', ['mkdir', 'copy', 'update_status_table', 'markdown']);
};
