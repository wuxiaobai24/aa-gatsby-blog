import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

export default ({ imgClassName }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "avatar.jpeg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Img
      className={imgClassName}
      fluid={data.file.childImageSharp.fluid}
      alt="Avater"
    />
  )
}
