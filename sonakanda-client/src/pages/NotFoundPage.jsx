import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="space-y-4 text-center py-20">
      <h1 className="text-5xl font-bold text-slate-500">404</h1>
      <p className="text-sm text-slate-300">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
