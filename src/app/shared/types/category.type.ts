import { Products } from "./product.type";

export type Category = {
    slug: string;
    name: string;
    products: Products[];
}
