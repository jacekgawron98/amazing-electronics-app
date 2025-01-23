import { gql } from "apollo-angular";
import { ProductsResposne } from "../types/responses.type";

export const GET_PRODUCTS_BY_CATEGORY_SLUG = gql<ProductsResposne, string>`
    query Products($slug: String!, $skip: Int!) {
        products(where: { category: { slug: $slug } }, first: 9, skip: $skip ) {
            id
            slug
            name
            image
            description
            price
            category {
                slug
            }
        }
    }

`
