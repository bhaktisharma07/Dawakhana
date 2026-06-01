import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, FolderKanban, UserPlus } from 'lucide-react';

const Records = () => {
  const { patients, setSelectedPatientId, setActiveTab } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');

  const filteredPatients = patients.filter(pat => {
    const matchesSearch = pat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pat.existingDiseases.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pat.allergies.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGender = genderFilter === 'all' || pat.gender.toLowerCase() === genderFilter.toLowerCase();
    
    return matchesSearch && matchesGender;
  });

  const handleViewProfile = (id) => {
    setSelectedPatientId(id);
    setActiveTab('profile'); // Switch to patient profile view
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Patient Directory</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Browse medical records and collaborate on active patient cases across the clinical network.
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setActiveTab('add-patient')}
          style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <UserPlus size={16} />
          <span>Register Patient</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
          <input 
            type="text" 
            placeholder="Search by name, allergy, or medical condition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
            <Filter size={16} />
            <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Gender:</span>
          </div>
          <select 
            value={genderFilter} 
            onChange={(e) => setGenderFilter(e.target.value)}
            className="form-control"
            style={{ width: '130px', padding: '0.5rem', fontSize: '0.85rem' }}
          >
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="card" style={{ padding: 0 }}>
        {filteredPatients.length > 0 ? (
          <div className="records-table-container">
            <table className="records-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Age / Gender</th>
                  <th>Last Visit</th>
                  <th>Connected Doctors</th>
                  <th>Risk Level</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map(pat => {
                  // Derive dynamic connected doctors count
                  const doctorsCount = pat.permissions 
                    ? Object.values(pat.permissions).filter(perm => perm.history === true).length
                    : 3;

                  // Determine risk color properties
                  let riskColorBg = 'var(--secondary-light)';
                  let riskColorText = 'var(--secondary-dark)';
                  if (pat.riskLevel === 'High') {
                    riskColorBg = 'var(--warning-light)';
                    riskColorText = 'var(--warning-dark)';
                  } else if (pat.riskLevel === 'Medium') {
                    riskColorBg = '#fef3c7';
                    riskColorText = '#b45309';
                  }

                  return (
                    <tr key={pat.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '2.25rem',
                            height: '2.25rem',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary-light)',
                            color: 'var(--primary-dark)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.85rem'
                          }}>
                            {pat.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--text-head)' }}>{pat.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {pat.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 500 }}>{pat.age} yrs</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pat.gender}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 500, fontSize: '0.85rem' }}>{pat.lastVisit || 'Today'}</div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', fontWeight: 600 }}>
                          <FolderKanban size={14} style={{ color: 'var(--primary)' }} />
                          <span>{doctorsCount} Providers</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge" style={{
                          backgroundColor: riskColorBg,
                          color: riskColorText,
                          fontSize: '0.7rem'
                        }}>
                          {pat.riskLevel || 'Low'} Risk
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button 
                          className="btn btn-primary"
                          onClick={() => handleViewProfile(pat.id)}
                          style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <h3>No Records Found</h3>
            <p style={{ fontSize: '0.85rem' }}>No patient registers matched your current search parameters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Records;
