import React from 'react'
import ChevronDown from 'react-feather/dist/icons/chevron-down'
import _kebabCase from 'lodash/kebabCase'
export default class Accordion extends React.Component {
  static defaultProps = {
    items: [],
    className: ''
  }

  handleClick = event => event.target.classList.toggle('active')

  render() {
    const { items, className } = this.props
    return (
      <div className={`Accordion ${className}`}>
        {!!items &&
          items.map((item, index) => (
            <div
              className={`Accordion--item `}
              key={`accordion-item-${_kebabCase(item.title) + '-' + index}`}
              onClick={this.handleClick}
            >
              <h2 className="flex">
                <span>{item.title}</span>
                <ChevronDown />
              </h2>
              <div className={'description'}>
                {item.description} <br />
                {item.link && (
                  <div href={item.link} className="button">
                    {item.linkTitle}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    )
  }
}
