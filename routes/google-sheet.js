import * as dotenv from "dotenv"
import { GoogleSpreadsheet } from "google-spreadsheet"
import { format } from "date-fns"
import express from "express"

dotenv.config("../.env")

const router = express.Router()

router.route("/").get((req, res) => {
	res.send("Hello from google sheets")
})

router.route("/track").get(async (req, res) => {
	const doc = initSheet()
	await doc.loadInfo()

	const pushUpSheet = doc.sheetsById[0]
	// await pushUpSheet.getRows()
	await pushUpSheet.addRow([getTimestamp(), req.query.count])
	res.send("hello from /track")
})

function getTimestamp() {
	return format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss")
}

function initSheet(sheetID) {
	sheetID = sheetID || process.env.DEFAULT_SHEET_ID
	const doc = new GoogleSpreadsheet(sheetID)
	doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY,
	})
	return doc
}

export { router }
