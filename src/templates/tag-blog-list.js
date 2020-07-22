import Layout from "./blog-list"
import { graphql } from "gatsby"
export default Layout

export const query = graphql`
  query TagBlogListQuery($skip: Int!, $limit: Int!, $tag: String!) {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { fields: { sortTags: { in: [$tag] }, source: { eq: "post" } } }
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
            categories
            tags
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`
