import React, {Component} from 'react';

class Item extends Component {
  externalItem() {
    const { post } = this.props;

    return (
      <a href={post.url} target="_blank">
        <img className='item-image'
          alt=""
          src={"http://img.bitpixels.com/getthumbnail?code=64515&size=200&url=" + post.url}/>
        <div className="item-text">{post.title}</div>
      </a>

    );
  }

  internalItem() {
    const { post } = this.props;

    return (
      <a href={"https://news.ycombinator.com/item?id=" + post.id} target="_blank">
        <img className='item-image'
          alt=""
          src="https://news.ycombinator.com/y18.gif"/>
        <div className="item-text">{post.title}</div>
      </a>

    );
  }

  commentUrl() {
    const { post } = this.props;

    return `https://news.ycombinator.com/item?id=${post.id}`
  }

  itemContent() {
    const { post } = this.props;

    if (post.url) {
      return this.externalItem();
    }

    return this.internalItem();
  }

  render() {
    return (
      <div className="item">
        {this.itemContent()}
        <p><a href={this.commentUrl()} target="_blank">comments</a></p>
      </div>);
  }
}

export default Item;
