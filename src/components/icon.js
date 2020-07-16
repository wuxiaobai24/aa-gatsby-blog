import React from "react"

const Icon = ({ icon, iconClassName }) => (
  <span className={"icon " + iconClassName}>
    <i className={icon}></i>
  </span>
)

export default Icon
