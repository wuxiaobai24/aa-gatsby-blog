import React from "react"

import Layout from "../components/layout"

export default ({ children }) =>(
  <Layout>
    <div className="border border-red-600 rounded shadow-lg p-6 mt-3">
      {children}
    </div>
  </Layout>
)
