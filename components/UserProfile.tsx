import React from 'react';
import { User } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import UserCircleIcon from './icons/UserCircleIcon';
import LocationMarkerIcon from './icons/LocationMarkerIcon';
import AcademicCapIcon from './icons/AcademicCapIcon';

interface UserProfileProps {
  user: User;
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onBack }) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <button onClick={onBack} className="flex items-center gap-2 text-brand-accent hover:text-sky-300 transition-colors mb-4">
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </button>
      </div>

      <div className="bg-brand-secondary rounded-lg shadow-xl p-6 sm:p-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="flex-shrink-0">
             {user.profilePictureUrl ? (
                <img src={user.profilePictureUrl} alt={user.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-slate-700" />
             ) : (
                <UserCircleIcon className="w-24 h-24 sm:w-32 sm:h-32 text-slate-500" />
             )}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{user.name}</h1>
            <p className="text-lg text-brand-text-primary mt-1">{user.headline}</p>
            <div className="flex items-center gap-2 text-brand-text-secondary mt-2">
              <LocationMarkerIcon className="w-5 h-5" />
              <span>{user.location}</span>
            </div>
             <div className="mt-4 flex flex-wrap gap-2">
                <a href={`mailto:${user.email}`} className="px-3 py-1 text-sm bg-slate-700 text-brand-accent rounded-full hover:bg-slate-600 transition-colors">Contact</a>
                {user.portfolioUrl && (
                    <a href={user.portfolioUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-sm bg-slate-700 text-brand-accent rounded-full hover:bg-slate-600 transition-colors">Portfolio</a>
                )}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 pt-6 border-t border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">About</h2>
            <p className="text-brand-text-primary whitespace-pre-wrap leading-relaxed">{user.bio}</p>
        </div>

        {/* Experience Section */}
        <div className="mt-8 pt-6 border-t border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Experience</h2>
            <div className="space-y-6">
                {user.experience.map((exp, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                            <BriefcaseIcon className="w-8 h-8 text-brand-accent" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                            <p className="text-brand-text-primary">{exp.company}</p>
                            <p className="text-sm text-brand-text-secondary">{exp.startDate} - {exp.endDate}</p>
                            <p className="mt-2 text-sm text-brand-text-primary leading-snug">{exp.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        {/* Education Section */}
        <div className="mt-8 pt-6 border-t border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Education</h2>
            <div className="space-y-6">
                 {user.education.map((edu, index) => (
                    <div key={index} className="flex gap-4">
                         <div className="flex-shrink-0 mt-1">
                            <AcademicCapIcon className="w-8 h-8 text-brand-accent" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">{edu.school}</h3>
                            <p className="text-brand-text-primary">{edu.degree}, {edu.fieldOfStudy}</p>
                            <p className="text-sm text-brand-text-secondary">{edu.startDate} - {edu.endDate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Skills Section */}
        <div className="mt-8 pt-6 border-t border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Skills</h2>
            <div className="flex flex-wrap gap-3">
                {user.skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 text-sm font-medium bg-slate-700 text-brand-accent rounded-full">
                    {skill}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;