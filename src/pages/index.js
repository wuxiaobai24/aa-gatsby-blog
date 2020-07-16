import SEO from "../components/seo"
import React from "react"
import BaseLayout from "../components/base-layout"

export default () => {
  return (
    <BaseLayout>
      <SEO title="Home" />
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-centered">Code & Fun</h1>
          </div>
        </div>
      </section>
    </BaseLayout>
  )
}
