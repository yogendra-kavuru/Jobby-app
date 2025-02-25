import './index.css'
import {BsGeoAlt, BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const JobItem = props => {
  const {jobDetails} = props
  const {title, rating, location, id} = jobDetails
  const employmentType = jobDetails.employment_type
  const packagePerAnnum = jobDetails.package_per_annum
  const jobDescription = jobDetails.job_description

  return (
    <li className='job-item-bg'>
      <Link className='link' to={`/jobs/${id}`}>
        <div className='col-flex'>
          <div className='row-flex'>
            <img
              className='job-item-company-logo'
              src={jobDetails.company_logo_url}
              alt='company logo'
            />
            <div className='col-flex'>
              <h1 className='job-title'>{title}</h1>
              <div className='row-flex align-items-center'>
                <BsStarFill className='star' />
                <p className='rating'>{rating}</p>
              </div>
            </div>
          </div>
          <div className='row-flex job-details align-items-center'>
            <div className='row-flex '>
              <BsGeoAlt className='location-icon' />
              <p className='location'>{location}</p>
              <BsFillBriefcaseFill className='briefcase' />
              <p>{employmentType}</p>
            </div>
            <p className='package'>{packagePerAnnum}</p>
          </div>
          <p className='description-heading'>Description</p>
          <p className='description-txt'>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
