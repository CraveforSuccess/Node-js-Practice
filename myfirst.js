// 5 January 2023
// Upload the content
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var url = require('url')

http.createServer((req, res) => {
 

 
  if(req.url!='/fileupload') {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename,(err,data)=>{
      if(err){
        res.writeHead(404,{"Content-type":"text/html"});
        return res.end("404 File Not Found")
      }else{
        res.writeHead(200,{'Content-type':'text/html'});
        res.write(data)
        return res.end();
      }
    })
  }
  else {
    if(req.url=='/fileupload'){
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.filepath;
        var newpath = 'C:/Users/karan/' + files.filetoupload.originalFilename;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.write('File uploaded and moved!');
          res.end();
        });
      });
    }
    else{
      window.location.reload()
    }

     
  }
  









}).listen(8080)