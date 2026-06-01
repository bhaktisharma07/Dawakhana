import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { mockDoctors } from '../data/mockDatabase';
import { Send, MessageSquare, PhoneCall, Video } from 'lucide-react';

const Chat = () => {
  const { chats, sendMessage, getChatId, isTyping, patients, role, activeUser, selectedPatientId, setSelectedPatientId } = useApp();

  const [inputText, setInputText] = useState('');
  const [activeContactId, setActiveContactId] = useState('');
  
  const messagesEndRef = useRef(null);

  // Set initial active contact
  useEffect(() => {
    if (role === 'doctor') {
      // Doctor views patient list. Default to selected patient or first patient
      if (selectedPatientId) {
        setActiveContactId(selectedPatientId);
      } else if (patients.length > 0) {
        setActiveContactId(patients[0].id);
      }
    } else {
      // Patient views doctor list. Default to doc-1
      if (activeUser) {
        // activeUser is the patient ID in patient portal, but let's select a default doctor
        setActiveContactId('doc-1');
      } else {
        setActiveContactId('doc-1');
      }
    }
  }, [role, selectedPatientId, patients, activeUser]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeContactId, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeContactId) return;

    let docId, patId;
    if (role === 'doctor') {
      docId = activeUser || 'doc-1';
      patId = activeContactId;
    } else {
      docId = activeContactId;
      patId = selectedPatientId || 'pat-1'; // in patient role, selectedPatientId contains logged-in patient
    }

    sendMessage(docId, patId, inputText, role);
    setInputText('');
  };

  // Determine chatId
  let currentDocId, currentPatId;
  if (role === 'doctor') {
    currentDocId = activeUser || 'doc-1';
    currentPatId = activeContactId;
  } else {
    currentDocId = activeContactId;
    currentPatId = selectedPatientId || 'pat-1';
  }

  const activeChatId = getChatId(currentDocId, currentPatId);
  const activeMessages = chats[activeChatId] || [];

  // Contact detail
  const getContactDetail = () => {
    if (!activeContactId) return null;
    if (role === 'doctor') {
      return patients.find(p => p.id === activeContactId);
    } else {
      return mockDoctors.find(d => d.id === activeContactId);
    }
  };

  const contactDetail = getContactDetail();
  const activeDoctorDetail = mockDoctors.find(d => d.id === currentDocId) || mockDoctors[0];

  return (
    <div className="chat-container">
      
      {/* Sidebar: Contacts */}
      <div className="chat-sidebar">
        <div className="chat-sidebar-header">
          {role === 'doctor' ? 'Active Case Contacts' : 'Your Medical Specialists'}
        </div>
        <div className="chat-contact-list">
          {role === 'doctor' ? (
            /* Patients list */
            patients.map(p => (
              <div 
                key={p.id} 
                onClick={() => {
                  setActiveContactId(p.id);
                  setSelectedPatientId(p.id);
                }}
                className={`chat-contact-item ${activeContactId === p.id ? 'active' : ''}`}
              >
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}>
                  {p.name.charAt(0)}
                </div>
                <div className="chat-contact-info">
                  <div className="chat-contact-name">{p.name}</div>
                  <div className="chat-contact-lastmsg">Click to message (Allergy: {p.allergies})</div>
                </div>
              </div>
            ))
          ) : (
            /* Doctors list */
            mockDoctors.map(d => (
              <div 
                key={d.id} 
                onClick={() => setActiveContactId(d.id)}
                className={`chat-contact-item ${activeContactId === d.id ? 'active' : ''}`}
              >
                <img src={d.avatar} alt={d.name} className="chat-contact-avatar" />
                <div className="chat-contact-info">
                  <div className="chat-contact-name">{d.name}</div>
                  <div className="chat-contact-lastmsg">{d.specialty} • {d.status}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Canvas */}
      {contactDetail ? (
        <div className="chat-main">
          {/* Header */}
          <div className="chat-main-header">
            {role === 'doctor' ? (
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700
              }}>
                {contactDetail.name.charAt(0)}
              </div>
            ) : (
              <img src={contactDetail.avatar} alt={contactDetail.name} className="chat-contact-avatar" />
            )}
            
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: 'var(--text-head)', fontSize: '0.95rem' }}>{contactDetail.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {role === 'doctor' ? `Patient Records (Allergies: ${contactDetail.allergies})` : contactDetail.specialty}
              </div>
            </div>

            {/* Simulated tele-health call overlays */}
            <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <button 
                onClick={() => alert('Simulating tele-health audio ring... Connection successful!')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <PhoneCall size={18} />
              </button>
              <button 
                onClick={() => alert('Simulating virtual clinical video stream... Connected!')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <Video size={18} />
              </button>
            </div>
          </div>

          {/* Clinical Patient Context Strip (USP focus) */}
          {role === 'doctor' ? (
            <div style={{
              backgroundColor: 'var(--accent-light)',
              borderBottom: '1px solid var(--border)',
              padding: '0.65rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.8rem',
              color: 'var(--accent)',
              fontWeight: 500
            }}>
              <span>Condition: <strong style={{ color: 'var(--text-head)' }}>{contactDetail.existingDiseases || 'Asthma'}</strong></span>
              <span>Status: <strong style={{ color: 'var(--secondary-dark)' }}>● Online</strong></span>
              <span>Connected Doctors: <strong style={{ color: 'var(--text-head)' }}>3 Providers</strong></span>
              <span>Last Prescription: <strong style={{ color: 'var(--text-head)' }}>May 11</strong></span>
            </div>
          ) : (
            <div style={{
              backgroundColor: 'var(--primary-light)',
              borderBottom: '1px solid var(--border)',
              padding: '0.65rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.8rem',
              color: 'var(--primary-dark)',
              fontWeight: 500
            }}>
              <span>Specialty: <strong>{contactDetail.specialty}</strong></span>
              <span>Status: <strong style={{ color: 'var(--secondary-dark)' }}>● Available</strong></span>
              <span>Clinic: <strong>{contactDetail.clinic}</strong></span>
            </div>
          )}

          {/* Messages */}
          <div className="chat-body">
            {activeMessages.map((msg, idx) => {
              const isMsgSentByMe = (role === 'doctor' && msg.sender === 'doctor') || 
                                    (role === 'patient' && msg.sender === 'patient');

              return (
                <div 
                  key={idx} 
                  className={`chat-bubble ${isMsgSentByMe ? 'chat-bubble-patient' : 'chat-bubble-doctor'}`}
                >
                  <div>{msg.text}</div>
                  <div className="chat-bubble-time">{msg.timestamp}</div>
                </div>
              );
            })}

            {isTyping && role === 'patient' && (
              <div className="chat-typing-indicator">
                {contactDetail.name} is typing medical response...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="chat-footer">
            <input 
              type="text" 
              placeholder="Type your medical query or care advice..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="chat-input"
            />
            <button type="submit" className="chat-send-btn">
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', gap: '1rem' }}>
          <MessageSquare size={48} />
          <div>Select a clinical contact to start the messaging session.</div>
        </div>
      )}

    </div>
  );
};

export default Chat;
