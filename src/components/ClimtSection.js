import React from 'react'

import ClimtCard from './ClimtCard'

class ClimtSection extends React.Component {
  static defaultProps = {
    climatizadores: [],
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
    const { climatizadores, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visibleClimts = climatizadores.slice(0, limit || climatizadores.length)

    return (
      <div className="GeneralSection">
        {title && <h2 className="GeneralSection--Title">{title}</h2>}
        {!!visibleClimts.length && (
          <div className="GeneralSection--Grid">
            {visibleClimts.map((climatizador, index) => (
              <ClimtCard key={climatizador.title + index} {...climatizador} />
            ))}
          </div>
        )}
        {showLoadMore && visibleClimts.length < climatizadores.length && (
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

export default ClimtSection
