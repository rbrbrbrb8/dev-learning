
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
let allUsers = [
  {
    username:"brez",
    password:"brez"
  }
];

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

//init parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

 const verify = (req,res,next) =>{
  let sentUsername = req.body.username;
  let sentPassword = req.body.password;
  let existingUser = allUsers.find(obj => {
    return obj.username === sentUsername});

    
  if(existingUser){
    res.isExistingUser = (existingUser.password === sentPassword);
  };


  next();
}


 app.post('/',verify,(req,res) => {
  if(res.isExistingUser){
    console.log("suuuuuu");
    res.redirect(307,'/signup.html');
  };
  
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});