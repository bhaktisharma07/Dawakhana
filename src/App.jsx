import React from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import AddPatient from './pages/AddPatient';
import Records from './pages/Records';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import PatientPortal from './pages/PatientPortal';
import RecoveryTracker from './pages/RecoveryTracker';
import Documents from './pages/Documents';
import Appointments from './pages/Appointments';

function App() {
  const { activeTab, role } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'landing':
        return <Landing />;
      case 'dashboard':
        return <Dashboard />;
      case 'add-patient':
        return <AddPatient />;
      case 'records':
        return <Records />;
      case 'profile':
        return <Profile />;
      case 'appointments':
        return <Appointments />;
      case 'chat':
        return <Chat />;
      case 'patient-dashboard':
        return <PatientPortal />;
      case 'tracker':
        return <RecoveryTracker />;
      case 'patient-documents':
        return <Documents />;
      default:
        return <Landing />;
    }
  };

  const isLanding = activeTab === 'landing';

  return (
    <div>
      <Header />
      <div className="app-container">
        {!isLanding && <Sidebar />}
        <main 
          className={!isLanding ? "main-content" : ""} 
          style={{ width: '100%' }}
        >
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}

export default App;
