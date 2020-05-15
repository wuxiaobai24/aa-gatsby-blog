import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

export default () => {
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

	return <Img 
		className="w-20 h-20 lg:w-32 lg:h-32  rounded-full mx-auto"
	fluid={data.file.childImageSharp.fluid} alt="Avater" />
}
