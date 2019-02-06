import React, { Component } from 'react'
import { requestArticles as getArticles } from '../actions'
import { loadState, saveState } from '../local_storage'

import App from './App.jsx'

class Root extends Component {
  state = {
    articles: [],
    isFetching: false,
    lastUpdated: null,
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage()
      .then(this.requestArticles())
  }

  hydrateStateWithLocalStorage = () => {
    const localStorageValues = loadState()

    for (let key in this.state) {
      if (localStorageValues.hasOwnProperty(key)) {
        this.setState({[key]: localStorageValues[key]})
      }
    }

    return Promise.resolve()
  }

  requestArticles = ({force = false} = {}) => async e => {
    this.setState({isFetching: true})
    const articles = await getArticles(force)(this.state)

    if (!articles) {
      this.setState({isFetching: false})
      return
    }

    this.setState({articles, lastUpdated: new Date(), isFetching: false}, () => {
      saveState(this.state)
    })
  }

  render() {
    return (
      <App
        {...this.state}
        requestArticles={this.requestArticles}
      />
    )
  }
}

export default Root
