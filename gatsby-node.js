/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// create slug ,sortTags fields
const { createFilePath } = require("gatsby-source-filesystem")
const limax = require("limax")
const moment = require("moment")
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  const slugFunc = slug => limax(slug, { tone: false })
  if (node.internal.type == "Mdx") {
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

    const { tags } = node.frontmatter
    const sortTags = tags.map(slugFunc)
    createNodeField({
      node,
      name: "sortTags",
      value: sortTags,
    })

  }
}

// create post page
const path = require("path")
const { paginate } = require("gatsby-awesome-pagination")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.jsx`)
  const blogListTemplate = path.resolve("./src/templates/blog-list.js")
  const tagTemplate = path.resolve(`./src/templates/tag-blog-list.js`)

  const result = await graphql(`
    query {
      allMdx {
        totalCount
        edges {
          node {
            fields {
              slug
            }
          }
        }
        tags: group(field: fields___sortTags) {
          fieldValue
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `)
  const posts = result.data.allMdx.edges
  const { tags } = result.data.allMdx

  const postPerPage = 6

  // create blog post
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug,
      },
    })
  })
  // create tag archive
  tags.forEach(({ fieldValue, edges }) => {
    paginate({
      createPage: createPage,
      component: tagTemplate,
      items: edges,
      itemsPerPage: postPerPage,
      pathPrefix: `/tags/${fieldValue}`,
      context: {
        tag: fieldValue,
      }
    })
  })

  // create archive list
  paginate({
    createPage: createPage,
    component: blogListTemplate,
    items: posts,
    itemsPerPage: postPerPage,
    pathPrefix: `/archive`,
  })
}
