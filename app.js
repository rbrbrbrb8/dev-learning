
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

let isOk = false;

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

// REDIRECT EXAMPLE
// app.get('/redirect', (req, res) => {
//   res.redirect('/signup.html');
// });

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
    isOk=true;
    res.redirect(301,'/welcome');
  };
  
});

app.get('/welcome', (req,res) => {
  console.log(isOk);
  if(isOk)
  {
    console.log("im here");
    res.sendFile('/static/welcome.html', { root: __dirname });
  }
  else
  {
    res.redirect('/');
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});