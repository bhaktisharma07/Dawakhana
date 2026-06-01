import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Calendar, 
  FileCheck, 
  Search,
  ListCollapse,
  SearchCode,
  FileText,
  UserPlus
} from 'lucide-react';

const Dashboard = () => {
  const { patients, appointments, prescriptions, setActiveTab, setSelectedPatientId } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'upcoming' | 'completed' | 'cancelled'

  // Filter patients for quick search dropdown
  const searchedPatients = searchQuery
    ? patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleSearchSelect = (patientId) => {
    setSelectedPatientId(patientId);
    setActiveTab('profile');
    setSearchQuery('');
  };

  // Derive counts
  const totalPatientsCount = 125 + patients.length - 2;
  const prescriptionsCount = 45 + prescriptions.length - 2;

  const filteredAppointments = appointments.filter(app => {
    if (activeFilter === 'all') return true;
    return app.status === activeFilter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Banner & Quick Search */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '1rem',
        position: 'relative'
      }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Clinical Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Dawakhana Collaborative Electronic Health Record Registry.
          </p>
        </div>

        {/* Quick Search Bar */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            zIndex: 10
          }} />
          <input 
            type="text" 
            placeholder="Quick Patient Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
            style={{ paddingLeft: '2.5rem', borderRadius: '20px', fontSize: '0.85rem' }}
          />
          {/* Suggestions Dropdown */}
          {searchedPatients.length > 0 && (
            <div className="glass" style={{
              position: 'absolute',
              top: '42px',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border)',
              zIndex: 100,
              overflow: 'hidden'
            }}>
              {searchedPatients.map(p => (
                <div 
                  key={p.id}
                  onClick={() => handleSearchSelect(p.id)}
                  style={{
                    padding: '0.6rem 1rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f1f5f9',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <strong style={{ color: 'var(--text-head)' }}>{p.name}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {p.id}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stat Cards Grid (3-columns: Patients, Appointments, Prescriptions) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.25rem'
      }}>
        {/* Stat 1: Patients */}
        <div className="card stat-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="stat-icon" style={{ backgroundColor: 'var(--primary)', width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', borderRadius: '12px' }}>
            <Users size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{totalPatientsCount}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, margin: 0 }}>Total Patients</p>
          </div>
        </div>

        {/* Stat 2: Appointments */}
        <div className="card stat-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="stat-icon" style={{ backgroundColor: 'var(--accent)', width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', borderRadius: '12px' }}>
            <Calendar size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{appointments.length} Today</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, margin: 0 }}>Today's Appointments</p>
          </div>
        </div>

        {/* Stat 3: Prescriptions */}
        <div className="card stat-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="stat-icon" style={{ backgroundColor: 'var(--secondary)', width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', borderRadius: '12px' }}>
            <FileCheck size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{prescriptionsCount}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, margin: 0 }}>Prescriptions Generated</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Clinical Welcome & Quick Actions */}
      <div className="clinical-grid" style={{ gridTemplateColumns: '2fr 1.1fr', gap: '1.25rem' }}>
        {/* Workspace Info Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '2rem', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>Welcome to your Clinical Workspace</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
            Dawakhana operates on a patient-centric model. Clinical evaluations, symptom analysis, creating prescriptions, and recording notes are performed directly within each patient's medical file.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => setActiveTab('records')}
              style={{ fontWeight: 600, fontSize: '0.85rem' }}
            >
              <Users size={16} />
              <span>Open Patient Directory</span>
            </button>
            <button 
              className="btn btn-outline-primary" 
              onClick={() => setActiveTab('appointments')}
              style={{ fontWeight: 600, fontSize: '0.85rem' }}
            >
              <Calendar size={16} />
              <span>View Schedule</span>
            </button>
          </div>
        </div>

        {/* Workspace Quick Actions */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Clinical Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => setActiveTab('records')} 
              style={{ width: '100%', justifyContent: 'flex-start', fontWeight: 600 }}
            >
              <Users size={16} />
              <span style={{ marginLeft: '0.5rem' }}>Patient Directory</span>
            </button>
            <button 
              className="btn btn-outline-primary" 
              onClick={() => setActiveTab('appointments')} 
              style={{ width: '100%', justifyContent: 'flex-start', fontWeight: 600 }}
            >
              <Calendar size={16} />
              <span style={{ marginLeft: '0.5rem' }}>Appointments List</span>
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => setActiveTab('add-patient')} 
              style={{ width: '100%', justifyContent: 'flex-start', fontWeight: 600, border: '1px solid var(--border)' }}
            >
              <UserPlus size={16} style={{ color: 'var(--primary)' }} />
              <span style={{ marginLeft: '0.5rem', color: 'var(--text-head)' }}>Register New Patient</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
