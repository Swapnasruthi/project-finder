import React from 'react';
import ChevronRightIcon from './icons/ChevronRightIcon';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center text-sm text-brand-text-secondary" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="w-4 h-4 mx-1 flex-shrink-0" />
            )}
            {item.onClick && index < items.length - 1 ? (
              <button
                onClick={item.onClick}
                className="hover:text-brand-accent transition-colors truncate"
              >
                {item.label}
              </button>
            ) : (
              <span className={`truncate ${index === items.length - 1 ? "text-brand-text-primary font-medium" : ""}`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
