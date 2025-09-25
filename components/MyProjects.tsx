import React, { useState } from 'react';
import { Project, Application, ApplicationStatus, View, User } from '../types';
import { CURRENT_USER_ID } from '../constants';
import PlusCircleIcon from './icons/PlusCircleIcon';
import TrashIcon from './icons/TrashIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import ConfirmationModal from './ConfirmationModal';

interface MyProjectsProps {
  allProjects: Project[];
  updateApplicationStatus: (projectId: string, applicationId: string, newStatus: ApplicationStatus) => void;
  setCurrentView: (view: View) => void;
  onViewProfile: (user: User) => void;
  onDeleteProject: (projectId: string) => void;
}

const ApplicantCard: React.FC<{
  application: Application;
  onStatusChange: (newStatus: ApplicationStatus) => void;
  onViewProfile: (user: User) => void;
}> = ({ application, onStatusChange, onViewProfile }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <button onClick={() => onViewProfile(application.applicant)} className="font-bold text-white text-left hover:text-brand-accent transition-colors">
            <h4 className="text-lg">{application.applicant.name}</h4>
          </button>
          <p className="text-sm text-brand-text-secondary">{application.applicant.headline}</p>
          <a href={`mailto:${application.applicant.email}`} className="text-sm text-brand-accent hover:underline">{application.applicant.email}</a>
          {application.applicant.portfolioUrl && (
             <a href={application.applicant.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-accent hover:underline block mt-1">View Portfolio</a>
          )}
        </div>
        <span className="text-xs text-brand-text-secondary">{application.appliedDate}</span>
      </div>
      <p className="text-sm text-brand-text-primary mt-3 mb-4 italic border-l-2 border-slate-600 pl-3">"{application.coverLetter}"</p>
      <div className="flex justify-end gap-2">
        {application.status === ApplicationStatus.Pending ? (
          <>
            <button onClick={() => onStatusChange(ApplicationStatus.Accepted)} className="px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-md hover:bg-green-500">Accept</button>
            <button onClick={() => onStatusChange(ApplicationStatus.Rejected)} className="px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-500">Reject</button>
          </>
        ) : (
          <span className={`text-xs font-bold ${application.status === ApplicationStatus.Accepted ? 'text-green-400' : 'text-red-400'}`}>
            {application.status}
          </span>
        )}
      </div>
    </div>
  );
};

const MyProjects: React.FC<MyProjectsProps> = ({ allProjects, updateApplicationStatus, setCurrentView, onViewProfile, onDeleteProject }) => {
  const myProjects = allProjects.filter(p => p.creatorId === CURRENT_USER_ID);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(myProjects.length > 0 ? myProjects[0].id : null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const toggleProject = (projectId: string) => {
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
  };

  const handleOpenDeleteConfirm = (project: Project) => {
    setProjectToDelete(project);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      onDeleteProject(projectToDelete.id);
      setIsConfirmModalOpen(false);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="space-y-8">
       <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My Projects</h1>
          <p className="mt-2 text-brand-text-secondary">Manage your posted projects and review applications.</p>
        </div>
        <button 
          onClick={() => setCurrentView(View.CreateProject)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-accent text-white text-sm font-semibold rounded-lg hover:bg-sky-400 transition-colors"
        >
          <PlusCircleIcon className="w-5 h-5" />
          Create New Project
        </button>
      </div>

      {myProjects.length > 0 ? (
        <div className="space-y-4">
          {myProjects.map(project => (
            <div key={project.id} className="bg-brand-secondary rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 flex justify-between items-center">
                <div className="flex-grow">
                    <h2 className="text-xl font-bold text-white">{project.title}</h2>
                    <p className="text-sm text-brand-text-secondary mt-1">{project.applications.length} Applicant(s)</p>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => handleOpenDeleteConfirm(project)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-full transition-colors"
                        aria-label={`Delete project ${project.title}`}
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => toggleProject(project.id)} 
                        className={`p-2 text-brand-text-secondary hover:text-white transition-transform transform ${expandedProjectId === project.id ? 'rotate-180' : ''}`}
                        aria-expanded={expandedProjectId === project.id}
                    >
                        <ChevronDownIcon className="w-6 h-6" />
                    </button>
                </div>
              </div>
              {expandedProjectId === project.id && (
                <div className="p-4 sm:p-6 border-t border-slate-700">
                  {project.applications.length > 0 ? (
                    <div className="space-y-4">
                      {project.applications.map(app => (
                        <ApplicantCard 
                            key={app.id} 
                            application={app}
                            onStatusChange={(newStatus) => updateApplicationStatus(project.id, app.id, newStatus)}
                            onViewProfile={onViewProfile}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-brand-text-secondary text-center py-4">No applications received yet.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-brand-secondary rounded-lg">
            <h2 className="text-xl font-semibold text-white">You haven't created any projects.</h2>
            <p className="mt-2 text-brand-text-secondary">Click the "Create New Project" button to get started.</p>
        </div>
      )}

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default MyProjects;
