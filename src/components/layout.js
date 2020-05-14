/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import Img from "gatsby-image"
// import { useStaticQuery, graphql, Link } from "gatsby"
import "../style/style.css"

import NavBar from "./nav"

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     fileName: file(relativePath: { eq: "avatar.jpeg" }) {
  //       childImageSharp {
  //         fluid(maxWidth: 400, maxHeight: 400) {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //   }
  // `)

  const links = [
    { url: "/", name: "Home" },
    { url: "/archive", name: "Archive" },
    { url: "/categories/", name: "Categories" },
    { url: "/tags/", name: "Tags" },
    { url: "/about", name: "About" },
  ]

  // const LinkList = links.map(({ url, name }) => (
  //   <div className="text-center m-2 p-2" key={name}>
  //     <Link to={url}>{name}</Link>
  //   </div>
  // ))

  return (
    <>
      <NavBar links={links} />
      {/* <header className="container mx-auto">
        <div className="flex flex-col mt-32 mb-4 p-6 ">
          <Img
            className="w-32 h-32 mx-auto rounded-full shadow-lg"
            fluid={data.fileName.childImageSharp.fluid}
            alt=""
          />
        </div>
        <div className="text-center mt-4 handing-font">WUXIAOBAI24</div>
        <div className="flex justify-center flex-wrap handing-font">
          {LinkList}
        </div>
      </header> */}
      <main className="container mx-auto p-4 max-w-4xl">{children}</main>
      <footer className="text-center bg-gray-100">
        <p>This is a footer</p>
        <p>Build by Gatsby.js and Tailwind.css</p>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
