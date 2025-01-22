import { gql } from "apollo-angular";
import { ProductsResposne } from "../types/responses.type";


export const GET_PRODUCTs_BY_CATEGORY_SLUG = gql<ProductsResposne, string>`
    query Products($slug: String!) {
        products(where: { category: { slug: $slug } }) {
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
