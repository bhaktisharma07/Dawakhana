import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  SearchCode, 
  MessageSquare, 
  FileText, 
  TrendingUp,
  UserCheck,
  Calendar
} from 'lucide-react';

const Sidebar = () => {
  const { role, activeTab, setActiveTab } = useApp();

  if (activeTab === 'landing') return null;

  return (
    <aside className="glass-dark no-print" style={{
      width: '260px',
      position: 'fixed',
      top: '70px',
      left: 0,
      bottom: 0,
      zIndex: 90,
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      color: '#cbd5e1'
    }}>
      <div style={{ marginBottom: '1.5rem', paddingLeft: '0.5rem' }}>
        <span style={{ 
          fontSize: '0.75rem', 
          fontWeight: 700, 
          textTransform: 'uppercase', 
          letterSpacing: '1px',
          color: '#94a3b8'
        }}>
          {role === 'doctor' ? 'Clinical Workspace' : 'My Health Portal'}
        </span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
        {role === 'doctor' ? (
          /* Doctor Navigation Actions */
          <>
            <button 
              className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : ''}`}
              onClick={() => setActiveTab('dashboard')}
              style={{
                justifyContent: 'flex-start',
                backgroundColor: activeTab === 'dashboard' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'dashboard' ? 'white' : '#cbd5e1',
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                border: 'none',
                width: '100%'
              }}
            >
              <LayoutDashboard size={18} />
              <span>Doctor Dashboard</span>
            </button>

            <button 
              className={`btn ${activeTab === 'records' ? 'btn-primary' : ''}`}
              onClick={() => setActiveTab('records')}
              style={{
                justifyContent: 'flex-start',
                backgroundColor: activeTab === 'records' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'records' ? 'white' : '#cbd5e1',
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                border: 'none',
                width: '100%'
              }}
            >
              <Users size={18} />
              <span>Patients</span>
            </button>

            <button 
              className={`btn ${activeTab === 'appointments' ? 'btn-primary' : ''}`}
              onClick={() => setActiveTab('appointments')}
              style={{
                justifyContent: 'flex-start',
                backgroundColor: activeTab === 'appointments' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'appointments' ? 'white' : '#cbd5e1',
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                border: 'none',
                width: '100%'
              }}
            >
              <Calendar size={18} />
              <span>Appointments</span>
            </button>
          </>
        ) : (
          /* Patient Navigation Actions */
          <>
            <button 
              className={`btn ${activeTab === 'patient-dashboard' ? 'btn-primary' : ''}`}
              onClick={() => setActiveTab('patient-dashboard')}
              style={{
                justifyContent: 'flex-start',
                backgroundColor: activeTab === 'patient-dashboard' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'patient-dashboard' ? 'white' : '#cbd5e1',
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                border: 'none',
                width: '100%'
              }}
            >
              <UserCheck size={18} />
              <span>My Dashboard</span>
            </button>

            <button 
              className={`btn ${activeTab === 'chat' ? 'btn-primary' : ''}`}
              onClick={() => setActiveTab('chat')}
              style={{
                justifyContent: 'flex-start',
                backgroundColor: activeTab === 'chat' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'chat' ? 'white' : '#cbd5e1',
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                border: 'none',
                width: '100%'
              }}
            >
              <MessageSquare size={18} />
              <span>Chat with Doctor</span>
            </button>

            <button 
              className={`btn ${activeTab === 'tracker' ? 'btn-primary' : ''}`}
              onClick={() => setActiveTab('tracker')}
              style={{
                justifyContent: 'flex-start',
                backgroundColor: activeTab === 'tracker' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'tracker' ? 'white' : '#cbd5e1',
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                border: 'none',
                width: '100%'
              }}
            >
              <TrendingUp size={18} />
              <span>Recovery Tracker</span>
            </button>

            <button 
              className={`btn ${activeTab === 'patient-documents' ? 'btn-primary' : ''}`}
              onClick={() => setActiveTab('patient-documents')}
              style={{
                justifyContent: 'flex-start',
                backgroundColor: activeTab === 'patient-documents' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'patient-documents' ? 'white' : '#cbd5e1',
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                border: 'none',
                width: '100%'
              }}
            >
              <FileText size={18} />
              <span>My Documents</span>
            </button>
          </>
        )}
      </nav>

      <div style={{
        padding: '0.75rem',
        borderRadius: 'var(--radius)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        fontSize: '0.8rem',
        color: '#94a3b8',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>Security Sandbox</div>
        <div>All session data is locked locally in-memory.</div>
      </div>
    </aside>
  );
};

export default Sidebar;
