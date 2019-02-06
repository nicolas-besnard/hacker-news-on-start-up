import { format } from 'date-fns'
import PropTypes from 'prop-types'
import React from 'react'
import FlipMove from 'react-flip-move'

import Header from './Header.jsx'
import Item from './Item.jsx'
import Loader from './Loader.jsx'

function App({
  articles,
  isFetching,
  lastUpdated,
  requestArticles,
}) {
  return (
    <div>
      <Header />
      <div style={{textAlign: 'center'}}>
        <div className="items-header">
          {lastUpdated && (
            <p>Last Update: {format(lastUpdated, 'DD/MM/YYYY @ HH:mm:ss')}</p>
          )}
          <button onClick={requestArticles({force: true})}>
            {isFetching ? <Loader /> : 'Reload top 20'}
          </button>
        </div>
        <FlipMove className="items">
          {articles.map(post => <Item post={post} key={post.id} />)}
        </FlipMove>
      </div>
    </div>
  )
}

App.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  articles: PropTypes.array.isRequired,
}

export default App
