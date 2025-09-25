import { User, Project, Application, ApplicationStatus } from './types';

export const CURRENT_USER_ID = 'user-1';

export const USERS: User[] = [
  {
    id: 'user-1',
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    headline: 'Senior Frontend Engineer | React & TypeScript Expert',
    location: 'San Francisco, CA',
    bio: 'I am a passionate frontend engineer with over 8 years of experience building scalable and user-friendly web applications. My expertise lies in the React ecosystem, TypeScript, and modern UI/UX design principles. I thrive in collaborative environments and am always eager to tackle new challenges.',
    skills: ['React', 'TypeScript', 'Node.js', 'UI/UX Design', 'Next.js', 'GraphQL'],
    portfolioUrl: 'https://alexdoe.dev',
    profilePictureUrl: 'https://i.pravatar.cc/150?u=user-1',
    experience: [
      { title: 'Senior Frontend Engineer', company: 'Tech Solutions Inc.', startDate: '2020', endDate: 'Present', description: 'Leading the development of the main dashboard application using React and TypeScript. Implemented a new design system, improving performance by 30%.' },
      { title: 'Frontend Developer', company: 'Innovate Co.', startDate: '2017', endDate: '2020', description: 'Developed and maintained client-facing features for a large-scale e-commerce platform.' },
    ],
    education: [
      { school: 'University of California, Berkeley', degree: 'B.S. in Computer Science', fieldOfStudy: 'Computer Science', startDate: '2013', endDate: '2017' }
    ]
  },
  {
    id: 'user-2',
    name: 'Brenda Smith',
    email: 'brenda.smith@example.com',
    headline: 'Data Scientist | Machine Learning Specialist',
    location: 'New York, NY',
    bio: 'Data scientist with a knack for turning large datasets into actionable insights. Proficient in Python, TensorFlow, and various machine learning models for predictive analytics and natural language processing.',
    skills: ['Python', 'Data Science', 'Machine Learning', 'TensorFlow', 'Pandas', 'Scikit-learn'],
    portfolioUrl: 'https://brendasmith.io',
    profilePictureUrl: 'https://i.pravatar.cc/150?u=user-2',
    experience: [
      { title: 'Data Scientist', company: 'Data Insights LLC', startDate: '2019', endDate: 'Present', description: 'Building predictive models to forecast sales trends and customer behavior.' },
    ],
    education: [
       { school: 'Stanford University', degree: 'M.S. in Data Science', fieldOfStudy: 'Data Science', startDate: '2017', endDate: '2019' }
    ]
  },
  {
    id: 'user-3',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    headline: 'Certified Project Manager (PMP)',
    location: 'Chicago, IL',
    bio: 'Agile and results-driven Project Manager with a successful track record of leading cross-functional teams to deliver projects on time and within budget. Expert in Scrum methodologies and stakeholder communication.',
    skills: ['Project Management', 'Agile', 'Scrum', 'JIRA', 'Confluence', 'Risk Management'],
    profilePictureUrl: 'https://i.pravatar.cc/150?u=user-3',
    experience: [
      { title: 'Project Manager', company: 'Global Tech', startDate: '2018', endDate: 'Present', description: 'Managed the full project lifecycle for multiple software development projects.' },
    ],
    education: [
       { school: 'University of Illinois', degree: 'MBA', fieldOfStudy: 'Business Administration', startDate: '2016', endDate: '2018' }
    ]
  },
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    applicant: USERS[1],
    projectId: 'proj-1',
    coverLetter: "I'm very interested in the data science aspects of this project and believe my skills in Python and ML would be a great fit.",
    status: ApplicationStatus.Pending,
    appliedDate: '2023-10-25',
  },
  {
    id: 'app-2',
    applicant: USERS[2],
    projectId: 'proj-1',
    coverLetter: 'As an experienced project manager, I can ensure this project stays on track and delivers results efficiently.',
    status: ApplicationStatus.Accepted,
    appliedDate: '2023-10-24',
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-4',
    title: 'Project Gaia: Environmental Impact Tracker',
    description: 'A web platform to help individuals and businesses track and reduce their carbon footprint.',
    longDescription: 'Join us in building Project Gaia, a comprehensive tool for monitoring environmental impact. The platform will feature real-time data visualization, personalized suggestions for sustainable living, and a community feature to share progress. We need passionate developers who care about the planet.',
    skills: ['JavaScript', 'Vue.js', 'Node.js', 'MongoDB', 'Data Visualization'],
    creatorId: 'user-2',
    creatorName: 'Brenda Smith',
    postedDate: '2023-10-28',
    applications: [],
  },
  {
    id: 'proj-5',
    title: 'Indie Game Studio: \'Pixel Odyssey\'',
    description: 'Join a small team of indie developers creating a retro-style 2D platformer game.',
    longDescription: 'Pixel Odyssey is a love letter to classic 8-bit games. We\'re looking for a pixel artist, a game developer with experience in Godot or Unity, and a sound designer to help us create a memorable adventure. If you love games and creative collaboration, this is the project for you.',
    skills: ['Game Development', 'Pixel Art', 'Godot', 'Unity', 'Aseprite'],
    creatorId: 'user-3',
    creatorName: 'Charlie Brown',
    postedDate: '2023-10-27',
    applications: [],
  },
  {
    id: 'proj-6',
    title: 'Open-Source Contributor Hub',
    description: 'A platform to connect new developers with open-source projects looking for contributors.',
    longDescription: 'The goal is to lower the barrier to entry for open-source contribution. The hub will feature project listings, mentorship opportunities, and resources for first-time contributors. We are building this with a community-first approach and are looking for backend and frontend developers.',
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker'],
    creatorId: 'user-2',
    creatorName: 'Brenda Smith',
    postedDate: '2023-10-26',
    applications: [],
  },
  {
    id: 'proj-7',
    title: 'EdTech Platform: Interactive Learning Modules',
    description: 'Develop interactive, gamified learning modules for a K-12 educational platform.',
    longDescription: 'We believe learning should be fun and engaging. This project involves creating a series of web-based educational modules on subjects like math and science. We need developers with a passion for education and experience in creating interactive web content.',
    skills: ['TypeScript', 'React', 'Firebase', 'Framer Motion', 'UI/UX Design'],
    creatorId: 'user-3',
    creatorName: 'Charlie Brown',
    postedDate: '2023-10-22',
    applications: [],
  },
  {
    id: 'proj-1',
    title: 'AI-Powered Financial Advisor',
    description: 'Develop an AI chatbot to provide personalized financial advice based on user data.',
    longDescription: 'This project aims to build a cutting-edge financial advisor powered by generative AI. The system will analyze user spending habits, investment goals, and risk tolerance to offer actionable advice. We need experts in machine learning, backend development, and frontend to create an intuitive user experience.',
    skills: ['Python', 'Machine Learning', 'React', 'Project Management'],
    creatorId: CURRENT_USER_ID,
    creatorName: 'Alex Doe (You)',
    postedDate: '2023-10-20',
    applications: MOCK_APPLICATIONS,
  },
  {
    id: 'proj-2',
    title: 'E-commerce Platform Overhaul',
    description: 'A complete redesign and migration of a legacy e-commerce system to a modern stack.',
    longDescription: 'Our current e-commerce platform is slow and outdated. We are looking for a team to lead a complete overhaul. This involves migrating to a headless architecture using Next.js for the frontend and a Node.js microservices backend. Strong experience in UI/UX, database design, and cloud infrastructure is required.',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'UI/UX Design'],
    creatorId: 'user-3',
    creatorName: 'Charlie Brown',
    postedDate: '2023-10-18',
    applications: [],
  },
  {
    id: 'proj-3',
    title: 'Mobile Health & Fitness Tracker',
    description: 'Build a cross-platform mobile app for tracking workouts, nutrition, and wellness goals.',
    longDescription: 'We want to create the next big thing in health and fitness. This mobile app will feature real-time workout tracking, a comprehensive food diary, and personalized wellness plans. We are looking for React Native developers, UI/UX designers, and backend engineers to bring this vision to life.',
    skills: ['React Native', 'Firebase', 'UI/UX Design', 'API Integration'],
    creatorId: 'user-2',
    creatorName: 'Brenda Smith',
    postedDate: '2023-10-15',
    applications: [
      {
        id: 'app-3',
        applicant: USERS[0],
        projectId: 'proj-3',
        coverLetter: 'My experience in building beautiful and functional UIs with React would be perfect for your mobile app. I can lead the frontend development effort.',
        status: ApplicationStatus.Pending,
        appliedDate: '2023-10-26',
      }
    ],
  },
];

export const ALL_SKILLS = [...new Set(MOCK_PROJECTS.flatMap(p => p.skills))].sort();