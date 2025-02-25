import './index.css'
import {Component} from 'react'
import Header from '../Header'

class HomePage extends Component {
  onClickBtn = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    return (
      <div>
        <Header />
        <div className="home-bg">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <button onClick={this.onClickBtn} className="home-btn" type="button">
            Find Jobs
          </button>
        </div>
      </div>
    )
  }
}

export default HomePage
