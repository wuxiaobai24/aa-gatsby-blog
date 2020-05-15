module.exports = {
  siteMetadata: {
    title: `Code & Fun`,
    description: `wuxiaobai24's blog`,
    author: `wuxiaobai24`,
    siteUrl: `https://codeand.fun`,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "post",
        path: `${__dirname}/content/posts`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: "leetcode",
    //     path: `${__dirname}/content/leetcode`,
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Code & Fun`,
        short_name: `codeandfun`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#e53e3e`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ["Short Stack"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          default: require.resolve("./src/components/page-layout.js"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
            },
          },
          // for code highlight
          `gatsby-remark-prismjs`,
          // for latex
          `gatsby-remark-katex`,
          // for copy file
          `gatsby-remark-copy-linked-files`,
          // purcecss
          {
            resolve: `gatsby-plugin-purgecss`,
            options: {
              printRejected: false,
              develop: false,
              tailwind: true,
            },
          },
        ],
      },
    },
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-smoothscroll`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `codeandfun`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMdx (
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {fields: {source: {eq: "post"}}}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "RSS Feed",
          },
        ],
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
