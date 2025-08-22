const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

require('./models/db')

require('dotenv').config();

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 1600;


app.use(bodyParser.json());


app.use('/auth', require('./router/authRouter'))
app.use('/party', require('./router/partyRouter'))

app.listen(PORT, ()=>{
    console.log(`server initialized at ${PORT}`);
})
