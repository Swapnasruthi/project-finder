import React, { useState, useEffect } from 'react';
import { User, Experience, Education } from '../types';
import TrashIcon from './icons/TrashIcon';
import SkillInput from './SkillInput';

interface SettingsProps {
  currentUser: User;
  onUpdateUser: (userData: Partial<Omit<User, 'id'>>) => void;
}

const Settings: React.FC<SettingsProps> = ({ currentUser, onUpdateUser }) => {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [headline, setHeadline] = useState(currentUser.headline);
  const [location, setLocation] = useState(currentUser.location);
  const [bio, setBio] = useState(currentUser.bio);
  const [portfolioUrl, setPortfolioUrl] = useState(currentUser.portfolioUrl || '');
  const [skills, setSkills] = useState<string[]>(currentUser.skills);
  const [profilePictureDataUrl, setProfilePictureDataUrl] = useState(currentUser.profilePictureUrl || '');
  const [experience, setExperience] = useState<Experience[]>(currentUser.experience);
  const [education, setEducation] = useState<Education[]>(currentUser.education);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setHeadline(currentUser.headline);
    setLocation(currentUser.location);
    setBio(currentUser.bio);
    setPortfolioUrl(currentUser.portfolioUrl || '');
    setSkills(currentUser.skills);
    setProfilePictureDataUrl(currentUser.profilePictureUrl || '');
    setExperience(currentUser.experience);
    setEducation(currentUser.education);
  }, [currentUser]);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePictureDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setExperience(newExperience);
  };

  const handleAddExperience = () => {
    setExperience([...experience, { title: '', company: '', startDate: '', endDate: '', description: '' }]);
  };

  const handleRemoveExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEducation(newEducation);
  };

  const handleAddEducation = () => {
    setEducation([...education, { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }]);
  };
  
  const handleRemoveEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      onUpdateUser({
        name,
        email,
        headline,
        location,
        bio,
        portfolioUrl,
        skills,
        profilePictureUrl: profilePictureDataUrl,
        experience,
        education,
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-extrabold text-white">Settings</h1>
        <p className="mt-2 text-brand-text-secondary">Manage your profile information.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-brand-secondary p-6 sm:p-8 rounded-lg space-y-6">
        {/* Basic Info */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
            <img 
                src={profilePictureDataUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0f172a&color=e2e8f0&size=128`} 
                alt="Profile Preview" 
                className="w-24 h-24 rounded-full object-cover border-4 border-slate-700 flex-shrink-0"
            />
            <div className="flex-grow w-full">
                <label htmlFor="profilePicture" className="block text-sm font-medium text-brand-text-secondary mb-2">Change Profile Picture</label>
                 <input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="w-full text-sm text-brand-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-accent file:text-white hover:file:bg-sky-400"
                />
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-text-secondary mb-2">Full Name</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-text-secondary mb-2">Email Address</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent" required />
            </div>
        </div>
        <div>
            <label htmlFor="headline" className="block text-sm font-medium text-brand-text-secondary mb-2">Headline</label>
            <input id="headline" type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent" placeholder="e.g., Senior Frontend Engineer" required />
        </div>
         <div>
            <label htmlFor="location" className="block text-sm font-medium text-brand-text-secondary mb-2">Location</label>
            <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent" placeholder="e.g., San Francisco, CA" required />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-brand-text-secondary mb-2">About / Bio</label>
          <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={5} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent" placeholder="Tell us a little about yourself." required />
        </div>
        <div>
          <label htmlFor="portfolioUrl" className="block text-sm font-medium text-brand-text-secondary mb-2">Portfolio URL</label>
          <input id="portfolioUrl" type="url" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent" placeholder="https://your-portfolio.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-text-secondary mb-2">Your Skills</label>
          <SkillInput 
            skills={skills}
            setSkills={setSkills}
            placeholder="e.g., React, Python, UI/UX Design"
          />
           <p className="text-xs text-brand-text-secondary mt-1">Type a skill and press Enter or comma to add it.</p>
        </div>

        {/* Work Experience Section */}
        <div className="pt-6 border-t border-slate-700">
          <h2 className="text-xl font-bold text-white">Work Experience</h2>
          <div className="space-y-4 mt-4">
            {experience.map((exp, index) => (
              <div key={index} className="bg-slate-800 p-4 rounded-lg space-y-4 relative">
                 <button type="button" onClick={() => handleRemoveExperience(index)} className="absolute top-3 right-3 text-red-400 hover:text-red-300">
                    <TrashIcon className="w-5 h-5" />
                 </button>
                 <input type="text" placeholder="Job Title" value={exp.title} onChange={(e) => handleExperienceChange(index, 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                 <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                 <div className="flex gap-4">
                    <input type="text" placeholder="Start Date (e.g., 2020)" value={exp.startDate} onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                    <input type="text" placeholder="End Date (e.g., Present)" value={exp.endDate} onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                 </div>
                 <textarea placeholder="Description" value={exp.description} onChange={(e) => handleExperienceChange(index, 'description', e.target.value)} rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-accent"></textarea>
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddExperience} className="mt-4 px-4 py-2 bg-slate-700 text-white text-sm font-semibold rounded-lg hover:bg-slate-600 transition-colors">Add Experience</button>
        </div>

        {/* Education Section */}
        <div className="pt-6 border-t border-slate-700">
          <h2 className="text-xl font-bold text-white">Education</h2>
          <div className="space-y-4 mt-4">
            {education.map((edu, index) => (
              <div key={index} className="bg-slate-800 p-4 rounded-lg space-y-4 relative">
                <button type="button" onClick={() => handleRemoveEducation(index)} className="absolute top-3 right-3 text-red-400 hover:text-red-300">
                    <TrashIcon className="w-5 h-5" />
                </button>
                <input type="text" placeholder="School" value={edu.school} onChange={(e) => handleEducationChange(index, 'school', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                <input type="text" placeholder="Field of Study" value={edu.fieldOfStudy} onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                <div className="flex gap-4">
                  <input type="text" placeholder="Start Date (e.g., 2013)" value={edu.startDate} onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                  <input type="text" placeholder="End Date (e.g., 2017)" value={edu.endDate} onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddEducation} className="mt-4 px-4 py-2 bg-slate-700 text-white text-sm font-semibold rounded-lg hover:bg-slate-600 transition-colors">Add Education</button>
        </div>
        
        <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-brand-accent text-white text-sm font-semibold rounded-lg hover:bg-sky-400 transition-colors disabled:bg-sky-800 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
      </form>
    </div>
  );
};

export default Settings;
