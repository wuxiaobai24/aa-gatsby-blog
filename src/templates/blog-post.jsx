import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"

import PostHeader from "../components/post-header"

import { Disqus } from "gatsby-plugin-disqus"

import "katex/dist/katex.min.css"

export default function BlogPost({ data }) {
  const post = data.mdx
  const { title, tags, date, excerpt} = post.frontmatter
  const slug = post.fields.slug
  const url = data.site.siteMetadata.siteUrl + slug
  const disqusConfig = {
    url,
    title,
    identifier: slug,
  }

  const [loadDisqus, setLoadDisqus] = React.useState(false)

  return (
    <Layout>
      <SEO title={title} description={excerpt} />
      <PostHeader date={date} title={title} tags={tags} slug={slug} />
      <div className="border border-red-600 rounded shadow-lg p-6 mt-3">
        <MDXRenderer>{post.body}</MDXRenderer>
      </div>
      <div className="border border-red-600 rounded shadow-lg p-6 mt-3">
        {loadDisqus ? (
          <Disqus config={disqusConfig} />
        ) : (
          <button
            className="block border border-red-600 roudned shadow-lg p-2 w-full h-full hover:bg-yellow-200"
            onClick={() => setLoadDisqus(true)}
          >
            Load Disqus Comment
          </button>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 100)
      frontmatter {
        title
        tags
        date
      }
      fields {
        slug
      }
    }
  }
`
