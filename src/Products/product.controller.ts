import { ProductController } from "./product.types";
import { productService } from "./products.service";




export const productController: ProductController = {
    getAllProducts: async (req, res) => {
        const result = await productService.getAllProducts()
        res.json(result)
    },
    getProductById: async (req, res) => {
        const { id } = req.params
        const result = await productService.getProductById(+id)
        res.json(result)
    },
    createProduct: async (req, res) => {
        const product = req.body
        const result = await productService.createProduct(product)
        res.json(result)
    }
}