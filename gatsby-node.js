/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// create slug fields
const { createFilePath } = require("gatsby-source-filesystem")
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type == "MarkdownRemark") {
    const baseSlug = createFilePath({ node, getNode, basePath: "posts" })
    const slug = `/posts${baseSlug}`
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

// create post page
const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.jsx`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
