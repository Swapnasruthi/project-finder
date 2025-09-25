
import React from 'react';
import { Application, ApplicationStatus, Project } from '../types';
import CheckCircleIcon from './icons/CheckCircleIcon';
import XCircleIcon from './icons/XCircleIcon';
import ClockIcon from './icons/ClockIcon';

interface MyApplicationsProps {
  myApplications: Application[];
  projects: Project[];
}

const StatusIndicator: React.FC<{ status: ApplicationStatus }> = ({ status }) => {
  switch (status) {
    case ApplicationStatus.Accepted:
      return <div className="flex items-center text-green-400"><CheckCircleIcon className="w-5 h-5 mr-2" /> Accepted</div>;
    case ApplicationStatus.Rejected:
      return <div className="flex items-center text-red-400"><XCircleIcon className="w-5 h-5 mr-2" /> Rejected</div>;
    case ApplicationStatus.Pending:
    default:
      return <div className="flex items-center text-yellow-400"><ClockIcon className="w-5 h-5 mr-2" /> Pending</div>;
  }
};

const MyApplications: React.FC<MyApplicationsProps> = ({ myApplications, projects }) => {
  const getProjectTitle = (projectId: string) => {
    return projects.find(p => p.id === projectId)?.title || 'Unknown Project';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">My Applications</h1>
        <p className="mt-2 text-brand-text-secondary">Track the status of your project applications here.</p>
      </div>
      
      {myApplications.length > 0 ? (
        <div className="bg-brand-secondary rounded-lg shadow-lg overflow-hidden">
          <ul className="divide-y divide-slate-700">
            {myApplications.map(app => (
              <li key={app.id} className="p-4 sm:p-6 hover:bg-slate-800 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">{getProjectTitle(app.projectId)}</h2>
                    <p className="text-sm text-brand-text-secondary mt-1">Applied on {app.appliedDate}</p>
                    <p className="mt-3 text-sm text-brand-text-primary italic border-l-2 border-brand-accent pl-3">"{app.coverLetter}"</p>
                  </div>
                  <div className="font-semibold text-sm w-full sm:w-auto text-left sm:text-right">
                    <StatusIndicator status={app.status} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
         <div className="text-center py-16 bg-brand-secondary rounded-lg">
          <h2 className="text-xl font-semibold text-white">You haven't applied to any projects yet.</h2>
          <p className="mt-2 text-brand-text-secondary">Go to "Find Projects" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
