import express from "express"
// import { main, loadSheet } from "./routes/google-sheet.js"
import { router as googleSheets } from "./routes/google-sheet.js"

const app = express()
app.set("title", "home-api")
const port = process.env.port || 3000

app.use(generalLog)

app.get("/", (req, res) => {
	res.send("Hello World!")
	console.log(req.reqTime, req.ip)
})

app.use("/sheets", googleSheets)

function generalLog(req, res, next) {
	req.reqTime = Date.now()
	next()
}

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
