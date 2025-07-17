import { productRepository } from "./product.repository";
import { ProductService } from "./product.types";





export const productService: ProductService = {
    getAllProducts: async () => {
        return await productRepository.getAllProducts()
    },
    getProductById:  async (id) => {
        return await productRepository.getProductById(id)
    },
    createProduct: async (product) => {
        return await productRepository.createProduct(product)
    }
}