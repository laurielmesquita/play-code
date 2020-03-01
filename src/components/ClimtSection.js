import React from 'react'

import ClimtCard from './ClimtCard'

class ClimtSection extends React.Component {
  static defaultProps = {
    climts: [],
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
    const { climts, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visibleClimts = climts.slice(0, limit || climts.length)

    return (
      <div className="GeneralSection">
        {title && <h2 className="GeneralSection--Title">{title}</h2>}
        {!!visibleClimts.length && (
          <div className="GeneralSection--Grid">
            {visibleClimts.map((climt, index) => (
              <ClimtCard key={climt.title + index} {...climt} />
            ))}
          </div>
        )}
        {showLoadMore && visibleClimts.length < climts.length && (
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
