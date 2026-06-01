import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar } from 'lucide-react';

const Appointments = () => {
  const { appointments, setSelectedPatientId, setActiveTab } = useApp();
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'upcoming' | 'completed' | 'cancelled'

  const filteredAppointments = appointments.filter(app => {
    if (activeFilter === 'all') return true;
    return app.status === activeFilter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Clinical Schedule</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Browse and filter consultations across your network.
          </p>
        </div>
      </div>

      {/* Appointments List Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-head)', margin: 0 }}>
            <Calendar size={18} style={{ color: 'var(--primary)' }} />
            <span>Scheduled Consultations</span>
          </h3>
          
          {/* Status Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: '#f1f5f9', padding: '0.25rem', borderRadius: '8px' }}>
            {['all', 'upcoming', 'completed', 'cancelled'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: activeFilter === filter ? 'white' : 'transparent',
                  color: activeFilter === filter ? 'var(--text-head)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  boxShadow: activeFilter === filter ? 'var(--shadow-sm)' : 'none',
                  textTransform: 'capitalize',
                  transition: 'all 0.15s ease'
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="records-table-container">
          <table className="records-table" style={{ fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map(app => (
                  <tr key={app.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--text-head)' }}>{app.patientName}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {app.patientId}</div>
                    </td>
                    <td>
                      <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>{app.time}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 500 }}>
                        {app.doctorId === 'doc-2' ? 'Cardiology Checkup' : 'General Visit'}
                      </span>
                    </td>
                    <td>
                      <span className="badge" style={{
                        fontSize: '0.7rem',
                        backgroundColor: 
                          app.status === 'completed' ? 'var(--secondary-light)' : 
                          app.status === 'cancelled' ? '#fee2e2' : '#fef3c7',
                        color: 
                          app.status === 'completed' ? 'var(--secondary-dark)' : 
                          app.status === 'cancelled' ? '#991b1b' : '#b45309'
                      }}>
                        {app.status === 'completed' ? 'Completed' : 
                         app.status === 'cancelled' ? 'Cancelled' : 'Upcoming'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="btn btn-primary"
                        onClick={() => {
                          setSelectedPatientId(app.patientId);
                          setActiveTab('profile');
                        }}
                        style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
                      >
                        Open File
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                    No appointments matching this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Appointments;
