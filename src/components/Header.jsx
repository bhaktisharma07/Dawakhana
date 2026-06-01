import React from 'react';
import { useApp } from '../context/AppContext';
import { mockDoctors } from '../data/mockDatabase';
import { Stethoscope, LogOut, User, Activity } from 'lucide-react';

const Header = () => {
  const { role, setRole, activeUser, setActiveUser, handleLogout, activeTab, setActiveTab, patients } = useApp();

  const handleUserSelect = (e) => {
    const val = e.target.value;
    if (val === '') {
      setActiveUser(null);
    } else {
      setActiveUser(val);
    }
  };

  const getActiveUserDetail = () => {
    if (!activeUser) return null;
    if (role === 'doctor') {
      return mockDoctors.find(d => d.id === activeUser);
    } else {
      return patients.find(p => p.id === activeUser);
    }
  };

  const activeUserDetail = getActiveUserDetail();

  return (
    <header className="glass no-print" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '70px',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Logo */}
      <div 
        onClick={() => setActiveTab('landing')} 
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
      >
        <div style={{
          backgroundColor: 'var(--primary)',
          color: 'white',
          padding: '0.4rem',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Stethoscope size={22} />
        </div>
        <span style={{
          fontFamily: 'var(--font-title)',
          fontSize: '1.4rem',
          fontWeight: 800,
          color: 'var(--primary-dark)',
          letterSpacing: '-0.5px'
        }}>Dawakhana</span>
      </div>

      {/* Center Role Toggles */}
      {activeTab !== 'landing' && (
        <div style={{ display: 'flex', gap: '0.5rem', background: '#f1f5f9', padding: '0.25rem', borderRadius: '10px' }}>
          <button 
            className="btn" 
            onClick={() => setRole('doctor')}
            style={{
              padding: '0.4rem 1rem',
              fontSize: '0.85rem',
              borderRadius: '8px',
              backgroundColor: role === 'doctor' ? 'white' : 'transparent',
              color: role === 'doctor' ? 'var(--primary-dark)' : 'var(--text-muted)',
              fontWeight: role === 'doctor' ? 600 : 500,
              boxShadow: role === 'doctor' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            Doctor View
          </button>
          <button 
            className="btn" 
            onClick={() => setRole('patient')}
            style={{
              padding: '0.4rem 1rem',
              fontSize: '0.85rem',
              borderRadius: '8px',
              backgroundColor: role === 'patient' ? 'white' : 'transparent',
              color: role === 'patient' ? 'var(--primary-dark)' : 'var(--text-muted)',
              fontWeight: role === 'patient' ? 600 : 500,
              boxShadow: role === 'patient' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            Patient Portal
          </button>
        </div>
      )}

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {activeTab !== 'landing' ? (
          <>
            {/* User Switcher Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                Logged in as:
              </span>
              <select 
                value={activeUser || ''} 
                onChange={handleUserSelect}
                className="form-control"
                style={{
                  width: '180px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.85rem',
                  borderRadius: '8px'
                }}
              >
                {role === 'doctor' ? (
                  <>
                    <option value="">Select Doctor...</option>
                    {mockDoctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value="">Select Patient...</option>
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (Age {p.age})</option>
                    ))}
                  </>
                )}
              </select>
            </div>

            {/* Profile Avatar / Indicator */}
            {activeUserDetail && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderLeft: '1px solid var(--border)', paddingLeft: '1rem' }}>
                {role === 'doctor' ? (
                  <img 
                    src={activeUserDetail.avatar} 
                    alt={activeUserDetail.name}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-light)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}>
                    {activeUserDetail.name.charAt(0)}
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-head)' }}>
                    {activeUserDetail.name.split(' ')[0]}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {role === 'doctor' ? activeUserDetail.specialty : 'Patient'}
                  </span>
                </div>
              </div>
            )}

            <button 
              className="btn btn-secondary" 
              onClick={handleLogout}
              style={{ padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.85rem' }}
            >
              <LogOut size={16} />
              <span>Exit Portal</span>
            </button>
          </>
        ) : (
          <button 
            className="btn btn-primary"
            onClick={() => {
              setActiveUser('doc-1');
              setRole('doctor');
              setActiveTab('dashboard');
            }}
          >
            <Activity size={18} />
            <span>Launch Portal</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
