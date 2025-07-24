// Email Service

import { Product } from "../generated/prisma"
import { ProductInCart } from "../Products/product.types"
import { Result } from "../types/result"

export interface UserInfo {
	name: string
	surname: string
	phone: string
	email: string
}

interface SelfOrderInfo {
	type: "self"
	userInfo: UserInfo
	describeOrder: string
}

interface CartOrderInfo {
	type: "cart"
	userInfo: UserInfo
	products: ProductInCart[]
	takeProductInfo?: CartDelivaryProduct
}

interface CartOrderInfoToOwner extends Omit<CartOrderInfo, "products"> {
	products: (Product & { count: number })[]
}
// export interface CartPickUpProduct {
// type: "pickup"
// }

export interface CartDelivaryProduct {
	// type: "delivary"
	adress: string
	data: string
	time: string
}

export interface EmailServiceTypes {
	storage: Map<string, SelfOrderInfo | CartOrderInfo>
	sendVerifyfOrderMail: (
		verification_link: string,
		user: UserInfo
	) => Promise<Result<string>>
	// sendCartOrderMail: (verification_link: string, email: string) => Promise<Result<string>>
	SendOrderToOwner: (
		orderInfo: SelfOrderInfo | CartOrderInfoToOwner
	) => Promise<Result<string>>
	// SendOrderAnswerToClent: (userInfo: UserInfo, status: "success" | "error") => Promise<Result<string>>
}

// Email Service
