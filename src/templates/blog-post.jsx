import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import { MDXRenderer } from "gatsby-plugin-mdx"

import "katex/dist/katex.min.css"

export default function BlogPost({ data }) {
  const post = data.mdx
  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>
      {/* <div dangerouslySetInnerHTML={{ __html: post.html }}></div> */}
			<MDXRenderer>{post.body}</MDXRenderer>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
      }
    }
  }
`
