
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProjectListings from './components/ProjectListings';
import MyApplications from './components/MyApplications';
import MyProjects from './components/MyProjects';
import ProjectDetails from './components/ProjectDetails';
import CreateProjectForm from './components/CreateProjectForm';
import ProfilePage from './components/ProfilePage';
import UserProfile from './components/UserProfile';
import { BreadcrumbItem } from './components/Breadcrumbs';
import { View, Project, Application, ApplicationStatus, User } from './types';
import { MOCK_PROJECTS, CURRENT_USER_ID, USERS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.ProjectListings);
  const [previousView, setPreviousView] = useState<View | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = USERS.find(u => u.id === CURRENT_USER_ID) || null;
    setCurrentUser(user);

    // On mount, find all applications by the current user from the mock data
    const userApplications = MOCK_PROJECTS.flatMap(p => p.applications)
      .filter(app => app.applicant.id === CURRENT_USER_ID);
    setMyApplications(userApplications);
  }, []);

  const handleViewDetails = (project: Project) => {
    setPreviousView(currentView);
    setSelectedProject(project);
    setCurrentView(View.ProjectDetails);
  };
  
  const handleBackToListings = () => {
    setSelectedProject(null);
    setCurrentView(View.ProjectListings);
  };
  
  const handleApply = (projectId: string, coverLetter: string) => {
    if (!currentUser) return;

    const newApplication: Application = {
      id: `app-${Date.now()}`,
      applicant: currentUser,
      projectId,
      coverLetter,
      status: ApplicationStatus.Pending,
      appliedDate: new Date().toISOString().split('T')[0],
    };

    setProjects(prevProjects => 
      prevProjects.map(p => 
        p.id === projectId ? { ...p, applications: [...p.applications, newApplication] } : p
      )
    );
    setMyApplications(prevApps => [...prevApps, newApplication]);
  };

  const handleUpdateApplicationStatus = (projectId: string, applicationId: string, newStatus: ApplicationStatus) => {
     setProjects(prevProjects => 
      prevProjects.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            applications: p.applications.map(app => 
              app.id === applicationId ? { ...app, status: newStatus } : app
            )
          };
        }
        return p;
      })
    );
  };

  const handleCreateProject = (projectData: { title: string; description: string; longDescription: string; skills: string[]; }) => {
    if (!currentUser) return;

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      creatorId: CURRENT_USER_ID,
      creatorName: `${currentUser.name} (You)`,
      postedDate: new Date().toISOString().split('T')[0],
      applications: [],
      ...projectData,
    };

    setProjects(prevProjects => [newProject, ...prevProjects]);
    setCurrentView(View.MyProjects);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
      setCurrentView(View.MyProjects);
    }
  };

  const handleUpdateUser = (updatedUserData: Partial<Omit<User, 'id'>>) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updatedUserData };
    setCurrentUser(updatedUser);

    setProjects(prevProjects => prevProjects.map(p => {
        let newCreatorName = p.creatorName;
        if (p.creatorId === currentUser.id) {
            newCreatorName = `${updatedUser.name} (You)`;
        }

        const newApplications = p.applications.map(app => {
            if (app.applicant.id === currentUser.id) {
                return { ...app, applicant: updatedUser };
            }
            return app;
        });

        return { ...p, creatorName: newCreatorName, applications: newApplications };
    }));

    setMyApplications(prevApps => prevApps.map(app => {
        if (app.applicant.id === currentUser.id) {
            return { ...app, applicant: updatedUser };
        }
        return app;
    }));
    
    alert("Profile updated successfully!");
  };

  const handleViewUserProfile = (user: User) => {
    setPreviousView(currentView);
    setSelectedUser(user);
    setCurrentView(View.UserProfile);
  };

  const handleViewCreatorProfile = (creatorId: string) => {
    const userToView = USERS.find(u => u.id === creatorId);
    if (userToView) {
      handleViewUserProfile(userToView);
    }
  };

  const handleBackFromProfile = () => {
    setSelectedUser(null);
    setCurrentView(previousView || View.MyProjects);
    setPreviousView(null);
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const home: BreadcrumbItem = { label: 'Project Finder', onClick: () => setCurrentView(View.ProjectListings) };
    const crumbs: BreadcrumbItem[] = [];

    switch (currentView) {
        case View.ProjectListings:
            return []; // No breadcrumbs on the home page
        case View.MyApplications:
            crumbs.push(home, { label: 'My Applications' });
            break;
        case View.MyProjects:
            crumbs.push(home, { label: 'My Projects' });
            break;
        case View.ProjectDetails:
            if (selectedProject) {
                const parentView = previousView === View.MyApplications ? 'My Applications' : 'Find Projects';
                const parentOnClick = previousView === View.MyApplications ? () => setCurrentView(View.MyApplications) : handleBackToListings;
                crumbs.push(home, { label: parentView, onClick: parentOnClick });
                crumbs.push({ label: selectedProject.title });
            }
            break;
        case View.CreateProject:
            crumbs.push(home, { label: 'My Projects', onClick: () => setCurrentView(View.MyProjects) });
            crumbs.push({ label: 'Create Project' });
            break;
        case View.Profile:
            crumbs.push(home, { label: 'My Profile' });
            break;
        case View.UserProfile:
            if (selectedUser) {
                 crumbs.push(home);
                if (previousView === View.MyProjects || previousView === View.ProjectListings) {
                    crumbs.push({ label: previousView === View.MyProjects ? 'My Projects' : 'Find Projects', onClick: handleBackFromProfile });
                }
                crumbs.push({ label: selectedUser.name });
            }
            break;
        default:
            return [];
    }
    return crumbs;
  };

  const renderContent = () => {
    switch (currentView) {
      case View.MyApplications:
        return <MyApplications myApplications={myApplications} projects={projects} />;
      case View.MyProjects:
        return <MyProjects allProjects={projects} updateApplicationStatus={handleUpdateApplicationStatus} setCurrentView={setCurrentView} onViewProfile={handleViewUserProfile} onDeleteProject={handleDeleteProject} />;
      case View.ProjectDetails:
        if (selectedProject) {
          return <ProjectDetails project={selectedProject} onBack={handleBackToListings} onApply={handleApply} myApplications={myApplications} />;
        }
        return null;
      case View.CreateProject:
        return <CreateProjectForm onCreateProject={handleCreateProject} onCancel={() => setCurrentView(View.MyProjects)} />;
      case View.Profile:
        return currentUser ? <ProfilePage 
            currentUser={currentUser} 
            onUpdateUser={handleUpdateUser}
            projects={projects.filter(p => p.creatorId === currentUser.id)}
            myApplications={myApplications}
            onViewDetails={handleViewDetails}
        /> : <div>Loading...</div>;
      case View.UserProfile:
        return selectedUser ? <UserProfile user={selectedUser} onBack={handleBackFromProfile} /> : <div>User not found.</div>;
      case View.ProjectListings:
      default:
        return <ProjectListings projects={projects} onViewDetails={handleViewDetails} onViewCreatorProfile={handleViewCreatorProfile} />;
    }
  };

  const breadcrumbItems = generateBreadcrumbs();

  return (
    <div className="min-h-screen bg-brand-primary">
      <Header currentView={currentView} setCurrentView={setCurrentView} breadcrumbs={breadcrumbItems} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;