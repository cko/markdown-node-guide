/**
 this script parses the html table and converts it to objects,
 so that the data can be used as input for the diagram.
 **/

/**
 * converts an html table row into an object
 * @param row <tr><td>..</td></tr>
 * @returns {{}} row as object
 */
var convertRowToObject = function (row) {
    var statusObject = {};
    var cells = $(row).children();
    statusObject.date = $(cells[0]).text();
    statusObject.TODO = getCellTextAsInt(cells[1]);
    statusObject.IN_PROGRESS = getCellTextAsInt(cells[2]);
    statusObject.TO_REVIEW_1 = getCellTextAsInt(cells[3]);
    statusObject.TO_REVIEW_2 = getCellTextAsInt(cells[4]);
    statusObject.DONE = getCellTextAsInt(cells[5]);
    return statusObject;
};

/**
 * converts HTML String values to int
 * @param cell
 * @returns {Number}
 */
var getCellTextAsInt = function (cell) {
    var cellText = ($(cell).text());
    return parseInt(cellText);
};

$(function () {
    var rowObjects = [];
    // use the first html table in the page, yes, hacky.
    $("table:first > tbody > tr").each(function (index, value) {
        rowObjects.push(convertRowToObject(value));
    });

    Morris.Area({
        element: 'diagram-area',
        data: rowObjects,
        xkey: 'date',
        ykeys: ['DONE', 'TO_REVIEW_2', 'TO_REVIEW_1', 'IN_PROGRESS', 'TODO' ],
        labels: ['DONE', 'TO_REVIEW_2', 'TO_REVIEW_1', 'IN_PROGRESS', 'TODO'],
        pointSize: 4,
        hideHover: 'auto'
    });
});

