import './index.css'
import {
  BsStarFill,
  BsGeoAlt,
  BsFillBriefcaseFill
} from 'react-icons/bs'

const SimilarJobCard = props => {
  const {jobDetails} = props
  return (
    <li className="col-flex similar-job-card">
      <div className="row-flex align-center">
        <img
          className="similar-company-logo"
          src={jobDetails.company_logo_url}
          alt="similar job company logo"
        />
        <div className="col-flex">
          <h1 className="job-title">{jobDetails.title}</h1>
          <div className="row-flex align-items-center">
            <BsStarFill className="star" />
            <p className="rating">{jobDetails.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="similar-job-description-txt">
        {jobDetails.job_description}
      </p>
      <div className="row-flex align-items-center details-container">
        <BsGeoAlt className="location-icon" />
        <p className="location">{jobDetails.location}</p>
        <BsFillBriefcaseFill className="briefcase" />
        <p>{jobDetails.employment_type}</p>
      </div>
    </li>
  )
}

export default SimilarJobCard
