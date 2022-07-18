import * as dotenv from "dotenv"
import { GoogleSpreadsheet } from "google-spreadsheet"
dotenv.config("./.env")

const doc = new GoogleSpreadsheet(
	"1QVIOKzeoU0WZ6yxdie8xRbMZulaY2r8Gnfn03Gv_SjI"
)
doc.useServiceAccountAuth({
	client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
	private_key: process.env.GOOGLE_PRIVATE_KEY,
})
await doc.loadInfo() // loads document properties and worksheets

export async function main() {
	const habit1 = doc.sheetsByIndex[0]
	habit1.setHeaderRow(["Timestamp", "Boolean"], 1)
	const a = await habit1.getRows()
	console.log(a)
	const date = Date.now()
	habit1.addRow([date.toString(), "test"])

}
