import './index.css'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ul className="navbar">
      <li>
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </li>
      <li>
        <div className="nav-items-container">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/jobs">
            Jobs
          </Link>
        </div>
      </li>
      <li>
        <button type="button" onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
