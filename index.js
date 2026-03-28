const express = require('express')
const app = express()
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// use middleware
app.use(express.json())

// url Reader rotue
app.post('/url' , (req ,res) => {
    const {url} = req.body

    console.log("this is the url => " , url);

    res.status(200).json({succ:true , mess:url});
})


// check Route
app.get('/'  ,(req ,res) => {
    res.send('HEllo jeee')
})


app.listen(PORT , () =>console.log(`server is started at PORT ${PORT}`));