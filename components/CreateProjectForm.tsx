import React, { useState } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import SkillInput from './SkillInput';

interface CreateProjectFormProps {
  onCreateProject: (projectData: { title: string; description: string; longDescription: string; skills: string[]; }) => void;
  onCancel: () => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onCreateProject, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !longDescription || skills.length === 0) {
      alert('Please fill out all fields, including at least one skill.');
      return;
    }
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
        onCreateProject({ title, description, longDescription, skills });
        setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <button onClick={onCancel} className="flex items-center gap-2 text-brand-accent hover:text-sky-300 transition-colors mb-4">
          <ArrowLeftIcon className="w-5 h-5" />
          Back to My Projects
        </button>
        <h1 className="text-4xl font-extrabold text-white">Create a New Project</h1>
        <p className="mt-2 text-brand-text-secondary">Fill in the details below to post your project.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-brand-secondary p-6 sm:p-8 rounded-lg space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-brand-text-secondary mb-2">Project Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
            placeholder="e.g., AI-Powered Financial Advisor"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-brand-text-secondary mb-2">Short Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
            placeholder="A brief summary of the project that will appear on the project card."
            required
          />
        </div>
        <div>
          <label htmlFor="longDescription" className="block text-sm font-medium text-brand-text-secondary mb-2">Detailed Description</label>
          <textarea
            id="longDescription"
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            rows={8}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
            placeholder="A full description of the project, including goals, scope, and requirements."
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-text-secondary mb-2">Required Skills</label>
          <SkillInput 
            skills={skills}
            setSkills={setSkills}
            placeholder="e.g., React, Python, Machine Learning"
          />
           <p className="text-xs text-brand-text-secondary mt-1">Type a skill and press Enter or comma to add it.</p>
        </div>
        <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-slate-700 text-white text-sm font-semibold rounded-lg hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-brand-accent text-white text-sm font-semibold rounded-lg hover:bg-sky-400 transition-colors disabled:bg-sky-800 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
