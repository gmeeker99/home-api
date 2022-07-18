import * as dotenv from "dotenv"
import { GoogleSpreadsheet } from "google-spreadsheet"
import { format } from "date-fns"
dotenv.config("./.env")

export async function main(gSheet) {
	await gSheet.loadInfo()
	// console.log(format(Date.now(), "yyyy-MM-dd HH:mm:ss"))
	const habit1 = gSheet.sheetsByIndex[0]
	const a = await habit1.getRows()
	await habit1.addRow(["Hello2"])
}

export function loadSheet(sheet) {
	const doc = new GoogleSpreadsheet(
		"1QVIOKzeoU0WZ6yxdie8xRbMZulaY2r8Gnfn03Gv_SjI"
	)
	doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY,
	})
	return doc
}
