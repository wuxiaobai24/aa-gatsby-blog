import React from "react"

import Layout from "../components/layout"

export default ({ children }) => (
  <Layout>
    <div className="box">
      <div className="content">{children}</div>
    </div>
  </Layout>
)
