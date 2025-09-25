
import React from 'react';
import { Project } from '../types';
import { CURRENT_USER_ID } from '../constants';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  onViewCreatorProfile: (creatorId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails, onViewCreatorProfile }) => {
  return (
    <div className="bg-brand-secondary rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <div className="p-6">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <div className="text-sm text-brand-text-secondary mt-1">
                  by {project.creatorId !== CURRENT_USER_ID ? (
                    <button
                      onClick={() => onViewCreatorProfile(project.creatorId)}
                      className="hover:text-brand-accent hover:underline focus:outline-none focus:text-brand-accent transition-colors"
                    >
                      {project.creatorName}
                    </button>
                  ) : (
                    <span>{project.creatorName}</span>
                  )}
                </div>
            </div>
            <span className="text-xs text-brand-text-secondary">{project.postedDate}</span>
        </div>
        
        <p className="mt-4 text-brand-text-primary text-sm leading-relaxed h-20 overflow-hidden text-ellipsis">
          {project.description}
        </p>
        
        <div className="mt-4">
          <h4 className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">Required Skills</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.skills.slice(0, 4).map((skill) => (
              <span key={skill} className="px-2 py-1 text-xs font-medium bg-slate-700 text-brand-accent rounded-full">
                {skill}
              </span>
            ))}
            {project.skills.length > 4 && (
                <span className="px-2 py-1 text-xs font-medium bg-slate-700 text-brand-accent rounded-full">
                    +{project.skills.length - 4} more
                </span>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => onViewDetails(project)}
            className="px-4 py-2 bg-brand-accent text-white text-sm font-semibold rounded-lg hover:bg-sky-400 transition-colors"
          >
            View Details & Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;