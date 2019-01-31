import React, {Component} from 'react'

import image from '../images/white-border.png'

class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav className="inner">
          <img src={image} alt="" className="logo" />
        </nav>
      </header>
    )
  }
}

export default Header
