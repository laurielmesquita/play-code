import React from 'react'

import TentCard from './TentCard'

class TentSection extends React.Component {
  static defaultProps = {
    tents: [],
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
    const { tents, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visibleTents = tents.slice(0, limit || tents.length)

    return (
      <div className="GeneralSection">
        {title && <h2 className="GeneralSection--Title">{title}</h2>}
        {!!visibleTents.length && (
          <div className="GeneralSection--Grid">
            {visibleTents.map((tent, index) => (
              <TentCard key={tent.title + index} {...tent} />
            ))}
          </div>
        )}
        {showLoadMore && visibleTents.length < tents.length && (
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
