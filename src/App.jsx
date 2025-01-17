import React from 'react';
import Navbar from './components/Navbar';
import Generator from './components/Generator';
import Footer from './components/Footer';
function App() {

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
        <Generator />
      </div>
      <Footer />
    </>
  );
}

export default App;
