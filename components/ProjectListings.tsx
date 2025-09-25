import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import { ALL_SKILLS } from '../constants';
import ProjectCard from './ProjectCard';
import MultiSelectDropdown from './MultiSelectDropdown';

interface ProjectListingsProps {
  projects: Project[];
  onViewDetails: (project: Project) => void;
  onViewCreatorProfile: (creatorId: string) => void;
}

const ProjectListings: React.FC<ProjectListingsProps> = ({ projects, onViewDetails, onViewCreatorProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearchTerm = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSkills = selectedSkills.length === 0 || selectedSkills.every(skill => project.skills.includes(skill));
      return matchesSearchTerm && matchesSkills;
    });
  }, [projects, searchTerm, selectedSkills]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Find Your Next Project</h1>
        <p className="mt-2 text-brand-text-secondary">Browse through the available projects and find one that matches your skills.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow bg-brand-secondary border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
        />
        <MultiSelectDropdown
          options={ALL_SKILLS}
          selectedOptions={selectedSkills}
          onChange={setSelectedSkills}
          placeholder="Filter by skills"
        />
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onViewDetails={onViewDetails} onViewCreatorProfile={onViewCreatorProfile} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-brand-secondary rounded-lg">
          <h2 className="text-xl font-semibold text-white">No Projects Found</h2>
          <p className="mt-2 text-brand-text-secondary">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectListings;