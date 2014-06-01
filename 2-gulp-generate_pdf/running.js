/**
 * header and footer might be of format specified in https://github.com/ariya/phantomjs/wiki/API-Reference-WebPage#wiki-webpage-paperSize
 * it seems that it's not possible to use formats from pdf.css here
 *
 */

exports.header = {
    height: "1cm",
    contents: function (pageNum, numPages) {
        return "<div style='font-size:10px;'>Example for a header</div>"
    }
};

exports.footer = {
    height: "1cm",
    contents: function (pageNum, numPages) {
        return "<div style='font-size:10px;'>Example for a footer <span style='float:right'>" + pageNum + " / " + numPages + "</span></div>"
    }
};

