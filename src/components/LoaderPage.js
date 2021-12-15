import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const LoaderPage = () => {
  return (
    <div className="siteLoader">
      <ClipLoader color={'rgba(16,120,98,1)'} size={50} />
    </div>
  );
};

export default LoaderPage;
