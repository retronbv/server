const express = require('express');
const app = express();
app.use(express.json());
// cors
const cors = require("cors");
app.use(cors());
// database
const jsoning = require('jsoning');
var database = new jsoning("database.json");
// home page
app.get('/', (req, res) => {
  res.sendFile("/home/runner/isOn/pages/index.html")
});
app.get('/auth', (req, res) => {
  res.sendFile("/home/runner/isOn/pages/welcomeauth.html")
});
app.get('/css.css', (req, res) => {
  res.sendFile("/home/runner/isOn/css/tailwind.css")
});
app.get('/send', (req, res) => {
  res.redirect(`https://fluffyscratch.retronbv.repl.co/auth/getKeys/v1/${req.query.name}?redirect=aXNvbmF1dGgud2d5dC50ay9sb2dpbg==`)
});
app.get("/login", (req, res)=>  {
  var response;
  h = fetch(`https://fluffyscratch.hampton.pw/auth/verify/v1/${req.query.username}/${req.query.publicCode}/${req.query.privateCode}/${req.query.redirectLocation}`).then(res => res.text()).then(text => {
		console.log(text)
    if (text===true){
			res.send(req.query.username)
		}else{
			res.redirect('/auth')
		}
  });
});
// api
app.get('/api/status/:user', (req, res) => {
  database.get(req.params.user);
});
app.post('/api/status/:user', (req, res) => {
	auth = false
	if(auth){
		database.set(req.params.user, req.body.data);
	}
});

app.listen(3000);