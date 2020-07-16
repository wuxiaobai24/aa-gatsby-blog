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
import "../style/style.scss"
// import { Link } from "gatsby"
import NavBar from "./nav"
import Avatar from "./avatar"
import Card from "./card"

// import TopIcon from "../images/top.svg"
// import scrollTo from "gatsby-plugin-smoothscroll"

const Layout = ({ children }) => {
  const links = [
    { url: "/", name: "Home" },
    { url: "/archive", name: "Archive" },
    { url: "/tags/", name: "Tags" },
    { url: "/bookshelf/", name: "Books" },
    { url: "/about", name: "About" },
  ]

  return (
    <div className="container">
      {/* navbar */}
      <NavBar links={links} />

      {/* main section */}
      <section className="section">
        <div className="columns">
          <div className="column is-three-quarters">{children}</div>
          <div className="column">
            <div className="container">
              <Card title="About Me">
                <div className="card-image">
                  <Avatar imgClassName="image is-256x256 is-rounded" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            Design by wuxiaobai24. Power by{" "}
            <a href="https://www.gatsbyjs.org/">Gatsby.js</a>. The website
            content is licensed{" "}
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
              CC BY NC SA 4.0
            </a>
            .
          </p>
          <p>
            You can find the source code in{" "}
            <a href="https://github.com/wuxiaobai24/aa-gatsby-blog">Github</a>.
          </p>
        </div>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
