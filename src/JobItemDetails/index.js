import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {
  BsStarFill,
  BsGeoAlt,
  BsFillBriefcaseFill,
  BsBoxArrowUpRight,
} from 'react-icons/bs'
import SimilarJobCard from '../SimilarJobCard'
import Header from '../Header'

class JobItemDetails extends Component {
  state = {isLoading: true, fetchedData: {}}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`},
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    this.setState({isLoading: false, fetchedData: data})
  }

  renderJobInfo = () => {
    const {fetchedData} = this.state
    const jobData = fetchedData.job_details
    const similarJobItemsList = fetchedData.similar_jobs.map(eachJob => (
      <SimilarJobCard key={eachJob.id} jobDetails={eachJob} />
    ))

    const skillsListItems = jobData.skills.map(eachSkill => (
      <li key={eachSkill.name} className="skill-item">
        <img
          className="skill-img"
          src={eachSkill.image_url}
          alt={`${eachSkill.name}`}
        />
        <p className="skill-name">{eachSkill.name}</p>
      </li>
    ))
    console.log(fetchedData)

    return (
      <div className="bg-container">
        <div className="job-details-card col-flex">
          <div className="row-flex">
            <img
              src={`${jobData.company_logo_url}`}
              className="company-logo"
              alt="job details company logo"
            />
            <div className="col-flex">
              <h1 className="job-title">{jobData.title}</h1>
              <div className="row-flex align-items-center">
                <BsStarFill className="star" />
                <p className="rating">{jobData.rating}</p>
              </div>
            </div>
          </div>
          <div className="row-flex job-details align-items-center">
            <div className="row-flex align-items-center">
              <BsGeoAlt className="location-icon" />
              <p className="location">{jobData.location}</p>
              <BsFillBriefcaseFill className="briefcase" />
              <p>{jobData.employment_type}</p>
            </div>
            <p className="package">{jobData.package_per_annum}</p>
          </div>
          <div className="row-flex align-items-center description-heading-container">
            <h1 className="card-heading ">Description</h1>
            <a className="anchor" href={`${jobData.company_website_url}`}>
              <span className="anchor-txt">Visit</span>
              <BsBoxArrowUpRight />
            </a>
          </div>
          <p className="description-txt">{jobData.job_description}</p>
          <h1 className="card-heading">Skills</h1>
          <ul className="skills-list">{skillsListItems}</ul>
          <h1 className="card-heading">Life at company</h1>
          <div className="row-flex space-between">
            <p className="description-txt w-75">
              {jobData.life_at_company.description}
            </p>
            <img src={`${jobData.life_at_company.image_url}`} alt="life at company" />
          </div>
        </div>
        <h1 className="card-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">{similarJobItemsList}</ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <Header />

        {isLoading && (
          <div className="bg-container">
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          </div>
        )}
        {!isLoading && this.renderJobInfo()}
      </div>
    )
  }
}

export default JobItemDetails
