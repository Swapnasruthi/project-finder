import React from 'react';
import { View } from '../types';
import BriefcaseIcon from './icons/BriefcaseIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';
import UserGroupIcon from './icons/UserGroupIcon';
import UserCircleIcon from './icons/UserCircleIcon';
import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  breadcrumbs: BreadcrumbItem[];
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, breadcrumbs }) => {
  const navItems = [
    { view: View.ProjectListings, label: 'Find Projects', icon: <BriefcaseIcon className="w-5 h-5 mr-2" /> },
    { view: View.MyApplications, label: 'My Applications', icon: <DocumentTextIcon className="w-5 h-5 mr-2" /> },
    { view: View.MyProjects, label: 'My Projects', icon: <UserGroupIcon className="w-5 h-5 mr-2" /> },
  ];

  return (
    <header className="bg-brand-secondary/50 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-800/50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <BriefcaseIcon className="h-8 w-8 text-brand-accent" />
            <span className="text-xl font-bold ml-2 text-white">Project Finder</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentView === item.view
                    ? 'bg-brand-accent text-white'
                    : 'text-brand-text-secondary hover:bg-slate-700 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
            <button
              onClick={() => setCurrentView(View.Profile)}
              className={`flex items-center p-2 rounded-full transition-colors duration-200 ${
                currentView === View.Profile
                  ? 'bg-brand-accent text-white'
                  : 'text-brand-text-secondary hover:bg-slate-700 hover:text-white'
              }`}
              aria-label="My Profile"
            >
              <UserCircleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        {breadcrumbs.length > 0 && (
          <div className="pb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;