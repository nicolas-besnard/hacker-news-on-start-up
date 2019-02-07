import React, {Component} from 'react'
import {requestArticles as getArticles} from '../actions'
import {loadState, saveState} from '../local_storage'

import App from './App.jsx'

class Root extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ...this.defaultState(),
      ...this.getStateFromLocalStorage(),
    }
  }

  componentDidMount() {
    this.requestArticles()()
  }

  defaultState = () => {
    return {
      articles: [],
      isFetching: false,
      lastUpdated: null,
    }
  }

  getStateFromLocalStorage = () => {
    const localStorageValues = loadState()
    const state = {}

    for (let key in this.defaultState()) {
      if (localStorageValues.hasOwnProperty(key)) {
        state[key] = localStorageValues[key]
      }
    }

    return state
  }

  requestArticles = ({force = false} = {}) => async e => {
    this.setState({isFetching: true})

    const articles = await getArticles(force)(this.state)

    if (!articles) {
      this.setState({isFetching: false})
      return
    }

    this.setState(
      {articles, lastUpdated: new Date(), isFetching: false},
      () => {
        saveState(this.state)
      },
    )
  }

  render() {
    return <App {...this.state} requestArticles={this.requestArticles} />
  }
}

export default Root
