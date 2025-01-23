import { gql } from "apollo-angular";
import { TotalProductsResponse } from "../types/responses.type";

export const GET_TOTAL_PRODUCTS_BY_CATEGORY_SLUG = gql<TotalProductsResponse, string>`
    query ProductsConnection($slug: String!) {
        productsConnection(where: { category: { slug: $slug } }) {
            aggregate {
                count
            }
        }
    }

`
