const express = require('express');
const path = require('path');
const app = new express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/index.html'));
});

app.listen(5000);
