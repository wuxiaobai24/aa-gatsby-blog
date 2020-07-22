import Layout from "./blog-list"
import { graphql } from "gatsby"
export default Layout

export const query = graphql`
  query CategoryBlogListQuery($skip: Int!, $limit: Int!, $category: String!) {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: {
        fields: { sortCategories: { in: [$category]}, source: { eq: "post" } }
      }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
						tags
						categories
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`
