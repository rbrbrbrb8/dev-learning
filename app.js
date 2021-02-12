
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// app.all('/vendors/*',(req,res)=>{
//   res.status(403).json({msg: "permission denied"});
// });
// app.all('/scripts/*',(req,res) =>{
//   res.status(403).json({msg: "permission denied"});
// });

app.use(express.static(path.join(__dirname,'static')));




const logger = (req,res,next) =>{
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
}



app.use(logger);



app.get('/signup', (req, res) => {
  res.sendFile('/static/signup.html', { root: __dirname });
});

 app.get('/', (req, res) => {
   res.sendFile('/static/index.html', { root: __dirname });
 });

 const verify = (req,res,next) =>{
  
  next();
}

 app.post('/',verify,(req,res) => {
  
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});