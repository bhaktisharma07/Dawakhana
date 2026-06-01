import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockDoctors } from '../data/mockDatabase';
import { 
  ShieldCheck, 
  FileText, 
  Bell,
  Clock,
  AlertTriangle,
  Check,
  X,
  Calendar
} from 'lucide-react';

const PatientPortal = () => {
  const { 
    patients, 
    prescriptions, 
    updatePermissions, 
    selectedPatientId, 
    setSelectedPatientId,
    setActiveTab 
  } = useApp();

  const patient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Simulated live states for interactive dashboard responsiveness
  const [pendingRequests, setPendingRequests] = useState([
    { id: 'req-1', docId: 'doc-4', docName: 'Dr. Raj Patil', specialty: 'Dentist', scope: 'medicines', scopeLabel: 'Medication History' }
  ]);

  if (!patient) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
        <h3>Select Patient to Login</h3>
        <p style={{ fontSize: '0.85rem' }}>Please select a patient from the top dropdown to view their portal.</p>
      </div>
    );
  }

  // Derive connected doctors and their statuses based on patient permissions
  const patientPermissions = patient.permissions || {};
  const connectedDoctorsList = mockDoctors.map(doc => {
    const perms = patientPermissions[doc.id] || { history: false, medicines: false, notes: false, consultations: false };
    
    let statusText = "🔴 Revoked";
    let statusColor = "var(--warning)";
    let accessLabel = "Access Revoked";

    if (doc.id === 'doc-3') {
      accessLabel = "Summary Only";
      statusText = "🔴 Revoked";
      statusColor = "var(--warning)";
    } else if (perms.history && perms.medicines && perms.notes && perms.consultations) {
      statusText = "🟢 Active";
      statusColor = "var(--secondary)";
      accessLabel = "Full Access";
    } else if (perms.history && perms.medicines) {
      statusText = "🟡 Limited";
      statusColor = "#eab308";
      accessLabel = "Medications Only";
    } else if (perms.history) {
      statusText = "🟡 Limited";
      statusColor = "#eab308";
      accessLabel = "Summary Only";
    }

    return {
      ...doc,
      perms,
      statusText,
      statusColor,
      accessLabel
    };
  });

  const activeConnectedCount = connectedDoctorsList.filter(d => d.accessLabel !== 'Access Revoked').length;
  const activePrescriptions = prescriptions.filter(pr => pr.patientId === patient.id);

  const recentActivities = patient.id === 'pat-1' ? [
    { text: "Recovery status reached 92% target", time: "2 days ago" },
    { text: "Dr. Priya Sen updated Ayurvedic treatment summary", time: "1 week ago" },
    { text: "Prescription for Albuterol Inhaler digital signature verified", time: "12 days ago" },
    { text: "Dr. Amit Patel synchronized primary health vault records", time: "15 days ago" },
    { text: "Shared health registry access granted to GP & Cardiologist", time: "Initial setup" }
  ] : [
    { text: "Cardiovascular drug interactions review completed", time: "1 day ago" },
    { text: "Prescription for Amlodipine 5mg signed and issued", time: "1 week ago" },
    { text: "Dr. Sarah Rahman updated diagnostic history", time: "1 week ago" },
    { text: "Dr. Raj Patil logged dental checkup summary", time: "4 weeks ago" },
    { text: "Allergy alerts for Peanuts and Sulfa configured", time: "Initial setup" }
  ];

  const handleApproveRequest = (req) => {
    // Enable dentist access inside permissions
    updatePermissions(patient.id, req.docId, 'medicines', true);
    updatePermissions(patient.id, req.docId, 'history', true);
    
    // Update live feed
    setPendingRequests(prev => prev.filter(r => r.id !== req.id));
    alert(`${req.docName}'s access request for ${req.scopeLabel} has been APPROVED.`);
  };

  const handleRejectRequest = (req) => {
    setPendingRequests(prev => prev.filter(r => r.id !== req.id));
    alert('Access request REJECTED.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Welcome Banner */}
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
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Health Control Center: {patient.name}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Review doctor connections, verify record locks, and track active therapies.
          </p>
        </div>
      </div>

      {/* 1. Connected Doctors: Network Clearances */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #0d9488 0%, #115e59 100%)',
        color: 'white',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: 'var(--shadow)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={22} style={{ color: '#2dd4bf' }} />
              <span>Collaborative Doctor Network Dashboard</span>
            </h2>
            <p style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '0.15rem' }}>
              Real-time permission ledger. Only authorized clinicians can view corresponding parts of your record.
            </p>
          </div>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem' }}>
            {activeConnectedCount} Connected Providers
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {/* Dr. Amit Patel */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem' }}>Dr. Amit Patel</strong>
              <span className="badge" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', fontSize: '0.7rem', padding: '0.1rem 0.4rem', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                🟢 Active
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, marginBottom: '0.5rem' }}>General Physician</div>
            <div style={{ fontSize: '0.8rem', color: '#2dd4bf', fontWeight: 700 }}>
              Full Access Clearance
            </div>
          </div>

          {/* Dr. Sarah Rahman */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem' }}>Dr. Sarah Rahman</strong>
              <span className="badge" style={{ backgroundColor: 'rgba(234, 179, 8, 0.2)', color: '#fde047', fontSize: '0.7rem', padding: '0.1rem 0.4rem', border: '1px solid rgba(234, 179, 8, 0.3)' }}>
                🟡 Limited
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, marginBottom: '0.5rem' }}>Cardiologist</div>
            <div style={{ fontSize: '0.8rem', color: '#fde047', fontWeight: 700 }}>
              Medications + History
            </div>
          </div>

          {/* Dr. Priya Sen */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem' }}>Dr. Priya Sen</strong>
              <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', fontSize: '0.7rem', padding: '0.1rem 0.4rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                🔴 Revoked
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, marginBottom: '0.5rem' }}>Ayurveda Expert</div>
            <div style={{ fontSize: '0.8rem', color: '#fca5a5', fontWeight: 700 }}>
              Summary Only Clearance
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Content Column (Left) & Emergency / Actions (Right) */}
      <div className="clinical-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left Column: Digital Prescriptions & Recent Medical Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Centralized Prescriptions */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: 'white' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-head)' }}>
              <FileText size={18} style={{ color: 'var(--accent)' }} />
              <span>Centralized Network Prescriptions</span>
            </h3>

            {activePrescriptions.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activePrescriptions.map(presc => (
                  <div key={presc.id} style={{
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: '1.25rem',
                    backgroundColor: 'white',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Issued By</span>
                        <div style={{ fontWeight: 700, color: 'var(--text-head)', fontSize: '0.95rem' }}>{presc.doctorName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary-dark)' }}>
                          Speciality: <strong>{presc.doctorSpecialty || 'General Practitioner'}</strong>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Date: <strong style={{ color: 'var(--text-head)' }}>{presc.date}</strong>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                          Validity: <strong style={{ color: 'var(--secondary)' }}>6 Months (Active)</strong>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Diagnosis Summary:</span>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{presc.diagnosis}</div>
                    </div>

                    <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '0.75rem', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Prescribed Drugs & Schedule:</span>
                      {presc.medicines.map((m, i) => (
                        <div key={i} style={{ fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', margin: '0.15rem 0' }}>
                          <div>
                            <strong>{m.name}</strong>
                            <div style={{ fontSize: '0.7rem', color: 'var(--primary-dark)', fontWeight: 600, marginTop: '0.1rem' }}>
                              Schedule: {m.morning || m.dosage?.includes('morning') ? '✓ Morning' : '✗ Morning'} | {m.afternoon || m.dosage?.includes('afternoon') ? '✓ Afternoon' : '✗ Afternoon'} | {m.night || m.dosage?.includes('night') ? '✓ Night' : '✗ Night'}
                            </div>
                          </div>
                          <span style={{ color: 'var(--text-muted)' }}>{m.dosage} ({m.duration || '10 Days'})</span>
                        </div>
                      ))}
                    </div>

                    {presc.advice && (
                      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-main)' }}>
                        <strong>Lifestyle Advice:</strong> {presc.advice}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No active digital prescriptions found.
              </div>
            )}
          </div>

          {/* Recent Medical Activity */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'white' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-head)' }}>
              <Clock size={18} style={{ color: 'var(--primary)' }} />
              <span>Recent Medical Activity</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentActivities.map((act, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  backgroundColor: '#fafafa',
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      color: 'var(--secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Check size={14} />
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 500 }}>{act.text}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{act.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Vitals Block (Pending Approvals & Emergency Health Card) */}
        <div style={{ position: 'sticky', top: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignSelf: 'start' }}>
          
          {/* Pending Access Requests */}
          {pendingRequests.length > 0 ? (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '5px solid var(--primary)', backgroundColor: 'white' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} style={{ color: 'var(--primary)' }} />
                <span>Pending Access Requests</span>
              </h3>

              {pendingRequests.map(req => (
                <div key={req.id} style={{
                  padding: '0.85rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#fafafa',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-head)' }}>{req.docName} ({req.specialty})</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      Requesting Access to: <strong style={{ color: 'var(--primary)' }}>{req.scopeLabel}</strong>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => handleApproveRequest(req)}
                      style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem', backgroundColor: 'var(--secondary)' }}
                    >
                      <Check size={14} />
                      <span>Approve</span>
                    </button>
                    <button 
                      className="btn btn-warning" 
                      onClick={() => handleRejectRequest(req)}
                      style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem' }}
                    >
                      <X size={14} />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', backgroundColor: 'white' }}>
              No pending doctor access requests.
            </div>
          )}

          {/* Emergency Card (Sticky) */}
          <div className="card" style={{
            background: 'linear-gradient(135deg, var(--warning) 0%, #991b1b 100%)',
            color: 'white',
            border: 'none',
            boxShadow: '0 10px 15px -3px rgba(220, 38, 38, 0.3)'
          }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Bell size={18} className="pulse-button" style={{ animationDuration: '1.5s' }} />
              <span>EMERGENCY HEALTH CARD</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.25rem' }}>
                <span>Blood Group</span>
                <strong style={{ fontSize: '1.1rem' }}>{patient.bloodGroup}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.25rem' }}>
                <span>Critical Allergies</span>
                <strong style={{ backgroundColor: 'white', color: 'var(--warning-dark)', padding: '0.05rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                  {patient.allergies}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.25rem' }}>
                <span>Emergency Contact</span>
                <strong style={{ fontSize: '0.85rem' }}>{patient.emergencyContact?.split(' - ')[1] || 'Mother (+91 98765 43210)'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.25rem' }}>
                <span>Hospital Preference</span>
                <strong style={{ fontSize: '0.85rem' }}>City General Hospital</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Active Medication</span>
                <strong style={{ fontSize: '0.85rem' }}>{patient.currentMedications || 'Albuterol Inhaler'}</strong>
              </div>
            </div>
          </div>

          {/* Past Consultations */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: 'white' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-head)' }}>
              <Calendar size={18} style={{ color: 'var(--accent)' }} />
              <span>Past Consultations</span>
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {patient.pastConsultations && patient.pastConsultations.length > 0 ? (
                patient.pastConsultations.map((c, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.65rem 0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    backgroundColor: '#fafafa'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-head)' }}>{c.doctorName}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.specialty}</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary-dark)', fontWeight: 600 }}>{c.date}</span>
                  </div>
                ))
              ) : (
                <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  No past consultations recorded.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default PatientPortal;
