import React from "react"
import { useState } from "react"

const ShowIcon = ({ isShow, toggleShowIcon }) => (
  <button
    className="card-header-icon"
    aria-label="show option"
    onClick={toggleShowIcon}
    style={{ borderWidth: "0px", backgroundColor: "inherit" }}
  >
    <span className="icon">
      {isShow ? (
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      ) : (
        <i className="fas fa-angle-left" aria-hidden="true"></i>
      )}
    </span>
  </button>
)

export default ({ title, icon, children }) => {
  const [isActive, setIsActive] = useState(true)

  return (
    <div className="card mb-4">
      <header className="card-header">
        <p className="card-header-title">
          <span className="icon">
            <i className={icon}></i>
          </span>
          <span>{title}</span>
        </p>
        <ShowIcon
          isShow={isActive}
          toggleShowIcon={() => setIsActive(!isActive)}
        />
      </header>
      {isActive && <div className="card-content">{children}</div>}
    </div>
  )
}
