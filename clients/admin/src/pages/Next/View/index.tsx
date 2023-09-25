import React from 'react';
import { Link } from 'react-router-dom';

const View = () => {
  return (
    <div>
      <p>Next page</p>
      <Link to={'/products'}>Домой</Link>
    </div>
  );
};

export default View;
