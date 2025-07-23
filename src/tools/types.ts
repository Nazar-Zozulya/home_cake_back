// Email Service

import { Product } from "../generated/prisma"
import { Result } from "../types/result"

export interface UserInfo {
	name: string
	surname: string
	phone: number
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
    products: Product[]
	takeProductInfo: CartPickUpProduct | CartDelivaryProduct
}

interface CartPickUpProduct {
	type: "pickup"
}

interface CartDelivaryProduct {
	type: "delivary"
	adress: string
	data: number
	time: number
}

export interface EmailServiceTypes {
	storage: Map<string, SelfOrderInfo | CartOrderInfo>
    sendVerifyfOrderMail: (verification_link: string, user: UserInfo) => Promise<Result<string>>
    // sendCartOrderMail: (verification_link: string, email: string) => Promise<Result<string>>
    SendOrderToOwner: (orderInfo: SelfOrderInfo | CartOrderInfo) => Promise<Result<string>>
    // SendOrderAnswerToClent: (userInfo: UserInfo, status: "success" | "error") => Promise<Result<string>>
}

// Email Service
