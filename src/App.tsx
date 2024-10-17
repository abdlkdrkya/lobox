import React from 'react';
import DropdownMenu from './components/DropdownMenu';
import './App.scss';

const categories = [
  { name: 'Education', icon: 'FaBook' },
  { name: 'Yeeeah, science!', icon: 'FaFlask' },
  { name: 'Art', icon: 'FaPaintBrush' },
  { name: 'Sport', icon: 'FaFutbol' },
  { name: 'Games', icon: 'FaGamepad' },
  { name: 'Health', icon: 'FaHeartbeat' }
];

const App: React.FC = () => {
  return (
    <div className="container">
      <DropdownMenu categories={categories} />
    </div>
  );
};

export default App;
