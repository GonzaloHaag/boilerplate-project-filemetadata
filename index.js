var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const multer = require('multer'); // Para procesar formularios multipart/form-data mas facil
const upload = multer();


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// el post del archivo es hacia /api/fileanalyse --> Le paso el name del input del archivo
app.post('/api/fileanalyse',upload.single('upfile'),(req,res) => {
  res.json({
    name:req.file.originalname,
    type:req.file.mimetype,
    size:req.file.size
  })
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
