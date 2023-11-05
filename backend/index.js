const connectTomongo  = require('./db');
var cors = require('cors')
var express = require('express')
connectTomongo();
const app = express()
const port = 5000


app.use(cors())
app.use(express.json());
// Routes are here
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})