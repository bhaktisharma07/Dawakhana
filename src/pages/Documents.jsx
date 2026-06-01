import React from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Download, Upload, ShieldCheck, Activity } from 'lucide-react';

const Documents = () => {
  const { patients, selectedPatientId } = useApp();
  const patient = patients.find(p => p.id === selectedPatientId) || patients[0];

  if (!patient) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
        <h3>No Patient Session Active</h3>
        <p style={{ fontSize: '0.85rem' }}>Please select a patient to login.</p>
      </div>
    );
  }

  const handleUploadReport = () => {
    alert("Simulating lab integration report upload: Select PDF file dialog opened.");
  };

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
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>My Health Documents & Reports</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Securely stored clinical reports, lab analyses, and radiology files.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleUploadReport}>
          <Upload size={16} />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Security Banner */}
      <div className="card" style={{
        background: 'rgba(13, 148, 136, 0.05)',
        border: '1px solid var(--primary-glow)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem'
      }}>
        <div style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <ShieldCheck size={20} />
        </div>
        <div>
          <strong style={{ fontSize: '0.9rem', color: 'var(--primary-dark)' }}>Collaborative Network Encryption Active</strong>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '0.15rem', lineHeight: '1.4' }}>
            All medical records, images, and laboratory reports are encrypted using clinical-grade protocols and are only visible to providers whom you have explicitly authorized.
          </p>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-head)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
          <Activity size={18} style={{ color: 'var(--accent)' }} />
          <span>Active Patient Documents</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {patient.documents && patient.documents.length > 0 ? (
            patient.documents.map((doc, i) => (
              <div key={i} className="card" style={{
                padding: '1.25rem',
                border: '1px solid var(--border)',
                backgroundColor: '#fafafa',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(13, 148, 136, 0.08)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <FileText size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-head)', margin: '0 0 0.2rem 0' }}>{doc.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Uploaded: {doc.date}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Size: {doc.size}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => alert(`Simulating file view: ${doc.name}`)}
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderWidth: '1px' }}
                    >
                      <span>View PDF</span>
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={() => alert(`Simulating file download: ${doc.name}`)}
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', backgroundColor: 'var(--secondary)' }}
                    >
                      <Download size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No documents uploaded yet.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Documents;
