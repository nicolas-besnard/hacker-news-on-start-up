import React, {Component} from 'react'

const ExternalLink = ({children, ...rest}) => {
  return (
    <a {...rest} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

class Item extends Component {
  externalItem() {
    const {post} = this.props

    return (
      <ExternalLink href={post.url}>
        <img
          className="item-image"
          alt=""
          src={
            'http://img.bitpixels.com/getthumbnail?code=64515&size=200&url=' +
            post.url
          }
        />
        <div className="item-text">{post.title}</div>
      </ExternalLink>
    )
  }

  internalItem() {
    const {post} = this.props

    return (
      <ExternalLink href={'https://news.ycombinator.com/item?id=' + post.id}>
        <img
          className="item-image"
          alt=""
          src="https://news.ycombinator.com/y18.gif"
        />
        <div className="item-text">{post.title}</div>
      </ExternalLink>
    )
  }

  commentUrl() {
    const {post} = this.props

    return `https://news.ycombinator.com/item?id=${post.id}`
  }

  itemContent() {
    const {post} = this.props

    if (post.url) {
      return this.externalItem()
    }

    return this.internalItem()
  }

  render() {
    return (
      <div className="item">
        {this.itemContent()}
        <p>
          <ExternalLink href={this.commentUrl()}>comments</ExternalLink>
        </p>
      </div>
    )
  }
}

export default Item
