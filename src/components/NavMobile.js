import React, { Component } from "react"
import { Location } from "@reach/router"
import { Link } from "gatsby"
import { Menu, X } from "react-feather"
import Logo from "./Logo"

import "./Nav.css"

export class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false,
  }

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav,
    })

  render() {
    const { active } = this.state,
      { subNav } = this.props,
      NavLink = ({ to, className, children, ...props }) => (
        <Link
          to={to}
          className={`NavLink ${
            to === this.state.currentPath ? "active" : ""
          } ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )

    return (
      <nav className={`Nav ${active ? "Nav-active" : " Nav-Mobile"}`}>
        <div className="Nav--Container container">
          <div className="inner-one">
            <Link to="/" onClick={this.handleLinkClick}>
              <Logo />
            </Link>
          </div>
          <div className="inner">
            <div className="Nav--Links">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/sobre-nos/">Sobre Nós</NavLink>
              <div
                className={`Nav--Group ${
                  this.state.activeSubNav === "toys" ? "active" : ""
                }`}
              >
                <span
                  className={`NavLink Nav--GroupParent ${
                    this.props.location.pathname.includes("toys") ||
                    this.props.location.pathname.includes("toy") ||
                    this.props.location.pathname.includes("toy-categories")
                      ? "active"
                      : ""
                  }`}
                  onClick={() => this.toggleSubNav("toys")}
                >
                  Brinquedos
                </span>
                <div className="Nav--GroupLinks">
                  <NavLink to="/toy/" className="Nav--GroupLink">
                    Todos os Brinquedos
                  </NavLink>
                  {subNav.toys.map((link, index) => (
                    <NavLink
                      to={link.slug}
                      key={"toys-subnav-link-" + index}
                      className="Nav--GroupLink"
                    >
                      {link.title}
                    </NavLink>
                  ))}
                </div>
              </div>
              <NavLink to="/tendas/">Tendas</NavLink>
              <NavLink to="/climatizadores/">Climatizadores</NavLink>
              <NavLink to="/contato/">Contato</NavLink>
            </div>
          </div>
          <button
            className="Button-blank Nav--MenuButton"
            onClick={this.handleMenuToggle}
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)
