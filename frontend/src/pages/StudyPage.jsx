import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Bell, Moon, Sun, ChevronLeft, ChevronDown, Clock, Play, ArrowRight,
  Check, AlertTriangle, LogOut, Brain, Zap, EyeOff, BookText, Target, Layers,
  Lightbulb, Scale, CheckCircle, X, Sparkles, FileText, Download, Repeat, Calendar,
  Trophy, LayoutDashboard, Calendar as CalendarIcon, FileText as FileTextIcon
} from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { progressApi, studyApi, quizApi, syllabusApi, focusApi } from '../services/api';

const PIPELINE_STEPS = [
  { key: 'video', label: 'Video', icon: Play },
  { key: 'notes', label: 'Notes', icon: FileTextIcon },
  { key: 'quiz', label: 'Quiz', icon: CheckCircle },
  { key: 'analysis', label: 'Analysis', icon: Target },
  { key: 'review', label: 'Review', icon: Repeat },
];

const SUBJECT_ICON_MAP = {
  Brain: Brain, BookText: BookText, Target: Target, Zap: Zap, Scale: Scale,
  Layers: Layers, LayoutDashboard: LayoutDashboard, Calendar: Calendar,
  ArrowRight: ArrowRight, FileTextIcon: FileTextIcon, BookOpen: BookOpen, CheckCircle: CheckCircle,
  Lightbulb: Lightbulb,
};

const SUBJECT_COLORS = {
  Mathematics: '#6366f1', English: '#8b5cf6', Siswati: '#ec4899', Biology: '#10b981',
  Chemistry: '#f59e0b', Physics: '#6366f1', 'Combined Science': '#06b6d4', Geography: '#10b981',
  History: '#f59e0b', 'Development Studies': '#ef4444', Accounting: '#06b6d4',
  'Business Studies': '#6366f1', Economics: '#8b5cf6', Agriculture: '#10b981', ICT: '#ec4899',
};

const MOCK_SUBJECTS = [
  {
    _id: 's1', name: 'Mathematics', icon: 'Brain', topics: [
      { _id: 't1', name: 'Algebra', status: 'done', mastery: 92 },
      { _id: 't2', name: 'Geometry', status: 'started', mastery: 45 },
      { _id: 't3', name: 'Calculus', status: 'pending', mastery: 0 },
      { _id: 't4', name: 'Trigonometry', status: 'locked', mastery: 0 },
      { _id: 't5', name: 'Statistics', status: 'locked', mastery: 0 },
    ]
  },
  {
    _id: 's2', name: 'English', icon: 'BookText', topics: [
      { _id: 't6', name: 'Grammar & Syntax', status: 'done', mastery: 88 },
      { _id: 't7', name: 'Comprehension', status: 'done', mastery: 95 },
      { _id: 't8', name: 'Essay Writing', status: 'started', mastery: 30 },
      { _id: 't9', name: 'Literature', status: 'pending', mastery: 0 },
      { _id: 't10', name: 'Poetry', status: 'locked', mastery: 0 },
    ]
  },
  {
    _id: 's3', name: 'Siswati', icon: 'BookText', topics: [
      { _id: 't11', name: 'Tinhlamusiso', status: 'done', mastery: 85 },
      { _id: 't12', name: 'Sichazamagama', status: 'started', mastery: 40 },
      { _id: 't13', name: 'Tindzaba', status: 'pending', mastery: 0 },
      { _id: 't14', name: 'Buniyalo', status: 'locked', mastery: 0 },
      { _id: 't15', name: 'Tincwadzi', status: 'locked', mastery: 0 },
    ]
  },
  {
    _id: 's4', name: 'Biology', icon: 'Target', topics: [
      { _id: 't16', name: 'Cell Biology', status: 'done', mastery: 90 },
      { _id: 't17', name: 'Genetics', status: 'started', mastery: 55 },
      { _id: 't18', name: 'Ecology', status: 'pending', mastery: 0 },
      { _id: 't19', name: 'Human Physiology', status: 'locked', mastery: 0 },
      { _id: 't20', name: 'Evolution', status: 'locked', mastery: 0 },
    ]
  },
  {
    _id: 's5', name: 'Chemistry', icon: 'Zap', topics: [
      { _id: 't21', name: 'Atomic Structure', status: 'done', mastery: 87 },
      { _id: 't22', name: 'Chemical Bonding', status: 'done', mastery: 78 },
      { _id: 't23', name: 'Reactions', status: 'started', mastery: 35 },
      { _id: 't24', name: 'Organic Chemistry', status: 'pending', mastery: 0 },
      { _id: 't25', name: 'Thermochemistry', status: 'locked', mastery: 0 },
    ]
  },
  {
    _id: 's6', name: 'Physics', icon: 'Scale', topics: [
      { _id: 't26', name: 'Mechanics', status: 'done', mastery: 82 },
      { _id: 't27', name: 'Waves & Sound', status: 'started', mastery: 48 },
      { _id: 't28', name: 'Electricity', status: 'pending', mastery: 0 },
      { _id: 't29', name: 'Magnetism', status: 'locked', mastery: 0 },
      { _id: 't30', name: 'Modern Physics', status: 'locked', mastery: 0 },
    ]
  },
  {
    _id: 's7', name: 'Combined Science', icon: 'Layers', topics: [
      { _id: 't31', name: 'Scientific Inquiry', status: 'done', mastery: 80 },
      { _id: 't32', name: 'Matter & Materials', status: 'started', mastery: 42 },
      { _id: 't33', name: 'Energy Systems', status: 'pending', mastery: 0 },
      { _id: 't34', name: 'Life Processes', status: 'locked', mastery: 0 },
      { _id: 't35', name: 'Earth & Space', status: 'locked', mastery: 0 },
    ]
  },
  {
    _id: 's8', name: 'Geography', icon: 'LayoutDashboard', topics: [
      { _id: 't36', name: 'Mapwork', status: 'done', mastery: 75 },
      { _id: 't37', name: 'Climatology', status: 'started', mastery: 38 },
      { _id: 't38', name: 'Geomorphology', status: 'pending', mastery: 0 },
      { _id: 't39', name: 'Population', status: 'locked', mastery: 0 },
      { _id: 't40', name: 'Settlement', status: 'locked', mastery: 0 },
    ]
  },
  {
    _id: 's9', name: 'History', icon: 'Calendar', topics: [
      { _id: 't41', name: 'World War I', status: 'done', mastery: 91 },
      { _id: 't42', name: 'World War II', status: 'started', mastery: 52 },
      { _id: 't43', name: 'Cold War', status: 'pending', mastery: 0 },
      { _id: 't44', name: 'African History', status: 'locked', mastery: 0 },
      { _id: 't45', name: 'Democracy', status: 'locked', mastery: 0 },
    ]
  },
  {
    _id: 's10', name: 'Development Studies', icon: 'ArrowRight', topics: [
      { _id: 't46', name: 'Development Concepts', status: 'done', mastery: 70 },
      { _id: 't47', name: 'Economic Development', status: 'started', mastery: 33 },
      { _id: 't48', name: 'Social Development', status: 'pending', mastery: 0 },
      { _id: 't49', name: 'Sustainable Development', status: 'locked', mastery: 0 },
      { _id: 't50', name: 'Globalization', status: 'locked', mastery: 0 },
    ]
  },
  {
    _id: 's11', name: 'Accounting', icon: 'FileTextIcon', topics: [
      { _id: 't51', name: 'Accounting Equation', status: 'done', mastery: 83 },
      { _id: 't52', name: 'Journals', status: 'done', mastery: 76 },
      { _id: 't53', name: 'Ledgers', status: 'started', mastery: 44 },
      { _id: 't54', name: 'Trial Balance', status: 'pending', mastery: 0 },
      { _id: 't55', name: 'Financial Statements', status: 'locked', mastery: 0 },
    ]
  },
  {
    _id: 's12', name: 'Business Studies', icon: 'BookOpen', topics: [
      { _id: 't56', name: 'Business Environment', status: 'done', mastery: 79 },
      { _id: 't57', name: 'Management', status: 'started', mastery: 41 },
      { _id: 't58', name: 'Marketing', status: 'pending', mastery: 0 },
      { _id: 't59', name: 'Finance', status: 'locked', mastery: 0 },
      { _id: 't60', name: 'Entrepreneurship', status: 'locked', mastery: 0 },
    ]
  },
  {
    _id: 's13', name: 'Economics', icon: 'Scale', topics: [
      { _id: 't61', name: 'Microeconomics', status: 'done', mastery: 86 },
      { _id: 't62', name: 'Macroeconomics', status: 'started', mastery: 47 },
      { _id: 't63', name: 'International Trade', status: 'pending', mastery: 0 },
      { _id: 't64', name: 'Public Finance', status: 'locked', mastery: 0 },
      { _id: 't65', name: 'Economic History', status: 'locked', mastery: 0 },
    ]
  },
  {
    _id: 's14', name: 'Agriculture', icon: 'CheckCircle', topics: [
      { _id: 't66', name: 'Soil Science', status: 'done', mastery: 74 },
      { _id: 't67', name: 'Crop Production', status: 'started', mastery: 36 },
      { _id: 't68', name: 'Animal Science', status: 'pending', mastery: 0 },
      { _id: 't69', name: 'Agricultural Economics', status: 'locked', mastery: 0 },
      { _id: 't70', name: 'Farm Management', status: 'locked', mastery: 0 },
    ]
  },
  {
    _id: 's15', name: 'ICT', icon: 'Zap', topics: [
      { _id: 't71', name: 'Computer Basics', status: 'done', mastery: 96 },
      { _id: 't72', name: 'Networking', status: 'done', mastery: 81 },
      { _id: 't73', name: 'Programming', status: 'started', mastery: 53 },
      { _id: 't74', name: 'Databases', status: 'pending', mastery: 0 },
      { _id: 't75', name: 'Web Development', status: 'locked', mastery: 0 },
    ]
  },
];

const MOCK_SYLLABUS = {
  't1': {
    subject: 'Mathematics', topic: 'Algebra', description: 'Fundamental algebraic concepts including expressions, equations, inequalities, and functions that form the foundation of higher mathematics.',
    examWeight: '25%', subTopicsCount: 6, objectivesCount: 18,
    subTopics: [
      { name: 'Algebraic Expressions', difficulty: 'Beginner', objectives: ['Simplify algebraic expressions', 'Identify like terms', 'Apply distributive property'] },
      { name: 'Linear Equations', difficulty: 'Beginner', objectives: ['Solve linear equations', 'Graph linear functions', 'Interpret slope and intercept'] },
      { name: 'Inequalities', difficulty: 'Intermediate', objectives: ['Solve linear inequalities', 'Graph solution sets', 'Compound inequalities'] },
      { name: 'Quadratic Equations', difficulty: 'Advanced', objectives: ['Factor quadratic expressions', 'Apply quadratic formula', 'Complete the square'] },
      { name: 'Functions', difficulty: 'Advanced', objectives: ['Define function notation', 'Domain and range', 'Composite functions'] },
      { name: 'Systems of Equations', difficulty: 'Expert', objectives: ['Solve by substitution', 'Solve by elimination', 'Matrix methods'] },
    ]
  },
  't16': {
    subject: 'Biology', topic: 'Cell Biology', description: 'Study of cell structure, function, and processes including cell division, transport mechanisms, and cellular respiration.',
    examWeight: '20%', subTopicsCount: 5, objectivesCount: 15,
    subTopics: [
      { name: 'Cell Structure', difficulty: 'Beginner', objectives: ['Identify organelles', 'Compare plant vs animal cells', 'Describe cell membrane structure'] },
      { name: 'Cell Transport', difficulty: 'Intermediate', objectives: ['Explain diffusion and osmosis', 'Describe active transport', 'Understand endocytosis'] },
      { name: 'Cell Division', difficulty: 'Advanced', objectives: ['Phases of mitosis', 'Meiosis stages', 'Compare mitosis and meiosis'] },
      { name: 'Cellular Respiration', difficulty: 'Advanced', objectives: ['Glycolysis steps', 'Krebs cycle', 'Electron transport chain'] },
      { name: 'Photosynthesis', difficulty: 'Expert', objectives: ['Light-dependent reactions', 'Calvin cycle', 'Factors affecting rate'] },
    ]
  },
  't21': {
    subject: 'Chemistry', topic: 'Atomic Structure', description: 'Understanding the atom, subatomic particles, electron configurations, and the periodic table organization.',
    examWeight: '15%', subTopicsCount: 4, objectivesCount: 12,
    subTopics: [
      { name: 'Subatomic Particles', difficulty: 'Beginner', objectives: ['Identify protons, neutrons, electrons', 'Calculate atomic number and mass', 'Isotope notation'] },
      { name: 'Electron Configuration', difficulty: 'Intermediate', objectives: ['Aufbau principle', 'Hund\'s rule', 'Orbital diagrams'] },
      { name: 'Periodic Trends', difficulty: 'Advanced', objectives: ['Electronegativity trends', 'Ionization energy', 'Atomic radius patterns'] },
      { name: 'Quantum Numbers', difficulty: 'Expert', objectives: ['Principal quantum number', 'Angular momentum', 'Magnetic and spin numbers'] },
    ]
  },
};

function generateMockData(subjects) {
  return subjects.map(sub => ({
    ...sub,
    progress: Math.floor(Math.random() * 60 + 20),
    completion: sub.topics.filter(t => t.status === 'done').length / sub.topics.length * 100,
  }));
}

function getTopicName(topicId) {
  for (const sub of MOCK_SUBJECTS) {
    for (const topic of sub.topics) {
      if (topic._id === topicId) return topic.name;
    }
  }
  return 'Unknown Topic';
}

function getLevelTitle(level) {
  const titles = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  return titles[level] || 'Beginner';
}

function getXpForLevel(level) {
  return [0, 500, 1200, 2500][level] || 0;
}

function getDifficultyClass(difficulty) {
  const map = { 'Beginner': 'd1', 'Intermediate': 'd2', 'Advanced': 'd3', 'Expert': 'd4' };
  return map[difficulty] || 'd1';
}

const TOPIC_QUESTIONS = {
  t1: [ // Algebra (Mathematics)
    { _id: 'q1', text: 'Solve for x: 2x + 5 = 15', options: ['5', '10', '7.5', '-5'], correctIndex: 0, subject: 'Mathematics' },
    { _id: 'q2', text: 'What is the value of 3x² when x = 4?', options: ['12', '24', '48', '36'], correctIndex: 2, subject: 'Mathematics' },
    { _id: 'q3', text: 'Simplify: (x + 3)(x - 2)', options: ['x² + x - 6', 'x² - x - 6', 'x² + 5x + 6', 'x² - 5x + 6'], correctIndex: 0, subject: 'Mathematics' },
    { _id: 'q4', text: 'What is the slope of y = 3x + 2?', options: ['2', '3', '-2', '-3'], correctIndex: 1, subject: 'Mathematics' },
    { _id: 'q5', text: 'Solve: 5x - 3 = 2x + 9', options: ['2', '4', '6', '8'], correctIndex: 1, subject: 'Mathematics' },
  ],
  t2: [ // Geometry (Mathematics)
    { _id: 'q6', text: 'What is the area of a triangle with base 10 and height 6?', options: ['16', '30', '60', '20'], correctIndex: 1, subject: 'Mathematics' },
    { _id: 'q7', text: 'What is π rounded to 2 decimal places?', options: ['3.14', '3.16', '3.12', '3.18'], correctIndex: 0, subject: 'Mathematics' },
    { _id: 'q8', text: 'A circle has radius 7. What is its circumference? (use π=22/7)', options: ['44', '22', '154', '88'], correctIndex: 0, subject: 'Mathematics' },
    { _id: 'q9', text: 'What type of angle is 179°?', options: ['Acute', 'Obtuse', 'Right', 'Reflex'], correctIndex: 1, subject: 'Mathematics' },
    { _id: 'q10', text: 'What is the sum of interior angles in a pentagon?', options: ['360°', '540°', '720°', '180°'], correctIndex: 1, subject: 'Mathematics' },
  ],
  t6: [ // Grammar (English)
    { _id: 'q11', text: 'Choose the correct sentence:', options: ['He go to school', 'He goes to school', 'He going to school', 'He gone to school'], correctIndex: 1, subject: 'English' },
    { _id: 'q12', text: 'What is a noun?', options: ['An action word', 'A naming word', 'A describing word', 'A connecting word'], correctIndex: 1, subject: 'English' },
    { _id: 'q13', text: '"She runs quickly." What is "quickly"?', options: ['Noun', 'Verb', 'Adjective', 'Adverb'], correctIndex: 3, subject: 'English' },
    { _id: 'q14', text: 'Which is a compound sentence?', options: ['I like cats', 'I like cats and dogs', 'I like cats because they are fluffy', 'Cats'], correctIndex: 1, subject: 'English' },
    { _id: 'q15', text: 'What tense is "had eaten"?', options: ['Present', 'Past simple', 'Past perfect', 'Future'], correctIndex: 2, subject: 'English' },
  ],
  t16: [ // Cell Biology (Biology)
    { _id: 'q16', text: 'The powerhouse of the cell is the:', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'], correctIndex: 2, subject: 'Biology' },
    { _id: 'q17', text: 'Which organelle controls the cell?', options: ['Nucleus', 'Cytoplasm', 'Cell membrane', 'Mitochondria'], correctIndex: 0, subject: 'Biology' },
    { _id: 'q18', text: 'What process produces energy in cells?', options: ['Photosynthesis', 'Cellular respiration', 'Digestion', 'Osmosis'], correctIndex: 1, subject: 'Biology' },
    { _id: 'q19', text: 'Plant cells have ___ that animal cells lack:', options: ['Cell membrane', 'Mitochondria', 'Cell wall', 'Ribosomes'], correctIndex: 2, subject: 'Biology' },
    { _id: 'q20', text: 'What is the function of ribosomes?', options: ['Energy production', 'Protein synthesis', 'Waste removal', 'Cell division'], correctIndex: 1, subject: 'Biology' },
  ],
  t21: [ // Atomic Structure (Chemistry)
    { _id: 'q21', text: 'What particle has no charge?', options: ['Proton', 'Electron', 'Neutron', 'Ion'], correctIndex: 2, subject: 'Chemistry' },
    { _id: 'q22', text: 'The atomic number is the number of:', options: ['Neutrons', 'Protons', 'Electrons', 'Nucleons'], correctIndex: 1, subject: 'Chemistry' },
    { _id: 'q23', text: 'How many electrons in a neutral carbon atom? (atomic number 6)', options: ['4', '6', '8', '12'], correctIndex: 1, subject: 'Chemistry' },
    { _id: 'q24', text: 'Isotopes have different numbers of:', options: ['Protons', 'Electrons', 'Neutrons', 'Protons and neutrons'], correctIndex: 2, subject: 'Chemistry' },
    { _id: 'q25', text: 'What holds the nucleus together?', options: ['Gravity', 'Strong nuclear force', 'Electromagnetic force', 'Weak force'], correctIndex: 1, subject: 'Chemistry' },
  ],
  t26: [ // Mechanics (Physics)
    { _id: 'q26', text: 'What is Newton\'s first law also known as?', options: ['Action-Reaction', 'Inertia', 'Acceleration', 'Gravity'], correctIndex: 1, subject: 'Physics' },
    { _id: 'q27', text: 'Force = mass × ?', options: ['Velocity', 'Speed', 'Acceleration', 'Distance'], correctIndex: 2, subject: 'Physics' },
    { _id: 'q28', text: 'What is the SI unit of force?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correctIndex: 1, subject: 'Physics' },
    { _id: 'q29', text: 'A ball is dropped from rest. Its speed after 2s is: (g=10m/s²)', options: ['10 m/s', '20 m/s', '5 m/s', '15 m/s'], correctIndex: 1, subject: 'Physics' },
    { _id: 'q30', text: 'What does a distance-time graph slope represent?', options: ['Acceleration', 'Speed', 'Force', 'Momentum'], correctIndex: 1, subject: 'Physics' },
  ],
};

// Additional cross-subject review questions bank
const CROSS_SUBJECT_QUESTIONS = [
  // History
  { _id: 'xq1', text: 'Which country started World War I?', options: ['Germany', 'Austria-Hungary', 'Serbia', 'France'], correctIndex: 1, subject: 'History' },
  { _id: 'xq2', text: 'What year did World War II end?', options: ['1944', '1945', '1946', '1947'], correctIndex: 1, subject: 'History' },
  { _id: 'xq3', text: 'Who was the first President of the United States?', options: ['Thomas Jefferson', 'George Washington', 'Abraham Lincoln', 'John Adams'], correctIndex: 1, subject: 'History' },
  // Geography
  { _id: 'xq4', text: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'], correctIndex: 2, subject: 'Geography' },
  { _id: 'xq5', text: 'Which is the longest river in the world?', options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'], correctIndex: 1, subject: 'Geography' },
  { _id: 'xq6', text: 'What is the largest continent?', options: ['Africa', 'North America', 'Asia', 'Europe'], correctIndex: 2, subject: 'Geography' },
  // Development Studies
  { _id: 'xq7', text: 'What does GDP stand for?', options: ['Gross Domestic Product', 'General Development Plan', 'Gross Development Profit', 'Global Domestic Product'], correctIndex: 0, subject: 'Development Studies' },
  { _id: 'xq8', text: 'Which organization promotes world peace?', options: ['NATO', 'United Nations', 'World Bank', 'IMF'], correctIndex: 1, subject: 'Development Studies' },
  // Agriculture
  { _id: 'xq9', text: 'What is crop rotation?', options: ['Planting the same crop yearly', 'Changing crops each season', 'Removing crops', 'Watering crops'], correctIndex: 1, subject: 'Agriculture' },
  { _id: 'xq10', text: 'Which nutrient helps plants grow green leaves?', options: ['Phosphorus', 'Potassium', 'Nitrogen', 'Calcium'], correctIndex: 2, subject: 'Agriculture' },
  // Business Studies
  { _id: 'xq11', text: 'What is a sole trader?', options: ['A large corporation', 'A business owned by one person', 'A partnership', 'A franchise'], correctIndex: 1, subject: 'Business Studies' },
  { _id: 'xq12', text: 'What does "revenue" mean?', options: ['Profit', 'Total income from sales', 'Cost of goods', 'Tax paid'], correctIndex: 1, subject: 'Business Studies' },
  // General Science
  { _id: 'xq13', text: 'What is the chemical symbol for water?', options: ['H2O', 'CO2', 'NaCl', 'O2'], correctIndex: 0, subject: 'Combined Science' },
  { _id: 'xq14', text: 'Which planet is known as the Red Planet?', options: ['Venus', 'Jupiter', 'Mars', 'Saturn'], correctIndex: 2, subject: 'Combined Science' },
  { _id: 'xq15', text: 'Which of the following is a prime number?', options: ['1', '2', '4', '9'], correctIndex: 1, subject: 'Mathematics' },
  // ICT
  { _id: 'xq16', text: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'], correctIndex: 0, subject: 'ICT' },
  { _id: 'xq17', text: 'What is the function of a firewall?', options: ['Speed up internet', 'Block unauthorized access', 'Store files', 'Display graphics'], correctIndex: 1, subject: 'ICT' },
  // Siswati / General
  { _id: 'xq18', text: 'What is the main purpose of studying?', options: ['To pass exams only', 'To gain knowledge and skills', 'To get a certificate', 'To please parents'], correctIndex: 1, subject: 'General' },
  { _id: 'xq19', text: 'Which study method uses flashcards?', options: ['Active recall', 'Passive reading', 'Group study', 'Highlighting'], correctIndex: 0, subject: 'General' },
  { _id: 'xq20', text: 'What is a hypothesis?', options: ['A proven fact', 'An educated guess', 'A final conclusion', 'A random thought'], correctIndex: 1, subject: 'Combined Science' },
];

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getQuestionsForTopic(topicId) {
  const topicQuestions = TOPIC_QUESTIONS[topicId] || [];
  // Pick 3 topic-specific questions
  const specificCount = Math.min(3, topicQuestions.length);
  const specific = shuffleArray(topicQuestions).slice(0, specificCount);

  // Pick 2 cross-subject review questions from different subjects
  const otherQuestions = CROSS_SUBJECT_QUESTIONS.filter(q => {
    // Avoid picking questions from the same subject as the current topic
    if (topicQuestions.length > 0 && topicQuestions[0].subject === q.subject) return false;
    return true;
  });
  const crossCount = Math.min(2, otherQuestions.length);
  const cross = shuffleArray(otherQuestions).slice(0, crossCount);

  // Combine and shuffle
  const all = shuffleArray([...specific, ...cross]);

  return { questions: all };
}

const MOCK_REVIEW = {
  content: [
    { heading: 'Key Concepts', items: ['Understanding the fundamental principles', 'Application of core formulas', 'Problem-solving strategies'] },
    { heading: 'Common Mistakes', items: ['Forgetting to distribute negative signs', 'Misidentifying the correct formula', 'Unit conversion errors'] },
    { heading: 'Memory Aids', items: ['Use acronyms to remember sequences', 'Create visual diagrams for complex processes', 'Practice active recall'] },
  ],
  summary: 'Focus on mastering the core concepts before moving to advanced topics. Regular practice with past papers will reinforce your understanding and improve exam performance. Aim to complete at least 10 practice problems per day.',
};

export default function StudyPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme, user, unreadCount, showToast } = useApp();

  const [view, setView] = useState('subjects');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [focusDuration, setFocusDuration] = useState(25);
  const [focusEnabled, setFocusEnabled] = useState(true);

  const [session, setSession] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  const [showSyllabus, setShowSyllabus] = useState(false);
  const [syllabusData, setSyllabusData] = useState(null);

  const [focusMode, setFocusMode] = useState(false);
  const [focusTimeLeft, setFocusTimeLeft] = useState(0);
  const [focusActive, setFocusActive] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [violations, setViolations] = useState(0);
  const [focusWarning, setFocusWarning] = useState(null);
  const [showAbandonDialog, setShowAbandonDialog] = useState(false);
  const [focusSessionId, setFocusSessionId] = useState(null);
  const [focusMinimized, setFocusMinimized] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [focusComplete, setFocusComplete] = useState(false);

  const focusTimerRef = useRef(null);
  const videoRef = useRef(null);

  const ICON_COMPONENTS = {
    Brain, BookText, Target, Zap, Scale, Layers, LayoutDashboard,
    Calendar, ArrowRight, FileTextIcon, BookOpen, CheckCircle, Lightbulb,
  };

  const getIcon = useCallback((name) => {
    return ICON_COMPONENTS[name] || BookOpen;
  }, []);

  useEffect(() => {
    const loadSubjects = async () => {
      setLoading(true);
      try {
        const data = await progressApi.subjects(localStorage.getItem('token'));
        setSubjects(data.subjects || generateMockData(MOCK_SUBJECTS));
      } catch {
        setSubjects(generateMockData(MOCK_SUBJECTS));
      }
      setLoading(false);
    };
    loadSubjects();
  }, []);

  const findTopic = useCallback((topicId) => {
    for (const sub of MOCK_SUBJECTS) {
      for (const topic of sub.topics) {
        if (topic._id === topicId) return topic;
      }
    }
    return null;
  }, []);

  const handleTopicClick = (subject, topic) => {
    if (topic.status === 'locked') return;
    setSelectedTopic({ subject, topic });
    setView('focus-prompt');
  };

  const handleStartSession = () => {
    if (!selectedTopic) return;
    setView('session');
    setCurrentStep(0);
    // Get topic-specific questions
    const topicQs = getQuestionsForTopic(selectedTopic.topic._id);
    setQuizQuestions(topicQs.questions);
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizResult(null);
    setStepData({
      video: {
        title: `${selectedTopic.topic.name} - Video Lesson`,
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '12:34',
      },
      notes: {
        content: `# ${selectedTopic.topic.name}\n\n## Key Concepts\n\nThis section covers the fundamental concepts of ${selectedTopic.topic.name} in ${selectedTopic.subject.name}. Understanding these core ideas is essential for mastering the topic.\n\n### Main Points\n- Point 1: The fundamental principle of ${selectedTopic.topic.name}\n- Point 2: Key formulas and equations\n- Point 3: Practical applications\n- Point 4: Common problem-solving approaches\n\n### Summary\nThis topic forms the building blocks for more advanced concepts. Master the basics before proceeding.`,
        aiSummary: 'This topic covers core concepts essential for building a strong foundation. Focus on understanding the relationships between different ideas before memorizing formulas.',
        pdfResource: null,
      },
      review: MOCK_REVIEW,
    });
    if (focusEnabled) {
      startFocusMode();
    }
  };

  const startFocusMode = () => {
    const totalSeconds = focusDuration * 60;
    setFocusTimeLeft(totalSeconds);
    setFocusMode(true);
    setFocusActive(true);
    setXpEarned(0);
    setPointsEarned(0);
    setViolations(0);
    setFocusWarning(null);
    setFocusSessionId('fs_' + Date.now());
    setFocusComplete(false);
    setFocusMinimized(false);

    try {
      focusApi.start({ duration: focusDuration }, localStorage.getItem('token'));
    } catch {}
  };

  const handleViolation = useCallback(() => {
    if (!focusActive) return;
    setViolations(prev => {
      const newCount = prev + 1;
      setFocusWarning(`Violation ${newCount}/3 detected!`);
      setTimeout(() => setFocusWarning(null), 3000);
      if (newCount >= 3) {
        handleAbandonFocus();
        return newCount;
      }
      try {
        focusApi.violation(focusSessionId, localStorage.getItem('token'));
      } catch {}
      return newCount;
    });
  }, [focusActive, focusSessionId]);

  const handleAbandonFocus = useCallback(() => {
    if (!focusActive) return;
    setFocusActive(false);
    setFocusMode(false);
    if (focusTimerRef.current) {
      clearInterval(focusTimerRef.current);
      focusTimerRef.current = null;
    }
    const penaltyXp = 50;
    const penaltyPts = 20;
    setXpEarned(prev => Math.max(0, prev - penaltyXp));
    setPointsEarned(prev => Math.max(0, prev - penaltyPts));
    setShowAbandonDialog(false);
    setFocusComplete(true);
    try {
      focusApi.abandon(focusSessionId, { xpLost: penaltyXp, pointsLost: penaltyPts }, localStorage.getItem('token'));
    } catch {}
    showToast('Session abandoned. -50 XP, -20 points penalty applied.', 'error');
  }, [focusActive, focusSessionId, showToast]);

  const completeFocus = useCallback(() => {
    if (!focusActive) return;
    setFocusActive(false);
    setFocusMode(false);
    if (focusTimerRef.current) {
      clearInterval(focusTimerRef.current);
      focusTimerRef.current = null;
    }
    const earnedXp = Math.floor(focusDuration * 10);
    const earnedPts = Math.floor(focusDuration * 5);
    setXpEarned(earnedXp);
    setPointsEarned(earnedPts);
    setFocusComplete(true);
    try {
      focusApi.complete(focusSessionId, { xpEarned: earnedXp, pointsEarned: earnedPts }, localStorage.getItem('token'));
    } catch {}
    showToast(`Focus complete! +${earnedXp} XP, +${earnedPts} points`, 'success');
  }, [focusActive, focusDuration, focusSessionId, showToast]);

  useEffect(() => {
    if (!focusActive || focusTimeLeft <= 0) return;
    focusTimerRef.current = setInterval(() => {
      setFocusTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(focusTimerRef.current);
          focusTimerRef.current = null;
          completeFocus();
          return 0;
        }
        const xpGain = Math.floor((focusDuration * 60 - prev + 1) / 60) * 10;
        const ptsGain = Math.floor((focusDuration * 60 - prev + 1) / 60) * 5;
        setXpEarned(xpGain);
        setPointsEarned(ptsGain);
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (focusTimerRef.current) clearInterval(focusTimerRef.current);
    };
  }, [focusActive, focusTimeLeft, focusDuration, completeFocus]);

  useEffect(() => {
    if (!focusActive) return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.pathname);
      handleViolation();
    };
    const handleVisibilityChange = () => {
      if (document.hidden) handleViolation();
    };
    const handleBlur = () => {
      handleViolation();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.history.pushState(null, '', window.location.pathname);
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [focusActive, handleViolation]);

  const handleSyllabusOpen = async (subject, topic) => {
    setLoading(true);
    try {
      const data = await syllabusApi.get(subject.name, topic.name, localStorage.getItem('token'));
      setSyllabusData(data.syllabus || MOCK_SYLLABUS[topic._id] || null);
    } catch {
      setSyllabusData(MOCK_SYLLABUS[topic._id] || null);
    }
    setShowSyllabus(true);
    setLoading(false);
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    const answered = Object.keys(userAnswers).length;
    if (answered < quizQuestions.length) {
      showToast('Please answer all questions before submitting.', 'warning');
      return;
    }
    let correct = 0;
    const results = quizQuestions.map(q => {
      const isCorrect = userAnswers[q._id] === q.correctIndex;
      if (isCorrect) correct++;
      return { ...q, selectedIndex: userAnswers[q._id], isCorrect };
    });
    setQuizResult({ correct, total: quizQuestions.length, percentage: Math.round((correct / quizQuestions.length) * 100), results });
    setQuizSubmitted(true);
  };

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      setView('subjects');
      setSession(null);
      setCurrentStep(0);
      setQuizQuestions([]);
      setUserAnswers({});
      setQuizSubmitted(false);
      setQuizResult(null);
    }
  };

  const handleBack = () => {
    if (focusActive) {
      return;
    }
    setView('subjects');
    setSession(null);
    setSelectedTopic(null);
    setCurrentStep(0);
    setQuizQuestions([]);
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizResult(null);
    setFocusMode(false);
    setFocusActive(false);
    if (focusTimerRef.current) {
      clearInterval(focusTimerRef.current);
      focusTimerRef.current = null;
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const renderSubjectSelection = () => (
    <div className="fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingTop: '8px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Subjects</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {subjects.filter(s => s.topics.some(t => t.status === 'started' || t.status === 'done')).length} active
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            className="btn btn-ghost"
            onClick={() => setShowNotificationPanel(!showNotificationPanel)}
            aria-label="Notifications"
            style={{ padding: '6px', borderRadius: 'var(--radius-full)', position: 'relative' }}
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notif-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>}
          </button>
          <button className="btn btn-ghost" onClick={toggleTheme} style={{ padding: '6px', borderRadius: 'var(--radius-full)' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="avatar avatar-sm" style={{ cursor: 'pointer' }}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        </div>
      </div>

      {/* Subjects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {subjects.map((subject) => {
          const IconComp = getIcon(subject.icon);
          const color = SUBJECT_COLORS[subject.name] || 'var(--primary)';
          const isExpanded = expandedSubject === subject._id;
          const visibleTopics = subject.topics.filter(t => t.status !== 'done');
          const firstIncomplete = subject.topics.find(t => t.status === 'pending' || t.status === 'started');

          return (
            <div key={subject._id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div
                onClick={() => setExpandedSubject(isExpanded ? null : subject._id)}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', cursor: 'pointer', userSelect: 'none' }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: 'var(--radius)', background: `${color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <IconComp size={18} color={color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>{subject.name}</div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${subject.progress || 0}%` }} />
                  </div>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', minWidth: '36px', textAlign: 'right' }}>
                  {subject.progress || 0}%
                </div>
                <ChevronDown size={16} style={{
                  color: 'var(--text-muted)', transition: 'transform 0.2s',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }} />
              </div>

              {/* Topics */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--border)', padding: '8px 16px 12px' }}>
                  {visibleTopics.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>
                      All topics completed!
                    </div>
                  ) : (
                    visibleTopics.map((topic) => {
                      const isDisabled = topic.status === 'locked';
                      const isIncomplete = topic.status === 'pending' || topic.status === 'started';
                      const isNext = firstIncomplete?._id === topic._id;

                      return (
                        <div
                          key={topic._id}
                          onClick={() => !isDisabled && handleTopicClick(subject, topic)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 8px',
                            borderRadius: 'var(--radius-sm)', cursor: isDisabled ? 'not-allowed' : 'pointer',
                            opacity: isDisabled ? 0.4 : 1,
                            background: isNext ? 'var(--primary-bg)' : 'transparent',
                            border: isNext ? '1px solid var(--primary)' : '1px solid transparent',
                            transition: 'var(--transition)', marginBottom: '4px',
                          }}
                          onMouseOver={e => { if (!isDisabled) e.currentTarget.style.background = 'var(--bg-secondary)'; }}
                          onMouseOut={e => { e.currentTarget.style.background = isNext ? 'var(--primary-bg)' : 'transparent'; }}
                        >
                          {/* Status indicator */}
                          <div style={{ flexShrink: 0 }}>
                            {topic.status === 'done' ? (
                              <Check size={18} color="var(--accent-green)" />
                            ) : topic.status === 'started' ? (
                              <div style={{ position: 'relative', width: '18px', height: '18px' }}>
                                <svg width="18" height="18" viewBox="0 0 18 18">
                                  <circle cx="9" cy="9" r="8" fill="none" stroke="var(--border)" strokeWidth="2" />
                                  <circle cx="9" cy="9" r="8" fill="none" stroke="var(--primary)" strokeWidth="2"
                                    strokeDasharray={`${(topic.mastery / 100) * 50.26} 50.26`} transform="rotate(-90 9 9)" />
                                  <text x="9" y="9" textAnchor="middle" dominantBaseline="central"
                                    fontSize="7" fontWeight="700" fill="var(--primary)">{topic.mastery}%</text>
                                </svg>
                              </div>
                            ) : topic.status === 'locked' ? (
                              <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <X size={10} color="var(--text-muted)" />
                              </div>
                            ) : (
                              <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--border)' }} />
                            )}
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontSize: '13px', fontWeight: isNext ? 700 : 500,
                              color: isDisabled ? 'var(--text-muted)' : 'var(--text-primary)',
                            }}>
                              {topic.name}
                              {isNext && <span style={{ fontSize: '10px', color: 'var(--primary)', marginLeft: '6px' }}>Next</span>}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                              Mastery: {topic.mastery}%
                            </div>
                          </div>

                          <button
                            className="btn btn-xs btn-ghost"
                            onClick={(e) => { e.stopPropagation(); handleSyllabusOpen(subject, topic); }}
                            style={{ fontSize: '11px', padding: '4px 10px', flexShrink: 0 }}
                          >
                            Syllabus
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Focus Mode Toggle */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Brain size={18} color="var(--primary)" />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>Focus Mode</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Block distractions during study</div>
          </div>
        </div>
        <div className={`toggle-switch ${focusEnabled ? 'on' : ''}`} onClick={() => setFocusEnabled(!focusEnabled)} />
      </div>
    </div>
  );

  const renderFocusPrompt = () => (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '24px' }}>
      <div style={{
        width: '72px', height: '72px', borderRadius: 'var(--radius-lg)',
        background: 'var(--primary-bg)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', marginBottom: '20px',
      }}>
        <Brain size={36} color="var(--primary)" />
      </div>
      <h2 style={{ marginBottom: '4px' }}>Focus Session</h2>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', maxWidth: '280px' }}>
        Stay in the zone. No distractions, no shortcuts — just your brain and the material.
      </p>
      {selectedTopic && (
        <div style={{
          padding: '8px 16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)',
          fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '24px',
        }}>
          {selectedTopic.subject.name} &middot; {selectedTopic.topic.name}
        </div>
      )}

      <div style={{ width: '100%', marginBottom: '24px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', textAlign: 'center' }}>Session Duration</div>
        <div className="grid-3">
          {[15, 25, 45, 60].map((mins) => (
            <button
              key={mins}
              onClick={() => setFocusDuration(mins)}
              className={`btn ${focusDuration === mins ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '10px', fontSize: '13px' }}
            >
              {mins < 60 ? `${mins}min` : `${Math.floor(mins / 60)}h`}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        background: 'var(--bg-tertiary)', borderRadius: 'var(--radius)', padding: '14px 16px',
        width: '100%', marginBottom: '24px', fontSize: '12px', lineHeight: 1.6,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Reward rate</span>
          <span style={{ fontWeight: 600, color: 'var(--accent-green)' }}>+10 XP / min</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Points rate</span>
          <span style={{ fontWeight: 600, color: 'var(--accent-green)' }}>+5 pts / min</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Abandon penalty</span>
          <span style={{ fontWeight: 600, color: 'var(--accent-red)' }}>-20 pts, -50 XP</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
        <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => { setView('subjects'); setSelectedTopic(null); }}>
          Skip Focus
        </button>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleStartSession}>
          Start Focus
        </button>
      </div>
    </div>
  );

  const renderVideoStep = () => (
    <div>
      <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>{stepData?.video?.title || 'Video Lesson'}</h3>
      <div style={{
        width: '100%', aspectRatio: '16/9', borderRadius: 'var(--radius)', overflow: 'hidden',
        background: '#000', marginBottom: '12px',
      }}>
        <iframe
          title="Video Player"
          src={stepData?.video?.url || ''}
          style={{ width: '100%', height: '100%', border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          ref={videoRef}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>
        <Clock size={14} />
        <span>{stepData?.video?.duration || '0:00'}</span>
      </div>
    </div>
  );

  const renderNotesStep = () => (
    <div>
      <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Study Notes</h3>
      <div className="card" style={{ marginBottom: '16px', whiteSpace: 'pre-wrap', fontSize: '13px', lineHeight: 1.7, color: 'var(--text-primary)' }}>
        {stepData?.notes?.content || 'No notes available.'}
      </div>
      <div style={{
        background: 'var(--primary-bg)', borderRadius: 'var(--radius)', padding: '16px',
        border: '1px solid var(--primary)', borderLeft: '4px solid var(--primary)', marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px' }}>
          <Sparkles size={14} />
          AI Summary
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
          {stepData?.notes?.aiSummary || 'No AI summary available.'}
        </p>
      </div>
      {stepData?.notes?.pdfResource && (
        <button className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
          <Download size={14} />
          Download PDF
        </button>
      )}
    </div>
  );

  const renderQuizStep = () => (
    <div>
      <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>Quiz</h3>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
        {quizQuestions.length} questions &middot; Mixed subjects for better revision
      </p>
      {quizQuestions.map((q, qi) => {
        const selected = userAnswers[q._id];
        const isAnswered = quizSubmitted;
        const isCorrect = isAnswered && q.correctIndex === selected;
        const isWrong = isAnswered && selected !== undefined && !isCorrect;

        return (
          <div key={q._id} className="card" style={{
            marginBottom: '12px', padding: '16px',
            borderColor: isAnswered ? (isCorrect ? 'var(--accent-green)' : isWrong ? 'var(--accent-red)' : 'var(--border)') : 'var(--border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className={`badge ${q.subject && q.subject !== selectedTopic?.subject?.name ? 'badge-warning' : 'badge-primary'}`} style={{ fontSize: '9px', padding: '2px 8px', whiteSpace: 'nowrap' }}>
                {q.subject || 'General'}
              </span>
              {q.subject && q.subject !== selectedTopic?.subject?.name && (
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Review</span>
              )}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>
              {qi + 1}. {q.text}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {q.options.map((opt, oi) => {
                const isSelected = selected === oi;
                const isCorrectOpt = isAnswered && oi === q.correctIndex;
                return (
                  <div
                    key={oi}
                    onClick={() => !quizSubmitted && handleAnswerSelect(q._id, oi)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)', cursor: quizSubmitted ? 'default' : 'pointer',
                      background: isCorrectOpt ? '#d1fae5' : isSelected && isWrong ? '#fee2e2' : isSelected ? 'var(--primary-bg)' : 'var(--bg-secondary)',
                      border: `1.5px solid ${
                        isCorrectOpt ? 'var(--accent-green)' : isSelected && isWrong ? 'var(--accent-red)' : isSelected ? 'var(--primary)' : 'var(--border)'
                      }`,
                      transition: 'var(--transition)',
                    }}
                    onMouseOver={e => { if (!quizSubmitted) e.currentTarget.style.borderColor = 'var(--primary)'; }}
                    onMouseOut={e => { if (!quizSubmitted) e.currentTarget.style.borderColor = 'var(--border)'; }}
                  >
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      background: isSelected ? 'var(--primary)' : 'transparent',
                    }}>
                      {isSelected && <Check size={12} color="white" />}
                    </div>
                    <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{opt}</span>
                    {isCorrectOpt && <Check size={14} color="var(--accent-green)" style={{ marginLeft: 'auto' }} />}
                    {isWrong && isSelected && <X size={14} color="var(--accent-red)" style={{ marginLeft: 'auto' }} />}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {!quizSubmitted && (
        <button className="btn btn-primary btn-full" onClick={handleQuizSubmit} style={{ marginTop: '8px' }}>
          Submit Answers
        </button>
      )}
    </div>
  );

  const renderAnalysisStep = () => {
    if (!quizResult) {
      return (
        <div className="empty-state">
          <Target size={48} />
          <h3>Complete the Quiz First</h3>
          <p>Answer all questions to see your analysis.</p>
        </div>
      );
    }
    const passed = quizResult.percentage >= 50;
    return (
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '20px' }}>Analysis</h3>
        <div style={{
          width: '140px', height: '140px', borderRadius: '50%', margin: '0 auto 16px',
          background: `conic-gradient(${passed ? 'var(--accent-green)' : 'var(--accent-red)'} ${quizResult.percentage}%, var(--bg-tertiary) ${quizResult.percentage}%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            width: '110px', height: '110px', borderRadius: '50%', background: 'var(--bg-primary)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: passed ? 'var(--accent-green)' : 'var(--accent-red)' }}>
              {quizResult.percentage}%
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
              {passed ? 'PASSED' : 'FAILED'}
            </span>
          </div>
        </div>
        <p style={{ fontSize: '13px', marginBottom: '20px' }}>
          {quizResult.correct} / {quizResult.total} correct
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
          <span className={`badge ${passed ? 'badge-success' : 'badge-danger'}`}>
            {passed ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
            {passed ? 'Passing Score' : 'Needs Improvement'}
          </span>
          {passed && <span className="badge badge-primary"><Sparkles size={12} /> +50 XP</span>}
        </div>

        {/* Mistakes Review */}
        {quizResult.results.filter(r => !r.isCorrect).length > 0 && (
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--accent-red)' }}>Mistakes to Review</h4>
            {quizResult.results.filter(r => !r.isCorrect).map((r, i) => (
              <div key={r._id} className="card" style={{ padding: '12px 16px', marginBottom: '8px', borderLeft: '3px solid var(--accent-red)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>{r.text}</div>
                <div style={{ fontSize: '11px', color: 'var(--accent-red)' }}>
                  You chose: {r.options[r.selectedIndex]}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--accent-green)' }}>
                  Correct answer: {r.options[r.correctIndex]}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderReviewStep = () => (
    <div>
      <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Review</h3>
      {stepData?.review?.content?.map((section, i) => (
        <div key={i} className="card" style={{ marginBottom: '12px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px' }}>
            <Lightbulb size={14} />
            {section.heading}
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {section.items.map((item, j) => (
              <li key={j} style={{
                fontSize: '12px', color: 'var(--text-secondary)', padding: '4px 0 4px 16px',
                position: 'relative', lineHeight: 1.5,
              }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>&bull;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div style={{
        background: 'var(--bg-tertiary)', borderRadius: 'var(--radius)', padding: '16px',
        borderLeft: '4px solid var(--primary)', marginTop: '16px',
      }}>
        <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FileText size={14} />
          Summary
        </div>
        <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-primary)' }}>
          {stepData?.review?.summary || 'No summary available.'}
        </p>
      </div>
    </div>
  );

  const renderSession = () => (
    <div className="fade-in">
      {/* Session Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button className="btn btn-ghost" onClick={handleBack} style={{ padding: '6px', borderRadius: 'var(--radius-full)' }}>
          <ChevronLeft size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {focusMode && (
            <span className="badge badge-primary" style={{ gap: '4px' }}>
              <Brain size={12} />
              {formatTime(focusTimeLeft)}
            </span>
          )}
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
            {selectedTopic?.subject?.name}
          </span>
        </div>
      </div>

      {/* Pipeline Progress */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '20px',
        padding: '12px 8px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)',
      }}>
        {PIPELINE_STEPS.map((step, i) => {
          const StepIcon = step.icon;
          const isActive = i === currentStep;
          const isDone = i < currentStep;
          return (
            <React.Fragment key={step.key}>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1,
                opacity: isDone ? 0.6 : 1,
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: isActive ? 'var(--primary)' : isDone ? 'var(--accent-green)' : 'var(--bg-tertiary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'var(--transition)',
                }}>
                  {isDone ? <Check size={14} color="white" /> : <StepIcon size={14} color={isActive ? 'white' : 'var(--text-muted)'} />}
                </div>
                <span style={{
                  fontSize: '9px', fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  textAlign: 'center',
                }}>
                  {step.label}
                </span>
              </div>
              {i < PIPELINE_STEPS.length - 1 && (
                <div style={{
                  flex: 1, height: '2px', background: i < currentStep ? 'var(--accent-green)' : 'var(--border)',
                  marginBottom: '18px',
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Timer Display */}
      {focusMode && (
        <div style={{
          textAlign: 'center', padding: '12px', marginBottom: '16px',
          background: 'var(--primary-bg)', borderRadius: 'var(--radius)',
          border: '1px solid var(--primary)',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary)', marginBottom: '2px' }}>Focus Timer</div>
          <div style={{ fontSize: '24px', fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(focusTimeLeft)}
          </div>
        </div>
      )}

      {/* Step Content */}
      <div style={{ minHeight: '200px' }}>
        {currentStep === 0 && renderVideoStep()}
        {currentStep === 1 && renderNotesStep()}
        {currentStep === 2 && renderQuizStep()}
        {currentStep === 3 && renderAnalysisStep()}
        {currentStep === 4 && renderReviewStep()}
      </div>

      {/* Continue Button */}
      <div style={{ marginTop: '20px', marginBottom: '16px' }}>
        {currentStep === 2 ? (
          quizSubmitted ? (
            <button className="btn btn-primary btn-full" onClick={handleContinue}>
              {currentStep < 4 ? 'Continue to Analysis' : 'Complete Session'}
              <ArrowRight size={16} />
            </button>
          ) : null
        ) : (
          <button className="btn btn-primary btn-full" onClick={handleContinue}>
            {currentStep < 4 ? 'Continue' : 'Complete Session'}
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );

  const renderFocusOverlay = () => {
    if (!focusMode || focusMinimized) return null;
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.98)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}>
        <div style={{ textAlign: 'center', maxWidth: '340px' }}>
          <Brain size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
          <h2 style={{ color: 'white', marginBottom: '4px' }}>Focus Mode</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>
            Stay focused. Stay locked in.
          </p>

          {/* Timer */}
          <div style={{
            fontSize: '72px', fontWeight: 800, color: 'white', fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.03em', marginBottom: '24px',
            fontFamily: "'Inter', monospace",
          }}>
            {formatTime(focusTimeLeft)}
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '24px',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-green)' }}>+{xpEarned}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>XP</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-purple)' }}>+{pointsEarned}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pts</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: violations >= 3 ? 'var(--accent-red)' : 'var(--accent-orange)' }}>{violations}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Violations</div>
            </div>
          </div>

          {/* Warning */}
          {focusWarning && (
            <div style={{
              padding: '10px 16px', background: 'rgba(239,68,68,0.15)', borderRadius: 'var(--radius)',
              border: '1px solid rgba(239,68,68,0.3)', marginBottom: '16px',
              display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center',
            }}>
              <AlertTriangle size={16} color="var(--accent-red)" />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#fca5a5' }}>{focusWarning}</span>
            </div>
          )}

          {/* Minimize & End */}
          <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
            <button
              className="btn btn-secondary"
              style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
              onClick={() => setFocusMinimized(true)}
            >
              <EyeOff size={14} />
              Minimize
            </button>
            <button
              className="btn"
              style={{ flex: 1, background: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)' }}
              onClick={() => setShowAbandonDialog(true)}
            >
              <LogOut size={14} />
              End Session
            </button>
          </div>
        </div>

        {/* Abandon Confirmation Dialog */}
        {showAbandonDialog && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000,
            padding: '24px',
          }}>
            <div className="card" style={{ maxWidth: '320px', width: '100%', textAlign: 'center', padding: '24px' }}>
              <AlertTriangle size={36} color="var(--accent-red)" style={{ marginBottom: '12px' }} />
              <h3 style={{ marginBottom: '8px' }}>Abandon Session?</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                You will lose <strong style={{ color: 'var(--accent-red)' }}>-50 XP</strong> and{' '}
                <strong style={{ color: 'var(--accent-red)' }}>-20 points</strong>.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowAbandonDialog(false)}>
                  Stay
                </button>
                <button className="btn btn-danger" style={{ flex: 1 }} onClick={handleAbandonFocus}>
                  Abandon
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSyllabusPanel = () => {
    if (!showSyllabus || !syllabusData) return null;
    return (
      <div className={`modal-overlay active`} onClick={() => setShowSyllabus(false)}>
        <div className="modal-sheet syllabus-sheet" onClick={e => e.stopPropagation()}>
          <div className="modal-handle" />
          <div className="sy-header">
            <div className="sy-subject">{syllabusData.subject}</div>
            <div className="sy-topic-name">{syllabusData.topic}</div>
            <p className="sy-desc">{syllabusData.description}</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
              <span className="sy-weight">
                <Scale size={12} />
                Exam Weight: {syllabusData.examWeight}
              </span>
              <span className="sy-badge">
                <Layers size={12} />
                {syllabusData.subTopicsCount} Sub-topics
              </span>
              <span className="sy-badge">
                <Target size={12} />
                {syllabusData.objectivesCount} Objectives
              </span>
            </div>
          </div>

          <div className="sy-subtopic-list">
            {syllabusData.subTopics?.map((st, i) => (
              <div key={i} className="sy-subtopic">
                <div className="sy-st-name">
                  {st.name}
                  <span className={`sy-st-difficulty ${getDifficultyClass(st.difficulty)}`}>
                    {st.difficulty}
                  </span>
                </div>
                <ul className="sy-objectives">
                  {st.objectives.map((obj, j) => (
                    <li key={j}>{obj}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button
            className="btn btn-secondary btn-full"
            style={{ marginTop: '16px' }}
            onClick={() => setShowSyllabus(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const renderFocusMinimizedIndicator = () => {
    if (!focusMode || !focusMinimized) return null;
    return (
      <div
        onClick={() => setFocusMinimized(false)}
        style={{
          position: 'fixed', bottom: '80px', right: '16px', zIndex: 9998,
          background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)',
          padding: '10px 16px', boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}
      >
        <Brain size={16} color="var(--primary)" />
        <span style={{ fontSize: '13px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          {formatTime(focusTimeLeft)}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); setShowAbandonDialog(true); }}
          className="btn btn-ghost"
          style={{ padding: '2px', color: 'var(--accent-red)' }}
        >
          <X size={14} />
        </button>
      </div>
    );
  };

  if (loading && subjects.length === 0) {
    return (
      <AppShell showNav={false}>
        <div className="loading">
          <div className="spinner" />
          Loading subjects...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell showNav={view === 'subjects'}>
      {view === 'subjects' && renderSubjectSelection()}
      {view === 'focus-prompt' && renderFocusPrompt()}
      {view === 'session' && renderSession()}
      {renderSyllabusPanel()}
      {renderFocusOverlay()}
      {renderFocusMinimizedIndicator()}
    </AppShell>
  );
}


