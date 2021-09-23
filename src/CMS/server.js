var http = require('http');
var fs = require('fs');
var qs = require('querystring');
const multer = require('multer');
//var mime = require('mime-types');
function updateimages(){
    const fileName = "./src/CMS/images.js";
    fs.readFile(fileName, "utf-8", (err, data) => {
        if (err) console.log(err);

        fs.readdir("./public/img/microlite", function (err, files) {
            //handling error
            if (err) {
                 console.log('Unable to scan directory: ' + err);
            }

            var images = [];
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                images.push("/img/microlite/" + file);
            });

            let d = data.split("//--")
            d[1] = "//--\r\nreturn " + JSON.stringify(images) + "\r\n//--";

            let datatowrite = '';
            d.forEach( i => {
                datatowrite += i.replaceAll("\",\"", "\",\r\n\"");
            })

            fs.writeFile(fileName, datatowrite, (err) => {
                if (err){
                    console.log("Cannot write file")
                } else {
                    console.log("Images updated")
                }
            });
        });
    });
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../public/img/microlite')
    },
    filename: function (req,file,cb) {
        cb(null, `${file.originalname}`);
    }
})


updateimages();

http.createServer(function (req, res) {
    let body = '';
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(req.method === "POST"){
        if(req.headers['content-type'].indexOf('multipart/form-data') !== -1) {
            var upload = multer({storage:storage}).single('image');

            req.on('end', () => {
                res.writeHead(200, {"Content-Type": "application/json"});
            });

            upload(req, res, function (err) {
                if (err) {
                    console.log("Cannot process image");
                    res.end(JSON.stringify({"success": false}));
                } else {
                    res.end(JSON.stringify({"success": true}));
                    updateimages();
                }
            });
        } else {
            req.on('data', chunk => {
                body += chunk;
            });
            req.on('end', () => {
                body = qs.parse(body);
                let json = {};
                json.area = '';
                json.page = '';
                try {
                    json = JSON.parse(body.data);
                } catch (e) {
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({"success": false}));
                    console.log("Cannot parse JSON");
                    return;
                }

                let area = json.area;
                let page = json.page;
                delete json.area;
                delete json.page;

                if (area == 'data' && page !== '') {
                    const fileName = "./src/CMS/data/" + page + ".js";
                    fs.readFile(fileName, "utf-8", (err, data) => {
                        if (err) console.log(err);

                        let d = data.split("//--")
                        d[1] = "//--\r\n" + JSON.stringify(json.data) + "\r\n//--";

                        let datatowrite = '';
                        d.forEach(i => {
                            datatowrite += i.replace(/","/g, "\",\r\n\"");
                        })
                        fs.writeFile(fileName, datatowrite, (err) => {
                            if (err) {
                                res.writeHead(200, {"Content-Type": "application/json"});
                                res.end(JSON.stringify({"success": false}));
                            } else {
                                res.writeHead(200, {"Content-Type": "application/json"});
                                res.end(JSON.stringify({"success": true}));
                            }
                        });
                    });
                }

                if (area == 'config' && page == '') {
                    const fileName = "./src/CMS/config.js";

                    fs.readFile(fileName, "utf-8", (err, data) => {
                        if (err) console.log(err);

                        let d = data.split("//--")
                        d[1] = "//--\r\nreturn" + JSON.stringify(json) + "\r\n//--";

                        let datatowrite = '';
                        d.forEach(i => {
                            datatowrite += i.replaceAll("\",\"", "\",\r\n\"");
                        })
                        fs.writeFile(fileName, datatowrite, (err) => {
                            if (err) {
                                res.writeHead(200, {"Content-Type": "application/json"});
                                res.end(JSON.stringify({"success": false}));
                            } else {
                                res.writeHead(200, {"Content-Type": "application/json"});
                                res.end(JSON.stringify({"success": true}));
                            }
                        });
                    });
                }
                if (area == 'message' && page == '') {
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({"success": true}));
                }
                if (area == 'sitepages' && page == '') {
                    const fileName = "./src/components/themes/" + json.theme + "/data/sitepages.js";

                    delete json.theme;

                    json.data.forEach((p,i) => {
                       if(p.datapage === "newpage"){
                           p.datapage = "page" + i;
                           var newdata = 'export default\n' +
                               '//--\n' +
                               '{"locale":{"en":{"menu":"New Page",\n' +
                               '"col1":"<p>This is some text</p>"}},"rows":[{"name":"",\n' +
                               '"classes":"",\n' +
                               '"cols":[{"content":"col1"}]}]}\n' +
                               '//--';
                           fs.writeFile("./src/CMS/data/page" + i + ".js", newdata, (err) => {
                              if(err){
                                  console.log(err);
                              }
                           });
                       }
                    });

                    fs.readFile(fileName, "utf-8", (err, data) => {
                        if (err) console.log(err);

                        let d = data.split("//--")
                        d[1] = "//--\r\nreturn" + JSON.stringify(json.data) + "\r\n//--";

                        let datatowrite = '';
                        d.forEach(i => {
                            datatowrite += i.replaceAll("\",\"", "\",\r\n\"");
                        })

                        fs.writeFile(fileName, datatowrite, (err) => {
                            if (err) {
                                res.writeHead(200, {"Content-Type": "application/json"});
                                res.end(JSON.stringify({"success": false}));
                            } else {
                                res.writeHead(200, {"Content-Type": "application/json"});
                                res.end(JSON.stringify({"success": true}));
                            }
                        });
                    });
                }
            })
        }
    }
}).listen(9002);

console.log("Server port: 9002")
console.log("Ready to manage cms to update files")