import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
    <Link to="/profile">Profile</Link>
  </div>
);

export default Dashboard;
