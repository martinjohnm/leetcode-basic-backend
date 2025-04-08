

import express from "express"
import { createClient } from "redis"


const app = express()
app.use(express.json())
const client = createClient()


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