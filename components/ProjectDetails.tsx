
import React, { useState } from 'react';
import { Project, Application } from '../types';
import ApplyModal from './ApplyModal';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import { CURRENT_USER_ID } from '../constants';

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
  onApply: (projectId: string, coverLetter: string) => void;
  myApplications: Application[];
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onBack, onApply, myApplications }) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const hasApplied = myApplications.some(app => app.projectId === project.id);
  const isCreator = project.creatorId === CURRENT_USER_ID;

  return (
    <div className="space-y-8">
      <div>
        <button onClick={onBack} className="flex items-center gap-2 text-brand-accent hover:text-sky-300 transition-colors mb-4">
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Projects
        </button>
        <h1 className="text-4xl font-extrabold text-white">{project.title}</h1>
        <p className="mt-2 text-brand-text-secondary">Posted by {project.creatorName} on {project.postedDate}</p>
      </div>

      <div className="bg-brand-secondary p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Project Description</h2>
        <p className="text-brand-text-primary whitespace-pre-wrap leading-relaxed">{project.longDescription}</p>
      </div>

      <div className="bg-brand-secondary p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Required Skills</h2>
        <div className="flex flex-wrap gap-3">
          {project.skills.map(skill => (
            <span key={skill} className="px-3 py-1.5 text-sm font-medium bg-slate-700 text-brand-accent rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        {isCreator ? (
          <button className="px-6 py-3 bg-slate-600 text-white text-base font-semibold rounded-lg cursor-not-allowed" disabled>
            This is your project
          </button>
        ) : hasApplied ? (
          <button className="px-6 py-3 bg-green-600 text-white text-base font-semibold rounded-lg cursor-not-allowed" disabled>
            Already Applied
          </button>
        ) : (
          <button 
            onClick={() => setIsApplyModalOpen(true)}
            className="px-6 py-3 bg-brand-accent text-white text-base font-semibold rounded-lg hover:bg-sky-400 transition-colors"
          >
            Apply Now
          </button>
        )}
      </div>

      {isApplyModalOpen && (
        <ApplyModal
          project={project}
          onClose={() => setIsApplyModalOpen(false)}
          onSubmit={onApply}
        />
      )}
    </div>
  );
};

export default ProjectDetails;
