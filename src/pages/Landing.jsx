import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Stethoscope, 
  ShieldCheck, 
  Sparkles, 
  LogIn, 
  Users
} from 'lucide-react';

const Landing = () => {
  const { handleLogin } = useApp();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%)',
      paddingTop: '70px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* 1. Hero Section */}
      <section style={{
        padding: '5rem 2rem 4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '4rem',
        alignItems: 'center',
        flex: 1
      }}>
        {/* Left Column: Hero Text */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(13, 148, 136, 0.08)',
            color: 'var(--primary-dark)',
            fontWeight: 600,
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(13, 148, 136, 0.15)'
          }}>
            <Sparkles size={16} />
            <span>Collaborative Doctor Network Integration</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-title)',
            fontSize: '3.6rem',
            fontWeight: 800,
            lineHeight: '1.1',
            color: 'var(--text-head)',
            marginBottom: '1rem',
            textAlign: 'left'
          }}>
            One Patient.<br />
            Multiple Doctors.<br />
            <span style={{ color: 'var(--primary)' }}>One Unified Record.</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-main)',
            marginBottom: '2.5rem',
            lineHeight: '1.6',
            textAlign: 'left',
            fontWeight: 500
          }}>
            Collaborative Healthcare Through Shared Patient Records. Dawakhana connects general physicians, cardiologists, dentists, and ayurvedic specialists to prevent medical errors.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <button 
              className="btn btn-primary pulse-button"
              onClick={() => handleLogin('doctor', 'doc-1')}
              style={{ padding: '0.9rem 2.25rem', fontSize: '1.05rem' }}
            >
              <LogIn size={20} />
              <span>Get Started</span>
            </button>
            <a 
              href="#login-section"
              className="btn btn-secondary"
              style={{ padding: '0.9rem 2.25rem', fontSize: '1.05rem' }}
            >
              <span>Explore Portals</span>
            </a>
          </div>
        </div>

        {/* Right Column: Floating CSS Dashboard Mockup */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          <div className="glass" style={{
            width: '100%',
            maxWidth: '430px',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-lg)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            transform: 'perspective(800px) rotateY(-8deg) rotateX(4deg)',
            animation: 'heroFloat 5s ease-in-out infinite',
            border: '1px solid rgba(255, 255, 255, 0.6)'
          }}>
            {/* Header bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>DAWAKHANA OS v1.0</span>
            </div>

            {/* Vitals summary preview */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ backgroundColor: 'var(--primary-light)', padding: '0.75rem', borderRadius: '10px', color: 'var(--primary-dark)' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 600 }}>PATIENTS</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>500+ Active</div>
              </div>
              <div style={{ backgroundColor: 'var(--accent-light)', padding: '0.75rem', borderRadius: '10px', color: 'var(--accent)' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 600 }}>RECOVERY</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>92% Rate</div>
              </div>
            </div>

            {/* Collaborative network preview block */}
            <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#fafafa' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                <Users size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-head)' }}>Collaborative Network Portal</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Connected Providers: 4 (Dentist, GP...)</div>
              </div>
              <span className="badge badge-success" style={{ fontSize: '0.6rem' }}>Online</span>
            </div>

            {/* Mock Chart preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-head)' }}>Diagnostic Flow Index</div>
              <svg width="100%" height="80" viewBox="0 0 300 80">
                <path d="M 0 60 Q 50 20, 100 40 T 200 10 T 300 30" fill="none" stroke="var(--primary)" strokeWidth="3" />
                <path d="M 0 60 Q 50 20, 100 40 T 200 10 T 300 30 L 300 80 L 0 80 Z" fill="rgba(13, 148, 136, 0.08)" />
              </svg>
            </div>
          </div>

          <style>{`
            @keyframes heroFloat {
              0% { transform: perspective(800px) rotateY(-8deg) rotateX(4deg) translateY(0px); }
              50% { transform: perspective(800px) rotateY(-8deg) rotateX(4deg) translateY(-12px); }
              100% { transform: perspective(800px) rotateY(-8deg) rotateX(4deg) translateY(0px); }
            }
          `}</style>
        </div>
      </section>

      {/* 2. Collaborative Doctor Network illustration */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: 'white',
        borderBottom: '1px solid var(--border)',
        borderTop: '1px solid var(--border)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontFamily: 'var(--font-title)' }}>Collaborative Doctor Network Concept</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3.5rem', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            Traditional clinics operate in isolation. Dawakhana securely anchors specialists around a single patient health registry.
          </p>

          <div className="card" style={{ padding: '2rem', display: 'flex', justifyContent: 'center', backgroundColor: '#fafdfd', border: '1px solid var(--primary-glow)' }}>
            <svg width="100%" height="350" viewBox="0 0 600 350" style={{ maxWidth: '600px' }}>
              {/* Connection Lines */}
              <line x1="300" y1="175" x2="190" y2="65" stroke="var(--primary)" strokeWidth="2.5" strokeDasharray="5 5" />
              <line x1="300" y1="175" x2="410" y2="65" stroke="var(--primary)" strokeWidth="2.5" strokeDasharray="5 5" />
              <line x1="300" y1="175" x2="300" y2="295" stroke="var(--primary)" strokeWidth="2.5" strokeDasharray="5 5" />
              <line x1="300" y1="175" x2="130" y2="175" stroke="var(--accent)" strokeWidth="3" />

              {/* Patient Node */}
              <circle cx="130" cy="175" r="45" fill="var(--accent)" />
              <text x="130" y="175" textAnchor="middle" dominantBaseline="middle" fill="white" fontWeight="800" fontSize="11" letterSpacing="0.5px">PATIENT</text>

              {/* Central Record Node (Dawakhana) */}
              <circle cx="300" cy="175" r="50" fill="var(--primary)" />
              <text x="300" y="175" textAnchor="middle" dominantBaseline="middle" fill="white" fontWeight="800" fontSize="12" letterSpacing="0.5px">DAWAKHANA</text>

              {/* Doctor Node 1 (Dentist) */}
              <circle cx="190" cy="65" r="45" fill="var(--primary-dark)" />
              <text x="190" y="65" textAnchor="middle" dominantBaseline="middle" fill="white" fontWeight="800" fontSize="10" letterSpacing="0.5px">DENTIST</text>

              {/* Doctor Node 2 (Gynecologist) */}
              <circle cx="410" cy="65" r="45" fill="var(--primary-dark)" />
              <text x="410" y="65" textAnchor="middle" dominantBaseline="middle" fill="white" fontWeight="800" fontSize="9" letterSpacing="0.5px">GYNECOLOGIST</text>

              {/* Doctor Node 3 (Dermatologist) */}
              <circle cx="300" cy="295" r="45" fill="var(--primary-dark)" />
              <text x="300" y="295" textAnchor="middle" dominantBaseline="middle" fill="white" fontWeight="800" fontSize="9" letterSpacing="0.5px">DERMATOLOGIST</text>

              {/* Consent indicator arrows */}
              <circle cx="215" cy="175" r="12" fill="var(--secondary)" />
              <text x="215" y="175" textAnchor="middle" dominantBaseline="middle" fill="white" fontWeight="900" fontSize="12">✓</text>
            </svg>
          </div>
        </div>
      </section>


      {/* 4. Doctor Portal / Patient Portal login cards */}
      <section id="login-section" style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
        textAlign: 'center',
        borderTop: '1px solid var(--border)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem', fontFamily: 'var(--font-title)' }}>Secure Access Gateways</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3.5rem' }}>Select your portal view below to interact with the frontend demonstration.</p>

          <div style={{
            display: 'flex',
            gap: '2.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {/* Doctor Login Card */}
            <div className="card" style={{
              width: '330px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <div style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <Stethoscope size={28} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>Doctor Portal</h3>
                
                {/* Mini mockup preview inside card */}
                <div style={{
                  width: '100%',
                  height: '60px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  margin: '0.5rem 0 1.25rem 0',
                  backgroundColor: '#fafafa',
                  padding: '0.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem',
                  textAlign: 'left'
                }}>
                  <div style={{ width: '40%', height: '4px', backgroundColor: 'var(--primary)', borderRadius: '2px' }} />
                  <div style={{ width: '75%', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px' }} />
                  <div style={{ width: '60%', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px' }} />
                </div>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                  Register clinical patients, analyze active symptoms, check allergies, and sign digital Rx charts.
                </p>
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => handleLogin('doctor', 'doc-1')}
                style={{ width: '100%' }}
              >
                <span>Login as Doctor</span>
              </button>
            </div>

            {/* Patient Login Card */}
            <div className="card" style={{
              width: '330px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <div style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <Users size={28} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>Patient Portal</h3>
                
                {/* Mini mockup preview inside card */}
                <div style={{
                  width: '100%',
                  height: '60px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  margin: '0.5rem 0 1.25rem 0',
                  backgroundColor: '#fafafa',
                  padding: '0.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--warning)' }} />
                    <div style={{ width: '40%', height: '4px', backgroundColor: 'var(--warning)', borderRadius: '2px', marginTop: '3px' }} />
                  </div>
                  <div style={{ width: '80%', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px' }} />
                  <div style={{ width: '50%', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px' }} />
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                  View doctor messages, print issued prescriptions, toggle provider consents, and track active recovery logs.
                </p>
              </div>
              <button 
                className="btn btn-outline-primary"
                onClick={() => handleLogin('patient', 'pat-1')}
                style={{ width: '100%', borderWidth: '1px' }}
              >
                <span>Login as Patient</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        padding: '4rem 2rem',
        borderTop: '1px solid #1e293b'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '3rem', fontSize: '0.9rem' }}>
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '0.75rem' }}>DAWAKHANA PLATFORM</h4>
            <p style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.5 }}>
              Collaborative healthcare workspace. Connecting general medical teams and specialists to deliver verified patient treatments and protect records.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '0.75rem' }}>FEATURES</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem' }}>
              <span>• Collaborative Doctor Network</span>
              <span>• Granular Privacy Controls</span>
              <span>• Dual Treatment Analysis</span>
              <span>• Online Patient Chat Hub</span>
              <span>• Recovery Progress Tracker</span>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '0.75rem' }}>DEMONSTRATION PORTALS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem' }}>
              <span>• Doctor Portal Dashboard</span>
              <span>• Patient Portal Dashboard</span>
              <span>• Digital Prescription Builder</span>
              <span>• Allergy Guard Evaluator</span>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '2rem auto 0 auto', borderTop: '1px solid #1e293b', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#475569' }}>
          Dawakhana Demonstration Registry. No actual clinic registrations are completed. All data generated is mock.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
