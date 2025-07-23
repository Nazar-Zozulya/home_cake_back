import { orderService } from "./order.service";
import { OrderController } from "./order.types";


export const orderController: OrderController = {
    orderFromSelf: async (req, res) => {
        const { user, descriptionOrder } = req.body
        const result = await orderService.orderFromSelf(user, descriptionOrder)

        res.json(result)
    },

    orderFromCart: async (req, res) => {
        const { user, products, delivaryInfo } = req.body
        const result = await orderService.orderFromCart(user, products. delivaryInfo)

        res.json(result)
    },

    verifyOrder: async (req, res) => {
        const token = req.params.token
        const result = await orderService.verifyOrder(token)

        res.json(result)
    }
}