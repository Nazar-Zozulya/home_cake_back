import { PrismaClient } from "../client/client";
import { error, success } from "../tools/result";
import { ProductRepository } from "./product.types";





export const productRepository: ProductRepository = {
    getAllProducts: async () => {
        try {
            const products = await PrismaClient.product.findMany({})

            return success(products)
        } catch (err) {
            return error(`${err}`)
        }
    },
    getProductById: async (id) => {
        try {
            const product = await PrismaClient.product.findUnique({
                where: { id }
            })

            if (!product) {
                return error("Product not found")
            }

            return success(product)
        } catch (err) {
            return error(`${err}`)
        }
    },
    createProduct: async (product) => {
        try {
            const newProduct = await PrismaClient.product.create({
                data: product
            })

            return success(newProduct)
        } catch (err) {
            return error(`${err}`)
        }
    },
}