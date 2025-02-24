import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Navbar = props => {
  const clickOnLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar-main-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dzqfuqpu4/image/upload/v1736601641/Frame_8787_srmuxy.png"
          alt="website logo"
          className="navbar-website-logo"
        />
      </Link>
      <button
        onClick={clickOnLogout}
        type="button"
        className="navbar-logout-button"
      >
        Logout
      </button>
      <button
        onClick={clickOnLogout}
        aria-label="Logout"
        type="button"
        className="mobile-navbar-logout-button"
      >
        <FiLogOut className="mobile-logout-image" />
      </button>
    </nav>
  )
}

export default withRouter(Navbar)
