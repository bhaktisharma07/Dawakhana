import React from 'react';
import { useApp } from '../context/AppContext';
import { Activity, Clock, ShieldCheck, HelpCircle, FastForward } from 'lucide-react';

const RecoveryTracker = () => {
  const { prescriptions, advanceRecoveryDay, patients, selectedPatientId, setActiveTab } = useApp();

  const patient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Find active prescription for this patient
  const activePrescriptions = prescriptions.filter(pr => pr.patientId === patient.id);
  const activePresc = activePrescriptions[0];

  if (!patient) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
        <h3>Select Patient to Load Progress Tracker</h3>
        <p style={{ fontSize: '0.85rem' }}>Please select a patient from the top dropdown to view recovery charts.</p>
      </div>
    );
  }

  if (!activePresc) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
        <h3>No Active Prescriptions Registered</h3>
        <p style={{ fontSize: '0.85rem' }}>
          This patient does not have an active digital prescription to track. Doctors must issue a prescription first.
        </p>
        <button className="btn btn-primary" onClick={() => setActiveTab('prescription')} style={{ marginTop: '1.5rem' }}>
          Issue Prescription
        </button>
      </div>
    );
  }

  const progressPercent = Math.min(Math.round((activePresc.activeDay / activePresc.durationDays) * 100), 100);
  const isRecovered = activePresc.activeDay === activePresc.durationDays;

  // Generate milestone triggers
  const midpointDay = Math.ceil(activePresc.durationDays / 2);
  const milestone1 = true; // Started
  const milestone2 = activePresc.activeDay >= midpointDay;
  const milestone3 = isRecovered;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Recovery Progress Tracker</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Patient: <strong style={{ color: 'var(--text-head)' }}>{patient.name}</strong> | Active Treatment: <strong>{activePresc.diagnosis}</strong>
        </p>
      </div>

      {/* Main progress bar card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>MEDICATION TREATMENT CYCLE</span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-head)' }}>
              Day {activePresc.activeDay} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>of</span> {activePresc.durationDays} Days
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>RECOVERY RATING</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: isRecovered ? 'var(--secondary)' : 'var(--primary)' }}>
              {progressPercent}% Completed
            </div>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div style={{
          width: '100%',
          height: '16px',
          backgroundColor: '#f1f5f9',
          borderRadius: '999px',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid var(--border)'
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: isRecovered ? 'var(--secondary)' : 'var(--primary)',
            borderRadius: '999px',
            transition: 'width 0.4s ease-out'
          }} />
        </div>

        {/* Dynamic Markers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          <span>Day 1 (Initiated)</span>
          <span>Day {midpointDay} (Mid-Cycle)</span>
          <span>Day {activePresc.durationDays} (Completion)</span>
        </div>

        {/* Advancing Timeline Progress Button */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--primary-light)',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius)',
          gap: '1rem',
          marginTop: '1rem',
          border: '1px solid var(--primary-glow)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: 600 }}>
            <Clock size={18} />
            <span>Medication Timeline Adjustments</span>
          </div>

          <button 
            className="btn btn-primary pulse-button" 
            onClick={() => advanceRecoveryDay(activePresc.id)}
            disabled={isRecovered}
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.85rem',
              backgroundColor: isRecovered ? '#cbd5e1' : 'var(--primary-dark)',
              cursor: isRecovered ? 'default' : 'pointer'
            }}
          >
            <FastForward size={16} />
            <span>{isRecovered ? 'Patient Recovered' : 'Record Daily Dose'}</span>
          </button>
        </div>
      </div>

      {/* Recovery Timeline Milestones */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recovery Timeline Checkpoints</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Milestone 1 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.75rem',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            backgroundColor: milestone1 ? 'var(--secondary-light)' : 'transparent'
          }}>
            <ShieldCheck size={20} style={{ color: milestone1 ? 'var(--secondary)' : '#cbd5e1' }} />
            <div>
              <strong style={{ fontSize: '0.9rem', color: milestone1 ? 'var(--secondary-dark)' : 'var(--text-head)' }}>Milestone 1: Treatment Initiated</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Medication doses started. Timelines logged in electronic file.</div>
            </div>
          </div>

          {/* Milestone 2 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.75rem',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            backgroundColor: milestone2 ? 'var(--secondary-light)' : 'transparent'
          }}>
            <ShieldCheck size={20} style={{ color: milestone2 ? 'var(--secondary)' : '#cbd5e1' }} />
            <div>
              <strong style={{ fontSize: '0.9rem', color: milestone2 ? 'var(--secondary-dark)' : 'var(--text-head)' }}>Milestone 2: Symptomatic Improvement</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Doses halfway completed. Symptoms should reduce by 60%.</div>
            </div>
          </div>

          {/* Milestone 3 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.75rem',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            backgroundColor: milestone3 ? 'var(--secondary-light)' : 'transparent'
          }}>
            <ShieldCheck size={20} style={{ color: milestone3 ? 'var(--secondary)' : '#cbd5e1' }} />
            <div>
              <strong style={{ fontSize: '0.9rem', color: milestone3 ? 'var(--secondary-dark)' : 'var(--text-head)' }}>Milestone 3: Recovery Complete</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>All doses fully completed. System dispatches Recovery Completed timeline event.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoveryTracker;
