/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// create slug ,sortTags and sortCategories fields
const { createFilePath } = require("gatsby-source-filesystem")
const limax = require("limax")
const moment = require("moment")
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  const slugFunc = slug => limax(slug, { tone: false })
  if (node.internal.type == "MarkdownRemark") {
    const baseSlug = createFilePath({
      node,
      getNode,
      basePath: "content/posts",
      trailingSlash: false,
    })
    const postDate = moment(node.frontmatter.date)
    const slug = `/posts/${postDate.format("YYYY/MM/DD")}/${slugFunc(
      baseSlug
    )}/`
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })

    const { tags, categories } = node.frontmatter
    const sortTags = tags.map(slugFunc)
    const sortCategories = categories.map(slugFunc)
    createNodeField({
      node,
      name: "sortTags",
      value: sortTags,
    })
    createNodeField({
      node,
      name: "sortCategories",
      value: sortCategories,
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
        tags: group(field: fields___sortCategories) {
          fieldValue
        }
        categories: group(field: fields___sortCategories) {
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
      path: `/tags/${fieldValue}/`,
      component: tagTemplate,
      context: {
        tag: fieldValue,
      },
    })
  })
  // create category archive
  result.data.allMarkdownRemark.categories.forEach(({ fieldValue }) => {
    createPage({
      path: `/categories/${fieldValue}/`,
      component: categoryTemplate,
      context: {
        category: fieldValue,
      },
    })
  })
}
