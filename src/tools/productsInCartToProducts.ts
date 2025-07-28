import { Product } from "../generated/prisma";
import { productRepository } from "../Products/product.repository";
import { ProductInCart, ProductWithCount } from "../Products/product.types";





export async function productsInCartToProducts(data: ProductInCart[]): Promise<ProductWithCount[]> {
    const products = await productRepository.getAllProducts()

    if (products.status === "error") throw new Error("Продукти не знайденні")

    return data
		.map((item) => {
			const product = products.data.find((p) => p.id === item.id);
			if (!product) return null;
			return {
				...product,
				count: item.count,
			};
		})
		.filter(Boolean) as (Product & { count: number })[];
}