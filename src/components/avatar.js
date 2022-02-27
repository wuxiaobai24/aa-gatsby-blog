import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import {GatsbyImage} from "gatsby-plugin-image"

export default ({ imgClassName }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "avatar.jpeg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `)

  return (
    <GatsbyImage
      className={imgClassName}
      image={data.file.childImageSharp.gatsbyImageData}
      alt="Avater"
    />
  )
}
