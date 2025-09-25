
import React from 'react';

const BriefcaseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.07a2.25 2.25 0 01-2.25 2.25H5.998a2.25 2.25 0 01-2.25-2.25v-4.07m16.5 0v-3.875c0-1.096-.904-1.99-2.002-1.99h-1.144c-.297 0-.584-.134-.785-.357L14.75 8.118a1.99 1.99 0 00-2.828 0L9.136 9.923c-.201.223-.488.357-.785.357H7.252a1.99 1.99 0 00-2.002 1.99v3.875M16.5 14.15v-3.875a1.99 1.99 0 00-2.002-1.99h-1.144c-.297 0-.584-.134-.785-.357L10.75 8.118a1.99 1.99 0 00-2.828 0L6.136 9.923c-.201.223-.488.357-.785.357H4.252a1.99 1.99 0 00-2.002 1.99v3.875" />
  </svg>
);

export default BriefcaseIcon;
