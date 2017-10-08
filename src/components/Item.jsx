import React, { Component } from 'react';

class Item extends Component {
  render() {
    const { post, isInternalLink } = this.props;

    let url = post.url;

    if (isInternalLink) {
      url = 'https://news.ycombinator.com/item?id=#{post.id}';
    }

    return (
      <div className="item">
        <a href={url} target="_blank">
          <img
            className='item-image'
            alt=""
            src={'http://img.bitpixels.com/getthumbnail?code=64515&size=200&url=' + post.url}/>
          <p className="item-text">{post.title}</p>
        </a>
      </div>);
  }
}

export default Item;
