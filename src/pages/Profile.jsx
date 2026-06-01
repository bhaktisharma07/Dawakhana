import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { mockDoctors, mockSymptomTemplates } from '../data/mockDatabase';
import { 
  User, 
  ShieldCheck, 
  Lock, 
  Calendar, 
  MessageSquare, 
  SearchCode, 
  FileText, 
  AlertTriangle,
  History,
  Activity,
  Heart,
  Plus,
  Trash2,
  CheckCircle,
  CheckCircle2,
  FilePlus,
  Printer
} from 'lucide-react';

const Profile = () => {
  const { 
    patients, 
    prescriptions, 
    selectedPatientId, 
    activeUser, 
    setActiveTab, 
    updateConsultationNotes,
    addPrescription 
  } = useApp();

  const activeDocId = activeUser || 'doc-1';
  const patient = patients.find(p => p.id === selectedPatientId);
  const activeDoctor = mockDoctors.find(d => d.id === activeDocId) || mockDoctors[0];

  const [notesText, setNotesText] = useState('');

  // Sub-view switcher: 'profile' | 'analyzer' | 'prescription'
  const [activeSubView, setActiveSubView] = useState('profile');

  // Form states for Analyzer
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [contraindications, setContraindications] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  // Form states for Prescription
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '1 tablet (after food)', duration: '5 Days', morning: true, afternoon: false, night: true }
  ]);
  const [advice, setAdvice] = useState('');

  useEffect(() => {
    if (patient) {
      setNotesText(patient.consultationNotes || '');
    }
  }, [selectedPatientId, patient]);

  // Reset sub-view on patient change
  useEffect(() => {
    setActiveSubView('profile');
    setSelectedSymptoms([]);
    setAnalysisResult(null);
    setContraindications([]);
    setDiagnosis('');
    setMedicines([{ name: '', dosage: '1 tablet (after food)', duration: '5 Days', morning: true, afternoon: false, night: true }]);
    setAdvice('');
  }, [selectedPatientId]);

  const handleSaveNotes = () => {
    updateConsultationNotes(patient.id, notesText);
    alert('Consultation notes saved successfully!');
  };

  const symptomsList = [
    { id: 'fever', label: 'Fever' },
    { id: 'headache', label: 'Headache' },
    { id: 'cough', label: 'Cough' },
    { id: 'body_pain', label: 'Body Pain' },
    { id: 'sore_throat', label: 'Sore Throat' }
  ];

  const handleSymptomToggle = (id) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsScanning(true);
    setAnalysisResult(null);

    // Simulate analysis delay
    setTimeout(() => {
      setIsScanning(false);
      
      const primarySymptom = selectedSymptoms[0];
      const template = mockSymptomTemplates[primarySymptom];

      if (!template) return;

      let modernMeds = [...template.modern.medicines];
      let ayurvedaMeds = [...template.ayurveda.medicines];
      let modernAdvice = template.modern.advice;
      let ayurvedaAdvice = template.ayurveda.advice;

      // Contraindication checks
      const warnings = [];

      if (patient) {
        if (patient.allergies.toLowerCase().includes('penicillin')) {
          if (selectedSymptoms.includes('cough') || selectedSymptoms.includes('sore_throat') || selectedSymptoms.includes('fever')) {
            warnings.push({
              type: "danger",
              message: `ALLERGY CONTRAINDICATION: Patient is allergic to Penicillin! Suggested antibiotic derivatives (e.g. Amoxicillin) are contraindicated. Avoid prescribing beta-lactam elements.`
            });
            modernMeds = modernMeds.map(m => 
              m.name.includes('Amoxicillin') 
                ? { ...m, name: `${m.name} (WARNING: PENICILLIN ALLERGY)`, contraindication: true }
                : m
            );
          }
        }

        if (patient.allergies.toLowerCase().includes('peanuts')) {
          warnings.push({
            type: "warning",
            message: `ALLERGY WARNING: Patient has severe Peanut Allergy. Avoid traditional syrups containing peanut oil base carriers.`
          });
        }

        if (patient.existingDiseases.toLowerCase().includes('hypertension')) {
          if (selectedSymptoms.includes('headache') || selectedSymptoms.includes('body_pain')) {
            warnings.push({
              type: "warning",
              message: `CONDITION CONTRAINDICATION: Patient has Hypertension. Avoid prescribing heavy NSAIDs or decongestants containing pseudoephedrine as they elevate blood pressure.`
            });
          }
        }
      }

      setContraindications(warnings);
      setAnalysisResult({
        modern: { medicines: modernMeds, advice: modernAdvice },
        ayurveda: { medicines: ayurvedaMeds, advice: ayurvedaAdvice },
        approach: selectedSymptoms.length > 1 ? "Combined Dual-Therapy Approach" : "Single Symptom Management"
      });
    }, 1200);
  };

  const handleSendToPrescription = () => {
    if (!analysisResult) return;
    
    // Build a suggested diagnosis based on selected symptoms
    const diagnosisVal = `Acute ${selectedSymptoms.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' & ')}`;
    setDiagnosis(diagnosisVal);
    
    // Pre-populate medicines
    const medsVal = analysisResult.modern.medicines.map(m => ({
      name: m.name.replace(' (WARNING: PENICILLIN ALLERGY)', ''),
      dosage: m.dosage,
      duration: m.duration,
      morning: true,
      afternoon: false,
      night: true
    }));
    setMedicines(medsVal.length > 0 ? medsVal : [{ name: '', dosage: '1 tablet (after food)', duration: '5 Days', morning: true, afternoon: false, night: true }]);
    
    setAdvice(analysisResult.modern.advice || '');
    
    // Transition to prescription composer subview
    setActiveSubView('prescription');
  };

  const handleAddMedicine = () => {
    setMedicines(prev => [...prev, { name: '', dosage: '1 tablet (after food)', duration: '5 Days', morning: true, afternoon: false, night: true }]);
  };

  const handleRemoveMedicine = (idx) => {
    setMedicines(prev => prev.filter((_, i) => i !== idx));
  };

  const handleMedicineChange = (idx, field, value) => {
    setMedicines(prev => prev.map((med, i) => {
      if (i === idx) {
        return { ...med, [field]: value };
      }
      return med;
    }));
  };

  const checkAllergyContraindication = (name) => {
    if (!name || !patient) return null;
    const lowerName = name.toLowerCase();
    const lowerAllergies = patient.allergies.toLowerCase();

    if (lowerAllergies.includes('penicillin')) {
      if (lowerName.includes('penic') || lowerName.includes('amox') || lowerName.includes('ampic')) {
        return "🚨 CONTRAINDICATION DETECTED: Patient is allergic to the Penicillin family. Penicillin-class drugs are blocked.";
      }
    }
    if (lowerAllergies.includes('peanuts')) {
      if (lowerName.includes('peanut')) {
        return "🚨 CONTRAINDICATION DETECTED: Patient has severe Peanut allergy! Avoid peanut oil excipient carriers.";
      }
    }
    if (lowerAllergies.includes('sulfa')) {
      if (lowerName.includes('sulfa') || lowerName.includes('bactrim')) {
        return "🚨 CONTRAINDICATION DETECTED: Patient is allergic to Sulfa drugs. Sulfa derivatives are contraindicated.";
      }
    }
    return null;
  };

  const handlePrescriptionSubmit = (e) => {
    e.preventDefault();
    if (!diagnosis || medicines.some(m => !m.name)) {
      alert('Please configure diagnosis and complete medicine descriptions.');
      return;
    }

    const hasAllergyConflict = medicines.some(m => checkAllergyContraindication(m.name) !== null);
    if (hasAllergyConflict) {
      alert('Allergy Safeguard: Please remove or replace contraindicated medicines before signing.');
      return;
    }

    const prescriptionData = {
      patientId: patient.id,
      patientName: patient.name,
      doctorId: activeDoctor.id,
      doctorName: activeDoctor.name,
      doctorSpecialty: activeDoctor.specialty,
      diagnosis,
      medicines,
      advice
    };

    addPrescription(prescriptionData);
    
    // Clear analyzer state
    setSelectedSymptoms([]);
    setAnalysisResult(null);
    setContraindications([]);
    
    // Reset to profile main subview
    setActiveSubView('profile');
    
    // Reset composer form states
    setDiagnosis('');
    setMedicines([{ name: '', dosage: '1 tablet (after food)', duration: '5 Days', morning: true, afternoon: false, night: true }]);
    setAdvice('');
    
    alert('Prescription generated, signed, and saved to patient record successfully!');
  };
  if (!patient) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
        <h3>No Patient Selected</h3>
        <p style={{ fontSize: '0.85rem' }}>Please select a patient from the records directory to review clinical files.</p>
        <button className="btn btn-primary" onClick={() => setActiveTab('records')} style={{ marginTop: '1rem' }}>
          Browse Records
        </button>
      </div>
    );
  }

  // Get active doctor's permission levels for this patient combined with global consents
  const globalConsents = patient.globalConsents || {
    history: true,
    medicines: true,
    notes: false,
    mentalHealth: false,
    labReports: true
  };

  const docPermissions = patient.permissions?.[activeDocId] || {
    history: true,
    medicines: true,
    notes: false,
    consultations: false
  };

  const permissions = {
    history: globalConsents.history && docPermissions.history,
    medicines: globalConsents.medicines && docPermissions.medicines,
    notes: globalConsents.notes && docPermissions.notes,
    consultations: globalConsents.notes && docPermissions.consultations
  };

  // Find other doctors connected to this patient (doctors who aren't the active doctor, but are connected in permissions)
  const connectedDoctors = mockDoctors.filter(doc => doc.id !== activeDocId);

  // Vitals registry
  const patientPrescriptions = prescriptions.filter(pr => pr.patientId === patient.id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Profile Header Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, var(--primary-dark) 0%, #115e59 100%)',
        color: 'white',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        padding: '1.2rem 2.5rem' // reduced height by 30%
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.5rem'
          }}>
            {patient.name.charAt(0)}
          </div>
          <div>
            <h1 style={{ fontSize: '1.6rem', color: 'white', fontWeight: 800, marginBottom: '0.25rem' }}>
              {patient.name}
              {activeSubView === 'analyzer' && <span style={{ fontWeight: 400, opacity: 0.8 }}> &gt; Symptom Analyzer</span>}
              {activeSubView === 'prescription' && <span style={{ fontWeight: 400, opacity: 0.8 }}> &gt; Prescription Composer</span>}
            </h1>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', opacity: 0.9 }}>
              <span>ID: <strong>{patient.id}</strong></span>
              <span>•</span>
              <span>Gender: <strong>{patient.gender}</strong></span>
              <span>•</span>
              <span>Age: <strong>{patient.age} years</strong></span>
            </div>
          </div>
        </div>

        {/* Action Triggers */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {activeSubView === 'profile' ? (
            <>
              <button 
                className="btn btn-secondary" 
                onClick={() => setActiveTab('chat')} 
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', backgroundColor: 'rgba(255, 255, 255, 0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <MessageSquare size={14} />
                <span>Open Chat</span>
              </button>
              
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setActiveSubView('analyzer');
                  setSelectedSymptoms([]);
                  setAnalysisResult(null);
                  setContraindications([]);
                }} 
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', backgroundColor: 'rgba(255, 255, 255, 0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <SearchCode size={14} />
                <span>Evaluate Symptoms</span>
              </button>

              <button 
                className="btn" 
                onClick={() => {
                  setActiveSubView('prescription');
                  setDiagnosis('');
                  setMedicines([{ name: '', dosage: '1 tablet (after food)', duration: '5 Days', morning: true, afternoon: false, night: true }]);
                  setAdvice('');
                }} 
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', backgroundColor: 'var(--secondary)', color: 'white' }}
              >
                <FileText size={14} />
                <span>Create Prescription</span>
              </button>
            </>
          ) : (
            <button 
              className="btn btn-secondary" 
              onClick={() => setActiveSubView('profile')} 
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', backgroundColor: 'rgba(255, 255, 255, 0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <span>Back to Patient Profile</span>
            </button>
          )}
        </div>
      </div>

      {activeSubView === 'profile' && (
        /* Main Grid: Info Cards & Timeline */
        <div className="clinical-grid" style={{ gridTemplateColumns: '2fr 1.2fr' }}>
          
          {/* Left Column: Permissions Blocked Vitals & Records */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Card 1: Vitals & History (Permission Locked) */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Medical File Summary</h3>
                {permissions.history ? (
                  <span className="badge badge-success" style={{ gap: '0.25rem', fontSize: '0.65rem' }}>
                    <ShieldCheck size={12} />
                    <span>Authorized access</span>
                  </span>
                ) : (
                  <span className="badge badge-warning" style={{ gap: '0.25rem', fontSize: '0.65rem', backgroundColor: 'var(--warning-light)', color: 'var(--warning-dark)' }}>
                    <Lock size={12} />
                    <span>Access Locked</span>
                  </span>
                )}
              </div>

              {permissions.history ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Blood Group</div>
                      <div style={{ fontWeight: 700, color: 'var(--text-head)', fontSize: '1.1rem' }}>{patient.bloodGroup}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Weight</div>
                      <div style={{ fontWeight: 700, color: 'var(--text-head)', fontSize: '1.1rem' }}>{patient.weight} kg</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Emergency Contact</div>
                      <div style={{ fontWeight: 600, color: 'var(--text-head)', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {patient.emergencyContact?.split(' - ')[0] || 'Unlogged'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem', color: 'var(--text-head)' }}>Known Drug Allergies</div>
                    {patient.allergies && patient.allergies !== 'None' ? (
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: 'var(--warning-light)',
                        color: 'var(--warning-dark)',
                        borderRadius: 'var(--radius)',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        border: '1px solid rgba(220, 38, 38, 0.15)'
                      }}>
                        <AlertTriangle size={16} />
                        <span>CRITICAL: Allergic to {patient.allergies}</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>No allergies recorded.</span>
                    )}
                  </div>
                </div>
              ) : (
                /* LOCKED SCREEN */
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem', backgroundColor: '#fafafa', borderRadius: 'var(--radius)' }}>
                  <Lock size={36} style={{ color: 'var(--text-muted)' }} />
                  <h4 style={{ fontWeight: 700, color: 'var(--text-head)' }}>Medical File Locked</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '350px' }}>
                    The patient has disabled sharing of their medical history and vitals with your specialty accounts. Request access to proceed.
                  </p>
                  <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }} onClick={() => alert('Access request notification sent to patient portal!')}>
                    Request Record Access
                  </button>
                </div>
              )}
            </div>

            {/* Card 2: Active Medicines (Permission Locked) */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Current Medications</h3>
                {permissions.medicines ? (
                  <span className="badge badge-success" style={{ gap: '0.25rem', fontSize: '0.65rem' }}>
                    <ShieldCheck size={12} />
                    <span>Authorized access</span>
                  </span>
                ) : (
                  <span className="badge badge-warning" style={{ gap: '0.25rem', fontSize: '0.65rem', backgroundColor: 'var(--warning-light)', color: 'var(--warning-dark)' }}>
                    <Lock size={12} />
                    <span>Access Locked</span>
                  </span>
                )}
              </div>

              {permissions.medicines ? (
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-head)', marginBottom: '0.5rem' }}>
                    Active patient prescriptions indicate usage of:
                  </p>
                  <div style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--accent-light)',
                    color: 'var(--accent)',
                    borderRadius: 'var(--radius)',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}>
                    {patient.previousMedicines || 'No medications currently active.'}
                  </div>
                </div>
              ) : (
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem', backgroundColor: '#fafafa', borderRadius: 'var(--radius)' }}>
                  <Lock size={28} style={{ color: 'var(--text-muted)' }} />
                  <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-head)' }}>Active Medications List Locked</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Patient has restricted access to active medications.
                  </p>
                </div>
              )}
            </div>

            {/* Consultation Notes */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-head)' }}>
                  <FileText size={18} style={{ color: 'var(--primary)' }} />
                  <span>Consultation Notes</span>
                </h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <textarea
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    backgroundColor: '#fafafa'
                  }}
                  placeholder="Write patient diagnosis, findings, active symptoms progress, and clinical notes here..."
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                />
                <button 
                  className="btn btn-primary" 
                  onClick={handleSaveNotes}
                  style={{ alignSelf: 'flex-end', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <span>Save Notes</span>
                </button>
              </div>
            </div>

            {/* Patient Documents / Reports */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-head)' }}>
                  <Activity size={18} style={{ color: 'var(--accent)' }} />
                  <span>Patient Documents / Reports</span>
                </h3>
                <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)', fontSize: '0.7rem' }}>
                  {patient.documents?.length || 0} Reports
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {patient.documents && patient.documents.length > 0 ? (
                  patient.documents.map((doc, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      backgroundColor: '#fafafa',
                      gap: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(13, 148, 136, 0.08)',
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <FileText size={18} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-head)' }}>{doc.name}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Uploaded: {doc.date} | Size: {doc.size}</div>
                        </div>
                      </div>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => alert(`Simulating file download / view: ${doc.name}`)}
                        style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem', borderWidth: '1px' }}
                      >
                        <span>View PDF</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    No documents uploaded for this patient.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Collaborative Doctor Network Panel & Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Collaborative Doctor Network Panel */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--primary-glow)', backgroundColor: '#fafdfd' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-dark)', margin: 0 }}>
                <Activity size={18} />
                <span>Collaborative Doctor Network</span>
              </h3>
              
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0 }}>
                The following physicians are connected to {patient.name}'s file. Joint access ensures clinical safety.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {connectedDoctors.map(doc => {
                  const docPerms = patient.permissions?.[doc.id] || { history: true, medicines: true, notes: false, consultations: false };
                  
                  // Map permissions dynamically to detailed access labels
                  let accessLevel = "Access: Locked";
                  let accessBadgeBg = '#f1f5f9';
                  let accessBadgeColor = 'var(--text-muted)';

                  if (docPerms.history && docPerms.medicines && docPerms.notes && docPerms.consultations) {
                    accessLevel = "Access: Full";
                    accessBadgeBg = 'var(--secondary-light)';
                    accessBadgeColor = 'var(--secondary-dark)';
                  } else if (docPerms.history && docPerms.medicines) {
                    accessLevel = "Access: Medication Only";
                    accessBadgeBg = 'var(--primary-light)';
                    accessBadgeColor = 'var(--primary-dark)';
                  } else if (docPerms.history) {
                    accessLevel = "Access: Summary Only";
                    accessBadgeBg = 'var(--accent-light)';
                    accessBadgeColor = 'var(--accent)';
                  }

                  return (
                    <div key={doc.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.75rem',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      backgroundColor: 'white'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: doc.status === 'online' ? 'var(--secondary)' : '#cbd5e1'
                        }} />
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-head)' }}>{doc.name}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{doc.specialty}</div>
                        </div>
                      </div>
                      <div>
                        <span style={{ 
                          fontSize: '0.65rem', 
                          color: accessBadgeColor, 
                          fontWeight: 700, 
                          backgroundColor: accessBadgeBg, 
                          padding: '0.2rem 0.5rem', 
                          borderRadius: '4px' 
                        }}>
                          {accessLevel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Health Timeline Card */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <History size={18} style={{ color: 'var(--primary)' }} />
                <span>Patient Health Timeline</span>
              </h3>

              <div className="timeline-container">
                {patient.timeline && patient.timeline.length > 0 ? (
                  patient.timeline.map((event) => {
                    // Determine timeline icon visually
                    let iconSymbol = "🩺 Consultation";
                    if (event.type === 'prescription') iconSymbol = "💊 Prescription";
                    if (event.type === 'other') iconSymbol = "✅ Health Milestone";
                    if (event.doctor.includes('Priya')) iconSymbol = "🌿 Ayurvedic Visit";

                    return (
                      <div 
                        key={event.id} 
                        className={`timeline-item timeline-${event.type}`}
                      >
                        <div className="timeline-date">{event.date}</div>
                        <div className="timeline-title" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span>{iconSymbol}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary-dark)', fontWeight: 600, margin: '0.15rem 0' }}>
                          Remarks By: {event.doctor}
                        </div>
                        <p className="timeline-desc" style={{ fontSize: '0.8rem' }}>{event.desc}</p>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>No events logged yet.</div>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

      {activeSubView === 'analyzer' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Checklist input */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: 'white' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Select Patient's Active Symptoms</h3>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {symptomsList.map(s => (
                <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedSymptoms.includes(s.id)}
                    onChange={() => handleSymptomToggle(s.id)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setSelectedSymptoms([]);
                  setAnalysisResult(null);
                  setContraindications([]);
                }}
                disabled={selectedSymptoms.length === 0}
              >
                Clear Selected
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleAnalyze} 
                disabled={selectedSymptoms.length === 0 || isScanning}
                style={{ padding: '0.625rem 2rem' }}
              >
                <SearchCode size={18} />
                <span>{isScanning ? 'Running Diagnostics...' : 'Analyze Symptoms'}</span>
              </button>
            </div>
          </div>

          {/* Scanning Animation */}
          {isScanning && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', gap: '1rem', border: '1px dashed var(--primary)', backgroundColor: 'white' }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                border: '3px solid var(--primary-light)',
                borderTopColor: 'var(--primary)',
                animation: 'spin 1s linear infinite'
              }} />
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
              <div style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>Analyzing Clinical Contraindications...</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Checking patient allergies and prior diagnostic records.</p>
            </div>
          )}

          {/* Results Output */}
          {analysisResult && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Contraindication Warnings (Allergy Alerts) */}
              {contraindications.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {contraindications.map((warn, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'start',
                      gap: '0.75rem',
                      padding: '1rem',
                      backgroundColor: warn.type === 'danger' ? 'var(--warning-light)' : '#fef3c7',
                      color: warn.type === 'danger' ? 'var(--warning-dark)' : '#b45309',
                      borderRadius: 'var(--radius)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      border: `1px solid ${warn.type === 'danger' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(180, 83, 9, 0.2)'}`
                    }}>
                      <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>{warn.message}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'var(--secondary-light)',
                  color: 'var(--secondary-dark)',
                  borderRadius: 'var(--radius)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '1px solid rgba(22, 163, 74, 0.15)'
                }}>
                  <CheckCircle2 size={16} />
                  <span>Allergy Screening Completed: No Penicillin-class or Peanut derivatives contraindicated for {patient.name}'s profile.</span>
                </div>
              )}

              {/* Suggested Treatment Card */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid var(--primary-glow)', backgroundColor: 'white' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                  <span className="badge badge-success" style={{ marginBottom: '0.25rem' }}>Suggested Treatment Plan</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-head)', margin: 0 }}>Dual-Therapy Recommendation ({analysisResult.approach})</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', flexWrap: 'wrap' }}>
                  {/* Modern Meds */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-dark)', borderBottom: '1px dashed var(--border)', paddingBottom: '0.35rem', margin: 0 }}>
                      Modern Pharmaceutical Medicines
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {analysisResult.modern.medicines.map((med, i) => (
                        <div key={i} style={{ padding: '0.5rem 0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: med.contraindication ? 'var(--warning-light)' : 'transparent' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: med.contraindication ? 'var(--warning-dark)' : 'var(--text-head)' }}>{med.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dosage: {med.dosage} | Duration: {med.duration}</div>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.25rem', margin: 0 }}>
                      <strong>Advice:</strong> {analysisResult.modern.advice}
                    </p>
                  </div>

                  {/* Ayurvedic Herbs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--secondary-dark)', borderBottom: '1px dashed var(--border)', paddingBottom: '0.35rem', margin: 0 }}>
                      Ayurvedic Traditional Herbs & Remedies
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {analysisResult.ayurveda.medicines.map((med, i) => (
                        <div key={i} style={{ padding: '0.5rem 0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-head)' }}>{med.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dosage: {med.dosage} | Duration: {med.duration}</div>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.25rem', margin: 0 }}>
                      <strong>Advice:</strong> {analysisResult.ayurveda.advice}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons to build prescription */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button className="btn btn-secondary" onClick={() => setActiveSubView('profile')}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSendToPrescription} style={{ padding: '0.625rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FilePlus size={18} />
                  <span>Proceed to Prescription Builder</span>
                </button>
              </div>

            </div>
          )}
        </div>
      )}

      {activeSubView === 'prescription' && (
        <form onSubmit={handlePrescriptionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: 'white' }}>
            
            {/* Collaborative Doctor Network Header Strip */}
            <div style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#fafdfd',
              border: '1px solid var(--primary-glow)',
              borderRadius: 'var(--radius)',
              fontSize: '0.75rem',
              color: 'var(--primary-dark)',
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>🌐 Collaborative Network connected providers: <strong>3 Doctors</strong></span>
              <span>Allergy Screening Status: <strong>Allergy Screening Active</strong></span>
            </div>

            {/* Patient Details banner */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Patient Name</span>
                <div style={{ fontWeight: 700, color: 'var(--text-head)' }}>{patient.name} (ID: {patient.id})</div>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Age / Gender / Height</span>
                <div style={{ fontWeight: 600, color: 'var(--text-head)' }}>{patient.age} yrs / {patient.gender} / {patient.height}cm</div>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Known Allergies</span>
                <div style={{ fontWeight: 700, color: 'var(--warning-dark)' }}>{patient.allergies}</div>
              </div>
            </div>

            {/* Diagnosis */}
            <div className="form-group">
              <label className="form-label">Active Diagnosis</label>
              <input 
                type="text" 
                placeholder="e.g. Acute Viral Bronchitis, Hypertension"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="form-control"
                style={{ backgroundColor: '#fafafa' }}
                required
              />
            </div>

            {/* Medicines builder */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label className="form-label">Medications List</label>
              
              {medicines.map((med, idx) => {
                const allergyWarning = checkAllergyContraindication(med.name);

                return (
                  <div key={idx} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    border: '1px solid var(--border)',
                    padding: '1rem',
                    borderRadius: 'var(--radius)',
                    backgroundColor: '#fafafa',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '0.75rem',
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{ flex: 2, minWidth: '180px' }}>
                        <input 
                          type="text" 
                          placeholder="Medicine Name (e.g. Amoxicillin)"
                          value={med.name}
                          onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)}
                          className="form-control"
                          style={{ border: allergyWarning ? '1px solid var(--warning)' : '1px solid var(--border)', backgroundColor: 'white' }}
                          required
                        />
                      </div>
                      <div style={{ flex: 1.5, minWidth: '150px' }}>
                        <input 
                          type="text" 
                          placeholder="Dosage (e.g. 1 tablet after food)"
                          value={med.dosage}
                          onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)}
                          className="form-control"
                          style={{ backgroundColor: 'white' }}
                          required
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: '100px' }}>
                        <input 
                          type="text" 
                          placeholder="e.g. 5 Days"
                          value={med.duration}
                          onChange={(e) => handleMedicineChange(idx, 'duration', e.target.value)}
                          className="form-control"
                          style={{ backgroundColor: 'white' }}
                          required
                        />
                      </div>
                      {medicines.length > 1 && (
                        <button 
                          type="button" 
                          className="btn btn-warning" 
                          onClick={() => handleRemoveMedicine(idx)}
                          style={{ padding: '0.5rem', borderRadius: '8px' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    {/* Timing dosage checkboxes */}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.8rem', paddingLeft: '0.25rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Timing Scheduler:</span>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          checked={med.morning} 
                          onChange={(e) => handleMedicineChange(idx, 'morning', e.target.checked)}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <span>Morning</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          checked={med.afternoon} 
                          onChange={(e) => handleMedicineChange(idx, 'afternoon', e.target.checked)}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <span>Afternoon</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          checked={med.night} 
                          onChange={(e) => handleMedicineChange(idx, 'night', e.target.checked)}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <span>Night</span>
                      </label>
                    </div>

                    {/* Real-time Allergy Safeguard Warning Alert Banner */}
                    {allergyWarning && (
                      <div style={{
                        padding: '0.5rem 0.75rem',
                        backgroundColor: 'var(--warning-light)',
                        color: 'var(--warning-dark)',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        border: '1px solid rgba(220, 38, 38, 0.15)',
                        marginTop: '0.25rem'
                      }}>
                        <AlertTriangle size={14} style={{ flexShrink: 0 }} />
                        <span>{allergyWarning}</span>
                      </div>
                    )}
                  </div>
                );
              })}

              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleAddMedicine}
                style={{
                  alignSelf: 'flex-start',
                  fontSize: '0.8rem',
                  padding: '0.4rem 1rem',
                  gap: '0.25rem'
                }}
              >
                <Plus size={14} />
                <span>Add Medicine</span>
              </button>
            </div>

            {/* Advice */}
            <div className="form-group" style={{ marginTop: '0.5rem' }}>
              <label className="form-label">Clinical Advice & Diet Plan</label>
              <textarea 
                rows="3" 
                placeholder="e.g. Rest, drink hot fluids, avoid strenuous exercise..."
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                className="form-control"
                style={{ backgroundColor: '#fafafa' }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setActiveSubView('profile')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.625rem 2rem' }}>
              <FileText size={18} />
              <span>Generate & Sign Prescription</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
