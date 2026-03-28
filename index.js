const express = require('express')
const app = express()
require('dotenv').config();
const axios = require('axios')
const cheerio = require('cheerio')

const PORT = process.env.PORT || 3000;

// use middleware
app.use(express.json())

// url Reader rotue
app.post('/url', async (req, res) => {
    try {
        const { url } = req.body

        if(!url)
        {
           return res.status(402).json({succ:false , mess:"URL is not present"})
        }

        // to fetch website
        const {data} = await axios.get(url);

        // console.log(data) // to see the all data of the website
        // load the html
        const htmlRead = cheerio.load(data)

        // Step 3: Extract important info
        const title = htmlRead("title").text();
        const description = htmlRead("meta[name='description']").attr("content");

        // console.log("this is the url => ", url);

        return res.status(200).json({ succ: true, title:title ,description:description });

    } catch (error) {
        return res.status(500).json({succ:false , mess:error.message})
    }

})


// check Route
app.get('/', (req, res) => {
    res.send('HEllo jeee')
})


app.listen(PORT, () => console.log(`server is started at PORT ${PORT}`));