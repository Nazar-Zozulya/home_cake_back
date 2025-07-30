// import { error } from "";
import { OrderService } from "./order.types"
import { EmailService } from "../tools/emailService"
import { sign } from "jsonwebtoken"
import { error } from "../tools/result"
import { productsInCartToProducts } from "../tools/productsInCartToProducts"

export const orderService: OrderService = {
	orderFromSelf: async (user, descriptionOrder) => {
		const token = sign(
			{ email: user.email },
			process.env.SECRET_KEY ?? "secret",
			{ expiresIn: "1h" }
		)

		const verification_link = `${process.env.FRONTEND_SERVER}/${user.email}/${token}/self`

		const newStorage = EmailService.storage.set(token, {
			type: "self",
			userInfo: user,
			describeOrder: descriptionOrder,
		})

		const emailResult = await EmailService.sendVerifyfOrderMail(
			verification_link,
			user
		)

		return emailResult
	},

	orderFromCart: async (user, products, delivaryInfo?) => {
		const token = sign(
			{ email: user.email },
			process.env.SECRET_KEY ?? "secret",
			{ expiresIn: "1h" }
		)

		const verification_link = `${process.env.FRONTEND_SERVER}/${user.email}/${token}/cart`

		const fullProducts = await productsInCartToProducts(products)

		const newStorage = EmailService.storage.set(token, {
			type: "cart",
			userInfo: user,
			products: fullProducts,
			takeProductInfo: delivaryInfo,
		})

		console.log("Storage: ", EmailService.storage.get(token))

		const emailResult = await EmailService.sendVerifyfOrderMail(
			verification_link,
			user
		)

		return emailResult
	},

	verifyOrder: async (token) => {
		const storageData = EmailService.storage.get(token)

		if (!storageData)
			return error("not found storage data or invalid token")

		console.log("storage data: ", storageData)

		const emailResult = await EmailService.SendOrderToOwner(storageData)

		const deletedStorage = EmailService.storage.delete(token)

		return emailResult
	},
}
