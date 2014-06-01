'use strict';

var MARKER = "!!!!!";

module.exports = function (grunt) {

    grunt.registerMultiTask('update_status_table', '.', function () {
        this.files.forEach(function (f) {
            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                var fileContent = grunt.file.read(filepath);
                var startIndex = fileContent.indexOf(MARKER);
                var endIndex = fileContent.lastIndexOf(MARKER);
                // check if a table already exists and if not create a new one
                console.log("startIndex: " + startIndex);
                if (startIndex == -1) {
                    fileContent = createNewTable(0, 0, fileContent);
                    endIndex = fileContent.lastIndexOf(MARKER);
                } else if (startIndex == endIndex) {
                    fileContent = createNewTable(startIndex, endIndex, fileContent);
                    endIndex = fileContent.lastIndexOf(MARKER);
                }
                //update the status table
                var new_fileContent = updateStatusTable(fileContent, startIndex, endIndex);
                grunt.file.write(filepath, new_fileContent);
                return true;
            });
            grunt.log.writeln('File "' + f.src + '" processed.');
        });
    });

};

/**
 *
 * @param startIndex position where the table should be inserted
 * @param endIndex last position of marker (if any)
 * @param fileContent content of the file
 * @returns {string} filecontent with added table
 */
var createNewTable = function (startIndex, endIndex, fileContent) {
    var tableHeader = "\n\n| Date      |TODO |IN_PROGRESS|TO_REVIEW_1|TO_REVIEW_2|DONE|\n" +
        "| :---------:|:---:|:---------:|:-------:|:-------:|:--:|\n";
    if (startIndex == 0) {
        return MARKER + tableHeader + MARKER + fileContent;
    } else if (startIndex == endIndex) {
        var parts = fileContent.split(MARKER);
        return parts[0] + MARKER + tableHeader + MARKER + parts[1];
    }
};

/**
 * Updates the status table
 * @param fileContent text from file
 * @param startIndex start of table
 * @param endIndex end of table
 * @returns {string} the file content with the updated table
 */
var updateStatusTable = function (fileContent, startIndex, endIndex) {
    var tableContent = fileContent.substring(startIndex, endIndex);
    var todayAsString = getTodayAsString();
    var line = getStatusLineForDate(todayAsString, fileContent);
    if (tableContent.indexOf(todayAsString) == -1) {
        tableContent += line + "\n";
    } else {
        var re = new RegExp('.*' + todayAsString + '.*');
        tableContent = tableContent.replace(re, line);
    }
    tableContent += MARKER;
    var regex2 = new RegExp(MARKER + "[\\s\\S]*?" + MARKER, "m");
    return fileContent.replace(regex2, tableContent);
};

/**
 * creates a row for the md table for the given date, it looks like:
 * | 2014-05-31 | 7   | 3         | 5         | 2         | 3  |
 * @param dateString date, that should appear in the first column
 * @param text text which should be analyzed
 * @returns {string}
 */
var getStatusLineForDate = function (dateString, text) {
    var statusArray = ["TODO", "IN_PROGRESS", "TO_REVIEW_1", "TO_REVIEW_2", "DONE"];
    var map = Array.prototype.map;
    var counts = map.call(statusArray, function (x) {
        return getCountForStatus(x, text);
    });
    var col1 = ' ' + dateString + ' ';
    var col2 = ' ' + counts[0] + '   ';
    var col3 = ' ' + counts[1] + '         ';
    var col4 = ' ' + counts[2] + '       ';
    var col5 = ' ' + counts[3] + '  ';
    var col6 = ' ' + counts[4] + '  ';
    return ('|' + col1 + '|' + col2 + '|' + col3 + '|' + col4 + '|' + col5 + '|' + col6 + '|');
};

/**
 *
 * @param status
 * @param text
 * @returns {number} how often the given status appears in text
 */
var getCountForStatus = function (status, text) {
    var re = new RegExp(status, 'g');
    return (text.match(re)).length - 1;
};

/**
 *
 * @returns {string} todays date as string in form of yyyy-mm-dd
 */
var getTodayAsString = function () {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1; //January is 0!
    var year = today.getFullYear();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return year + '-' + month + '-' + day;
};
