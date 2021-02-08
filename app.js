const express = require('express');
const app = express();
const path = require('path');
const port = 3000;


const logger = (req,res,next) =>{
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
}

app.use(logger);

app.use(express.static(path.join(__dirname,'static')));

// app.get('/', (req, res) => {
//   res.sendFile('C:/Users/rbrbr/Documents/js/angular_with_express/index.html');
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});