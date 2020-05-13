/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// create slug ,sort-tag, fields
const { createFilePath } = require("gatsby-source-filesystem")
const limax = require("limax")
const moment = require("moment")
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type == "MarkdownRemark") {
    const baseSlug = createFilePath({
      node,
      getNode,
      basePath: "content/posts",
      trailingSlash: false,
    })
    const postDate = moment(node.frontmatter.date)
    const slug = `/posts/${postDate.format("YYYY/MM/DD")}/${limax(baseSlug, {
      tone: false,
    })}/`
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

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.jsx`)
  const tagTemplate = path.resolve(`./src/templates/tags.jsx`)
  const categoryTemplate = path.resolve("./src/templates/categories.jsx")

  const result = await graphql(`
    query {
      allMarkdownRemark {
        totalCount
        edges {
          node {
            fields {
              slug
            }
          }
        }
        tags: group(field: frontmatter___tags) {
          fieldValue
        }
        categories: group(field: frontmatter___categories) {
          fieldValue
        }
      }
    }
  `)
  // create blog post
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug,
      },
    })
  })
  // create tag archive
  result.data.allMarkdownRemark.tags.forEach(({ fieldValue }) => {
    createPage({
      path: `/tags/${limax(fieldValue, {tone: false})}/`,
      component: tagTemplate,
      context: {
        tag: fieldValue,
      },
    })
  })
  // create category archive
  result.data.allMarkdownRemark.categories.forEach(({ fieldValue }) => {
    createPage({
      path: `/categories/${limax(fieldValue, {tone: false})}/`,
      component: categoryTemplate,
      context: {
        category: fieldValue,
      },
    })
  })
}
