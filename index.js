import express from "express"
import axios from "axios"
import bodyParser from "body-parser";

const myAPI_KEY = "858f9ddb32999b393e7ff5a7"
const API_URL = "https://v6.exchangerate-api.com/v6/858f9ddb32999b393e7ff5a7/latest/USD"
const pairConversion = `https://v6.exchangerate-api.com/v6/${myAPI_KEY}/pair`

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let result
app.get("/", (req,res)=>{
    res.render("index.ejs",{rate:result})
})

app.post("/convert", async (req,res)=>{
    const baseCur = req.body["base"]
    const targetCur = req.body["target"]
    let fullURL = pairConversion+`/${baseCur}`+`/${targetCur}`
    console.log(fullURL)
    try{
        const response = await axios.get(pairConversion+`/${baseCur}`+`/${targetCur}`)
        const result = response.data
        console.log(result)
        res.render("index.ejs",{rate:result})
    }catch(error){
        res.render("index.ejs",{rate:"Something went wrong.."})
    }
})




app.listen(port,(res,req)=>{
    console.log(`Server is running successfully on port ${port}..`)
});