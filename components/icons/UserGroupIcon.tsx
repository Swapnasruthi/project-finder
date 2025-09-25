
import React from 'react';

const UserGroupIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a3.75 3.75 0 015.25 0m-5.25 0a3.75 3.75 0 00-5.25 0m3.75 0a9.094 9.094 0 013.741-.479m0 0a3 3 0 014.682-2.72m-4.682 2.72a3.75 3.75 0 005.25 0m-5.25 0a3.75 3.75 0 01-5.25 0m3.75-9a3 3 0 013-3 3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3zm-3.75 0a3 3 0 013-3 3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3z" />
  </svg>
);

export default UserGroupIcon;
