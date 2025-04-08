

import express from "express"
import { createClient } from "redis"


const app = express()
app.use(express.json())
const client = createClient()

app.post("/submit", async (req, res) => {
    const {problemId, userId, code, language} = req.body;
    try {
        await client.lPush("submissions", JSON.stringify({
            problemId,
            userId, 
            code, 
            language
        }))
        // store in db
        res.status(200).json({
            message : "submission received!"
        })
    } catch(e) {
        console.error("redis error", e);
        res.status(500).send("Failed to store submission")
    }
   
})

async function startServer() {
    try {
        await client.connect()
        console.log("conncected to redis");

        app.listen(3000, () => {
            console.log("server is running on 3000");
            
        })
        
    } catch(e) {
        console.error("failed to connct to redis", e);
        
    }
}

startServer()