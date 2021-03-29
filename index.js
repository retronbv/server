const express = require('express');
const app = express();
app.use(express.json());
// cors
const cors = require("cors");
app.use(cors());
// env fix
require('dotenv').config()
// database
const monk = require('monk');
const mongoURL = process.env['dburl'];
const db = monk(mongoURL);
const statusdb = db.get('status')
const idsdb = db.get('ids')
db.then(() => {
  console.log('Connected correctly to server')
})
statusdb.createIndex("name", { unique: true });
idsdb.createIndex("name", { unique: true });
// auth
const fetch = require("node-fetch")
const retronid = require("retronid"); // needed for any successful node js project
// home page
app.get('/', (req, res) => {
  res.sendFile("/home/runner/isOn/pages/index.html")
});
// css
app.get('/css.css', (req, res) => {
  res.sendFile("/home/runner/isOn/css/tailwind.css")
});
// auth pages
app.get('/auth', (req, res) => {
  res.sendFile("/home/runner/isOn/pages/welcomeauth.html")
});
app.get('/auth/send', (req, res) => {
  res.redirect(`https://isonauth.wgyt.tk/auth/getKeys/v1/${req.query.name}?redirect=aXNvbi53Z3l0LnRrL2F1dGgvY2FsbGJhY2s`)
});
app.get("/auth/callback", (req, res)=>  {
  var response;
  h = fetch(`https://isonauth.wgyt.tk/auth/verify/v1/${req.query.username}/${req.query.publicCode}/${req.query.privateCode}/${req.query.redirectLocation}`).then(res => res.text()).then(text => {
		console.log(text)
    if (text==='true'){
			retroid = retronid.generate
			res.json({"user":req.query.username,"retronid":retroid})
			// todo push user status of online
			// todo push the retron id
		}else{
			res.redirect('/auth')
		}
  });
});
// api
app.get('/api/status/:user', (req, res) => {
  // todo read data
});
app.post('/api/status/:user', (req, res) => {
	auth = false
	if(auth){
  // todo write data
	}
});

app.listen(3000);