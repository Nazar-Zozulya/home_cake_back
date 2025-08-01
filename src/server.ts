import express from "express"
import cors from "cors"
import productRouter from "./Products/product.router"
import orderRouter from "./Order/order.router"

const app: express.Express = express()

const HOST = "127.0.0.1"

const PORT = 8000

app.use(express.json())

app.use(cors())

app.use("/api/products", productRouter)
app.use("/api/order", orderRouter)

app.listen(PORT, HOST, () => {
	console.log(`Server running at http://${HOST}:${PORT}`)
})
