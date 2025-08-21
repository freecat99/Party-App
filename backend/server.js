const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./models/db')

require('dotenv').config();

const PORT = process.env.PORT || 1600;
const app = express();


app.use(bodyParser.json());
app.use(cors());

app.use('/auth', require('./router/authRouter'))
app.use('/party', require('./router/partyRouter'))

app.listen(PORT, ()=>{
    console.log(`server initialized at ${PORT}`);
})
