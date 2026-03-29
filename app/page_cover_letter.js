import React, { useState } from 'react';
import { Download, FileText, Briefcase } from 'lucide-react';

const CoverLetterGenerator = () => {
  const [roleType, setRoleType] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');

  // Personalized information from resume
  const personalInfo = {
    name: 'Aqsa Shafi',
    email: 'saqsa181@gmail.com',
    phone: '647-609-6988',
    location: 'Mississauga, ON',
    linkedin: 'www.linkedin.com/in/aqsa-shafi'
  };

  const roleTemplates = {
    'Business Consultant': {
      opening: `I am writing to express my strong interest in the {position} position at {company}. With my proven background in project management, data-driven strategy development, and delivering business solutions that drive measurable impact, I am confident in my ability to help your clients optimize their operations and achieve their strategic objectives.`,
      body1: `Throughout my career, I have demonstrated expertise in managing complex projects, analyzing business challenges, and translating insights into actionable solutions. During my time at CGI as a Project Control Officer, I successfully managed 7 concurrent projects while improving delivery speed by 15%. Additionally, I secured $50K in innovation funding through pitching CGI FileGenie, showcasing my ability to gain executive-level buy-in and drive organizational change. My analytical background, combined with strong stakeholder management skills, has enabled me to bridge the gap between emerging technology and business functions effectively.`,
      body2: `I am particularly drawn to {company}'s approach to consulting and your commitment to delivering transformative solutions to clients. Your work in strategic advisory and business optimization aligns perfectly with my passion for leveraging data insights to solve complex business problems. I would be thrilled to contribute my project management expertise, consulting acumen, and client-focused mindset to your team and help drive continued success for your clients.`
    },
    'Technology Consultant': {
      opening: `I am excited to apply for the {position} role at {company}. With my technical foundation, innovation mindset, and experience successfully implementing technology-enabled solutions, I am confident I can help clients navigate complex technology challenges and unlock new opportunities through strategic technology adoption.`,
      body1: `My technology consulting journey began with hands-on technical skills in Python, SQL, JavaScript, and various business intelligence tools. At CGI, I conceptualized and pitched CGI FileGenie, an AI file assistant designed to streamline organizational efficiency, which secured $50K in innovation funding and executive buy-in from the SVP of Banking & Financial Markets. This experience demonstrated my ability to understand client pain points, envision technology solutions, and communicate complex technical concepts to non-technical stakeholders. My background also includes developing AI-driven applications like CGI InvestSmart Insights, which won our internal hackathon for its innovative design and real-world impact potential.`,
      body2: `I have followed {company}'s technology consulting practice and am impressed by your innovative approach to digital transformation and client success. Your reputation for delivering cutting-edge technology solutions that drive measurable business outcomes resonates deeply with my consulting philosophy. I am eager to contribute my technical expertise, innovation mindset, and collaborative approach to help your clients successfully navigate their technology journeys.`
    },
    'Business Analyst': {
      opening: `I am writing to express my interest in the {position} position at {company}. With my strong analytical capabilities, process improvement expertise, and track record of delivering data-driven insights that optimize operations, I am confident I can help stakeholders understand complex business requirements and drive continuous improvement initiatives.`,
      body1: `As a Project Control Officer at CGI, I honed my business analysis skills by managing 7 concurrent projects and identifying process inefficiencies. I streamlined financial processes by automating reconciliation and visualizing data using pivot tables, reducing reporting time by 50% (from 8 to 4 hours). This experience exemplifies my ability to analyze workflows, identify optimization opportunities, and implement data-driven solutions. Additionally, my role as an Instructional Assistant where I facilitated learning for 120+ students in technical tools and data analysis enhanced my ability to translate technical concepts and requirements effectively.`,
      body2: `I am drawn to {company}'s commitment to data-driven decision-making and process excellence. Your organization's reputation for turning complex data into actionable business insights aligns with my analytical mindset and passion for driving operational efficiency. I would welcome the opportunity to bring my analytical rigor, attention to detail, and business acumen to support your organization's continued growth and success.`
    },
    'Financial Analyst': {
      opening: `I am writing to apply for the {position} position at {company}. With my financial acumen, analytical foundation, and proven ability to streamline financial processes while delivering actionable insights, I am confident I can contribute meaningfully to your finance team and support strategic decision-making.`,
      body1: `My financial expertise has been developed through diverse roles that required strong numerical analysis and process optimization. As a Project Control Officer at CGI, I took ownership of financial processes and significantly enhanced efficiency by automating reconciliation and creating data visualizations using pivot tables—reducing reporting time by 50%. This achievement demonstrates my ability to identify financial inefficiencies, implement solutions, and deliver insights that drive operational improvements. As Director of Finance for BTMSA, I directed budgeting efforts and leveraged engagement insights to forecast cash flows, shaping strategic event planning while maintaining financial discipline.`,
      body2: `I am particularly impressed by {company}'s commitment to financial rigor and strategic capital allocation. Your organization's reputation for delivering strong financial performance through data-driven analysis appeals to my analytical mindset and financial acumen. I would be excited to contribute my financial analysis skills, attention to detail, and passion for driving operational efficiency to support your team's objectives.`
    },
    'Data Analyst': {
      opening: `I am excited to apply for the {position} position at {company}. With my strong foundation in data analysis, visualization, and translating raw data into actionable business insights, I am confident I can help drive informed decision-making and uncover opportunities that deliver measurable business impact.`,
      body1: `Throughout my career, I have developed a robust skill set in data analysis and visualization using tools such as PowerBI, Excel, SQL, and Python. At CGI, I enhanced financial processes by automating reconciliation and creating compelling data visualizations using pivot tables, reducing reporting time by 50%. As a Digital & Social Media Marketer at Flora Food Group, I led a data-driven strategy that analyzed client preferences and user personas, resulting in 8x reach growth and 5x engagement growth. These experiences showcase my ability to collect relevant data, conduct thorough analysis, and communicate findings through visualization—enabling stakeholders to make confident, data-driven decisions.`,
      body2: `I am drawn to {company}'s data-centric culture and commitment to leveraging analytics for competitive advantage. Your organization's innovative approach to extracting insights from complex data sets resonates with my passion for analytical problem-solving. I would be thrilled to bring my technical data skills, visualization expertise, and analytical rigor to your team and contribute to driving data-informed strategies that create real business value.`
    },
    'General Associate': {
      opening: `I am writing to express my strong interest in the {position} position at {company}. With my diverse background spanning consulting, project management, marketing, and data analysis, combined with my proven ability to drive impact across multiple functions, I am confident I can contribute immediately and grow meaningfully within your organization.`,
      body1: `My professional journey has equipped me with a diverse skill set and the ability to excel across multiple domains. As a Project Control Officer at CGI, I managed 7 concurrent projects while improving delivery speed by 15%, and successfully secured $50K in innovation funding by pitching a cutting-edge AI solution to senior leadership. As a Digital & Social Media Marketer at Flora Food Group, I drove 200K+ engagements and grew reach by 8x through data-driven strategy and cross-functional collaboration. Additionally, I bring strong technical capabilities in Python, SQL, Excel, PowerBI, and digital tools, combined with exceptional analytical and communication skills developed through consulting and case competition experience.`,
      body2: `I am excited about the opportunity to bring my well-rounded skill set, analytical mindset, and collaborative approach to {company}. Your organization's reputation for developing talent, fostering innovation, and creating impact across business functions aligns perfectly with my career aspirations. I am eager to contribute my diverse capabilities, learn from experienced leaders, and grow as a professional while helping drive success for your organization.`
    }
  };

  const generateCoverLetter = () => {
    if (!roleType || !company || !position) {
      alert('Please fill in all fields');
      return;
    }

    const template = roleTemplates[roleType];
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const opening = template.opening
      .replace('{position}', position)
      .replace('{company}', company);
    const body1 = template.body1
      .replace('{company}', company);
    const body2 = template.body2
      .replace('{company}', company);

    const letterContent = `${personalInfo.name}
${personalInfo.location} | ${personalInfo.phone} | ${personalInfo.email} | ${personalInfo.linkedin}

${dateStr}

Hiring Manager
${company}

Dear Hiring Team,

${opening}

${body1}

${body2}

I would welcome the opportunity to discuss how my skills, experience, and passion for excellence align with your team's needs. Thank you for considering my application. I look forward to connecting with you soon.

Sincerely,

${personalInfo.name}`;

    downloadCoverLetter(letterContent, position, company);
  };

  const downloadCoverLetter = (content, position, company) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${company}_${position}_CoverLetter_AqsaShafi.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    alert(`✓ Cover letter created!\n\nFile: ${company}_${position}_CoverLetter_AqsaShafi.txt\n\nNext steps:\n1. Open in Word or Google Docs\n2. Review and customize if needed\n3. Save as PDF`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-slate-900">Cover Letter Generator</h1>
              <p className="text-blue-600 font-semibold mt-1">Personalized for Aqsa Shafi</p>
            </div>
          </div>
          <p className="text-slate-600 text-lg">Generate professional, role-specific cover letters tailored to your experience</p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-blue-100">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Role Type */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Role Type</label>
              <select
                value={roleType}
                onChange={(e) => setRoleType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
              >
                <option value="">Select your target role...</option>
                <option value="Business Consultant">Business Consultant</option>
                <option value="Technology Consultant">Technology Consultant</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Financial Analyst">Financial Analyst</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="General Associate">General Associate</option>
              </select>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Company Name</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g., Deloitte, Accenture, BCG"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
              />
            </div>

            {/* Position Title */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Position Title</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="e.g., Senior Consultant"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateCoverLetter}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 text-lg uppercase tracking-wide"
          >
            <Download className="w-5 h-5" />
            Generate & Download Cover Letter
          </button>
        </div>

        {/* Role Templates Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 mb-3 text-lg">Consultant Roles</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">•</span>
                <span><strong>Business Consultant:</strong> Highlights project management and business solution delivery</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">•</span>
                <span><strong>Technology Consultant:</strong> Emphasizes AI/tech innovation and implementation expertise</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6">
            <h3 className="font-bold text-green-900 mb-3 text-lg">Analyst Roles</h3>
            <ul className="space-y-2 text-green-800 text-sm">
              <li className="flex gap-2">
                <span className="font-bold text-green-600">•</span>
                <span><strong>Business Analyst:</strong> Focuses on process improvement and workflow optimization</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-green-600">•</span>
                <span><strong>Financial Analyst:</strong> Highlights financial process optimization and forecasting</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-green-600">•</span>
                <span><strong>Data Analyst:</strong> Emphasizes data visualization and insight generation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-slate-100 to-slate-200 border-2 border-slate-400 rounded-xl p-6">
          <div className="flex gap-3">
            <FileText className="w-5 h-5 text-slate-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900 mb-2">How to Use</h3>
              <ol className="text-slate-800 space-y-1 text-sm list-decimal list-inside">
                <li>Select the role type that matches your target position</li>
                <li>Enter the company name and specific position title</li>
                <li>Click "Generate & Download Cover Letter"</li>
                <li>Open the .txt file in Microsoft Word, Google Docs, or similar</li>
                <li>Review and personalize further if desired</li>
                <li>Save as PDF and submit with your application</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Your Info Preview */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-slate-700">
          <p className="font-semibold text-slate-900 mb-2">Your Information (from resume):</p>
          <p>{personalInfo.name} | {personalInfo.location}</p>
          <p>{personalInfo.phone} | {personalInfo.email}</p>
          <p>{personalInfo.linkedin}</p>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
