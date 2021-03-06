import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'
import Logo from './Logo'

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
            to === this.state.currentPath ? 'active' : ''
          } ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ' Nav-Large'}`}>
        <div className="Nav--Container container">
          <div className="inner">
            <div className="Nav--Links">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/sobre-nos/">Sobre Nós</NavLink>
              {/* CLIMATIZADORES */}
              <div
                className={`Nav--Group ${
                  this.state.activeSubNav === 'climatizadores' ? 'active' : ''
                }`}
              >
                <span
                  className={`NavLink Nav--GroupParent ${
                    this.props.location.pathname.includes('climatizadores') ||
                    this.props.location.pathname.includes('climatizador') ||
                    this.props.location.pathname.includes('climatizador-categories')
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => this.toggleSubNav('climatizadores')}
                >
                  Climatizadores
                </span>
                <div className="Nav--GroupLinks">
                  <NavLink to="/climatizador/" className="Nav--GroupLink">
                    Todos os Climatizadores
                  </NavLink>
                  {subNav.climatizadores.map((link, index) => (
                    <NavLink
                      to={link.slug}
                      key={'climatizadores-subnav-link-' + index}
                      className="Nav--GroupLink"
                    >
                      {link.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="inner">
            <Link to="/" onClick={this.handleLinkClick}>
              <Logo />
            </Link>
          </div>
          <div className="inner">
            <div className="Nav--Links">
              {/* BRINQUEDOS */}
              <div
                className={`Nav--Group ${
                  this.state.activeSubNav === 'brinquedos' ? 'active' : ''
                }`}
              >
                <span
                  className={`NavLink Nav--GroupParent ${
                    this.props.location.pathname.includes('brinquedos') ||
                    this.props.location.pathname.includes('brinquedo') ||
                    this.props.location.pathname.includes('brinquedo-categories')
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => this.toggleSubNav('brinquedos')}
                >
                  Brinquedos
                </span>
                <div className="Nav--GroupLinks">
                  <NavLink to="/brinquedo/" className="Nav--GroupLink">
                    Todos os Brinquedos
                  </NavLink>
                  {subNav.brinquedos.map((link, index) => (
                    <NavLink
                      to={link.slug}
                      key={'brinquedos-subnav-link-' + index}
                      className="Nav--GroupLink"
                    >
                      {link.title}
                    </NavLink>
                  ))}
                </div>
              </div>
              {/* TENDAS */}
              <div
                className={`Nav--Group ${
                  this.state.activeSubNav === 'tendas' ? 'active' : ''
                }`}
              >
                <span
                  className={`NavLink Nav--GroupParent ${
                    this.props.location.pathname.includes('tendas') ||
                    this.props.location.pathname.includes('tenda') ||
                    this.props.location.pathname.includes('tenda-categories')
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => this.toggleSubNav('tendas')}
                >
                  Tendas
                </span>
                <div className="Nav--GroupLinks">
                  <NavLink to="/tenda/" className="Nav--GroupLink">
                    Todas as Tendas
                  </NavLink>
                  {subNav.tendas.map((link, index) => (
                    <NavLink
                      to={link.slug}
                      key={'tendas-subnav-link-' + index}
                      className="Nav--GroupLink"
                    >
                      {link.title}
                    </NavLink>
                  ))}
                </div>
              </div>
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
