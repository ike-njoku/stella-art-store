const express = require('express');
const path = require('path');
const ssl = require('force-ssl-heroku');
const PORT = process.env.PORT;
const app = express();
app.use(ssl);
app.use(express.static(__dirname + '/dist/stella-art-store'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname +
    '/dist/stella-art-store/index.html'));
});

app.listen(PORT, () => console.log(`stella  art store is running on port ${PORT}`));
