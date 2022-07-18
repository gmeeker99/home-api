import express from "express"
import { main } from './gsheets.js'

const app = express()
const port = 3000

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.get("/sheets", async (req, res) => {
	main()
	res.send("")
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
