import React, { useState } from 'react';
import { Upload, FileText, Zap, Copy, Check } from 'lucide-react';

export default function ResumeOptimizer() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescFile, setJobDescFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescText, setJobDescText] = useState('');
  const [coverLetterText, setCoverLetterText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');

  const handleFileUpload = async (file, setFile, setText, type) => {
    if (!file) return;
    
    setFile(file);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      setText(content);
    };
    reader.readAsText(file);
  };

  const generateSuggestions = async () => {
    if (!resumeText || !jobDescText) {
      alert('Please upload both a resume and job description');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5-20250929",
          max_tokens: 2000,
          messages: [
            {
              role: "user",
              content: `You are a professional resume optimizer. Analyze the following resume against the job description and provide specific, actionable bullet points that should be modified or added to better match the job requirements.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescText}

Please provide your response as a JSON array with this structure:
[
  {
    "id": 1,
    "original": "Original resume bullet point or section",
    "suggested": "How it should be changed to match the job description",
    "keyword": "Key skill/requirement from job description it addresses"
  }
]

Focus on:
1. Keywords and skills mentioned in the job description
2. Quantifiable achievements that match the role
3. Industry-specific terminology
4. Requirements that are missing from the resume

Provide at least 5-8 suggestions. Return ONLY the JSON array, no other text.`
            }
          ]
        })
      });

      const data = await response.json();
      let content = data.content[0].text;
      
      // Clean up the response if it has markdown code blocks
      content = content.replace(/```json\n?|\n?```/g, '').trim();
      
      const parsed = JSON.parse(content);
      setSuggestions(parsed);
      setActiveTab('suggestions');
    } catch (error) {
      console.error('Error generating suggestions:', error);
      alert('Failed to generate suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Resume Optimizer
              </h1>
            </div>
            <p className="text-slate-400 text-lg">Tailor your resume to land the job with AI-powered suggestions</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-6 py-4 font-medium transition-all border-b-2 ${
                  activeTab === 'upload'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                Upload Documents
              </button>
              <button
                onClick={() => setActiveTab('suggestions')}
                className={`px-6 py-4 font-medium transition-all border-b-2 ${
                  activeTab === 'suggestions'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                Suggestions ({suggestions.length})
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {activeTab === 'upload' ? (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Resume Upload */}
              <div className="space-y-4">
                <div className="group">
                  <label className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span className="text-lg font-semibold text-white">Resume</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".txt,.pdf"
                      onChange={(e) => handleFileUpload(e.target.files[0], setResumeFile, setResumeText, 'resume')}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="flex items-center justify-center gap-3 p-8 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition-all group"
                    >
                      <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                      <div className="text-center">
                        <p className="font-medium text-white">
                          {resumeFile ? resumeFile.name : 'Upload Resume'}
                        </p>
                        <p className="text-sm text-slate-400">.txt or .pdf</p>
                      </div>
                    </label>
                  </div>
                  {resumeText && (
                    <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 max-h-48 overflow-y-auto">
                      <p className="text-sm text-slate-300 whitespace-pre-wrap">{resumeText.substring(0, 500)}...</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Job Description Upload */}
              <div className="space-y-4">
                <div className="group">
                  <label className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <span className="text-lg font-semibold text-white">Job Description</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".txt,.pdf"
                      onChange={(e) => handleFileUpload(e.target.files[0], setJobDescFile, setJobDescText, 'jobdesc')}
                      className="hidden"
                      id="jobdesc-upload"
                    />
                    <label
                      htmlFor="jobdesc-upload"
                      className="flex items-center justify-center gap-3 p-8 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-500/5 transition-all group"
                    >
                      <Upload className="w-6 h-6 text-slate-400 group-hover:text-purple-400 transition-colors" />
                      <div className="text-center">
                        <p className="font-medium text-white">
                          {jobDescFile ? jobDescFile.name : 'Upload Job Description'}
                        </p>
                        <p className="text-sm text-slate-400">.txt or .pdf</p>
                      </div>
                    </label>
                  </div>
                  {jobDescText && (
                    <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 max-h-48 overflow-y-auto">
                      <p className="text-sm text-slate-300 whitespace-pre-wrap">{jobDescText.substring(0, 500)}...</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Letter Upload - Full Width */}
              <div className="md:col-span-2 space-y-4">
                <div className="group">
                  <label className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <span className="text-lg font-semibold text-white">Cover Letter (Optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".txt,.pdf"
                      onChange={(e) => handleFileUpload(e.target.files[0], setCoverLetterFile, setCoverLetterText, 'coverletter')}
                      className="hidden"
                      id="coverletter-upload"
                    />
                    <label
                      htmlFor="coverletter-upload"
                      className="flex items-center justify-center gap-3 p-8 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-500/5 transition-all group"
                    >
                      <Upload className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                      <div className="text-center">
                        <p className="font-medium text-white">
                          {coverLetterFile ? coverLetterFile.name : 'Upload Cover Letter'}
                        </p>
                        <p className="text-sm text-slate-400">.txt or .pdf</p>
                      </div>
                    </label>
                  </div>
                  {coverLetterText && (
                    <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 max-h-48 overflow-y-auto">
                      <p className="text-sm text-slate-300 whitespace-pre-wrap">{coverLetterText.substring(0, 500)}...</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Generate Button */}
              <div className="md:col-span-2">
                <button
                  onClick={generateSuggestions}
                  disabled={loading || !resumeText || !jobDescText}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin">⚙️</div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Generate Suggestions
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Suggestions View */
            <div className="space-y-4">
              {suggestions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-400 text-lg">Upload documents and generate suggestions to see recommendations here</p>
                </div>
              ) : (
                suggestions.map((suggestion, idx) => (
                  <div
                    key={suggestion.id}
                    className="group p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-slate-600 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-slate-700 text-slate-300 text-sm font-medium rounded-full">
                            {suggestion.keyword}
                          </span>
                          <span className="text-xs text-slate-400">Suggestion {idx + 1}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {suggestion.original && (
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Current:</p>
                          <p className="text-slate-300 bg-slate-900/50 p-3 rounded border border-slate-700 text-sm">
                            {suggestion.original}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1">Suggested:</p>
                        <p className="text-white bg-blue-500/10 p-3 rounded border border-blue-500/30 text-sm">
                          {suggestion.suggested}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => copyToClipboard(suggestion.suggested, suggestion.id)}
                      className="mt-4 flex items-center gap-2 px-4 py-2 text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
                    >
                      {copiedId === suggestion.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Suggestion
                        </>
                      )}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
