import React, { createContext, useState, useContext } from 'react';
import { mockPatients, mockAppointments, mockDoctors, mockChats } from '../data/mockDatabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // App Shell Navigation States
  const [role, setRole] = useState('doctor'); // 'doctor' | 'patient'
  const [activeUser, setActiveUser] = useState('doc-1'); // Default active user (Dr. Amit Patel)
  const [activeTab, setActiveTab] = useState('landing'); // landing, dashboard, add-patient, records, profile, analyzer, chat, prescription, patient-dashboard, tracker
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  // Patient Records States
  const [patients, setPatients] = useState(mockPatients);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [prescriptions, setPrescriptions] = useState([
    {
      id: "presc-1",
      patientId: "pat-1",
      patientName: "Ananya Sharma",
      doctorId: "doc-1",
      doctorName: "Dr. Amit Patel",
      doctorSpecialty: "General Physician",
      date: "2026-05-11",
      diagnosis: "Mild Asthma",
      medicines: [
        { name: "Albuterol Inhaler", dosage: "1 puff every 6 hours", duration: "10 Days" }
      ],
      advice: "Avoid dusty environments. Use spacer with inhaler. Keep dynamic medication log.",
      activeDay: 8,
      durationDays: 10
    },
    {
      id: "presc-2",
      patientId: "pat-2",
      patientName: "Rahul Verma",
      doctorId: "doc-2",
      doctorName: "Dr. Sarah Rahman",
      doctorSpecialty: "Cardiologist",
      date: "2026-05-02",
      diagnosis: "Hypertension",
      medicines: [
        { name: "Amlodipine 5mg", dosage: "1 tablet daily after breakfast", duration: "30 Days" }
      ],
      advice: "Low sodium diet. Daily morning walks for 30 minutes. Log blood pressure weekly.",
      activeDay: 15,
      durationDays: 30
    }
  ]);

  // Chat Messenger States
  const [chats, setChats] = useState(mockChats);
  const [isTyping, setIsTyping] = useState(false);

  // Global Actions
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'doctor') {
      setActiveUser('doc-1');
      setActiveTab('dashboard');
      setSelectedPatientId(null);
    } else {
      setActiveUser('pat-1');
      setActiveTab('patient-dashboard');
      setSelectedPatientId('pat-1');
    }
  };

  const handleLogin = (userType, userId) => {
    setRole(userType);
    setActiveUser(userId);
    if (userType === 'doctor') {
      setActiveTab('dashboard');
      setSelectedPatientId(null);
    } else {
      setActiveTab('patient-dashboard');
      setSelectedPatientId(userId);
    }
  };

  const handleLogout = () => {
    setActiveUser(null);
    setSelectedPatientId(null);
    setRole('doctor');
    setActiveTab('landing');
  };

  // Patient Administration Actions
  const addPatient = (newPatient) => {
    const patientId = `pat-${patients.length + 1}`;
    const initialPermissions = {
      "doc-1": { history: true, medicines: true, notes: true, consultations: true },
      "doc-2": { history: true, medicines: true, notes: false, consultations: false },
      "doc-3": { history: true, medicines: true, notes: false, consultations: false },
      "doc-4": { history: true, medicines: true, notes: false, consultations: false }
    };

    const formattedPatient = {
      id: patientId,
      ...newPatient,
      height: newPatient.height || 170,
      lastVisit: "Today",
      riskLevel: newPatient.allergies !== 'None' ? 'Medium' : 'Low',
      connectedDoctorsCount: 3,
      currentMedications: newPatient.currentMedications || 'None',
      timeline: [
        {
          id: `t-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          type: "consultation",
          title: "Initial Registration",
          desc: `Registered as patient under Dawakhana by medical team. Height: ${newPatient.height}cm. Current Meds: ${newPatient.currentMedications || 'None'}`,
          doctor: "System Registration"
        }
      ],
      permissions: newPatient.permissions || initialPermissions,
      globalConsents: newPatient.globalConsents || {
        history: true,
        medicines: true,
        notes: false,
        mentalHealth: false,
        labReports: true
      }
    };

    setPatients(prev => [...prev, formattedPatient]);
    return formattedPatient;
  };

  const updateGlobalConsent = (patientId, category, value) => {
    setPatients(prev => prev.map(pat => {
      if (pat.id === patientId) {
        return {
          ...pat,
          globalConsents: {
            ...pat.globalConsents,
            [category]: value
          }
        };
      }
      return pat;
    }));
  };

  const updatePermissions = (patientId, doctorId, category, value) => {
    setPatients(prev => prev.map(pat => {
      if (pat.id === patientId) {
        return {
          ...pat,
          permissions: {
            ...pat.permissions,
            [doctorId]: {
              ...pat.permissions[doctorId],
              [category]: value
            }
          }
        };
      }
      return pat;
    }));
  };

  const updateConsultationNotes = (patientId, notes) => {
    setPatients(prev => prev.map(pat => {
      if (pat.id === patientId) {
        return {
          ...pat,
          consultationNotes: notes
        };
      }
      return pat;
    }));
  };

  const bookAppointment = (patientId, patientName, doctorId, doctorName, date, time) => {
    const newAppointment = {
      id: `a-${Date.now()}`,
      patientId,
      patientName,
      doctorId,
      doctorName,
      date,
      time,
      status: "upcoming"
    };

    setAppointments(prev => [...prev, newAppointment]);

    setPatients(prev => prev.map(pat => {
      if (pat.id === patientId) {
        return {
          ...pat,
          timeline: [
            {
              id: `t-${Date.now()}`,
              date,
              type: "consultation",
              title: "Appointment Booked",
              desc: `Scheduled visual consultation with ${doctorName} at ${time}.`,
              doctor: doctorName
            },
            ...pat.timeline
          ]
        };
      }
      return pat;
    }));
  };

  const addPrescription = (prescription) => {
    const prescId = `presc-${Date.now()}`;
    const formattedPrescription = {
      id: prescId,
      ...prescription,
      date: new Date().toISOString().split('T')[0],
      activeDay: 1,
      durationDays: parseInt(prescription.medicines[0]?.duration) || 5
    };

    setPrescriptions(prev => [formattedPrescription, ...prev]);

    setPatients(prev => prev.map(pat => {
      if (pat.id === prescription.patientId) {
        return {
          ...pat,
          previousMedicines: [
            ...new Set([
              ...(pat.previousMedicines ? pat.previousMedicines.split(', ') : []),
              ...prescription.medicines.map(m => m.name)
            ])
          ].join(', '),
          timeline: [
            {
              id: `t-${Date.now()}`,
              date: formattedPrescription.date,
              type: "prescription",
              title: "Prescription Generated",
              desc: `New prescription by ${prescription.doctorName}: ${prescription.medicines.map(m => m.name).join(', ')}.`,
              doctor: prescription.doctorName
            },
            ...pat.timeline
          ]
        };
      }
      return pat;
    }));
  };

  const advanceRecoveryDay = (prescriptionId) => {
    setPrescriptions(prev => prev.map(presc => {
      if (presc.id === prescriptionId) {
        const nextDay = Math.min(presc.activeDay + 1, presc.durationDays);
        
        if (nextDay === presc.durationDays && presc.activeDay !== presc.durationDays) {
          setPatients(currentPatients => currentPatients.map(pat => {
            if (pat.id === presc.patientId) {
              const alreadyHasRecovery = pat.timeline.some(t => t.title === "Recovery Completed" && t.date === new Date().toISOString().split('T')[0]);
              if (!alreadyHasRecovery) {
                return {
                  ...pat,
                  timeline: [
                    {
                      id: `t-${Date.now()}`,
                      date: new Date().toISOString().split('T')[0],
                      type: "other",
                      title: "Recovery Completed",
                      desc: `Completed full medical dosage cycle of ${presc.medicines.map(m => m.name).join(', ')}. Symptoms fully resolved.`,
                      doctor: presc.doctorName
                    },
                    ...pat.timeline
                  ]
                };
              }
            }
            return pat;
          }));
        }

        return { ...presc, activeDay: nextDay };
      }
      return presc;
    }));
  };

  // Messenger Chat Actions
  const getChatId = (doctorId, patientId) => `${doctorId}-${patientId}`;

  const sendMessage = (doctorId, patientId, text, sender) => {
    const chatId = getChatId(doctorId, patientId);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = { sender, text, timestamp };

    setChats(prev => {
      const activeMessages = prev[chatId] || [];
      return {
        ...prev,
        [chatId]: [...activeMessages, newMessage]
      };
    });

    if (sender === 'patient') {
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        const lowerText = text.toLowerCase();
        let reply = "Hello! I am reviewing your active health records. Please make sure to stick to the prescribed dosages and let me know if anything changes.";

        if (lowerText.includes('cough') || lowerText.includes('throat') || lowerText.includes('cold')) {
          reply = "For cough and throat irritation, please do saltwater gargles thrice daily and avoid cold food items. Continue the prescribed cough syrup.";
        } else if (lowerText.includes('fever') || lowerText.includes('temperature')) {
          reply = "If your temperature exceeds 100°F, make sure to take your Paracetamol and get absolute rest. Keep logging your symptoms.";
        } else if (lowerText.includes('pain') || lowerText.includes('headache') || lowerText.includes('body')) {
          reply = "For body aches and headache, ensure you are fully hydrated. Make sure to take pain relievers strictly after meals.";
        } else if (lowerText.includes('ok') || lowerText.includes('okay') || lowerText.includes('thank') || lowerText.includes('thanks')) {
          reply = "You're very welcome! Keep tracking your recovery on the portal and get plenty of rest.";
        } else if (lowerText.includes('allergy') || lowerText.includes('side effect')) {
          reply = "If you notice skin rashes, nausea, or breathing issues, stop the medication immediately and visit the emergency clinic. Keep your emergency card handy.";
        }

        const replyMessage = {
          sender: "doctor",
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChats(currentChats => {
          const activeMessages = currentChats[chatId] || [];
          return {
            ...currentChats,
            [chatId]: [...activeMessages, replyMessage]
          };
        });
      }, 1500);
    }
  };

  return (
    <AppContext.Provider value={{
      // Navigation state
      role,
      setRole: handleRoleChange,
      activeUser,
      setActiveUser,
      activeTab,
      setActiveTab,
      selectedPatientId,
      setSelectedPatientId,
      handleLogin,
      handleLogout,

      // Patients database state
      patients,
      appointments,
      prescriptions,
      addPatient,
      updatePermissions,
      updateConsultationNotes,
      updateGlobalConsent,
      bookAppointment,
      addPrescription,
      advanceRecoveryDay,

      // Chat state
      chats,
      sendMessage,
      getChatId,
      isTyping
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
export default AppContext;
