import * as dotenv from "dotenv"
import { GoogleSpreadsheet } from "google-spreadsheet"
dotenv.config("./.env")

export async function main() {
	const doc = new GoogleSpreadsheet(
		"1QVIOKzeoU0WZ6yxdie8xRbMZulaY2r8Gnfn03Gv_SjI"
	)
	doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY,
	})
	await doc.loadInfo() // loads document properties and worksheets
	console.log(doc.title)
}
