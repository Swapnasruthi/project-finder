
import React, { useState } from 'react';
import { Project } from '../types';

interface ApplyModalProps {
  project: Project;
  onClose: () => void;
  onSubmit: (projectId: string, coverLetter: string) => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ project, onClose, onSubmit }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit(project.id, coverLetter);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-secondary rounded-lg shadow-xl w-full max-w-lg p-6 sm:p-8 transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Apply to {project.title}</h2>
          <button onClick={onClose} className="text-brand-text-secondary hover:text-white">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <p className="text-brand-text-secondary mb-4">
            Briefly explain why you're a good fit for this project.
          </p>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Your cover letter..."
            rows={8}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
            required
          />
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 text-white text-sm font-semibold rounded-lg hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-brand-accent text-white text-sm font-semibold rounded-lg hover:bg-sky-400 transition-colors disabled:bg-sky-800 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
