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

import TopIcon from "../images/top.svg"
import scrollTo from "gatsby-plugin-smoothscroll"

const Layout = ({ children }) => {

  const links = [
    { url: "/", name: "Home" },
    { url: "/archive", name: "Archive" },
    { url: "/tags/", name: "Tags" },
    { url: "/bookshelf/", name: "Books"},
    { url: "/about", name: "About" },
  ]


  return (
    <>
      <NavBar links={links} />
      <main id="main" className="container mx-auto p-4 max-w-4xl">
        {children}
      </main>
      <TopIcon className="topIcon" onClick={() => scrollTo("#nav")} />
      <footer className="container mx-auto p-4 max-w-4xl text-center bg-white">
        
        <p>
          Design by wuxiaobai24. Build by{" "}
          <a href="https://www.gatsbyjs.org/">Gatsby.js</a> and{" "}
          <a href="https://tailwindcss.com/">Tailwind.css</a>
        </p>
        <p>
          You can find the source code in{" "}
          <a href="https://github.com/wuxiaobai24/aa-gatsby-blog">Github</a>.
        </p>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
