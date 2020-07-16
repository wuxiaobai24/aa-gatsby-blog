import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"

import PostHeader from "../components/post-header"
import Comment from "../components/comment"

import "katex/dist/katex.min.css"

export default function BlogPost({ data }) {
  const post = data.mdx
  const { title, tags, date, excerpt } = post.frontmatter
  const slug = post.fields.slug
  const url = data.site.siteMetadata.siteUrl + slug

  return (
    <Layout>
      <SEO title={title} description={excerpt} />
      <div className="container">
        <PostHeader className="box" date={date} title={title} tags={tags} slug={slug} />
        <div className="box">
          <div className="content">
            <MDXRenderer>{post.body}</MDXRenderer>
          </div>
        </div>
        <Comment className="container" url={url} title={title} identifier={slug} />
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
