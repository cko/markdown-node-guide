# markdown & node guide

### Markdown isn't Markdown
As markdown is (intentionally) a very limited language (http://daringfireball.net/projects/markdown/syntax), people have written multiple extensions to it - they are supported by tools to a different extend. 

[GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown)(GFM) adds a few features which are useful in the context of GitHub - like tables, automatic URL linking and syntax highlighting. Other than the original Markdown, GFM doesn't ignore linebreaks.  
[Multimarkdown](http://fletcherpenney.net/multimarkdown/)(MMD) focuses on longer texts and add things like footnotes, tables, cross-references and meta-information.  
[Pandoc Markdown](#pandoc) is the dialect from Pandoc which is probably the most powerful tool for handling markdown atm.

## Writing your own scripts

### Examples

see [README_examples.md](README_examples.md)

### Converting markdown to other formats

#### html
* via native JavaScript: see [marked](#marked), [markdownjs](#markdownjs)
* via pandoc: see [pandoc](#pandoc)

#### pdf
* via html: usually makes styling via css possible, see [phantomjs](#phantomjs) and [wkhtmltopdf](#wkhtmltopdf)
* via Latex/pandoc: see [pandoc](#pandoc)
* via native JavaScript: [pdfkit](#pdfkit)
* via LibreOffice' [unoconv](#unoconv) tool

#### epub, mobi
* epub via pandoc: see [pandoc](#pandoc)

#### rtf, odt, docx
* via pandoc: see [pandoc](#pandoc)

### Converting other formats to markdown
* from html: [html-md](https://www.npmjs.org/package/html-md), [to-markdown](https://www.npmjs.org/package/to-markdown)
* from a lot of formats: [pandoc](#pandoc)

### Other things you might want to do
* generating a TOC: [grunt-toc](https://www.npmjs.org/package/grunt-toc), [marked-toc](https://www.npmjs.org/package/marked-toc), [markdown-index](https://www.npmjs.org/package/markdown-index)
* Collecting TODO comments: [todoer](https://www.npmjs.org/package/todoer)


### Pure JavaScript Libraries

<a name="marked"></a>
#### marked
* converts markdown to html
* provides markdown lexer and parser
* npm package: https://www.npmjs.org/package/marked
* supports markdown and GFM
* npm packages based on
    * [grunt-markdown](https://www.npmjs.org/package/grunt-markdown)
    * [gulp-markdown](https://www.npmjs.org/package/gulp-markdown)
    * [grunt-marked](https://www.npmjs.org/package/grunt-marked)


<a name="markdownjs"></a>
#### markdownjs 
* converts markdown to html
* npm package: https://www.npmjs.org/package/markdown


<a name="pdfkit"></a>
#### pdfkit
* native JavaScript library for PDF creation
* npm package: https://www.npmjs.org/package/pdfkit
* no ready-to-use libraries for markdown processing (yet) available
* CoffeeScript example: https://github.com/devongovett/pdfkit/blob/master/docs/generate.coffee
* User Guide: http://pdfkit.org/docs/guide.pdf


### Tools & Wrappers

<a name="phantomjs"></a>
#### phantom.js
* wrapper for PhantomJS, headless webkit with JS API.
* can convert html to pdf
* npm package: https://www.npmjs.org/package/phantomjs
* npm packages based on
    * [markdown-pdf](https://www.npmjs.org/package/markdown-pdf): converts markdown to pdf
        * supports: styling via CSS, header and footer, page numbers
        * doesn't support templates
        * error messages hard to understand, configuration somewhat cumbersome, uses marked and supports GFM
    * [gulp-markdown-pdf](https://www.npmjs.org/package/gulp-markdown-pdf): based on markdown-pdf
    * [grunt-markdown-pdf](https://www.npmjs.org/package/grunt-markdown-pdf): based on markdown-pdf

<a name="pandoc"></a>
#### Pandoc
* converts Markdown from and to other formats e.g. odt, pdf, docbook, epub
* Tool website: http://johnmacfarlane.net/pandoc/
* good overview: http://wiki.ubuntuusers.de/Pandoc
* supports most of GFM and MMD, adds it's own markdown extensions, e.g. \ for linebreaks or \pagebreak for pagebreaks
* comparison between pandoc extensions and MMD: https://github.com/jgm/pandoc/wiki/Pandoc-vs-Multimarkdown
* requires Haskell and for PDF also Latex
* templating support
* supports Tex math expressions
* supports creation of reveal.js slides
* npm packages
    * [pdc](https://www.npmjs.org/package/pdc)
        * [gulp-pandoc](https://www.npmjs.org/package/gulp-pandoc)
    * [grunt-panda](https://www.npmjs.org/package/grunt-panda)

<a name="unoconf"></a>
#### unoconv 
* can convert documents from and to formats supported by LibreOffice
* Tool website: http://dag.wiee.rs/home-made/unoconv/
* good overview: http://wiki.ubuntuusers.de/unoconv
* npm package: https://www.npmjs.org/package/unoconv

<a name="wkhtmltopdf"></a>
#### wkhtmltopdf
* can convert documents from HTML to PDF and PS using Webkit
* Tool website: [wkhtmltopdf](http://wkhtmltopdf.org) 
* npm package: https://www.npmjs.org/package/wkhtmltopdf

<a name="md-book"></a>
#### md-book
* contains a grunt task which wraps kindlegen for producing mobi-Files for Kindles
* Tool website: [kindlegen](http://www.amazon.com/gp/feature.html?docId=1000765211)
* npm package: https://www.npmjs.org/package/md-book


## Ready-to-use projects

### Documentation
* [gitbook](http://www.gitbook.io)
* [ditto](http://chutsu.github.io/ditto)
* [docco](http://jashkenas.github.io/docco)

### static Website Generators
* [Wintersmith](http://wintersmith.io)
* [Metalsmith](https://github.com/segmentio/metalsmith)
* [Punch](https://github.com/laktek/punch)
* [DocPad](http://docpad.org)
* [harp](https://github.com/sintaxi/harp)

### Blog Engines
* [Poet](http://jsantell.github.io/poet)
* [ghost](https://ghost.org)
* [hexo](http://hexo.io)
* [purelog](https://www.npmjs.org/package/purelog)

### Flat-File CMS
* [techy](http://krasimir.github.io/techy)

### Non-Flat-File CMS
* [keystone](https://www.npmjs.org/package/keystone)

