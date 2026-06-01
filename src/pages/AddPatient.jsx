import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, ShieldAlert, HeartPulse } from 'lucide-react';

const AddPatient = () => {
  const { addPatient, setActiveTab } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    weight: '',
    height: '',
    bloodGroup: 'O+',
    allergies: '',
    existingDiseases: '',
    emergencyName: '',
    emergencyPhone: '',
    currentMedications: ''
  });

  const [permissions, setPermissions] = useState({
    history: true,
    medicines: true,
    notes: false,
    consultations: false
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePermissionChange = (e) => {
    setPermissions({
      ...permissions,
      [e.target.name]: e.target.checked
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.weight || !formData.height) {
      setError('Please fill in Name, Age, Height, and Weight parameters.');
      return;
    }

    setError('');

    // Configure permissions formatting for database mock
    const patientPermissions = {
      "doc-1": { history: true, medicines: true, notes: true, consultations: true }, // creator gets full
      "doc-2": { history: permissions.history, medicines: permissions.medicines, notes: permissions.notes, consultations: permissions.consultations },
      "doc-3": { history: permissions.history, medicines: permissions.medicines, notes: permissions.notes, consultations: permissions.consultations },
      "doc-4": { history: permissions.history, medicines: permissions.medicines, notes: permissions.notes, consultations: permissions.consultations }
    };

    const newPatientObj = {
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      bloodGroup: formData.bloodGroup,
      allergies: formData.allergies || 'None',
      existingDiseases: formData.existingDiseases || 'None',
      currentMedications: formData.currentMedications || 'None',
      emergencyContact: `${formData.emergencyName || 'Mother'} (${formData.emergencyPhone || '+91 99887 76655'})`,
      permissions: patientPermissions
    };

    addPatient(newPatientObj);
    setActiveTab('records');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Register New Patient</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Create a centralized electronic record for clinical tracking and provider collaboration.
        </p>
      </div>

      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--warning-light)',
          color: 'var(--warning-dark)',
          borderRadius: 'var(--radius)',
          fontSize: '0.85rem',
          fontWeight: 600,
          border: '1px solid rgba(220, 38, 38, 0.2)'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Core Demographics Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            <HeartPulse size={18} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Biographical & Clinical Vitals</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="e.g. Rahul Sharma"
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Age</label>
              <input 
                type="number" 
                name="age" 
                value={formData.age} 
                onChange={handleChange} 
                placeholder="e.g. 29"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="form-control">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Weight (kg)</label>
              <input 
                type="number" 
                step="0.1" 
                name="weight" 
                value={formData.weight} 
                onChange={handleChange} 
                placeholder="e.g. 68.5"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Height (cm)</label>
              <input 
                type="number" 
                name="height" 
                value={formData.height} 
                onChange={handleChange} 
                placeholder="e.g. 172"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="form-control">
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="form-group">
              <label className="form-label">Known Drug/Food Allergies</label>
              <input 
                type="text" 
                name="allergies" 
                value={formData.allergies} 
                onChange={handleChange} 
                placeholder="e.g. Penicillin, Peanuts (or 'None')"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Chronic Conditions / Illnesses</label>
              <input 
                type="text" 
                name="existingDiseases" 
                value={formData.existingDiseases} 
                onChange={handleChange} 
                placeholder="e.g. Hypertension, Asthma (or 'None')"
                className="form-control"
              />
            </div>
          </div>

          {/* Emergency Contact Name & Number */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Emergency Contact Relation / Name</label>
              <input 
                type="text" 
                name="emergencyName" 
                value={formData.emergencyName} 
                onChange={handleChange} 
                placeholder="e.g. Mother (Mrs. Sharma)"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Emergency Contact Phone Number</label>
              <input 
                type="text" 
                name="emergencyPhone" 
                value={formData.emergencyPhone} 
                onChange={handleChange} 
                placeholder="e.g. +91 99887 76655"
                className="form-control"
              />
            </div>
          </div>

          {/* Current medications */}
          <div className="form-group">
            <label className="form-label">Current Active Medications (Critical for Interaction Guard)</label>
            <textarea 
              name="currentMedications" 
              value={formData.currentMedications} 
              onChange={handleChange} 
              placeholder="e.g. Metformin 500mg, Cetirizine 10mg (or 'None')"
              className="form-control"
              rows="2"
            />
          </div>
        </div>

        {/* Network Sharing Configuration Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            <UserCheck size={18} style={{ color: 'var(--accent)' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Collaborative Doctor Network Sharing Level</h3>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'start',
            gap: '0.75rem',
            padding: '0.75rem',
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent)',
            borderRadius: 'var(--radius)',
            fontSize: '0.8rem',
            lineHeight: 1.4
          }}>
            <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Privacy Guideline:</strong> These settings configure default sharing levels for other physicians in the network. The patient can adjust or revoke these settings at any time in their personal portal.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                name="history" 
                checked={permissions.history} 
                onChange={handlePermissionChange}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
              <div>
                <strong>Share Medical History</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Share diagnoses, vitals, and blood types.</div>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                name="medicines" 
                checked={permissions.medicines} 
                onChange={handlePermissionChange}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
              <div>
                <strong>Share Active Medications</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Prevent drug interaction risks by sharing logs.</div>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                name="notes" 
                checked={permissions.notes} 
                onChange={handlePermissionChange}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
              <div>
                <strong>Share Personal Care Notes</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Share psychological or lifestyle advice.</div>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                name="consultations" 
                checked={permissions.consultations} 
                onChange={handlePermissionChange}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
              <div>
                <strong>Share Private Consultation Logs</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Share raw transcriptions of doctor checkups.</div>
              </div>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-secondary" onClick={() => setActiveTab('dashboard')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" style={{ padding: '0.625rem 2rem' }}>
            Save Patient Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
