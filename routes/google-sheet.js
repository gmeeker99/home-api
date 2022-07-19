import * as dotenv from "dotenv"
import { GoogleSpreadsheet } from "google-spreadsheet"
import { format } from "date-fns"
import express, { response } from "express"

dotenv.config("../.env")

const router = express.Router()

router.route("/").get((req, res) => {
	res.send("Hello from google sheets")
})

router.route("/track").get((req, res) => {
	let doc = initSheet()
	doc.loadInfo()
		.then(() => {
			const pushUpSheet = doc.sheetsById[0]
			pushUpSheet.addRow([getTimestamp(), req.query.count])
			res.send("")
		})
		.catch(err => {
			res.send({ error: err.message })
		})
})

function getTimestamp() {
	return format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss")
}

function initSheet(sheetID) {
	sheetID = process.env.DEFAULT_SHEET_ID
	const doc = new GoogleSpreadsheet(sheetID)
	doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY,
	})
	return doc
}

export { router }
