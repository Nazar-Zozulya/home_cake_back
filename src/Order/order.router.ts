import { Router } from "express"
import { orderController } from "./order.controller"
import { validateMiddleware } from "../middlewares/validateMiddleware"
import { OrderValidation } from "./order.validate"

const router = Router()

router.post(
	"/self",
	validateMiddleware(OrderValidation.selfOrder),
	orderController.orderFromSelf
)
router.post(
	"/cart",
	validateMiddleware(OrderValidation.cartOrder),
	orderController.orderFromCart
)
router.get("/:email/:token", orderController.verifyOrder)

export default router
