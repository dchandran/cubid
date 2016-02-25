const express = require('express');
const path = require('path');
const app = express();

const hostname = '0.0.0.0';
const port = 3000;

app.use(express.static('static'));

//so that any routing is delegated to the client
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, hostname, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Building, will serve at http://' + hostname + ':' + port);
});
