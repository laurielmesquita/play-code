import React from 'react'

import TentCard from './TentCard'

class TentSection extends React.Component {
  static defaultProps = {
    tendas: [],
    title: '',
    limit: 12,
    showLoadMore: true,
    loadMoreTitle: 'Carregar mais',
    perPageLimit: 12,
  }

  state = {
    limit: this.props.limit,
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit,
    }))

  render() {
    const { tendas, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visibleTents = tendas.slice(0, limit || tendas.length)

    return (
      <div className="GeneralSection">
        {title && <h2 className="GeneralSection--Title">{title}</h2>}
        {!!visibleTents.length && (
          <div className="GeneralSection--Grid">
            {visibleTents.map((tenda, index) => (
              <TentCard key={tenda.title + index} {...tenda} />
            ))}
          </div>
        )}
        {showLoadMore && visibleTents.length < tendas.length && (
          <div className="taCenter">
            <button className="button" onClick={this.increaseLimit}>
              {loadMoreTitle}
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default TentSection
