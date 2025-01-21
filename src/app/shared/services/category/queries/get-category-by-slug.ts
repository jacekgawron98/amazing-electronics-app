import { gql } from "apollo-angular";
import { CategoryResposne } from "../types/responses.types";

export const GET_CATEGORY_BY_SLUG = gql<CategoryResposne, string>`
  query Category($slug: String!) {
    category(where: { slug: $slug }) {
        slug
        name
        id
        products {
            name
            slug
            image
            id
            description
            price
        }
    }
  }
`
