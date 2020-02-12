import React from 'react'

import ToyCard from './ToyCard'

class ToySection extends React.Component {
  static defaultProps = {
    toys: [],
    title: '',
    limit: 12,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 12
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { toys, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visibleToys = toys.slice(0, limit || toys.length)

    return (
      <div className="ToySection">
        {title && <h2 className="ToySection--Title">{title}</h2>}
        {!!visibleToys.length && (
          <div className="ToySection--Grid">
            {visibleToys.map((post, index) => (
              <ToyCard key={post.title + index} {...post} />
            ))}
          </div>
        )}
        {showLoadMore && visibleToys.length < toys.length && (
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
