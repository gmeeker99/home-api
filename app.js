import express from "express"
import { main, loadSheet } from "./gsheets.js"

const app = express()
app.set("title", "home-api")
const port = process.env.port || 3000

app.use(generalLog)

app.get("/", (req, res) => {
	res.send("Hello World!")
	console.log(req.reqTime, req.ip)
})

app.get("/sheets", async (req, res) => {
	const gSheet = loadSheet(req.query.sheet)
	main(gSheet)
	res.send("")
})

function generalLog(req, res, next) {
	req.reqTime = Date.now()
	next()
}

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
