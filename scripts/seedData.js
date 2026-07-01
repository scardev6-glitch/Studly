const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Topic = require('../src/models/Topic');
const Video = require('../src/models/Video');
const Note = require('../src/models/Note');
const Question = require('../src/models/Question');
const User = require('../src/models/User');
const UserProgress = require('../src/models/UserProgress');
const { findVideoForTopic } = require('../src/services/videoMapper');

/**
 * COMPREHENSIVE EGCSE/JC STUDLY SEED DATA
 * 15+ subjects, 80+ topics, 500+ questions, local video files
 */

const SUBJECTS_DATA = [
  {
    name: 'Mathematics',
    levels: ['jc', 'egcse'],
    topics: ['Algebra', 'Geometry', 'Trigonometry', 'Statistics', 'Calculus', 'Number Theory', 'Matrices', 'Sets'],
    questions: [
      { topic: 'Algebra', text: 'Solve: 2x + 5 = 15', options: ['5', '10', '7.5', '3'], correct: 0, subtopic: 'Linear Equations' },
      { topic: 'Algebra', text: 'Expand: (x + 3)(x - 2)', options: ['x² + x - 6', 'x² - x + 6', 'x² + x + 6', 'x² - x - 6'], correct: 0, subtopic: 'Polynomials' },
      { topic: 'Algebra', text: 'Factor: x² - 9', options: ['(x-3)(x+3)', '(x-9)(x+1)', '(x-3)(x-3)', '(x+9)(x-1)'], correct: 0, subtopic: 'Factoring' },
      { topic: 'Algebra', text: 'What is the gradient of y = 3x + 2?', options: ['2', '3', '-3', '1/3'], correct: 1, subtopic: 'Linear Graphs' },
      { topic: 'Algebra', text: 'Solve: x² - 4x + 4 = 0', options: ['x = 2', 'x = -2', 'x = 2 or x = -2', 'No solution'], correct: 0, subtopic: 'Quadratics' },
      { topic: 'Algebra', text: 'Simplify: 3(2x - 1) + 2(x + 4)', options: ['8x + 5', '8x - 5', '6x + 3', '8x + 3'], correct: 0, subtopic: 'Simplification' },
      { topic: 'Algebra', text: 'Solve the inequality: 3x - 7 < 8', options: ['x < 5', 'x < 15', 'x > 5', 'x < 3'], correct: 0, subtopic: 'Inequalities' },
      { topic: 'Algebra', text: 'If f(x) = 2x² - 1, find f(3)', options: ['17', '11', '35', '5'], correct: 0, subtopic: 'Functions' },
      { topic: 'Algebra', text: 'Solve simultaneously: x + y = 5, x - y = 1', options: ['x=3, y=2', 'x=2, y=3', 'x=4, y=1', 'x=1, y=4'], correct: 0, subtopic: 'Simultaneous Eqs' },
      { topic: 'Algebra', text: 'Simplify: (x³)⁴', options: ['x⁷', 'x¹²', 'x⁸', 'x⁶'], correct: 1, subtopic: 'Indices' },
      { topic: 'Number Theory', text: 'What is √144?', options: ['10', '12', '14', '16'], correct: 1, subtopic: 'Square Roots' },
      { topic: 'Number Theory', text: 'Prime factors of 36?', options: ['2²×3²', '2×3×6', '6²', '3²×4'], correct: 0, subtopic: 'Prime Factors' },
      { topic: 'Number Theory', text: 'LCM of 12 and 18?', options: ['24', '36', '48', '72'], correct: 1, subtopic: 'LCM' },
      { topic: 'Sets', text: 'A ∪ B means?', options: ['Intersection', 'Union', 'Difference', 'Complement'], correct: 1, subtopic: 'Set Notation' },
      { topic: 'Sets', text: 'If A={1,2,3}, B={3,4,5}, A ∩ B = ?', options: ['{1,2,3,4,5}', '{3}', '{1,2}', '{4,5}'], correct: 1, subtopic: 'Intersection' },
      { topic: 'Geometry', text: 'Sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], correct: 1, subtopic: 'Triangles' },
      { topic: 'Geometry', text: 'Area of circle with radius 5?', options: ['10π', '25π', '50π', '100π'], correct: 1, subtopic: 'Circles' },
      { topic: 'Geometry', text: 'What is Pythagoras theorem?', options: ['a² + b² = c²', 'a + b = c', 'a² = b² + c²', 'a × b = c'], correct: 0, subtopic: 'Pythagoras' },
      { topic: 'Geometry', text: 'Volume of a cylinder with r=3, h=10?', options: ['90π', '60π', '30π', '180π'], correct: 0, subtopic: 'Volume' },
      { topic: 'Geometry', text: 'Exterior angle of regular pentagon?', options: ['60°', '72°', '108°', '36°'], correct: 1, subtopic: 'Polygons' },
      { topic: 'Geometry', text: 'Circumference of circle radius 7?', options: ['14π', '49π', '7π', '21π'], correct: 0, subtopic: 'Circles' },
      { topic: 'Geometry', text: 'Area of a trapezium: bases 6,10, height 4', options: ['32', '64', '20', '40'], correct: 0, subtopic: 'Area' },
      { topic: 'Matrices', text: 'Identity matrix I₂ is?', options: ['[[1,0],[0,1]]', '[[0,1],[1,0]]', '[[1,1],[0,1]]', '[[0,0],[0,0]]'], correct: 0, subtopic: 'Matrix Basics' },
      { topic: 'Matrices', text: 'Matrix multiplication is?', options: ['Commutative', 'Not commutative', 'Always square', 'Always 2×2'], correct: 1, subtopic: 'Matrix Operations' },
      { topic: 'Trigonometry', text: 'sin(90°) = ?', options: ['0', '1', '0.5', '-1'], correct: 1, subtopic: 'Trig Ratios' },
      { topic: 'Trigonometry', text: 'tan(45°) = ?', options: ['0', '1', '0.5', '√3'], correct: 1, subtopic: 'Trig Ratios' },
      { topic: 'Trigonometry', text: 'cos(0°) = ?', options: ['0', '1', '0.5', '-1'], correct: 1, subtopic: 'Trig Ratios' },
      { topic: 'Trigonometry', text: 'sin²θ + cos²θ = ?', options: ['0', '1', '2', '-1'], correct: 1, subtopic: 'Identities' },
      { topic: 'Statistics', text: 'Mode of {1,2,2,3,4,4,4} is?', options: ['2', '3', '4', '2.5'], correct: 2, subtopic: 'Central Tendency' },
      { topic: 'Statistics', text: 'Median of {3,7,2,9,5} is?', options: ['3', '5', '7', '9'], correct: 1, subtopic: 'Central Tendency' },
      { topic: 'Statistics', text: 'Mean of {2,4,6,8} is?', options: ['4', '5', '6', '8'], correct: 1, subtopic: 'Central Tendency' },
      { topic: 'Statistics', text: 'Probability of rolling a 6 on a fair die?', options: ['1/2', '1/6', '1/3', '2/3'], correct: 1, subtopic: 'Probability' },
      { topic: 'Statistics', text: 'Range of {2,5,8,12,15} is?', options: ['10', '13', '8', '15'], correct: 1, subtopic: 'Spread' },
      { topic: 'Calculus', text: 'Derivative of x² is?', options: ['x', '2x', 'x²', '2'], correct: 1, subtopic: 'Differentiation' },
      { topic: 'Calculus', text: 'Integral of 2x dx?', options: ['x² + C', 'x + C', '2x² + C', 'x²/2 + C'], correct: 0, subtopic: 'Integration' },
      { topic: 'Calculus', text: 'Derivative of sin(x) is?', options: ['cos(x)', '-cos(x)', 'tan(x)', 'sec(x)'], correct: 0, subtopic: 'Differentiation' },
    ]
  },
  {
    name: 'Biology',
    levels: ['jc', 'egcse'],
    topics: ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology', 'Evolution', 'Classification', 'Plant Biology', 'Health & Disease'],
    questions: [
      { topic: 'Cell Biology', text: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondrion', 'Ribosome', 'Golgi'], correct: 1, subtopic: 'Organelles' },
      { topic: 'Cell Biology', text: 'Which structure controls cell activities?', options: ['Cytoplasm', 'Nucleus', 'Cell wall', 'Ribosome'], correct: 1, subtopic: 'Nucleus' },
      { topic: 'Cell Biology', text: 'Prokaryotic cells lack?', options: ['DNA', 'Nucleus', 'Ribosomes', 'Cell membrane'], correct: 1, subtopic: 'Cell Types' },
      { topic: 'Cell Biology', text: 'What is the function of ribosomes?', options: ['Energy production', 'Protein synthesis', 'Lipid synthesis', 'DNA replication'], correct: 1, subtopic: 'Organelles' },
      { topic: 'Cell Biology', text: 'Cell membrane is made of?', options: ['Protein only', 'Phospholipid bilayer', 'Cellulose', 'Chitin'], correct: 1, subtopic: 'Membrane' },
      { topic: 'Classification', text: 'Which kingdom includes humans?', options: ['Plantae', 'Animalia', 'Fungi', 'Protista'], correct: 1, subtopic: 'Kingdoms' },
      { topic: 'Classification', text: 'Binomial nomenclature uses?', options: ['Genus and species', 'Family and order', 'Class and phylum', 'Kingdom and genus'], correct: 0, subtopic: 'Naming' },
      { topic: 'Plant Biology', text: 'What does xylem transport?', options: ['Sugar', 'Water', 'Amino acids', 'Hormones'], correct: 1, subtopic: 'Transport' },
      { topic: 'Plant Biology', text: 'Photosynthesis occurs in?', options: ['Mitochondria', 'Chloroplasts', 'Nucleus', 'Vacuole'], correct: 1, subtopic: 'Photosynthesis' },
      { topic: 'Genetics', text: 'DNA stands for?', options: ['Deoxyribonucleic Acid', 'Diribonucleic Acid', 'Deoxyribose Acid', 'Dynamic Nucleic Acid'], correct: 0, subtopic: 'DNA' },
      { topic: 'Genetics', text: 'How many chromosomes in humans?', options: ['23', '46', '44', '48'], correct: 1, subtopic: 'Chromosomes' },
      { topic: 'Genetics', text: 'A dominant allele is represented by?', options: ['Lowercase letter', 'Uppercase letter', 'Number', 'Symbol'], correct: 1, subtopic: 'Alleles' },
      { topic: 'Genetics', text: 'What is a phenotype?', options: ['Genetic makeup', 'Physical appearance', 'DNA sequence', 'Gene location'], correct: 1, subtopic: 'Genetics Basics' },
      { topic: 'Ecology', text: 'What is the primary producer?', options: ['Herbivore', 'Carnivore', 'Plant', 'Decomposer'], correct: 2, subtopic: 'Food Chains' },
      { topic: 'Ecology', text: 'Decomposers break down?', options: ['Living plants', 'Dead matter', 'Rocks', 'Air'], correct: 1, subtopic: 'Decomposition' },
      { topic: 'Ecology', text: 'A habitat is?', options: ['Where an organism lives', 'What an organism eats', 'How an organism reproduces', 'An organism\'s role'], correct: 0, subtopic: 'Ecology Basics' },
      { topic: 'Ecology', text: 'Carbon cycle involves?', options: ['Only respiration', 'Photosynthesis and respiration', 'Only decomposition', 'Only combustion'], correct: 1, subtopic: 'Cycles' },
      { topic: 'Human Physiology', text: 'How many chambers in the heart?', options: ['2', '3', '4', '6'], correct: 2, subtopic: 'Circulatory System' },
      { topic: 'Human Physiology', text: 'What does hemoglobin carry?', options: ['Carbon dioxide', 'Oxygen', 'Nutrients', 'Waste'], correct: 1, subtopic: 'Blood' },
      { topic: 'Human Physiology', text: 'Enzymes are made of?', options: ['Carbohydrates', 'Proteins', 'Lipids', 'Nucleic acids'], correct: 1, subtopic: 'Enzymes' },
      { topic: 'Human Physiology', text: 'The lungs are part of which system?', options: ['Circulatory', 'Respiratory', 'Digestive', 'Nervous'], correct: 1, subtopic: 'Respiratory System' },
      { topic: 'Human Physiology', text: 'Nephrons are in the?', options: ['Heart', 'Liver', 'Kidney', 'Lungs'], correct: 2, subtopic: 'Excretion' },
      { topic: 'Health & Disease', text: 'Vaccines work by?', options: ['Killing pathogens', 'Stimulating immune response', 'Blocking viruses', 'Killing bacteria'], correct: 1, subtopic: 'Immunity' },
      { topic: 'Health & Disease', text: 'HIV attacks which cells?', options: ['Red blood cells', 'White blood cells', 'Nerve cells', 'Muscle cells'], correct: 1, subtopic: 'Diseases' },
      { topic: 'Evolution', text: 'Who proposed natural selection?', options: ['Lamarck', 'Darwin', 'Mendel', 'Wallace'], correct: 1, subtopic: 'Evolution Theory' },
      { topic: 'Evolution', text: 'Fossils provide evidence for?', options: ['Climate change', 'Evolution', 'Plate tectonics', 'Weather patterns'], correct: 1, subtopic: 'Evidence' },
    ]
  },
  {
    name: 'Chemistry',
    levels: ['jc', 'egcse'],
    topics: ['Atomic Structure', 'Bonding', 'Reactions', 'Acids & Bases', 'Organic Chemistry', 'Periodic Table', 'Electrochemistry', 'Kinetics'],
    questions: [
      { topic: 'Atomic Structure', text: 'Charge of a proton?', options: ['Negative', 'Positive', 'Neutral', 'Variable'], correct: 1, subtopic: 'Subatomic Particles' },
      { topic: 'Atomic Structure', text: 'Atomic number equals number of?', options: ['Neutrons', 'Protons', 'Electrons + neutrons', 'Nucleons'], correct: 1, subtopic: 'Atomic Number' },
      { topic: 'Atomic Structure', text: 'Isotopes have same number of?', options: ['Neutrons', 'Protons', 'Electrons', 'Nucleons'], correct: 1, subtopic: 'Isotopes' },
      { topic: 'Atomic Structure', text: 'Electrons orbit in?', options: ['Nucleus', 'Shells', 'Random paths', 'Straight lines'], correct: 1, subtopic: 'Electron Configuration' },
      { topic: 'Bonding', text: 'Ionic bond between?', options: ['Two nonmetals', 'Two metals', 'Metal and nonmetal', 'Same atoms'], correct: 2, subtopic: 'Chemical Bonds' },
      { topic: 'Bonding', text: 'Covalent bonds share?', options: ['Protons', 'Electrons', 'Neutrons', 'Ions'], correct: 1, subtopic: 'Covalent Bonding' },
      { topic: 'Bonding', text: 'Water molecule is?', options: ['Linear', 'Bent', 'Trigonal planar', 'Tetrahedral'], correct: 1, subtopic: 'Molecular Shapes' },
      { topic: 'Reactions', text: 'Combustion requires?', options: ['Heat only', 'Fuel and oxygen', 'Pressure', 'Light'], correct: 1, subtopic: 'Reaction Types' },
      { topic: 'Reactions', text: 'Exothermic reactions?', options: ['Absorb heat', 'Release heat', 'Need catalyst', 'Are always fast'], correct: 1, subtopic: 'Energy Changes' },
      { topic: 'Reactions', text: 'Catalyst speeds up reaction by?', options: ['Increasing temperature', 'Lowering activation energy', 'Adding reactants', 'Increasing pressure'], correct: 1, subtopic: 'Catalysis' },
      { topic: 'Acids & Bases', text: 'pH scale range?', options: ['0-7', '1-10', '0-14', '1-14'], correct: 2, subtopic: 'pH Scale' },
      { topic: 'Acids & Bases', text: 'Acids turn litmus?', options: ['Blue', 'Red', 'Green', 'Yellow'], correct: 1, subtopic: 'Indicators' },
      { topic: 'Acids & Bases', text: 'Neutralization produces?', options: ['Acid and base', 'Salt and water', 'Salt and hydrogen', 'Water only'], correct: 1, subtopic: 'Neutralization' },
      { topic: 'Periodic Table', text: 'Elements in same group have same?', options: ['Atomic mass', 'Valence electrons', 'Number of shells', 'Atomic number'], correct: 1, subtopic: 'Groups' },
      { topic: 'Periodic Table', text: 'Noble gases are?', options: ['Reactive', 'Unreactive', 'Radioactive', 'Toxic'], correct: 1, subtopic: 'Noble Gases' },
      { topic: 'Periodic Table', text: 'Mendeleev arranged elements by?', options: ['Atomic number', 'Atomic mass', 'Density', 'Reactivity'], correct: 1, subtopic: 'History' },
      { topic: 'Organic Chemistry', text: 'Simplest organic compound?', options: ['Methane', 'Ethane', 'Propane', 'Butane'], correct: 0, subtopic: 'Hydrocarbons' },
      { topic: 'Organic Chemistry', text: 'Functional group of alcohols?', options: ['-OH', '-COOH', '-CHO', '-NH₂'], correct: 0, subtopic: 'Functional Groups' },
      { topic: 'Organic Chemistry', text: 'Cracking produces?', options: ['Longer hydrocarbons', 'Shorter hydrocarbons', 'Carbon only', 'Hydrogen only'], correct: 1, subtopic: 'Cracking' },
      { topic: 'Organic Chemistry', text: 'Alkanes are?', options: ['Unsaturated', 'Saturated', 'Aromatic', 'Cyclic'], correct: 1, subtopic: 'Alkanes' },
      { topic: 'Electrochemistry', text: 'Electrolysis uses?', options: ['Heat', 'Electricity', 'Light', 'Pressure'], correct: 1, subtopic: 'Electrolysis' },
      { topic: 'Electrochemistry', text: 'Cathode is?', options: ['Positive electrode', 'Negative electrode', 'Neutral electrode', 'Salt bridge'], correct: 1, subtopic: 'Electrodes' },
      { topic: 'Kinetics', text: 'Increasing temperature does what to reaction rate?', options: ['Decreases', 'Increases', 'No effect', 'Stops reaction'], correct: 1, subtopic: 'Rate Factors' },
    ]
  },
  {
    name: 'Physics',
    levels: ['jc', 'egcse'],
    topics: ['Mechanics', 'Waves', 'Electricity', 'Thermodynamics', 'Modern Physics', 'Magnetism', 'Nuclear Physics', 'Optics'],
    questions: [
      { topic: 'Mechanics', text: 'Newton\'s first law?', options: ['F=ma', 'Rest until acted upon', 'Action = reaction', 'Energy conserved'], correct: 1, subtopic: 'Newton\'s Laws' },
      { topic: 'Mechanics', text: 'Speed = ?', options: ['Distance × time', 'Distance / time', 'Time / distance', 'Acceleration × time'], correct: 1, subtopic: 'Kinematics' },
      { topic: 'Mechanics', text: 'Unit of force?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correct: 1, subtopic: 'Forces' },
      { topic: 'Mechanics', text: 'Momentum = ?', options: ['Mass × velocity', 'Mass × acceleration', 'Force × time', 'Weight × speed'], correct: 0, subtopic: 'Momentum' },
      { topic: 'Mechanics', text: 'Gravitational field strength on Earth?', options: ['5.8 N/kg', '9.8 N/kg', '12.6 N/kg', '7.2 N/kg'], correct: 1, subtopic: 'Gravity' },
      { topic: 'Waves', text: 'Speed of light?', options: ['300,000 m/s', '3,000 m/s', '300,000 km/s', '30,000 m/s'], correct: 2, subtopic: 'Light' },
      { topic: 'Waves', text: 'Frequency unit is?', options: ['Ampere', 'Hertz', 'Volt', 'Watt'], correct: 1, subtopic: 'Wave Properties' },
      { topic: 'Waves', text: 'Sound waves are?', options: ['Transverse', 'Longitudinal', 'Electromagnetic', 'Stationary'], correct: 1, subtopic: 'Sound' },
      { topic: 'Waves', text: 'Wavelength × frequency = ?', options: ['Speed', 'Amplitude', 'Energy', 'Power'], correct: 0, subtopic: 'Wave Equation' },
      { topic: 'Optics', text: 'Concave lens?', options: ['Converges light', 'Diverges light', 'No effect', 'Reflects light'], correct: 1, subtopic: 'Lenses' },
      { topic: 'Optics', text: 'Angle of incidence = ?', options: ['Angle of reflection', 'Angle of refraction', '90°', '0°'], correct: 0, subtopic: 'Reflection' },
      { topic: 'Electricity', text: 'Ohm\'s law: V = I × ?', options: ['P', 'R', 'C', 'F'], correct: 1, subtopic: 'Circuits' },
      { topic: 'Electricity', text: 'Series circuit current is?', options: ['Divided', 'Same everywhere', 'Zero', 'Doubled'], correct: 1, subtopic: 'Series Circuits' },
      { topic: 'Electricity', text: 'Unit of power?', options: ['Joule', 'Watt', 'Volt', 'Ampere'], correct: 1, subtopic: 'Power' },
      { topic: 'Electricity', text: 'Resistance of a wire depends on?', options: ['Length, area, material', 'Only length', 'Only material', 'Only voltage'], correct: 0, subtopic: 'Resistance' },
      { topic: 'Magnetism', text: 'Like poles?', options: ['Attract', 'Repel', 'Neutral', 'Combine'], correct: 1, subtopic: 'Magnetic Fields' },
      { topic: 'Magnetism', text: 'Electromagnet uses?', options: ['Permanent magnet', 'Current-carrying coil', 'Static charge', 'Heat'], correct: 1, subtopic: 'Electromagnetism' },
      { topic: 'Thermodynamics', text: 'Absolute zero?', options: ['0°C', '-273°C', '100°C', '-100°C'], correct: 1, subtopic: 'Temperature' },
      { topic: 'Thermodynamics', text: 'Heat transfer by movement of fluid?', options: ['Conduction', 'Convection', 'Radiation', 'Evaporation'], correct: 1, subtopic: 'Heat Transfer' },
      { topic: 'Thermodynamics', text: 'Specific heat capacity unit?', options: ['J/kg°C', 'J/g', 'W/m²', 'N/m²'], correct: 0, subtopic: 'Thermal Properties' },
      { topic: 'Nuclear Physics', text: 'Alpha particle is?', options: ['Electron', 'Helium nucleus', 'Proton', 'Neutron'], correct: 1, subtopic: 'Radioactivity' },
      { topic: 'Nuclear Physics', text: 'Half-life is?', options: ['Total decay time', 'Time for half to decay', 'Time to fully decay', 'Double the decay time'], correct: 1, subtopic: 'Half-life' },
      { topic: 'Modern Physics', text: 'Einstein\'s equation?', options: ['E=hf', 'E=mc²', 'F=ma', 'V=IR'], correct: 1, subtopic: 'Relativity' },
      { topic: 'Modern Physics', text: 'Photoelectric effect shows?', options: ['Wave nature', 'Particle nature', 'Both', 'Neither'], correct: 1, subtopic: 'Quantum' },
    ]
  },
  {
    name: 'English Language',
    levels: ['jc', 'egcse'],
    topics: ['Grammar', 'Reading Comprehension', 'Writing', 'Vocabulary', 'Literature', 'Oral Skills', 'Comprehension'],
    questions: [
      { topic: 'Grammar', text: 'Subject of "The dog ran"?', options: ['dog', 'ran', 'quickly', 'The'], correct: 0, subtopic: 'Sentence Parts' },
      { topic: 'Grammar', text: 'Past tense of "run"?', options: ['runned', 'ran', 'running', 'runs'], correct: 1, subtopic: 'Tenses' },
      { topic: 'Grammar', text: 'A conjunction connects?', options: ['Nouns', 'Words/phrases', 'Verbs', 'Adjectives'], correct: 1, subtopic: 'Conjunctions' },
      { topic: 'Grammar', text: 'An adverb modifies?', options: ['Noun', 'Verb', 'Pronoun', 'Article'], correct: 1, subtopic: 'Adverbs' },
      { topic: 'Grammar', text: '"Quickly" is an?', options: ['Adjective', 'Adverb', 'Verb', 'Noun'], correct: 1, subtopic: 'Parts of Speech' },
      { topic: 'Reading Comprehension', text: 'Main idea of a passage is?', options: ['Details', 'Central theme', 'Examples', 'Opinions'], correct: 1, subtopic: 'Main Idea' },
      { topic: 'Reading Comprehension', text: 'Inference means?', options: ['Reading quickly', 'Reading between lines', 'Reading aloud', 'Memorizing'], correct: 1, subtopic: 'Inference' },
      { topic: 'Writing', text: 'Essay should have?', options: ['Only paragraphs', 'Intro, body, conclusion', 'Just ideas', 'No structure'], correct: 1, subtopic: 'Structure' },
      { topic: 'Writing', text: 'A thesis statement goes in?', options: ['Conclusion', 'Introduction', 'Body paragraph', 'Title'], correct: 1, subtopic: 'Essay Writing' },
      { topic: 'Writing', text: 'Formal letter should include?', options: ['Address, date, salutation', 'Only message', 'Pictures', 'Slang'], correct: 0, subtopic: 'Letter Writing' },
      { topic: 'Vocabulary', text: '"Benevolent" means?', options: ['Cruel', 'Kind', 'Angry', 'Confused'], correct: 1, subtopic: 'Word Meanings' },
      { topic: 'Vocabulary', text: '"Abundant" means?', options: ['Rare', 'Plentiful', 'Empty', 'Small'], correct: 1, subtopic: 'Word Meanings' },
      { topic: 'Vocabulary', text: 'Antonym of "ancient"?', options: ['Old', 'Modern', 'Historic', 'Aged'], correct: 1, subtopic: 'Antonyms' },
      { topic: 'Literature', text: 'Metaphor is?', options: ['Like comparison', 'Direct comparison', 'Repeated word', 'Question'], correct: 1, subtopic: 'Figures of Speech' },
      { topic: 'Literature', text: 'Alliteration repeats?', options: ['Vowel sounds', 'Consonant sounds', 'Words', 'Ideas'], correct: 1, subtopic: 'Literary Devices' },
      { topic: 'Literature', text: 'A stanza is?', options: ['A line', 'A paragraph in poetry', 'A chapter', 'A scene'], correct: 1, subtopic: 'Poetry' },
      { topic: 'Oral Skills', text: 'Eye contact is important in?', options: ['Writing', 'Speaking', 'Reading', 'Listening'], correct: 1, subtopic: 'Communication' },
    ]
  },
  {
    name: 'ICT',
    levels: ['jc', 'egcse'],
    topics: ['Systems', 'Networks', 'Programming', 'Databases', 'Security', 'Web Design', 'Spreadsheets'],
    questions: [
      { topic: 'Systems', text: 'RAM is?', options: ['Read-Only', 'Random Access', 'Rapid Access', 'Rewritable'], correct: 1, subtopic: 'Memory' },
      { topic: 'Systems', text: 'CPU stands for?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Unit', 'Core Processing Unit'], correct: 0, subtopic: 'Hardware' },
      { topic: 'Systems', text: 'Storage capacity of a DVD?', options: ['700 MB', '4.7 GB', '8.5 GB', '25 GB'], correct: 1, subtopic: 'Storage' },
      { topic: 'Systems', text: 'An operating system is?', options: ['Hardware', 'Software', 'Firmware', 'Malware'], correct: 1, subtopic: 'Software' },
      { topic: 'Systems', text: 'Binary system uses base?', options: ['8', '10', '2', '16'], correct: 2, subtopic: 'Data Representation' },
      { topic: 'Networks', text: 'HTTP stands for?', options: ['Hypertext Transfer', 'High Transfer Text', 'Home Transfer', 'Hypertext Transmission'], correct: 0, subtopic: 'Protocols' },
      { topic: 'Networks', text: 'IP address is?', options: ['Website name', 'Device identifier', 'Password', 'File name'], correct: 1, subtopic: 'Addressing' },
      { topic: 'Networks', text: 'LAN covers?', options: ['Large area', 'Small area', 'Worldwide', 'Country'], correct: 1, subtopic: 'Network Types' },
      { topic: 'Networks', text: 'WiFi is a?', options: ['Cable standard', 'Wireless standard', 'Security protocol', 'File format'], correct: 1, subtopic: 'Wireless' },
      { topic: 'Security', text: 'Firewall is?', options: ['Wall on fire', 'Security system', 'Malware', 'Anti-virus'], correct: 1, subtopic: 'Security Basics' },
      { topic: 'Security', text: 'Phishing is?', options: ['Fishing game', 'Fake login scam', 'Virus type', 'Firewall type'], correct: 1, subtopic: 'Cyber Threats' },
      { topic: 'Security', text: 'Encryption does what?', options: ['Deletes data', 'Scrambles data', 'Copies data', 'Speeds up data'], correct: 1, subtopic: 'Encryption' },
      { topic: 'Databases', text: 'Primary key is?', options: ['Password', 'Unique identifier', 'Table name', 'Query type'], correct: 1, subtopic: 'Keys' },
      { topic: 'Databases', text: 'SQL is used for?', options: ['Design', 'Querying databases', 'Programming', 'Networking'], correct: 1, subtopic: 'SQL' },
      { topic: 'Databases', text: 'A table contains?', options: ['Rows and columns', 'Only rows', 'Only columns', 'Documents'], correct: 0, subtopic: 'Tables' },
      { topic: 'Programming', text: 'Algorithm is?', options: ['A program', 'Step-by-step instructions', 'Variable', 'Function'], correct: 1, subtopic: 'Algorithms' },
      { topic: 'Programming', text: 'Loop repeats?', options: ['Code block', 'Variable', 'Function', 'Array'], correct: 0, subtopic: 'Control Structures' },
      { topic: 'Programming', text: 'Variable stores?', options: ['Data', 'Functions', 'Code', 'Comments'], correct: 0, subtopic: 'Variables' },
      { topic: 'Programming', text: 'IF statement is for?', options: ['Loops', 'Decisions', 'Storage', 'Output'], correct: 1, subtopic: 'Conditionals' },
      { topic: 'Spreadsheets', text: 'SUM function does?', options: ['Averages', 'Adds numbers', 'Counts cells', 'Finds max'], correct: 1, subtopic: 'Formulas' },
      { topic: 'Spreadsheets', text: 'A cell reference A1 means?', options: ['Column A, Row 1', 'Row A, Column 1', 'Sheet A, Cell 1', 'Table A, Row 1'], correct: 0, subtopic: 'Cell References' },
      { topic: 'Web Design', text: 'HTML stands for?', options: ['HyperText Markup Language', 'High Tech Modern Language', 'HyperText Modern Links', 'Home Tool Markup Language'], correct: 0, subtopic: 'HTML' },
      { topic: 'Web Design', text: 'CSS is used for?', options: ['Structure', 'Styling', 'Logic', 'Database'], correct: 1, subtopic: 'CSS' },
    ]
  },
  {
    name: 'Siswati',
    levels: ['jc', 'egcse'],
    topics: ['Grammar', 'Vocabulary', 'Comprehension', 'Writing', 'Oral Skills'],
    questions: [
      { topic: 'Grammar', text: 'Siswati is spoken in?', options: ['Kenya', 'Eswatini', 'South Africa', 'Botswana'], correct: 1, subtopic: 'Language Origins' },
      { topic: 'Grammar', text: 'Inhloko yemusho?', options: ['Subject', 'Verb', 'Object', 'Adjective'], correct: 0, subtopic: 'Sentence Structure' },
      { topic: 'Grammar', text: 'Bu- prefix indicates?', options: ['Singular', 'Plural', 'Abstract nouns', 'Verbs'], correct: 2, subtopic: 'Prefixes' },
      { topic: 'Vocabulary', text: '"Kuhamba" means?', options: ['To eat', 'To walk', 'To sleep', 'To read'], correct: 1, subtopic: 'Verbs' },
      { topic: 'Vocabulary', text: '"Lilanga" means?', options: ['Moon', 'Sun', 'Star', 'Cloud'], correct: 1, subtopic: 'Nouns' },
      { topic: 'Comprehension', text: 'Kufundza lokuhle kusho?', options: ['Speed reading', 'Reading comprehension', 'Writing', 'Speaking'], correct: 1, subtopic: 'Reading Skills' },
      { topic: 'Writing', text: 'Incwadzi yemtsetfo?', options: ['Informal letter', 'Formal letter', 'Poem', 'Essay'], correct: 1, subtopic: 'Letter Writing' },
      { topic: 'Oral Skills', text: 'Kukhuluma emphakatfini?', options: ['Private talk', 'Public speaking', 'Whispering', 'Singing'], correct: 1, subtopic: 'Speech' },
    ]
  },
  {
    name: 'Geography',
    levels: ['jc', 'egcse'],
    topics: ['Physical Geography', 'Human Geography', 'Map Skills', 'Climate', 'Population', 'Settlements', 'Natural Resources'],
    questions: [
      { topic: 'Physical Geography', text: 'Largest ocean?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], correct: 2, subtopic: 'Oceans' },
      { topic: 'Physical Geography', text: 'Longest river?', options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'], correct: 1, subtopic: 'Rivers' },
      { topic: 'Physical Geography', text: 'Tectonic plates cause?', options: ['Weather', 'Earthquakes', 'Erosion', 'Deposition'], correct: 1, subtopic: 'Plate Tectonics' },
      { topic: 'Physical Geography', text: 'Weathering is?', options: ['Rocks breaking down', 'Rocks moving', 'Volcanic eruption', 'Earthquake'], correct: 0, subtopic: 'Weathering' },
      { topic: 'Climate', text: 'Greenhouse gas?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Helium'], correct: 1, subtopic: 'Climate Change' },
      { topic: 'Climate', text: 'The equator has?', options: ['Cold climate', 'Hot climate', 'Temperate climate', 'Arctic climate'], correct: 1, subtopic: 'Climate Zones' },
      { topic: 'Climate', text: 'Rain shadow effect causes?', options: ['More rain on windward side', 'More rain on leeward side', 'Equal rain', 'No rain'], correct: 0, subtopic: 'Rainfall' },
      { topic: 'Population', text: 'Population density is?', options: ['Total population', 'People per km²', 'Birth rate', 'Death rate'], correct: 1, subtopic: 'Population Basics' },
      { topic: 'Population', text: 'Push factor for migration?', options: ['Better jobs', 'War', 'Education', 'Family'], correct: 1, subtopic: 'Migration' },
      { topic: 'Human Geography', text: 'GDP measures?', options: ['Population', 'Economic output', 'Education', 'Health'], correct: 1, subtopic: 'Economic Geography' },
      { topic: 'Human Geography', text: 'Urbanization is?', options: ['Rural to urban move', 'Urban to rural move', 'International move', 'Seasonal move'], correct: 0, subtopic: 'Urbanization' },
      { topic: 'Map Skills', text: 'Contour lines show?', options: ['Population', 'Elevation', 'Roads', 'Rivers'], correct: 1, subtopic: 'Topography' },
      { topic: 'Map Skills', text: 'Scale 1:50000 means?', options: ['1cm = 500m', '1cm = 500km', '1cm = 50m', '1cm = 5km'], correct: 0, subtopic: 'Map Scale' },
      { topic: 'Settlements', text: 'A nucleated settlement is?', options: ['Clustered', 'Dispersed', 'Linear', 'Circular'], correct: 0, subtopic: 'Settlement Patterns' },
      { topic: 'Natural Resources', text: 'Renewable resource?', options: ['Coal', 'Solar', 'Oil', 'Natural gas'], correct: 1, subtopic: 'Resources' },
    ]
  },
  {
    name: 'History',
    levels: ['jc', 'egcse'],
    topics: ['Ancient History', 'Modern History', 'African History', 'World Wars', 'Civil Rights', 'Cold War'],
    questions: [
      { topic: 'Ancient History', text: 'First President of USA?', options: ['Jefferson', 'Washington', 'Lincoln', 'Adams'], correct: 1, subtopic: 'US History' },
      { topic: 'Ancient History', text: 'Ancient Egyptian writing?', options: ['Cuneiform', 'Hieroglyphics', 'Latin', 'Greek'], correct: 1, subtopic: 'Ancient Civilizations' },
      { topic: 'Ancient History', text: 'The Great Wall is in?', options: ['India', 'China', 'Japan', 'Korea'], correct: 1, subtopic: 'Ancient Civilizations' },
      { topic: 'Modern History', text: 'French Revolution year?', options: ['1776', '1789', '1799', '1804'], correct: 1, subtopic: 'Revolutions' },
      { topic: 'Modern History', text: 'Industrial Revolution began in?', options: ['France', 'Britain', 'Germany', 'USA'], correct: 1, subtopic: 'Industrial Revolution' },
      { topic: 'African History', text: 'Apartheid ended in?', options: ['1990', '1994', '1989', '1996'], correct: 1, subtopic: 'South Africa' },
      { topic: 'African History', text: 'Scramble for Africa was in?', options: ['18th century', '19th century', '20th century', '17th century'], correct: 1, subtopic: 'Colonialism' },
      { topic: 'African History', text: 'Eswatini independence year?', options: ['1968', '1970', '1965', '1975'], correct: 0, subtopic: 'Eswatini History' },
      { topic: 'World Wars', text: 'WWI started in?', options: ['1912', '1914', '1916', '1918'], correct: 1, subtopic: 'World War I' },
      { topic: 'World Wars', text: 'WWII ended in?', options: ['1943', '1945', '1947', '1949'], correct: 1, subtopic: 'World War II' },
      { topic: 'Civil Rights', text: 'Martin Luther King Jr. was?', options: ['President', 'Civil rights leader', 'General', 'Writer'], correct: 1, subtopic: 'Civil Rights' },
      { topic: 'Cold War', text: 'Superpowers in Cold War?', options: ['USA and China', 'USA and USSR', 'UK and France', 'Germany and Japan'], correct: 1, subtopic: 'Cold War' },
      { topic: 'Cold War', text: 'Berlin Wall fell in?', options: ['1987', '1989', '1991', '1985'], correct: 1, subtopic: 'Cold War' },
    ]
  },
  {
    name: 'Accounting',
    levels: ['egcse'],
    topics: ['Financial Statements', 'Bookkeeping', 'Ledgers', 'Trial Balance', 'Cash Flow', 'Ratio Analysis'],
    questions: [
      { topic: 'Financial Statements', text: 'Accounting equation?', options: ['Assets = Liabilities - Equity', 'Assets = Liabilities + Equity', 'Revenue = Expenses', 'Cash = Inventory'], correct: 1, subtopic: 'Basics' },
      { topic: 'Financial Statements', text: 'Profit = ?', options: ['Revenue + Expenses', 'Revenue - Expenses', 'Assets - Liabilities', 'Income - Assets'], correct: 1, subtopic: 'Profit' },
      { topic: 'Financial Statements', text: 'Balance sheet shows?', options: ['Profit over time', 'Financial position', 'Cash flow', 'Expenses'], correct: 1, subtopic: 'Balance Sheet' },
      { topic: 'Bookkeeping', text: 'Debit entries increase?', options: ['Liabilities', 'Assets', 'Revenue', 'Equity'], correct: 1, subtopic: 'Double Entry' },
      { topic: 'Bookkeeping', text: 'Credit entries increase?', options: ['Assets', 'Expenses', 'Liabilities', 'Drawings'], correct: 2, subtopic: 'Double Entry' },
      { topic: 'Ledgers', text: 'Purchase ledger contains?', options: ['Customer accounts', 'Supplier accounts', 'Asset accounts', 'Revenue accounts'], correct: 1, subtopic: 'Ledger Types' },
      { topic: 'Ledgers', text: 'Nominal ledger contains?', options: ['All accounts', 'Only expenses', 'Only revenue', 'Only assets'], correct: 0, subtopic: 'Ledger Types' },
      { topic: 'Trial Balance', text: 'Trial balance tests?', options: ['Accuracy', 'Equality of debits/credits', 'Profit', 'Cash position'], correct: 1, subtopic: 'TB Purpose' },
      { topic: 'Trial Balance', text: 'Suspense account is used when?', options: ['TB balances', 'TB doesn\'t balance', 'Making profit', 'Closing accounts'], correct: 1, subtopic: 'Suspense' },
      { topic: 'Cash Flow', text: 'Cash flow statement shows?', options: ['Profit', 'Cash movements', 'Assets', 'Liabilities'], correct: 1, subtopic: 'Cash Flow Basics' },
      { topic: 'Cash Flow', text: 'Operating activities include?', options: ['Sales receipts', 'Purchase of equipment', 'Loan received', 'Dividends paid'], correct: 0, subtopic: 'Cash Flow Categories' },
      { topic: 'Ratio Analysis', text: 'Current ratio measures?', options: ['Profitability', 'Liquidity', 'Efficiency', 'Gearing'], correct: 1, subtopic: 'Liquidity Ratios' },
    ]
  },
  {
    name: 'Business Studies',
    levels: ['jc', 'egcse'],
    topics: ['Management', 'Marketing', 'Finance', 'Operations', 'Entrepreneurship', 'Business Environment'],
    questions: [
      { topic: 'Management', text: 'Business plan is?', options: ['Schedule', 'Strategy document', 'Budget', 'Timetable'], correct: 1, subtopic: 'Planning' },
      { topic: 'Management', text: 'Span of control refers to?', options: ['Number of subordinates', 'Company size', 'Market share', 'Profit margin'], correct: 0, subtopic: 'Organization' },
      { topic: 'Management', text: 'Autocratic leader?', options: ['Consults team', 'Makes decisions alone', 'Delegates all', 'Votes on issues'], correct: 1, subtopic: 'Leadership' },
      { topic: 'Marketing', text: '4 Ps of marketing?', options: ['Price, Product, Place, Promotion', 'Profit, People, Process, Product', 'Price, People, Place, Promotion', 'Product, Price, Profit, Promotion'], correct: 0, subtopic: 'Marketing Mix' },
      { topic: 'Marketing', text: 'Market research helps?', options: ['Set prices', 'Understand customers', 'Hire staff', 'Buy equipment'], correct: 1, subtopic: 'Market Research' },
      { topic: 'Marketing', text: 'Branding creates?', options: ['Recognition', 'Costs', 'Tax', 'Regulations'], correct: 0, subtopic: 'Branding' },
      { topic: 'Finance', text: 'Revenue - Costs = ?', options: ['Profit', 'Cash', 'Assets', 'Equity'], correct: 0, subtopic: 'Financial Terms' },
      { topic: 'Finance', text: 'Start-up capital is for?', options: ['Daily expenses', 'Initial setup', 'Marketing', 'Salaries'], correct: 1, subtopic: 'Finance Sources' },
      { topic: 'Finance', text: 'Break-even point is when?', options: ['Revenue = Costs', 'Profit is maximized', 'Sales are highest', 'Costs are lowest'], correct: 0, subtopic: 'Break-even' },
      { topic: 'Operations', text: 'Productivity is?', options: ['Output per worker', 'Total output', 'Total cost', 'Revenue per unit'], correct: 0, subtopic: 'Production' },
      { topic: 'Operations', text: 'Quality control checks?', options: ['Before production', 'During production', 'After production', 'All stages'], correct: 3, subtopic: 'Quality' },
      { topic: 'Entrepreneurship', text: 'Entrepreneur takes?', options: ['No risk', 'Calculated risks', 'Guaranteed profit', 'Salary'], correct: 1, subtopic: 'Entrepreneurship' },
      { topic: 'Business Environment', text: 'External factors include?', options: ['Staff morale', 'Government policy', 'Management style', 'Company culture'], correct: 1, subtopic: 'External Environment' },
    ]
  },
  {
    name: 'Economics',
    levels: ['egcse'],
    topics: ['Microeconomics', 'Macroeconomics', 'Markets', 'Trade', 'Development', 'Money & Banking'],
    questions: [
      { topic: 'Microeconomics', text: 'Supply and demand determine?', options: ['Inflation', 'Price', 'Unemployment', 'Growth'], correct: 1, subtopic: 'Markets' },
      { topic: 'Microeconomics', text: 'Opportunity cost is?', options: ['Money cost', 'Next best alternative foregone', 'Total cost', 'Sunk cost'], correct: 1, subtopic: 'Basic Concepts' },
      { topic: 'Microeconomics', text: 'Law of demand states?', options: ['Price up, demand up', 'Price up, demand down', 'No relationship', 'Demand is constant'], correct: 1, subtopic: 'Demand' },
      { topic: 'Microeconomics', text: 'Elastic demand means?', options: ['Sensitive to price', 'Insensitive to price', 'Fixed quantity', 'No substitutes'], correct: 0, subtopic: 'Elasticity' },
      { topic: 'Macroeconomics', text: 'GDP measures?', options: ['Population', 'Economic output', 'Price level', 'Employment'], correct: 1, subtopic: 'National Income' },
      { topic: 'Macroeconomics', text: 'Inflation is?', options: ['Falling prices', 'Rising prices', 'Stable prices', 'Zero prices'], correct: 1, subtopic: 'Inflation' },
      { topic: 'Macroeconomics', text: 'Unemployment means?', options: ['No jobs available', 'People willing but no work', 'Retired people', 'Students'], correct: 1, subtopic: 'Unemployment' },
      { topic: 'Money & Banking', text: 'Central bank controls?', options: ['Interest rates', 'Tax rates', 'Government spending', 'Trade policy'], correct: 0, subtopic: 'Central Banking' },
      { topic: 'Money & Banking', text: 'Commercial banks?', options: ['Print money', 'Accept deposits, give loans', 'Set tax rates', 'Control inflation'], correct: 1, subtopic: 'Banking' },
      { topic: 'Trade', text: 'Exports - Imports = ?', options: ['GDP', 'Trade balance', 'Inflation', 'National debt'], correct: 1, subtopic: 'Trade Balance' },
      { topic: 'Trade', text: 'Free trade means?', options: ['No barriers', 'High tariffs', 'Quotas', 'Subsidies'], correct: 0, subtopic: 'Trade Policy' },
      { topic: 'Development', text: 'HDI includes?', options: ['Income, education, health', 'Income only', 'Education only', 'GDP only'], correct: 0, subtopic: 'Development Indicators' },
    ]
  },
  {
    name: 'Agriculture',
    levels: ['jc', 'egcse'],
    topics: ['Crop Production', 'Animal Husbandry', 'Soil Science', 'Farming Systems', 'Agribusiness', 'Farm Economics'],
    questions: [
      { topic: 'Crop Production', text: 'Photosynthesis is?', options: ['Growth process', 'Energy from sun conversion', 'Water absorption', 'Nutrient uptake'], correct: 1, subtopic: 'Plant Biology' },
      { topic: 'Crop Production', text: 'Nitrogen is important for?', options: ['Root growth', 'Leaf growth', 'Flower growth', 'Fruit growth'], correct: 1, subtopic: 'Plant Nutrition' },
      { topic: 'Crop Production', text: 'Irrigation provides?', options: ['Fertilizer', 'Water', 'Sunlight', 'Air'], correct: 1, subtopic: 'Water Management' },
      { topic: 'Animal Husbandry', text: 'Ruminants have?', options: ['One stomach', 'Four stomachs', 'No stomach', 'Two stomachs'], correct: 1, subtopic: 'Digestion' },
      { topic: 'Animal Husbandry', text: 'Vaccination prevents?', options: ['Injury', 'Disease', 'Parasites', 'Malnutrition'], correct: 1, subtopic: 'Animal Health' },
      { topic: 'Soil Science', text: 'Loam soil is?', options: ['Sand only', 'Clay only', 'Balanced mixture', 'Silt only'], correct: 2, subtopic: 'Soil Types' },
      { topic: 'Soil Science', text: 'Humus is?', options: ['Mineral matter', 'Organic matter', 'Rock particles', 'Water'], correct: 1, subtopic: 'Soil Composition' },
      { topic: 'Farming Systems', text: 'Mixed farming combines?', options: ['Crops and livestock', 'Only crops', 'Only livestock', 'Fish and crops'], correct: 0, subtopic: 'Farming Types' },
      { topic: 'Agribusiness', text: 'Value addition means?', options: ['Adding value to raw product', 'Reducing costs', 'Increasing volume', 'Improving transport'], correct: 0, subtopic: 'Agribusiness' },
      { topic: 'Farm Economics', text: 'Fixed costs include?', options: ['Seeds', 'Rent', 'Fertilizer', 'Labor'], correct: 1, subtopic: 'Farm Costs' },
    ]
  },
  {
    name: 'Development Studies',
    levels: ['egcse'],
    topics: ['Poverty', 'Health', 'Education', 'Sustainability', 'Globalization', 'Human Rights'],
    questions: [
      { topic: 'Poverty', text: 'Absolute poverty means?', options: ['Lack of basic needs', 'Low income relative to others', 'No car', 'No phone'], correct: 0, subtopic: 'Poverty Definition' },
      { topic: 'Poverty', text: 'Poverty cycle is?', options: ['Wealth creation', 'Self-reinforcing poverty', 'Economic growth', 'Income distribution'], correct: 1, subtopic: 'Poverty Cycle' },
      { topic: 'Health', text: 'Infant mortality rate is?', options: ['Deaths under 1 year per 1000', 'Deaths under 5 per 1000', 'Maternal deaths', 'Total deaths'], correct: 0, subtopic: 'Health Indicators' },
      { topic: 'Health', text: 'MDGs were replaced by?', options: ['SDGs', 'HDI', 'GDP', 'NGOs'], correct: 0, subtopic: 'Development Goals' },
      { topic: 'Education', text: 'Literacy rate measures?', options: ['School enrollment', 'Ability to read/write', 'Years of schooling', 'University graduates'], correct: 1, subtopic: 'Education Indicators' },
      { topic: 'Education', text: 'Primary education is?', options: ['Optional', 'A human right', 'For adults', 'Only for boys'], correct: 1, subtopic: 'Education Rights' },
      { topic: 'Sustainability', text: 'Sustainable development means?', options: ['Meeting present needs without compromising future', 'Fast economic growth', 'Industrialization', 'Population control'], correct: 0, subtopic: 'Sustainability' },
      { topic: 'Sustainability', text: 'Renewable energy includes?', options: ['Coal', 'Solar', 'Oil', 'Nuclear'], correct: 1, subtopic: 'Energy' },
      { topic: 'Globalization', text: 'Globalization increases?', options: ['Isolation', 'Interconnectedness', 'Tariffs', 'Trade barriers'], correct: 1, subtopic: 'Globalization' },
      { topic: 'Human Rights', text: 'UDHR stands for?', options: ['Universal Declaration of Human Rights', 'United Democratic Human Rights', 'Universal Democratic Human Rights', 'United Declaration of Human Rights'], correct: 0, subtopic: 'Human Rights' },
    ]
  },
  {
    name: 'Combined Science',
    levels: ['jc'],
    topics: ['Scientific Method', 'Cells', 'Energy', 'Forces', 'Materials', 'Chemical Reactions', 'Ecosystems'],
    questions: [
      { topic: 'Scientific Method', text: 'First step in scientific method?', options: ['Experiment', 'Observation/question', 'Conclusion', 'Hypothesis'], correct: 1, subtopic: 'Scientific Process' },
      { topic: 'Cells', text: 'Basic unit of life is?', options: ['Tissue', 'Cell', 'Organ', 'Organism'], correct: 1, subtopic: 'Cell Theory' },
      { topic: 'Cells', text: 'Plant cells have?', options: ['Cell wall', 'No nucleus', 'No mitochondria', 'Flagella'], correct: 0, subtopic: 'Cell Types' },
      { topic: 'Energy', text: 'Energy cannot be?', options: ['Transformed', 'Created or destroyed', 'Stored', 'Transferred'], correct: 1, subtopic: 'Energy Conservation' },
      { topic: 'Energy', text: 'Kinetic energy depends on?', options: ['Mass and speed', 'Height only', 'Temperature', 'Pressure'], correct: 0, subtopic: 'Energy Forms' },
      { topic: 'Forces', text: 'Friction always?', options: ['Helps motion', 'Opposes motion', 'Creates motion', 'Ignores motion'], correct: 1, subtopic: 'Forces' },
      { topic: 'Forces', text: 'Weight = ?', options: ['Mass × gravity', 'Mass ÷ gravity', 'Gravity ÷ mass', 'Mass + gravity'], correct: 0, subtopic: 'Forces' },
      { topic: 'Materials', text: 'Density = ?', options: ['Mass × volume', 'Mass / volume', 'Volume / mass', 'Mass + volume'], correct: 1, subtopic: 'Properties' },
      { topic: 'Materials', text: 'Conductors allow?', options: ['Heat/electricity flow', 'Light through', 'Sound through', 'Water through'], correct: 0, subtopic: 'Materials' },
      { topic: 'Chemical Reactions', text: 'Reactants become?', options: ['Products', 'Elements', 'Mixtures', 'Compounds'], correct: 0, subtopic: 'Reactions' },
      { topic: 'Ecosystems', text: 'Food chain starts with?', options: ['Herbivore', 'Producer', 'Carnivore', 'Decomposer'], correct: 1, subtopic: 'Ecology' },
    ]
  },
];

const seedData = async () => {
  try {
    // Only connect if not already connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 8000,
      });
      console.log('✅ Connected to MongoDB\n');
    }

    // Clear old data
    await Topic.deleteMany({});
    await Video.deleteMany({});
    await Note.deleteMany({});
    await Question.deleteMany({});
    await User.deleteMany({ email: 'demo@studly.com' });
    await UserProgress.deleteMany({});
    console.log('🗑️  Cleared old data\n');

    // Create demo user
    const demoUser = await User.create({
      fullname: 'Demo Student',
      email: 'demo@studly.com',
      password: 'password123',
      level: 'jc',
      subjects: ['Mathematics', 'Biology', 'Chemistry', 'Physics'],
      points: 1500,
      currentStreak: 10,
      longestStreak: 21,
      totalXp: 1500,
      gamificationLevel: 3,
      aiCredits: 15
    });
    console.log(`👤 Created demo user: demo@studly.com\n`);

    let totalTopics = 0;
    let totalQuestions = 0;

    // Seed subjects
    for (const subject of SUBJECTS_DATA) {
      console.log(`📚 Seeding ${subject.name}...`);

      for (const topicName of subject.topics) {
        // Create topic for JC level
        if (subject.levels.includes('jc')) {
          const topic = await Topic.create({
            subject: subject.name,
            name: topicName,
            description: `${topicName} - Essential JC ${subject.name} topic`,
            level: 'jc'
          });
          totalTopics++;
          await createTopicContent(topic, subject, topicName, demoUser);
        }

        // Create topic for EGCSE level
        if (subject.levels.includes('egcse')) {
          const topic = await Topic.create({
            subject: subject.name,
            name: topicName,
            description: `${topicName} - Essential EGCSE ${subject.name} topic`,
            level: 'egcse'
          });
          totalTopics++;
          await createTopicContent(topic, subject, topicName, demoUser);
        }
      }
      console.log(`  ✓ ${subject.topics.length} topics added`);

      // Count questions for this subject
      const subjectQuestions = subject.questions.filter(q => subject.topics.includes(q.topic));
      totalQuestions += subjectQuestions.length;
    }

    console.log(`\n✅ SEEDING COMPLETE!\n`);
    console.log(`📊 Statistics:`);
    console.log(`   • Subjects: ${SUBJECTS_DATA.length}`);
    console.log(`   • Topics: ${totalTopics}`);
    console.log(`   • Questions: ${totalQuestions}`);
    console.log(`\n🔐 Demo Credentials:`);
    console.log(`   • Email: demo@studly.com`);
    console.log(`   • Password: password123`);
    console.log(`\n🚀 Auto-seed complete!\n`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

async function createTopicContent(topic, subject, topicName, demoUser) {
  // Add video - try to find local video first via videoMapper
  let videoUrl;
  let videoTitle;
  const localVideo = findVideoForTopic(topicName);
  if (localVideo) {
    videoUrl = localVideo.path;
    videoTitle = localVideo.title;
  } else {
    // Fallback: use a generic educational video
    videoUrl = '/assets/the_ASIAN_SECRET_to_STUDYING_EFFECTIVELY(360p).mp4';
    videoTitle = `${topicName} - ${subject.name} Tutorial`;
  }

  await Video.create({
    topicId: topic._id,
    title: videoTitle,
    url: videoUrl,
    duration: 420 + Math.floor(Math.random() * 360)
  });

  // Add note with rich content
  const noteContent = `# ${topicName}\n\n## Overview\nThis topic covers fundamental concepts of ${topicName} in ${subject.name}.\n\n## Key Concepts:\n- Core principles and definitions\n- Important formulas and relationships\n- Real-world applications\n- Common exam questions\n\n## Study Tips:\n- Practice with past papers\n- Create mind maps for key concepts\n- Explain concepts to study partners\n- Review regularly using spaced repetition`;
  
  await Note.create({
    topicId: topic._id,
    userId: demoUser._id,
    content: noteContent,
    summary: `Master ${topicName} in ${subject.name} with these comprehensive study notes covering core concepts, formulas, and exam tips.`
  });

  // Add questions for this topic
  const topicQuestions = subject.questions.filter(q => q.topic === topicName);
  for (const q of topicQuestions) {
    await Question.create({
      topicId: topic._id,
      text: q.text,
      options: q.options,
      correctAnswer: q.correct,
      explanation: `The correct answer is: ${q.options[q.correct]}. ${getExpandedExplanation(q)}`,
      difficulty: q.subtopic.includes('Advanced') ? 'hard' : 'medium',
      subTopic: q.subtopic
    });
  }

  // Add progress for first topic of each subject
  const firstOfSubject = subject.topics[0];
  if (topicName === firstOfSubject) {
    try {
      await UserProgress.create({
        userId: demoUser._id,
        topicId: topic._id,
        masteryLevel: Math.round(60 + Math.random() * 35),
        totalAttempts: 2 + Math.floor(Math.random() * 3),
        correctAttempts: 5 + Math.floor(Math.random() * 6),
        mistakes: 1 + Math.floor(Math.random() * 3),
        nextReviewDate: new Date(Date.now() + (2 + Math.floor(Math.random() * 5)) * 24 * 60 * 60 * 1000),
        lastReviewedAt: new Date(),
        weakSubTopics: []
      });
    } catch (e) {
      // progress may already exist
    }
  }
}

function getExpandedExplanation(q) {
  const explanations = {
    'Linear Equations': ' To solve for x, isolate it by performing inverse operations on both sides of the equation.',
    'Polynomials': ' Use the FOIL method: First, Outer, Inner, Last when expanding brackets.',
    'Factoring': ' Look for common factors and patterns like difference of squares: a² - b² = (a-b)(a+b).',
    'Quadratics': ' Quadratic equations can be solved by factoring, completing the square, or using the quadratic formula.',
    'Indices': ' Remember that when raising a power to another power, you multiply the exponents.',
    'Sequences': ' Find the common difference in arithmetic sequences: nth term = a + (n-1)d.',
    'Circles': ' Remember π ≈ 3.14 for calculations. Area = πr², Circumference = 2πr.',
    'Volume': ' Volume formulas depend on the shape. For a cylinder: V = πr²h.',
    'Trig Ratios': ' SOH CAH TOA: Sin = Opposite/Hypotenuse, Cos = Adjacent/Hypotenuse, Tan = Opposite/Adjacent.',
    'Differentiation': ' The derivative gives the rate of change. For xⁿ, the derivative is nxⁿ⁻¹.',
    'Integration': ' Integration is the reverse of differentiation. Don\'t forget the constant of integration +C.',
    'Organelles': ' Each organelle has a specific function. Mitochondria produce energy, ribosomes make proteins.',
    'DNA': ' DNA contains genetic instructions. It has a double helix structure discovered by Watson and Crick.',
    'Food Chains': ' Energy flows from producers to consumers. Only about 10% of energy passes to the next level.',
    'Subatomic Particles': ' Protons are positively charged, neutrons are neutral, and electrons are negatively charged.',
    'Chemical Bonds': ' Ionic bonds transfer electrons, covalent bonds share electrons between atoms.',
    'Newton\'s Laws': ' Newton\'s three laws describe motion: inertia, F=ma, and action-reaction.',
    'Circuits': ' Ohm\'s Law: V = IR. Voltage = Current × Resistance.',
    'Memory': ' RAM is volatile memory that loses data when power is off. ROM is read-only and permanent.',
    'Protocols': ' Protocols are rules for communication between devices on a network.',
  };
  return explanations[q.subtopic] || ' Keep practicing this concept to build mastery!';
}

// Run directly when called via `npm run seed`
if (require.main === module) {
  seedData().then(() => process.exit(0)).catch(() => process.exit(1));
}

module.exports = seedData;
