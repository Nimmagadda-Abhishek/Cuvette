import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ company: '', role: '', status: 'Applied', date: '', link: '' });

  const fetchJobs = async () => {
    const res = await axios.get('https://cuvette-1-1eip.onrender.com/api/jobs');
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('https://cuvette-1-1eip.onrender.com/api/jobs', form);
    fetchJobs();
  };

  const handleDelete = async id => {
    await axios.delete(`https://cuvette-1-1eip.onrender.com/api/jobs/${id}`);
    fetchJobs();
  };

  const handleStatusChange = async (id, status) => {
    await axios.put(`https://cuvette-1-1eip.onrender.com/api/jobs/${id}`, { status });
    fetchJobs();
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Student Job Tracker</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="text" name="company" placeholder="Company" value={form.company} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="role" placeholder="Role" value={form.role} onChange={handleChange} className="border p-2 w-full" />
        <select name="status" value={form.status} onChange={handleChange} className="border p-2 w-full">
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input type="date" name="date" value={form.date} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="link" placeholder="Job Link" value={form.link} onChange={handleChange} className="border p-2 w-full" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Job</button>
      </form>

      <div className="mt-6 space-y-4">
        {jobs.map(job => (
          <div key={job._id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{job.company} - {job.role}</h2>
            <p>Status:
              <select value={job.status} onChange={e => handleStatusChange(job._id, e.target.value)} className="ml-2">
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </p>
            <p>Date: {new Date(job.date).toLocaleDateString()}</p>
            <a href={job.link} className="text-blue-500" target="_blank" rel="noopener noreferrer">View Job</a>
            <button onClick={() => handleDelete(job._id)} className="ml-4 text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
