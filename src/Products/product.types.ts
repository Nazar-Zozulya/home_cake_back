import { Prisma } from "../generated/prisma"
import { Result } from "../types/result"
import { Request, Response } from "express"

export type Product = Prisma.ProductGetPayload<{}>

export type ProductInCart = {
	id: number
	count: number
}

export interface ProductRepository {
	getAllProducts: () => Promise<Result<Product[]>>
	createProduct: (product: Product) => Promise<Result<Product>>
	getProductById: (id: number) => Promise<Result<Product>>
}

export interface ProductService {
	getAllProducts: () => Promise<Result<Product[]>>
	createProduct: (product: Product) => Promise<Result<Product>>
	getProductById: (id: number) => Promise<Result<Product>>
}

export interface ProductController {
	getAllProducts: (req: Request, res: Response) => Promise<void>
	createProduct: (req: Request, res: Response) => Promise<void>
	getProductById: (req: Request, res: Response) => Promise<void>
}
