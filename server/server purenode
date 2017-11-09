const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const words = [];

const handler = function (req, res) {

    if (req.url.indexOf("/storenote") === 0) {
        console.log("readFile");
        res.writeHead(200, {'Content-Type': 'text/plain'});
        let queryObject = url.parse(req.url, true).query;
        let note = queryObject["note"];
        words.push(note);
        res.end("you said: " + note);
    }

    else if(req.url=== "/getallnotes"){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({data: words}));
    }
    else
    {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end("not found");
    }

}

const server = http.createServer(handler);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

