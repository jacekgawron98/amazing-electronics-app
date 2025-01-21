import { gql } from "apollo-angular";
import { CategoriesResposne } from "../types/responses.types";

export const GET_CATEGORIES = gql<CategoriesResposne, string>`
    query Categories {
        categories {
            stage
            publishedAt
            updatedAt
            createdAt
            id
            slug
            name
        }
    }
`
