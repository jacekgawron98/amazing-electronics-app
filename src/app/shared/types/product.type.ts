import { Category } from "./category.type";

export type Product = {
    slug: string;
    name: string;
    image: string;
    description: string;
    price: number;
    category: Category
}
