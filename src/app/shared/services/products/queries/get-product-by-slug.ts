import { gql } from "apollo-angular";
import { ProductResposne } from "../types/responses.type";


export const GET_PRODUCT_BY_SLUG = gql<ProductResposne, string>`
    query Product($slug: String!) {
        product(where: { slug: $slug }) {
            id
            slug
            name
            image
            description
            price
            category {
                slug
                name
            }
        }
    }
`
