const express = require('express');
const app = express();
// cors
const cors = require("cors");
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000);