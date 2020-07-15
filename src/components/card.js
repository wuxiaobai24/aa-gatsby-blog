import React from "react"
import { useState } from "react"

const ShowIcon = ({ isShow, toggleShowIcon }) => (
  <span
    onClick={toggleShowIcon}
    className="card-header-icon"
    aria-label="show option"
  >
    <span className="icon">
      {isShow ? (
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      ) : (
        <i className="fas fa-angle-left" aria-hidden="true"></i>
      )}
    </span>
  </span>
)

export default ({ title, children }) => {
  const [isActive, setIsActive] = useState(true)

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{title}</p>
        <ShowIcon
          isShow={isActive}
          toggleShowIcon={() => setIsActive(!isActive)}
        />
      </header>
      {isActive && <div className="card-content">{children}</div>}
    </div>
  )
}
