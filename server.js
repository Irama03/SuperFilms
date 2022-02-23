const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/super-games'));
//app.use(express.static(__dirname));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/super-games/index.html'));
  //res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.listen(process.env.PORT || 8080);
console.log('Server is running on port 8080');
