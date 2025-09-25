export enum ApplicationStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

export enum View {
  ProjectListings,
  MyApplications,
  MyProjects,
  ProjectDetails,
  CreateProject,
  Profile,
  UserProfile,
}

export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  headline: string;
  location: string;
  bio: string;
  skills: string[];
  portfolioUrl?: string;
  profilePictureUrl?: string;
  experience: Experience[];
  education: Education[];
}

export interface Application {
  id: string;
  applicant: User;
  projectId: string;
  coverLetter: string;
  status: ApplicationStatus;
  appliedDate: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  skills: string[];
  creatorId: string;
  creatorName: string;
  postedDate: string;
  applications: Application[];
}