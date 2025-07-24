
import { Product } from "../generated/prisma";
import { ProductInCart } from "../Products/product.types";
import { CartDelivaryProduct, UserInfo } from "../tools/types";
import { Result } from "../types/result";
import { Request, Response } from "express"

interface DeliveryInfo {
    adress: string
	data: string
	time: string
}


export interface OrderService {
    orderFromSelf: (user: UserInfo, descriptionOrder: string) => Promise<Result<string>>
    orderFromCart: (user: UserInfo, products: ProductInCart[], deliveryInfo?: DeliveryInfo | undefined) => Promise<Result<string>>
    verifyOrder: (token: string) => Promise<Result<string>>
}

export interface OrderController {
    orderFromSelf: (req: Request, res: Response) => void
    orderFromCart: (req: Request, res: Response) => void
    verifyOrder: (req: Request, res: Response) => void
}