import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestArticles } from '../actions';
import { getArticle } from '../reducers/articles';

import moment from 'moment';
import FlipMove from 'react-flip-move';

import Header from './Header.jsx';
import Loader from './Loader.jsx';
import Item from './Item.jsx';

class App extends Component {
  componentDidMount() {
    this.props.requestArticles();
  }

  render() {
    const { articles, isFetching, lastUpdated, requestArticlesWithForce } = this.props;

    return (
      <div>
        <Header/>
        <div style={{ textAlign: 'center' }}>
          <div className="items-header">
          {
            lastUpdated &&
            <p>Last Update: {moment(lastUpdated).format('DD/MM/YYYY @ HH:mm:ss')}</p>
          }
          <button onClick={requestArticlesWithForce}>
            {isFetching ? <Loader /> : "Reload top 20"}
          </button>
        </div>
        <FlipMove className="items">
          {articles.map((post) =>
            <Item
              post={post}
              key={post.id}
            />
          )}
        </FlipMove>
      </div>
    </div>
    );
  }
}

App.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  articles: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  const articles = state.articleIds
    .map(articleId => getArticle(state.articles, articleId))
    .filter(e => e);

  return {
    articles: articles,
    lastUpdated: state.lastUpdated,
    isFetching: state.isFetching
  }
};

const mapDispatchToProps = dispatch => ({
  requestArticles: () => dispatch(requestArticles()),
  requestArticlesWithForce: () => dispatch(requestArticles(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
