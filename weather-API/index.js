const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    
    let filePath = path.join(__dirname, 'src', req.url === '/' ? 'index.html' : req.url);
    
    // Extension of file
    let extname = path.extname(filePath);

    // Initial content type
    let contentType = "text/html";

    // Check ext and set content type
    switch (extname) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }

    //Read File
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Server error
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);        
        }else {
            // Success
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf8");
        }
    });

});

//Port
const PORT = process.env.PORT || 5000;

//Listen Port
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));