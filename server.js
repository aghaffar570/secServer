const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8081;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, nex) => {
  res.json('inside docker');
});

app.post('/secApp', (req, res, next) => {
  console.log(req.body);
  exec(`node test "${req.body.code}"`, (error, stdout, stderr) => {
    if (error) console.log(error);
    console.log('RESULT FROM DOCKER: ', stdout);
  });
  res.json('leave now!');
});

app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`);
});
