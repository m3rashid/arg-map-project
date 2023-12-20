require("dotenv").config()
const axios = require("axios")
const cors = require("cors")
const express = require("express")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({ origin: "http://localhost:3000", credentials: true }))

const url = process.env.API_URL
if (!url) throw new Error("API_URL is not defined")

app.get("/data", async (req, res) => {
	try {
		const resp = await axios(url)
		return res.json(resp.data)
	} catch (err) {
		return res.json([])
	}
})

app.listen(4000, () => {
	console.log("Server is running on port 4000")
})
