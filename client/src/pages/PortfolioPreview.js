import React from 'react';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

export default function PortfolioPreview() {
  const navigate = useNavigate();

  const rawData = JSON.parse(localStorage.getItem('portfolioData') || '{}');

  const data = {
    ...rawData,
    projects: Array.isArray(rawData.projects)
      ? rawData.projects
      : (() => {
          try {
            return JSON.parse(rawData.projects || '[]');
          } catch {
            return [];
          }
        })(),
    skills: Array.isArray(rawData.skills)
      ? rawData.skills
      : (() => {
          try {
            return JSON.parse(rawData.skills || '[]');
          } catch {
            return [];
          }
        })()
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('portfolio-preview');
    html2pdf().from(element).save(`${data.username || 'portfolio'}.pdf`);
  };

  const handleShareLink = async () => {
    const publicUrl = `${window.location.origin}/portfolio/${data.username || 'demo'}`;
    try {
      await navigator.clipboard.writeText(publicUrl);
      alert(`✅ Link copied to clipboard:\n${publicUrl}`);
    } catch {
      alert(`❌ Copy failed. Here's your link:\n${publicUrl}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start py-8 px-4 sm:px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=900&auto=format&fit=crop&q=60')] opacity-20 z-0"></div>

      {/* Card */}
      <div id="portfolio-preview" className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-10 transition-all duration-500">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6 drop-shadow animate-fade-in-down">
          🌟 Portfolio Preview
        </h1>

        {/* GitHub avatar */}
        {data.github && (
          <div className="flex justify-center mb-6">
            <img
              src={`https://github.com/${data.github.split('/').pop()}.png`}
              alt="GitHub Avatar"
              className="w-24 h-24 rounded-full shadow-lg border-2 border-indigo-400"
            />
          </div>
        )}

        <div className="space-y-5 text-gray-800 text-base sm:text-lg leading-relaxed">
          <p><strong className="text-indigo-700">👤 Name:</strong> {data.name || <em>Not provided</em>}</p>
          <p><strong className="text-indigo-700">📛 Username:</strong> {data.username || <em>Not provided</em>}</p>
          <p className="whitespace-pre-line"><strong className="text-indigo-700">📝 Bio:</strong> {data.bio || <em>Not provided</em>}</p>

          <p>
            <strong className="text-indigo-700">🐙 GitHub:</strong>{' '}
            {data.github ? (
              <a href={data.github} target="_blank" rel="noreferrer" className="text-blue-600 underline break-words hover:text-blue-800">
                {data.github}
              </a>
            ) : <em>Not provided</em>}
          </p>

          <p>
            <strong className="text-indigo-700">💼 LinkedIn:</strong>{' '}
            {data.linkedin ? (
              <a href={data.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 underline break-words hover:text-blue-800">
                {data.linkedin}
              </a>
            ) : <em>Not provided</em>}
          </p>

          {/* Projects */}
          <p><strong className="text-indigo-700">📂 Projects:</strong></p>
          <ul className="ml-5 list-disc space-y-1">
            {data.projects.length > 0 ? (
              data.projects.map((proj, idx) => (
                <li key={idx}>
                  <strong className="text-indigo-600">{proj.title}:</strong> {proj.description}
                </li>
              ))
            ) : (
              <li><em>No projects added</em></li>
            )}
          </ul>

          {/* ✅ Fixed Skills Section */}
          <p><strong className="text-indigo-700">🛠 Skills:</strong></p>
          <div className="flex flex-wrap gap-2">
            {data.skills.length > 0 ? (
              data.skills.map((skill, i) => (
                <span key={i} className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {skill}
                </span>
              ))
            ) : (
              <span><em>No skills added</em></span>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center z-10">
        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
        >
          🔙 Back to Edit
        </button>

        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition shadow-md hover:shadow-lg"
        >
          📄 Download PDF
        </button>

        <button
          onClick={handleShareLink}
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition shadow-md hover:shadow-lg"
        >
          🔗 Share Public Link
        </button>
      </div>
    </div>
  );
}