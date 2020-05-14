import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import { MDXRenderer } from "gatsby-plugin-mdx"

import PostHeader from "../components/post-header"

import "katex/dist/katex.min.css"

export default function BlogPost({ data }) {
  const post = data.mdx
  const { title, tags, date } = post.frontmatter
  const slug = post.fields.slug
  return (
    <Layout>
      <PostHeader date={date} title={title} tags={tags} slug={slug} />
      <div className="border border-red-600 rounded shadow-lg p-6 mt-3">
        <MDXRenderer>{post.body}</MDXRenderer>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
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
