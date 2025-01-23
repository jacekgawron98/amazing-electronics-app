import { Product } from "../../../types";

export type ProductResposne = {
    product: Product;
}

export type ProductsResposne = {
    products: Product[];
}

export type TotalProductsResponse = {
    productsConnection: {
        aggregate: Aggregate;
    }
}

type Aggregate = {
    count: number;
}
