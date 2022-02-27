/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// create slug ,sortTags fields
const { createFilePath } = require("gatsby-source-filesystem")
const moment = require("moment")
const limax = require("limax")
const slugFunc = (s) => limax(s, { tone: false });
const tagSlugFunc = (name) => name;

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type == "Mdx") {
    const baseSlug = createFilePath({
      node,
      getNode,
      basePath: "",
      trailingSlash: false,
    })
    const baseSlugArr = baseSlug.split('/')

    const postDate = moment(node.frontmatter.date)
    const slug = `/posts/${postDate.format("YYYY/MM/DD")}/${slugFunc(
      baseSlugArr[baseSlugArr.length - 1]
    )}/`
    // console.log(slug, baseSlug)
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })

    const { tags, categories } = node.frontmatter
    const sortTags = tags.map(tagSlugFunc)
    createNodeField({
      node,
      name: "sortTags",
      value: sortTags,
    })
    const sortCategories = categories.map(tagSlugFunc)
    createNodeField({
      node,
      name: "sortCategories",
      value: sortCategories,
    })
    const fileNode = getNode(node.parent)
    createNodeField({
      node,
      name: "source",
      value: fileNode.sourceInstanceName,
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
  const categoryTemplate = path.resolve(`./src/templates/category-blog-list.js`)

  const result = await graphql(`
    query {
      allMdx(filter: { fields: { source: { eq: "post" } } }) {
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
        categories: group(field: fields___sortCategories) {
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
  const { tags, categories } = result.data.allMdx

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
      pathPrefix: `/tag/${fieldValue}`,
      context: {
        tag: fieldValue,
      },
    })
  })

  categories.forEach(({ fieldValue, edges }) => {
    paginate({
      createPage: createPage,
      component: categoryTemplate,
      items: edges,
      itemsPerPage: postPerPage,
      pathPrefix: `/category/${fieldValue}`,
      context: {
        category: fieldValue,
      },
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

// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     // https://dev.to/arisa_dev/gatsby-storyblok-can-t-resolve-fs-in-x-4f4m
//     // node: {
//     //   fs: "empty",
//     // },
//     // https://github.com/webpack/webpack/issues/11600
//     resolve: {
//       fallback: { "path": require.resolve("path-browserify") }
//     }
//   })
// }