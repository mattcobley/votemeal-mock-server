const express = require('express');  
const app = express();
const port = 3000;

var path = require('path'),
    fs = require('fs');
    bodyParser = require('body-parser');
    multer = require('multer');

app.get('/', (request, response) => {  
  response.send('Hello from Express!');
});

app.post('/login', (request, response) => {
    response.send({
        id: 1983
    });
});

var upload = multer({
  dest: path.join(__dirname, '../upload/temp')
});

app.post('/upload', upload.single('image'), function (req, res) {
    var tempPath = req.file.path,
        targetPath = path.resolve('./uploads/image.png');

    fs.rename(tempPath, targetPath, function(err) {
        if (err) throw err;
        console.log("Upload completed!");
    });
    
    res.send({
      id: 1985
    });
});

app.get('/image.png', function (req, res) {
    res.sendfile(path.resolve('./uploads/image.png'));
}); 

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});