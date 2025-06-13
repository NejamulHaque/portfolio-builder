import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    bio: '',
    github: '',
    linkedin: '',
    projects: [{ title: '', description: '' }],
    skills: [],
    skillInput: ''
  });

  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData(prev => ({ ...prev, projects: updatedProjects }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '' }]
    }));
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, projects: updatedProjects }));
  };

  const handleSkillAdd = (e) => {
    e.preventDefault();
    const skill = formData.skillInput.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill],
        skillInput: ''
      }));
    }
  };

  const removeSkill = (index) => {
    const updated = [...formData.skills];
    updated.splice(index, 1);
    setFormData(prev => ({ ...prev, skills: updated }));
  };

  const handleReset = () => {
    setFormData({
      username: '',
      name: '',
      bio: '',
      github: '',
      linkedin: '',
      projects: [{ title: '', description: '' }],
      skills: [],
      skillInput: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        projects: JSON.stringify(formData.projects),
        skills: JSON.stringify(formData.skills)
      };
      await axios.post('http://localhost:5003/api/portfolio/save', payload);
      localStorage.setItem('portfolioData', JSON.stringify(formData));
      toast.success('🎉 Portfolio Saved! Preview loading...');
      setTimeout(() => navigate('/preview'), 1500);
    } catch (err) {
      console.error('Error saving portfolio:', err);
      toast.error('❌ Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="text-xl font-bold text-indigo-700 dark:text-indigo-300">🧭 Haque & Sons</div>
          <nav className="flex gap-6 text-sm font-medium">
            <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition">Home</a>
            <a href="#services" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition">Services</a>
            <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition">Create</a>
            <a href="https://haque-and-sons.vercel.app/blog.html" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition">Blog</a>
            <a href="https://nejamulportfolio.vercel.app/" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition">Portfolio</a>
            <a href="https://resume-builder-alpha-puce.vercel.app/" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition">Resume Builder</a>
          </nav>
        </div>
      </header>

      {/* Spacer for fixed navbar */}
      <div className="h-[64px]"></div>

      <div
        className={`${darkMode ? 'bg-gray-900 text-black' : ''} min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start px-4 py-10 relative`}
        style={{
          backgroundImage: darkMode
            ? 'none'
            : "url('https://images.unsplash.com/photo-1545665277-5937489579f2?w=1600&auto=format&fit=crop&q=80')"
        }}
      >
        {!darkMode && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm pointer-events-none"></div>
        )}

        <div className="mb-4 self-end z-10">
          <button
            onClick={() => setDarkMode(prev => !prev)}
            className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className="w-full max-w-xl relative z-10 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl p-8 transition-all duration-500">
          <h1 className="text-4xl font-extrabold text-center mb-6 text-indigo-700 dark:text-indigo-300 drop-shadow-md animate-pulse">
            🚀 Create Your Portfolio
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* BASIC FIELDS */}
            {['username', 'name', 'bio', 'github', 'linkedin', 'instagram', 'x'].map((field, idx) => (
              <div key={idx}>
                <label className="block text-base font-semibold capitalize text-gray-800 dark:text-gray-200 mb-1">
                  {field}
                </label>
                {field === 'bio' ? (
                  <textarea
                    placeholder="About me"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    rows="2"
                    maxLength={500}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                ) : (
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    placeholder={
                      field === 'username'
                        ? 'e.g. nejamul_dev'
                        : field === 'name'
                        ? 'e.g. Nejamul Haque'
                        : field === 'github'
                        ? 'https://github.com/yourusername'
                        : field === 'linkedin'
                        ? 'https://linkedin.com/in/yourprofile'
                        : field === 'instagram'
                        ? 'https://instagram.com/yourusername'
                        : field === 'x'
                        ? 'https://x.com/yourusername'
                        : 'Enter text...'
                    }
                    className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                )}
              </div>
            ))}

            {/* SKILLS */}
            <div>
              <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">Skills</label>
              <form onSubmit={handleSkillAdd} className="flex gap-2 mt-1">
                <input
                  type="text"
                  placeholder="Add skill and press Enter"
                  value={formData.skillInput}
                  onChange={e => setFormData({ ...formData, skillInput: e.target.value })}
                  className="flex-1 px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-400"
                />
              </form>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm transition hover:scale-105"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="ml-2 text-red-500 hover:text-red-700 font-bold"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* PROJECTS */}
            <div>
              <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">Projects</label>
              {formData.projects.map((proj, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded border mt-2">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={proj.title}
                    onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                    className="w-full mb-2 px-3 py-2 border rounded"
                  />
                  <textarea
                    placeholder="Project Description"
                    value={proj.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                  <button type="button" onClick={() => removeProject(index)} className="text-red-600 text-sm mt-1 hover:underline">
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={addProject} className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                + Add Project
              </button>
            </div>

            <div className="flex justify-between gap-4">
              <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition">
                💾 Save & Preview
              </button>
              <button type="button" onClick={handleReset} className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition">
                🔄 Reset
              </button>
            </div>
          </form>
        </div>

        {/* Floating Live Preview */}
        <div className="fixed right-4 bottom-4 w-[320px] sm:w-[400px] bg-white dark:bg-gray-800 border border-indigo-300 dark:border-indigo-600 rounded-xl shadow-lg p-4 z-50">
          <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2">🔍 Live Preview</h2>
          <div className="text-sm space-y-2">
            {formData.photo && <img src={formData.photo} alt="profile" className="w-20 h-20 rounded-full mx-auto mb-2 shadow-md" />}
            <p><strong>Username:</strong> {formData.username || 'Not set'}</p>
            <p><strong>Name:</strong> {formData.name || 'Not set'}</p>
            <p><strong>Bio:</strong> {formData.bio || 'Not set'}</p>
            <p><strong>GitHub:</strong> {formData.github || 'Not set'}</p>
            <p><strong>LinkedIn:</strong> {formData.linkedin || 'Not set'}</p>
            <p><strong>Skills:</strong> {formData.skills.join(', ') || 'Not set'}</p>
            <p><strong>Projects:</strong></p>
            <ul className="list-disc ml-4">
              {formData.projects.map((p, i) => (
                <li key={i}><strong>{p.title}:</strong> {p.description}</li>
              ))}
            </ul>
          </div>
        </div>
        <ToastContainer />
        {/* Footer */}
      <footer className="mt-10 w-full text-center py-6 text-sm text-gray-700 dark:text-gray-700 z-10">
        <hr className="mb-4 border-gray-300 dark:border-gray-300" />
        <p>
          Powered by <a href="https://haque-and-sons.vercel.app" target="_blank" rel="noreferrer" className="text-indigo-900 hover:underline">Haque & Sons</a>
        </p>
      </footer>
      </div>
    </div>
  );
}
