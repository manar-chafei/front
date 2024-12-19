"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/jobs/allJobs");
      if (!response.ok) throw new Error("Error fetching job offers");
      const data = await response.json();
      // Filter out unavailable jobs (isAvailable: false)
      const availableJobs = data.filter((job: any) => job.isAvailable);
      setJobs(availableJobs);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Apply to a job
  const applyForJob = async (jobId: string) => {
    try {
      const token = localStorage.getItem("authToken"); // Assume the user is authenticated
      const response = await fetch(
        `http://localhost:5000/api/jobs/apply/${jobId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Error applying for the job");
      setSuccess("You have successfully applied for this job!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#0000004e",
        color: "#333",
        backdropFilter: "blur(10px)",
      }}
    >
      <h1 style={{ color: "#ff6600", textAlign: "center" }}>Job Offers</h1>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {success && (
        <p style={{ color: "green", textAlign: "center" }}>{success}</p>
      )}

      {/* List of jobs */}
      {!selectedJob && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
          }}
        >
          {jobs.length === 0 ? (
            <p style={{ textAlign: "center" }}>
              No available jobs at the moment.
            </p>
          ) : (
            jobs.map((job: any) => (
              <li
                key={job._id}
                style={{
                  padding: "15px",
                  margin: "10px 0",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <h2>{job.title}</h2>
                <p>
                  <strong>Company:</strong> {job.company}
                </p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {job.isAvailable ? "Available" : "Not Available"}
                </p>
                <button
                  style={{
                    backgroundColor: "#ff6600",
                    color: "#fff",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedJob(job)}
                  disabled={!job.isAvailable} // Disable button if job is unavailable
                >
                  View Details
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      {/* Job details */}
      {selectedJob && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <h2 style={{ color: "#ff6600" }}>{selectedJob.title}</h2>
          <p>
            <strong>Company:</strong> {selectedJob.company}
          </p>
          <p>
            <strong>Location:</strong> {selectedJob.location}
          </p>
          <p>
            <strong>Salary:</strong> ${selectedJob.salary}
          </p>
          <p>
            <strong>Experience Required:</strong>{" "}
            {selectedJob.experienceRequired} years
          </p>
          <p>
            <strong>Description:</strong> {selectedJob.description}
          </p>
          <button
            style={{
              backgroundColor: "#ff6600",
              color: "#fff",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={() => applyForJob(selectedJob._id)}
            disabled={!selectedJob.isAvailable} // Disable if the job is unavailable
          >
            Apply
          </button>
          <button
            style={{
              backgroundColor: "#ccc",
              color: "#333",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedJob(null)}
          >
            Back to List
          </button>
        </div>
      )}
    </div>
  );
};

export default JobList;
