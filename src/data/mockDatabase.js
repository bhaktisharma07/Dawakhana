export const mockDoctors = [
  {
    id: "doc-1",
    name: "Dr. Amit Patel",
    specialty: "General Physician",
    clinic: "City Health Clinic",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=60",
    status: "online"
  },
  {
    id: "doc-2",
    name: "Dr. Sarah Rahman",
    specialty: "Cardiologist",
    clinic: "Metro Heart Care",
    avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?w=150&auto=format&fit=crop&q=60",
    status: "online"
  },
  {
    id: "doc-3",
    name: "Dr. Priya Sen",
    specialty: "Traditional & Ayurvedic Expert",
    clinic: "AyurCare Healing Center",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=60",
    status: "offline"
  },
  {
    id: "doc-4",
    name: "Dr. Raj Patil",
    specialty: "Dentist",
    clinic: "Smile Dental Studio",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=60",
    status: "online"
  }
];

export const mockPatients = [
  {
    id: "pat-1",
    name: "Ananya Sharma",
    age: 28,
    gender: "Female",
    weight: 58,
    height: 162,
    bloodGroup: "O+",
    allergies: "Penicillin",
    existingDiseases: "Mild Asthma",
    lastVisit: "2 days ago",
    connectedDoctorsCount: 3,
    riskLevel: "Medium",
    currentMedications: "Albuterol Inhaler (PRN), Cetirizine 10mg",
    emergencyContact: "Mother (Mrs. Sharma) - +91 98765 43210",
    documents: [
      { id: "doc-report-1", name: "Blood Test.pdf", date: "10 May 2026", size: "1.2 MB" },
      { id: "doc-report-2", name: "Xray.pdf", date: "11 May 2026", size: "4.5 MB" },
      { id: "doc-report-3", name: "MRI.pdf", date: "18 May 2026", size: "12.8 MB" }
    ],
    pastConsultations: [
      { doctorName: "Dr. Amit Patel", specialty: "General Physician", date: "12 May 2026" },
      { doctorName: "Dr. Sarah Rahman", specialty: "Cardiologist", date: "18 May 2026" }
    ],
    timeline: [
      { id: "t-1", date: "2026-05-10", type: "consultation", title: "Asthma Consultation", desc: "Consulted Dr. Amit Patel for mild breathing tightness. Prescribed Inhaler.", doctor: "Dr. Amit Patel" },
      { id: "t-2", date: "2026-05-11", type: "prescription", title: "Prescription Generated", desc: "Albuterol Inhaler (1 puff every 6 hours as needed).", doctor: "Dr. Amit Patel" },
      { id: "t-3", date: "2026-05-18", type: "other", title: "Recovery Completed", desc: "Reported complete relief from respiratory congestion.", doctor: "System" },
      { id: "t-4", date: "2026-05-25", type: "consultation", title: "Holistic Wellness Visit", desc: "Consulted Dr. Priya Sen for general exhaustion. Advised Ashwagandha and herbal decoction.", doctor: "Dr. Priya Sen" }
    ],
    medicalHistory: "Diagnosed with childhood asthma. Underwent allergy testing in 2022 confirming allergy to beta-lactam antibiotics (Penicillin). No surgeries.",
    previousMedicines: "Albuterol Inhaler, Cetirizine 10mg (Seasonal Allergies)",
    personalNotes: "Patient prefers minimal dosage of pharmaceutical stimulants. Highly responsive to meditation and natural herbs.",
    consultationNotes: "Slight wheezing heard in lower lobes. Airflow checks within 85% of normal. Advised to avoid dusty environments.",
    permissions: {
      "doc-1": { history: true, medicines: true, notes: true, consultations: true },
      "doc-2": { history: true, medicines: true, notes: false, consultations: false },
      "doc-3": { history: true, medicines: true, notes: false, consultations: false },
      "doc-4": { history: false, medicines: false, notes: false, consultations: false }
    },
    globalConsents: {
      history: true,
      medicines: true,
      notes: false,
      mentalHealth: false,
      labReports: true
    }
  },
  {
    id: "pat-2",
    name: "Rahul Verma",
    age: 32,
    gender: "Male",
    weight: 74,
    height: 178,
    bloodGroup: "A+",
    allergies: "Peanuts, Sulfa Drugs",
    existingDiseases: "Hypertension",
    lastVisit: "1 week ago",
    connectedDoctorsCount: 4,
    riskLevel: "High",
    currentMedications: "Amlodipine 5mg",
    emergencyContact: "Father (Mr. Verma) - +91 91234 56789",
    documents: [
      { id: "doc-report-4", name: "Blood Test.pdf", date: "28 April 2026", size: "1.1 MB" },
      { id: "doc-report-5", name: "Xray.pdf", date: "02 May 2026", size: "3.9 MB" },
      { id: "doc-report-6", name: "MRI.pdf", date: "05 May 2026", size: "11.2 MB" }
    ],
    pastConsultations: [
      { doctorName: "Dr. Raj Patil", specialty: "Dentist", date: "05 May 2026" },
      { doctorName: "Dr. Sarah Rahman", specialty: "Cardiologist", date: "12 May 2026" }
    ],
    timeline: [
      { id: "t-5", date: "2026-04-15", type: "consultation", title: "Dental Scaling & Checkup", desc: "Deep cleaning done by Dr. Raj Patil. Noted slight enamel wear.", doctor: "Dr. Raj Patil" },
      { id: "t-6", date: "2026-05-01", type: "consultation", title: "Cardio Consultation", desc: "Checked blood pressure with Dr. Sarah Rahman. Reading was 142/90. Recommended daily walks and salt reduction.", doctor: "Dr. Sarah Rahman" },
      { id: "t-7", date: "2026-05-02", type: "prescription", title: "Prescription Issued", desc: "Amlodipine 5mg (1 tablet daily in morning).", doctor: "Dr. Sarah Rahman" }
    ],
    medicalHistory: "Hypertension diagnosed in 2025. Controlled primarily via medication and diet. Severe peanut allergy (anaphylaxis risk).",
    previousMedicines: "Amlodipine 5mg, Multivitamins",
    personalNotes: "Stresses frequently due to corporate software job. Tends to forget morning medication. Advised alarms.",
    consultationNotes: "Blood pressure reading fluctuating. EKG is normal. Advised monitoring daily.",
    permissions: {
      "doc-1": { history: true, medicines: true, notes: true, consultations: true },
      "doc-2": { history: true, medicines: true, notes: true, consultations: true },
      "doc-3": { history: true, medicines: true, notes: false, consultations: false },
      "doc-4": { history: true, medicines: true, notes: false, consultations: false }
    },
    globalConsents: {
      history: true,
      medicines: true,
      notes: true,
      mentalHealth: true,
      labReports: true
    }
  }
];

export const mockAppointments = [
  { id: "a-1", patientId: "pat-1", patientName: "Ananya Sharma", doctorId: "doc-1", doctorName: "Dr. Amit Patel", date: "2026-06-01", time: "10:00 AM", status: "completed" },
  { id: "a-2", patientId: "pat-2", patientName: "Rahul Verma", doctorId: "doc-2", doctorName: "Dr. Sarah Rahman", date: "2026-06-01", time: "11:30 AM", status: "upcoming" },
  { id: "a-3", patientId: "pat-1", patientName: "Ananya Sharma", doctorId: "doc-3", doctorName: "Dr. Priya Sen", date: "2026-06-01", time: "02:00 PM", status: "cancelled" },
  { id: "a-4", patientId: "pat-2", patientName: "Rahul Verma", doctorId: "doc-1", doctorName: "Dr. Amit Patel", date: "2026-06-01", time: "04:30 PM", status: "upcoming" }
];

export const mockChats = {
  "doc-1-pat-1": [
    { sender: "doctor", text: "Hello Ananya, how are you feeling today?", timestamp: "10:15 AM" },
    { sender: "patient", text: "Hi Doctor! My breathing is much better now, inhaler worked quickly.", timestamp: "10:18 AM" },
    { sender: "doctor", text: "Excellent. Keep it with you and use only if you feel chest tightness. Stay hydrated.", timestamp: "10:20 AM" }
  ],
  "doc-2-pat-2": [
    { sender: "doctor", text: "Rahul, please log your blood pressure readings for this week.", timestamp: "11:00 AM" },
    { sender: "patient", text: "Sure doctor. Average has been around 135/88.", timestamp: "11:05 AM" },
    { sender: "doctor", text: "Okay, that's better. Continue your regular doses after breakfast.", timestamp: "11:08 AM" },
    { sender: "patient", text: "Okay doctor.", timestamp: "11:10 AM" }
  ]
};

export const mockSymptomTemplates = {
  fever: {
    modern: {
      medicines: [
        { name: "Paracetamol 650mg", dosage: "1 tablet three times daily (after meals)", duration: "3 Days" },
        { name: "Electral Powder (ORS)", dosage: "Dissolve 1 sachet in 1L water; drink throughout day", duration: "2 Days" }
      ],
      advice: "Complete physical rest. Keep cold damp cloth on forehead to reduce temperature. Avoid heavy foods."
    },
    ayurveda: {
      medicines: [
        { name: "Tulsi & Ginger Decoction", dosage: "50ml warm brew twice daily", duration: "5 Days" },
        { name: "Maha Sudarshan Vati", dosage: "1 tablet twice daily with warm water", duration: "5 Days" }
      ],
      advice: "Steam inhalation twice a day. Avoid cold water, dairy, and heavy grains (take rice gruel/moong dal soup instead)."
    },
    scores: { modern: 85, ayurveda: 75, combined: 95 }
  },
  headache: {
    modern: {
      medicines: [
        { name: "Ibuprofen 400mg", dosage: "1 tablet only if pain is severe (SOS)", duration: "2 Days" }
      ],
      advice: "Rest in a quiet, dark room. Limit screen time. Apply light massage to forehead."
    },
    ayurveda: {
      medicines: [
        { name: "Anu Taila (Nasal Drops)", dosage: "2 drops in each nostril in morning", duration: "3 Days" },
        { name: "Pathyadi Decoction", dosage: "20ml with equal warm water after meals", duration: "5 Days" }
      ],
      advice: "Apply warm herbal compress/paste of ginger/sandalwood on forehead."
    },
    scores: { modern: 80, ayurveda: 70, combined: 90 }
  },
  cough: {
    modern: {
      medicines: [
        { name: "Dextromethorphan Syrup (Cough suppressant)", dosage: "10ml three times daily", duration: "5 Days" }
      ],
      advice: "Avoid oily, spicy food and cold beverages. Keep throat warm."
    },
    ayurveda: {
      medicines: [
        { name: "Kanthamrit Chewable Pills", dosage: "Suck 1 pill 3-4 times daily", duration: "5 Days" },
        { name: "Ginger & Honey Juice paste", dosage: "1 teaspoon freshly squeezed thrice daily", duration: "5 Days" }
      ],
      advice: "Warm saltwater gargling with turmeric twice daily. Drink herbal tea."
    },
    scores: { modern: 85, ayurveda: 80, combined: 95 }
  },
  body_pain: {
    modern: {
      medicines: [
        { name: "Aceclofenac 100mg", dosage: "1 tablet twice daily after food", duration: "3 Days" }
      ],
      advice: "Ensure sound sleep. Avoid heavy lifting and intense exercises."
    },
    ayurveda: {
      medicines: [
        { name: "Ashwagandha Powder", dosage: "1 teaspoon with warm milk at bedtime", duration: "7 Days" },
        { name: "Mahanarayan Oil Massage", dosage: "Gently apply on affected muscles, follow with warm bath", duration: "5 Days" }
      ],
      advice: "Gentle stretches. Warm epsom salt soak is highly recommended."
    },
    scores: { modern: 75, ayurveda: 75, combined: 90 }
  },
  sore_throat: {
    modern: {
      medicines: [
        { name: "Chlorhexidine Lozenges", dosage: "Suck 1 lozenge every 4 hours", duration: "3 Days" }
      ],
      advice: "Rest vocal cords. Avoid chilled beverages and ice creams."
    },
    ayurveda: {
      medicines: [
        { name: "Yashtimadhu (Licorice) Powder", dosage: "1/2 tsp with honey twice daily", duration: "5 Days" },
        { name: "Turmeric Salt Water Gargles", dosage: "Gargle with hot water 3 times a day", duration: "4 Days" }
      ],
      advice: "Sip warm water constantly throughout the day."
    },
    scores: { modern: 80, ayurveda: 85, combined: 95 }
  }
};

export const mockPreviousCases = [
  { id: "c-1", symptoms: ["Fever", "Headache"], diagnosis: "Acute Viral Fever", treatment: "Combined Approach: Paracetamol + Tulsi Tea & Ginger decoction", recoveryDays: 5, immunity: "Good", age: "Youth (18-35)" },
  { id: "c-2", symptoms: ["Cough", "Sore Throat"], diagnosis: "Mild Laryngitis", treatment: "Ayurvedic Focus: Turmeric-salt gargles & Yashtimadhu chewables", recoveryDays: 4, immunity: "Normal", age: "Middle Age (36-50)" },
  { id: "c-3", symptoms: ["Fever", "Body Pain"], diagnosis: "Influenza (Flu)", treatment: "Combined: Paracetamol 650mg + Ashwagandha warm milk & bed rest", recoveryDays: 6, immunity: "Excellent", age: "Teenager" }
];
