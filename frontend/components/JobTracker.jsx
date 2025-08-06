import { useState } from 'react';
import '../css/JobTracker.css';

function JobTracker() {
  const [jobs] = useState([
    {
      id: 1,
      company: "Tech Corp",
      position: "Frontend Developer",
      status: "Applied",
      dateApplied: "2025-07-28",
      notes: "Submitted through company website"
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      status: "Interview Scheduled",
      dateApplied: "2025-07-25",
      notes: "Phone screening completed"
    },
    {
      id: 3,
      company: "Big Tech Inc",
      position: "React Developer",
      status: "Rejected",
      dateApplied: "2025-07-20",
      notes: "Not a good fit"
    },
    {
      id: 4,
      company: "Innovation Labs",
      position: "UI/UX Developer",
      status: "Offer Received",
      dateApplied: "2025-07-15",
      notes: "Great team culture!"
    },
    {
      id: 5,
      company: "Digital Solutions",
      position: "JavaScript Developer",
      status: "Applied",
      dateApplied: "2025-08-01",
      notes: "Found through LinkedIn"
    }
  ]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Applied': return 'status-applied';
      case 'Interview Scheduled': return 'status-interview';
      case 'Rejected': return 'status-rejected';
      case 'Offer Received': return 'status-offer';
      default: return 'status-applied';
    }
  };

  return (
    <div id="job-tracker-page">
      <div id="job-tracker-container">
        <h1 id="tracker-title">Job Tracker</h1>
        
        <div id="jobs-grid">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <h3>{job.company}</h3>
                <span className={`status-badge ${getStatusClass(job.status)}`}>
                  {job.status}
                </span>
              </div>
              
              <h4>{job.position}</h4>
              
              <p><strong>Applied:</strong> {new Date(job.dateApplied).toLocaleDateString()}</p>
              <p><strong>Notes:</strong> {job.notes}</p>
            </div>
          ))}
        </div>

        <div id="tracker-summary">
          <h3>Summary</h3>
          <div id="summary-stats">
            <div className="stat-item">
              <span className="stat-number">{jobs.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{jobs.filter(job => job.status === 'Applied').length}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{jobs.filter(job => job.status === 'Interview Scheduled').length}</span>
              <span className="stat-label">Interviews</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{jobs.filter(job => job.status === 'Offer Received').length}</span>
              <span className="stat-label">Offers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobTracker;
