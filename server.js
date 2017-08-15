var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
        title:'Article One | Harikesh',
        heading: 'Article One',
        date: ' 13 Aug,2017',
        content: `<p>One morning, when Gregor Samsa woke from troubled 
        dreams, he found himself transformed in his bed into 
        a horrible vermin. He lay on his armour-like back, 
        and if he lifted his head a little he could see his 
        brown belly, slightly domed and divided by arches into 
        stiff sections. The bedding was hardly able to cover 
        <strong>strong</strong> it and seemed ready to slide 
        off any moment. His many legs, pitifully thin 
        compared with the size of the rest of him, 
        <a class="external ext" href="#">link</a> waved about 
        helplessly as he looked. "What's happened to me? " he 
        thought. It wasn't a dream. His room, a proper human 
        room although a little too small, lay peacefully 
        between its four familiar walls.</p>`
    },
    'article-two': {
        title:'Article Two | Harikesh',
        heading: 'Article Two',
        date: ' 10 Aug,2017',
        content: `<p>This is article two </p>`
    },
    'article-three': {
        title:'Article Three | Harikesh',
        heading: 'Article Three',
        date: ' 11 Aug,2017',
        content: `<p>This is article three </p>`
        
    }
};
function createTemplate(data) {
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var htmlTemplate = `
    <!DOCTYPE html>
<html>
    <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <nav>
                <a href="/">Home</a> |
                <a href="/article-one">Article one</a> |
                <a href="/article-two">Article two</a> |
                <a href="/article-three">Article three</a>
            </nav>
            <hr/>
            <h3>${heading}</h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
        </div>
    <body>
<html>`;
return htmlTemplate;
    
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter',function(req,res) {
   
   counter ++;
   res.send(counter.toString());
});

var names=[];
app.get('/submit-name/',function(req,res) {
   var name = req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});

app.get('/:articleName', function(req,res) {
    //articleName == article-one
    //articles[articleName]=={} content object for article-one
    var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});
/* Replace with lines 79-83
app.get('/article-two', function(req,res) {
    res.sendFile(path.join(__dirname,'ui','article-two.html'));
});

app.get('/article-three', function(req,res) {
    res.sendFile(path.join(__dirname,'ui','article-three.html'));
});
*/
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js',function (req,res) {
   res.sendFile(path.join(__dirname,'ui','main.js')) ;
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
