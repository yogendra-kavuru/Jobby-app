import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobItem from '../JobItem'
import Header from '../Header'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsPage extends Component {
  state = {
    profileLoading: true,
    jobsLoading: true,
    isError: false,
    selectedEmpTypeList: [],
    selectedSalaryRange: '',
    jobsList: [],
    profileDetails: {},
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
    this.getProfileDetails()
  }

  onClickEmployeeTypeOption = event => {
    this.setState(prevState => {
      if (prevState.selectedEmpTypeList.includes(event.target.value)) {
        return {
          selectedEmpTypeList: prevState.selectedEmpTypeList.filter(
            item => item !== event.target.value,
          ),
        }
      }
      return {
        selectedEmpTypeList: [
          ...prevState.selectedEmpTypeList,
          event.target.value,
        ],
      }
    }, this.getJobs)
  }

  onClickSalaryRange = event => {
    this.setState({selectedSalaryRange: event.target.value}, this.getJobs)
  }

  onChangeInput = event => this.setState({searchInput: event.target.value})

  onClickSearchBtn = () => {
    this.getJobs()
  }

  onInputEnter = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  getProfileDetails = async () => {
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`},
    }
    const apiUrl = `https://apis.ccbp.in/profile`
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const profileDetails = data.profile_details
    this.setState({
      profileDetails: profileDetails,
      isError: false,
      profileLoading: false,
    })
  }

  getJobs = async () => {
    this.setState({jobsLoading: true})
    const {selectedEmpTypeList, selectedSalaryRange, searchInput} = this.state
    console.log(selectedEmpTypeList.join(','))

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedEmpTypeList.join(
      ',',
    )}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
    console.log(apiUrl)
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`},
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const {jobs} = data
      this.setState({jobsList: jobs, jobsLoading: false, isError: false})
    } else {
      this.setState({isError: true, jobsLoading: false})
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="error-heading">No Jobs Found</h1>
          <p className="error-txt">
            We could not find any jobs. Try other filters.
          </p>

          <button type="button" onClick={this.getJobs} className="retry-btn">
            Retry
          </button>
        </div>
      )
    }

    const jobItems = jobsList.map(eachJob => (
      <JobItem key={eachJob.id} jobDetails={eachJob} />
    ))
    return <ul className="job-items-list">{jobItems}</ul>
  }

  renderErrorView = () => {
    const {profileLoading, profileDetails} = this.state

    const {name} = profileDetails
    const profileImageUrl = profileDetails.profile_image_url
    const shortBio = profileDetails.short_bio

    const employmentTypeOptionsList = employmentTypesList.map(eachType => {
      return (
        <li className="filter-item" key={eachType.employmentTypeId}>
          <input
            onChange={this.onClickEmployeeTypeOption}
            value={eachType.employmentTypeId}
            type="checkbox"
          />

          <label htmlFor={eachType.employmentTypeId} className="filter-label">
            {eachType.label}
          </label>
        </li>
      )
    })

    const salaryRangesOptionsList = salaryRangesList.map(eachRange => {
      return (
        <li className="filter-item" key={eachRange.salaryRangeId}>
          <input
            onChange={this.onClickSalaryRange}
            name="salaryRange"
            value={eachRange.salaryRangeId}
            id={eachRange.salaryRangeId}
            type="radio"
            className="filter-checkbox"
          />
          <label htmlFor={eachRange.salaryRangeId} className="filter-label">
            {eachRange.label}
          </label>
        </li>
      )
    })

    return (
      <div>
        <Header />
        <div className="jobs-page-container">
          <div className="filters-container">
            <div className="section-container">
              {profileLoading && (
                <div className="loader-container" data-testid="loader">
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              )}
              {!profileLoading && (
                <div className="profile-container">
                  <img src={profileImageUrl} alt="profile" />
                  <h1 className="profile-name">Yogendra</h1>
                  <p className="designation">Full Stack Developer and AI Enthusiast</p>
                </div>
              )}
            </div>
            <div className="section-container">
              <p className="filter-section-heading">Type of Employment</p>
              <ul className="filter-items-list">{employmentTypeOptionsList}</ul>
            </div>
            <div className="section-container">
              <p className="filter-section-heading">Type of Employment</p>
              <ul className="filter-items-list">{salaryRangesOptionsList}</ul>
            </div>
          </div>
          <div className="failure-container">
            <div className="search-bar">
              <input
                type="search"
                className="search-input"
                placeholder="Search Job Role"
                onChange={this.onChangeInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.getJobs}
                className="search-icon-button"
              >
                <BsSearch
                  data-testid="searchButton"
                  onClick={this.onClickSearchBtn}
                  className="search-icon"
                />
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1 className="error-heading">Oops! Something Went Wrong</h1>
            <p className="error-txt">
              We cannot seem to find the page you are looking for.
            </p>

            <button type="button" onClick={this.getJobs} className="retry-btn">
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {profileLoading, jobsLoading, profileDetails, isError} = this.state

    if (isError) {
      return this.renderErrorView()
    }

    const {name} = profileDetails
    const profileImageUrl = profileDetails.profile_image_url
    const shortBio = profileDetails.short_bio

    const employmentTypeOptionsList = employmentTypesList.map(eachType => {
      return (
        <li className="filter-item" key={eachType.employmentTypeId}>
          <input
            onClick={this.onClickEmployeeTypeOption}
            value={eachType.employmentTypeId}
            id={eachType.employmentTypeId}
            type="checkbox"
            className="filter-checkbox"
          />
          <label htmlFor={eachType.employmentTypeId} className="filter-label">
            {eachType.label}
          </label>
        </li>
      )
    })

    const salaryRangesOptionsList = salaryRangesList.map(eachRange => {
      return (
        <li className="filter-item" key={eachRange.salaryRangeId}>
          <input
            onClick={this.onClickSalaryRange}
            name="salaryRange"
            value={eachRange.salaryRangeId}
            id={eachRange.salaryRangeId}
            type="radio"
            className="filter-checkbox"
          />
          <label htmlFor={eachRange.salaryRangeId} className="filter-label">
            {eachRange.label}
          </label>
        </li>
      )
    })

    return (
      <div>
        <Header />
        <div className="jobs-page-container">
          <div className="filters-container">
            <div className="section-container">
              {profileLoading && (
                <div className="loader-container" data-testid="loader">
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              )}
              {!profileLoading && (
                <div className="profile-container">
                  <img src={profileImageUrl} alt="profile" />
                  <h1 className="profile-name">Yogendra</h1>
                  <p className="designation">Full Stack Developer and AI Enthusiast</p>
                </div>
              )}
            </div>
            <div className="section-container">
              <p className="filter-section-heading">Type of Employment</p>
              <ul className="filter-items-list">{employmentTypeOptionsList}</ul>
            </div>
            <div className="section-container">
              <p className="filter-section-heading">Type of Employment</p>
              <ul className="filter-items-list">{salaryRangesOptionsList}</ul>
            </div>
          </div>
          <div className="jobs-container">
            <div className="search-bar">
              <input
                type="search"
                className="search-input"
                placeholder="Search Job Role"
                onChange={this.onChangeInput}
                onKeyDown={this.onInputEnter}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.getJobs}
                className="search-icon-button"
              >
                <BsSearch
                  data-testid="searchButton"
                  onClick={this.onClickSearchBtn}
                  className="search-icon"
                />
              </button>
            </div>
            {jobsLoading && (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            )}
            {!jobsLoading && this.renderJobsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsPage
