import React from 'react'

import ToyCard from './ToyCard'

class ToySection extends React.Component {
  static defaultProps = {
    brinquedos: [],
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
    const { brinquedos, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visibleToys = brinquedos.slice(0, limit || brinquedos.length)

    return (
      <div className="GeneralSection">
        {title && <h2 className="GeneralSection--Title">{title}</h2>}
        {!!visibleToys.length && (
          <div className="GeneralSection--Grid">
            {visibleToys.map((brinquedo, index) => (
              <ToyCard key={brinquedo.title + index} {...brinquedo} />
            ))}
          </div>
        )}
        {showLoadMore && visibleToys.length < brinquedos.length && (
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

export default ToySection
