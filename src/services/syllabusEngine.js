/**
 * SYLLABUS BREAKDOWN AGENT
 * 
 * Maps every EGCSE/JC subject → topics → granular sub-topics
 * with learning objectives, difficulty ratings, and exam weight.
 * 
 * This is the authoritative source for the syllabus structure.
 * Used by: study planner, quiz engine, focus sessions, progress tracking.
 */

const SYLLABUS = {

  // ═══════════════════════════════════════════
  // MATHEMATICS — EGCSE & JC
  // ═══════════════════════════════════════════
  'Mathematics': {
    levels: ['jc', 'egcse'],
    topics: {
      'Algebra': {
        description: 'Algebraic expressions, equations, and functions',
        weight: 25, // percentage of exam
        subTopics: [
          { name: 'Linear Equations', objectives: ['Solve 1-step and 2-step linear equations', 'Solve equations with brackets', 'Solve equations with unknowns on both sides'], difficulty: 1 },
          { name: 'Simultaneous Equations', objectives: ['Solve by elimination method', 'Solve by substitution method', 'Solve word problems using simultaneous eqs'], difficulty: 2 },
          { name: 'Quadratic Equations', objectives: ['Factorise quadratic expressions', 'Solve by factorisation', 'Solve using quadratic formula', 'Complete the square'], difficulty: 3 },
          { name: 'Inequalities', objectives: ['Solve linear inequalities', 'Represent solutions on number lines', 'Solve quadratic inequalities'], difficulty: 2 },
          { name: 'Indices & Standard Form', objectives: ['Apply laws of indices', 'Convert to/from standard form', 'Calculate with standard form'], difficulty: 1 },
          { name: 'Sequences', objectives: ['Find nth term of linear sequences', 'Find nth term of quadratic sequences', 'Identify arithmetic and geometric progressions'], difficulty: 2 },
          { name: 'Functions', objectives: ['Understand function notation', 'Find inverse functions', 'Find composite functions', 'Sketch linear and quadratic functions'], difficulty: 3 },
          { name: 'Algebraic Fractions', objectives: ['Simplify algebraic fractions', 'Add/subtract algebraic fractions', 'Solve equations with algebraic fractions'], difficulty: 3 },
          { name: 'Proof', objectives: ['Use algebraic proof methods', 'Prove identities', 'Prove statements about numbers'], difficulty: 4 },
        ]
      },
      'Geometry': {
        description: 'Shapes, angles, and spatial reasoning',
        weight: 20,
        subTopics: [
          { name: 'Angle Rules', objectives: ['Identify angle types', 'Apply angle rules on parallel lines', 'Calculate interior/exterior angles of polygons'], difficulty: 1 },
          { name: 'Triangles', objectives: ['Classify triangles', 'Apply Pythagoras theorem', 'Calculate area of triangles'], difficulty: 1 },
          { name: 'Circles', objectives: ['Calculate circumference and area', 'Identify parts of a circle', 'Apply circle theorems'], difficulty: 2 },
          { name: 'Polygons', objectives: ['Calculate sum of interior angles', 'Find exterior angles', 'Identify regular polygon properties'], difficulty: 1 },
          { name: 'Congruence & Similarity', objectives: ['Identify congruent shapes', 'Use similarity to find unknown lengths', 'Understand scale factors'], difficulty: 2 },
          { name: 'Vectors', objectives: ['Add and subtract vectors', 'Multiply vectors by scalars', 'Use vectors to describe translations'], difficulty: 3 },
          { name: 'Transformations', objectives: ['Perform translations', 'Perform reflections', 'Perform rotations', 'Perform enlargements'], difficulty: 2 },
          { name: 'Loci & Constructions', objectives: ['Construct perpendicular bisectors', 'Construct angle bisectors', 'Identify loci satisfying conditions'], difficulty: 3 },
        ]
      },
      'Trigonometry': {
        description: 'Trigonometric ratios, graphs, and applications',
        weight: 15,
        subTopics: [
          { name: 'Trig Ratios', objectives: ['Define sin, cos, tan in right triangles', 'Calculate missing sides using SOHCAHTOA', 'Calculate missing angles'], difficulty: 1 },
          { name: 'Sine & Cosine Rules', objectives: ['Apply sine rule to non-right triangles', 'Apply cosine rule to non-right triangles', 'Calculate area using ½ab sin C'], difficulty: 2 },
          { name: 'Trig Graphs', objectives: ['Sketch sin, cos, tan graphs', 'Identify amplitude and period', 'Solve trig equations graphically'], difficulty: 3 },
          { name: 'Bearings', objectives: ['Measure and draw bearings', 'Solve navigation problems', 'Apply trig to bearing problems'], difficulty: 2 },
          { name: 'Elevation & Depression', objectives: ['Calculate angles of elevation', 'Calculate angles of depression', 'Solve real-world height problems'], difficulty: 2 },
          { name: 'Trig Identities', objectives: ['Prove simple trig identities', 'Use sin²θ + cos²θ = 1', 'Solve equations using identities'], difficulty: 4 },
        ]
      },
      'Statistics': {
        description: 'Data handling, probability, and statistical measures',
        weight: 15,
        subTopics: [
          { name: 'Data Collection', objectives: ['Design surveys and questionnaires', 'Identify sampling methods', 'Avoid bias in data collection'], difficulty: 1 },
          { name: 'Central Tendency', objectives: ['Calculate mean, median, mode', 'Choose appropriate average', 'Calculate from frequency tables'], difficulty: 1 },
          { name: 'Spread & Dispersion', objectives: ['Calculate range and interquartile range', 'Identify outliers', 'Understand standard deviation concept'], difficulty: 2 },
          { name: 'Data Representation', objectives: ['Draw bar charts and pie charts', 'Draw histograms', 'Draw cumulative frequency graphs', 'Draw box plots'], difficulty: 2 },
          { name: 'Probability', objectives: ['Calculate simple probabilities', 'Use tree diagrams', 'Use Venn diagrams', 'Calculate conditional probability'], difficulty: 2 },
          { name: 'Correlation', objectives: ['Draw scatter graphs', 'Identify positive/negative/no correlation', 'Draw line of best fit'], difficulty: 2 },
        ]
      },
      'Calculus': {
        description: 'Differentiation and integration fundamentals',
        weight: 10,
        subTopics: [
          { name: 'Differentiation', objectives: ['Differentiate polynomials', 'Find gradient at a point', 'Find stationary points', 'Determine max/min'], difficulty: 3 },
          { name: 'Integration', objectives: ['Integrate polynomials', 'Find area under curves', 'Calculate definite integrals'], difficulty: 3 },
          { name: 'Applications', objectives: ['Solve optimisation problems', 'Find rates of change', 'Model real-world scenarios'], difficulty: 4 },
        ]
      },
      'Number Theory': {
        description: 'Number systems, factors, and properties',
        weight: 10,
        subTopics: [
          { name: 'Place Value', objectives: ['Identify place value in decimals', 'Round numbers', 'Estimate calculations'], difficulty: 1 },
          { name: 'Factors & Multiples', objectives: ['Find prime factors', 'Calculate HCF and LCM', 'Identify prime numbers'], difficulty: 1 },
          { name: 'Fractions & Decimals', objectives: ['Convert between fractions and decimals', 'Add/subtract/multiply/divide fractions', 'Order fractions'], difficulty: 1 },
          { name: 'Percentages', objectives: ['Calculate percentage of amount', 'Calculate percentage change', 'Reverse percentage problems'], difficulty: 1 },
          { name: 'Ratio & Proportion', objectives: ['Simplify ratios', 'Divide in a given ratio', 'Solve proportion problems', 'Understand direct and inverse proportion'], difficulty: 2 },
          { name: 'Surds', objectives: ['Simplify surds', 'Rationalise denominators', 'Expand brackets with surds'], difficulty: 3 },
        ]
      },
      'Matrices': {
        description: 'Matrix operations and transformations',
        weight: 5,
        subTopics: [
          { name: 'Matrix Basics', objectives: ['Identify matrix dimensions', 'Add and subtract matrices', 'Multiply matrices by scalars'], difficulty: 2 },
          { name: 'Matrix Multiplication', objectives: ['Multiply 2×2 matrices', 'Multiply 2×3 by 3×2 matrices', 'Understand non-commutative property'], difficulty: 3 },
          { name: 'Transformations', objectives: ['Use matrices for rotations', 'Use matrices for reflections', 'Use matrices for enlargements'], difficulty: 4 },
        ]
      },
      'Sets': {
        description: 'Set theory and notation',
        weight: 5,
        subTopics: [
          { name: 'Set Notation', objectives: ['Use set symbols correctly', 'Describe sets in words and notation', 'Find cardinality of sets'], difficulty: 1 },
          { name: 'Venn Diagrams', objectives: ['Draw Venn diagrams for 2 sets', 'Draw Venn diagrams for 3 sets', 'Solve problems using Venn diagrams'], difficulty: 2 },
          { name: 'Set Operations', objectives: ['Find union and intersection', 'Find complement of sets', 'Apply set difference'], difficulty: 1 },
        ]
      }
    }
  },

  // ═══════════════════════════════════════════
  // BIOLOGY — EGCSE & JC
  // ═══════════════════════════════════════════
  'Biology': {
    levels: ['jc', 'egcse'],
    topics: {
      'Cell Biology': {
        description: 'Cell structure, function, and processes',
        weight: 15,
        subTopics: [
          { name: 'Cell Structure', objectives: ['Identify organelles in plant and animal cells', 'Describe function of each organelle', 'Compare plant vs animal cells'], difficulty: 1 },
          { name: 'Transport', objectives: ['Explain diffusion and factors affecting rate', 'Explain osmosis and its effects', 'Describe active transport'], difficulty: 2 },
          { name: 'Cell Division', objectives: ['Describe stages of mitosis', 'Describe stages of meiosis', 'Compare mitosis and meiosis'], difficulty: 3 },
          { name: 'Enzymes', objectives: ['Explain lock and key model', 'Describe factors affecting enzyme activity', 'Interpret enzyme graphs'], difficulty: 2 },
          { name: 'Photosynthesis', objectives: ['Write word and chemical equations', 'Describe factors limiting rate', 'Explain leaf adaptations'], difficulty: 2 },
          { name: 'Respiration', objectives: ['Compare aerobic and anaerobic', 'Write equations for both', 'Describe energy release'], difficulty: 2 },
        ]
      },
      'Genetics': {
        description: 'DNA, inheritance, and genetic variation',
        weight: 15,
        subTopics: [
          { name: 'DNA & Genes', objectives: ['Describe DNA structure', 'Explain gene function', 'Describe chromosome structure'], difficulty: 2 },
          { name: 'Inheritance', objectives: ['Use Punnett squares', 'Predict genotype and phenotype ratios', 'Understand dominant and recessive alleles'], difficulty: 2 },
          { name: 'Variation', objectives: ['Distinguish continuous vs discontinuous', 'Explain causes of variation', 'Describe mutation'], difficulty: 2 },
          { name: 'Natural Selection', objectives: ['Explain Darwin\'s theory', 'Describe how selection occurs', 'Give examples of adaptation'], difficulty: 3 },
          { name: 'Genetic Modification', objectives: ['Describe GM process', 'Evaluate benefits and risks', 'Give examples of GMOs'], difficulty: 3 },
          { name: 'Biotechnology', objectives: ['Describe fermentation', 'Explain use of bacteria', 'Give industrial applications'], difficulty: 3 },
        ]
      },
      'Ecology': {
        description: 'Ecosystems, food webs, and environmental biology',
        weight: 12,
        subTopics: [
          { name: 'Ecosystems', objectives: ['Define ecosystem, habitat, niche', 'Identify biotic and abiotic factors', 'Describe energy flow'], difficulty: 1 },
          { name: 'Food Chains', objectives: ['Construct food chains and webs', 'Identify trophic levels', 'Calculate energy transfer efficiency'], difficulty: 1 },
          { name: 'Nutrient Cycles', objectives: ['Describe carbon cycle', 'Describe nitrogen cycle', 'Explain importance of decomposers'], difficulty: 2 },
          { name: 'Population Ecology', objectives: ['Describe population growth curves', 'Identify limiting factors', 'Explain carrying capacity'], difficulty: 2 },
          { name: 'Conservation', objectives: ['Explain conservation importance', 'Describe conservation methods', 'Evaluate conservation vs exploitation'], difficulty: 2 },
          { name: 'Pollution', objectives: ['Identify types of pollution', 'Describe effects on ecosystems', 'Suggest mitigation strategies'], difficulty: 2 },
        ]
      },
      'Human Physiology': {
        description: 'Human body systems and functions',
        weight: 20,
        subTopics: [
          { name: 'Circulatory System', objectives: ['Describe heart structure and function', 'Identify blood vessels', 'Explain double circulation'], difficulty: 2 },
          { name: 'Respiratory System', objectives: ['Identify respiratory organs', 'Describe gas exchange', 'Explain breathing mechanism'], difficulty: 2 },
          { name: 'Digestive System', objectives: ['Identify digestive organs', 'Describe enzyme functions', 'Explain absorption in small intestine'], difficulty: 2 },
          { name: 'Excretory System', objectives: ['Identify kidney structure', 'Describe urine formation', 'Explain osmoregulation'], difficulty: 3 },
          { name: 'Nervous System', objectives: ['Describe neuron structure', 'Explain reflex arcs', 'Identify brain regions and functions'], difficulty: 3 },
          { name: 'Endocrine System', objectives: ['Identify major glands', 'Explain hormone action', 'Describe feedback mechanisms'], difficulty: 3 },
          { name: 'Immune System', objectives: ['Describe immune response', 'Explain vaccination', 'Distinguish active vs passive immunity'], difficulty: 2 },
          { name: 'Reproduction', objectives: ['Describe male and female systems', 'Explain menstrual cycle', 'Describe fertilisation and development'], difficulty: 3 },
        ]
      },
      'Evolution': {
        description: 'Theories of evolution and evidence',
        weight: 8,
        subTopics: [
          { name: 'Evolution Theory', objectives: ['Explain Darwin\'s theory', 'Describe Wallace\'s contributions', 'Compare Lamarck vs Darwin'], difficulty: 2 },
          { name: 'Evidence for Evolution', objectives: ['Describe fossil evidence', 'Explain comparative anatomy', 'Describe DNA evidence'], difficulty: 2 },
          { name: 'Classification', objectives: ['Explain binomial nomenclature', 'Describe five kingdom system', 'Classify organisms using keys'], difficulty: 1 },
        ]
      },
      'Plant Biology': {
        description: 'Plant structure, transport, and growth',
        weight: 10,
        subTopics: [
          { name: 'Plant Transport', objectives: ['Describe xylem structure and function', 'Describe phloem structure and function', 'Explain transpiration stream'], difficulty: 2 },
          { name: 'Plant Growth', objectives: ['Describe tropisms', 'Explain role of auxins', 'Describe plant hormones'], difficulty: 2 },
          { name: 'Reproduction in Plants', objectives: ['Describe flower structure', 'Explain pollination types', 'Describe seed dispersal'], difficulty: 1 },
        ]
      }
    }
  },

  // ═══════════════════════════════════════════
  // CHEMISTRY — EGCSE & JC
  // ═══════════════════════════════════════════
  'Chemistry': {
    levels: ['jc', 'egcse'],
    topics: {
      'Atomic Structure': {
        description: 'Atoms, elements, and subatomic particles',
        weight: 12,
        subTopics: [
          { name: 'Subatomic Particles', objectives: ['Describe protons, neutrons, electrons', 'Calculate atomic and mass numbers', 'Determine electron configurations'], difficulty: 1 },
          { name: 'Isotopes', objectives: ['Define isotope', 'Calculate relative atomic mass', 'Give uses of isotopes'], difficulty: 2 },
          { name: 'Electronic Configuration', objectives: ['Write configurations for first 20 elements', 'Draw electron shell diagrams', 'Explain stability of noble gases'], difficulty: 1 },
          { name: 'Periodic Table', objectives: ['Describe periodic trends', 'Identify groups and periods', 'Predict properties from position'], difficulty: 2 },
        ]
      },
      'Bonding': {
        description: 'Chemical bonds and structures',
        weight: 12,
        subTopics: [
          { name: 'Ionic Bonding', objectives: ['Describe electron transfer', 'Draw dot-and-cross diagrams', 'Predict ionic compound formulae'], difficulty: 2 },
          { name: 'Covalent Bonding', objectives: ['Describe electron sharing', 'Draw dot-and-cross for simple molecules', 'Draw displayed formulae'], difficulty: 2 },
          { name: 'Metallic Bonding', objectives: ['Describe sea of electrons model', 'Explain conductivity', 'Explain malleability'], difficulty: 2 },
          { name: 'Giant Structures', objectives: ['Describe diamond structure', 'Describe graphite structure', 'Compare diamond and graphite'], difficulty: 2 },
          { name: 'Intermolecular Forces', objectives: ['Describe van der Waals forces', 'Explain boiling point trends', 'Compare simple molecular vs giant covalent'], difficulty: 3 },
        ]
      },
      'Reactions': {
        description: 'Types of reactions and stoichiometry',
        weight: 15,
        subTopics: [
          { name: 'Chemical Equations', objectives: ['Write word equations', 'Write balanced symbol equations', 'Include state symbols'], difficulty: 1 },
          { name: 'Mole Concept', objectives: ['Calculate moles from mass', 'Calculate mass from moles', 'Use Avogadro\'s constant'], difficulty: 2 },
          { name: 'Stoichiometry', objectives: ['Use mole ratios in equations', 'Calculate theoretical yield', 'Calculate percentage yield'], difficulty: 3 },
          { name: 'Redox Reactions', objectives: ['Identify oxidation and reduction', 'Use oxidation numbers', 'Identify redox in equations'], difficulty: 3 },
          { name: 'Energy Changes', objectives: ['Distinguish exothermic and endothermic', 'Draw energy level diagrams', 'Calculate enthalpy changes'], difficulty: 2 },
        ]
      },
      'Acids & Bases': {
        description: 'Acids, bases, and pH',
        weight: 12,
        subTopics: [
          { name: 'pH Scale', objectives: ['Describe pH scale 0–14', 'Identify acids and alkalis', 'Use indicators'], difficulty: 1 },
          { name: 'Neutralisation', objectives: ['Write neutralisation equations', 'Describe acid + metal reactions', 'Describe acid + carbonate reactions'], difficulty: 1 },
          { name: 'Titration', objectives: ['Perform titration calculations', 'Describe titration procedure', 'Calculate concentrations'], difficulty: 3 },
          { name: 'Salts', objectives: ['Describe salt preparation methods', 'Predict solubility of salts', 'Write ionic equations'], difficulty: 2 },
          { name: 'Strong vs Weak', objectives: ['Distinguish strong vs weak acids', 'Explain pH differences', 'Describe dissociation'], difficulty: 2 },
        ]
      },
      'Organic Chemistry': {
        description: 'Carbon compounds and their reactions',
        weight: 15,
        subTopics: [
          { name: 'Hydrocarbons', objectives: ['Name alkanes and alkenes', 'Draw structural formulae', 'Describe homologous series'], difficulty: 2 },
          { name: 'Alkanes', objectives: ['Describe combustion reactions', 'Describe substitution reactions', 'Explain cracking'], difficulty: 2 },
          { name: 'Alkenes', objectives: ['Describe addition reactions', 'Test for unsaturation', 'Describe polymerisation'], difficulty: 2 },
          { name: 'Alcohols', objectives: ['Name and draw alcohols', 'Describe fermentation', 'Describe oxidation of alcohols'], difficulty: 2 },
          { name: 'Carboxylic Acids', objectives: ['Name and draw carboxylic acids', 'Describe esterification', 'Describe properties of acids'], difficulty: 3 },
          { name: 'Polymers', objectives: ['Describe addition polymerisation', 'Describe condensation polymerisation', 'Explain polymer properties'], difficulty: 3 },
          { name: 'Isomers', objectives: ['Identify structural isomers', 'Draw isomer structures', 'Explain isomerism'], difficulty: 3 },
        ]
      },
      'Electrochemistry': {
        description: 'Electricity and chemical reactions',
        weight: 8,
        subTopics: [
          { name: 'Electrolysis', objectives: ['Describe electrolysis process', 'Predict products at electrodes', 'Write half-equations'], difficulty: 2 },
          { name: 'Electrochemical Cells', objectives: ['Describe simple cell construction', 'Explain voltage differences', 'Describe fuel cells'], difficulty: 3 },
          { name: 'Electroplating', objectives: ['Describe electroplating process', 'Give uses of electroplating', 'Explain purification of copper'], difficulty: 2 },
        ]
      },
      'Kinetics': {
        description: 'Rates of reaction and equilibrium',
        weight: 8,
        subTopics: [
          { name: 'Rate of Reaction', objectives: ['Measure reaction rates', 'Explain collision theory', 'Draw rate graphs'], difficulty: 2 },
          { name: 'Factors Affecting Rate', objectives: ['Explain effect of temperature', 'Explain effect of concentration', 'Explain effect of surface area', 'Explain catalysts'], difficulty: 2 },
          { name: 'Reversible Reactions', objectives: ['Describe reversible reactions', 'Explain dynamic equilibrium', 'Apply Le Chatelier\'s principle'], difficulty: 3 },
        ]
      }
    }
  },

  // ═══════════════════════════════════════════
  // PHYSICS — EGCSE & JC
  // ═══════════════════════════════════════════
  'Physics': {
    levels: ['jc', 'egcse'],
    topics: {
      'Mechanics': {
        description: 'Forces, motion, and energy',
        weight: 20,
        subTopics: [
          { name: 'Motion', objectives: ['Calculate speed and velocity', 'Calculate acceleration', 'Interpret distance-time graphs', 'Interpret velocity-time graphs'], difficulty: 1 },
          { name: 'Forces', objectives: ['Describe Newton\'s laws', 'Calculate resultant force', 'Explain friction'], difficulty: 2 },
          { name: 'Energy', objectives: ['Calculate kinetic and potential energy', 'Describe energy conservation', 'Calculate work and power'], difficulty: 2 },
          { name: 'Moments', objectives: ['Calculate moments', 'Apply principle of moments', 'Describe centre of mass'], difficulty: 2 },
          { name: 'Pressure', objectives: ['Calculate pressure from force and area', 'Describe pressure in liquids', 'Explain atmospheric pressure'], difficulty: 2 },
          { name: 'Density', objectives: ['Calculate density', 'Describe floating and sinking', 'Apply Archimedes principle'], difficulty: 1 },
        ]
      },
      'Waves': {
        description: 'Wave properties and optics',
        weight: 15,
        subTopics: [
          { name: 'Wave Properties', objectives: ['Describe transverse and longitudinal waves', 'Calculate wave speed', 'Identify wavelength, frequency, amplitude'], difficulty: 1 },
          { name: 'Light', objectives: ['Describe reflection', 'Describe refraction', 'Calculate refractive index', 'Draw ray diagrams'], difficulty: 2 },
          { name: 'Lenses', objectives: ['Describe converging and diverging lenses', 'Draw lens ray diagrams', 'Calculate magnification'], difficulty: 3 },
          { name: 'Sound', objectives: ['Describe sound wave properties', 'Explain echo and ultrasound', 'Describe hearing range'], difficulty: 1 },
          { name: 'Electromagnetic Spectrum', objectives: ['List EM spectrum in order', 'Give uses of each region', 'Describe dangers'], difficulty: 1 },
        ]
      },
      'Electricity': {
        description: 'Electric circuits and components',
        weight: 20,
        subTopics: [
          { name: 'Circuits', objectives: ['Draw circuit diagrams', 'Describe series and parallel', 'Calculate current, voltage, resistance'], difficulty: 1 },
          { name: 'Ohm\'s Law', objectives: ['Apply V = IR', 'Calculate resistance', 'Describe I-V characteristics'], difficulty: 2 },
          { name: 'Power', objectives: ['Calculate electrical power', 'Calculate energy', 'Calculate cost of electricity'], difficulty: 2 },
          { name: 'Magnetism', objectives: ['Describe magnetic fields', 'Draw field patterns', 'Explain electromagnets'], difficulty: 1 },
          { name: 'Electromagnetic Induction', objectives: ['Describe induced EMF', 'Explain generator effect', 'Describe transformer operation'], difficulty: 3 },
        ]
      },
      'Thermodynamics': {
        description: 'Heat and temperature',
        weight: 10,
        subTopics: [
          { name: 'Heat Transfer', objectives: ['Describe conduction', 'Describe convection', 'Describe radiation'], difficulty: 1 },
          { name: 'Specific Heat', objectives: ['Calculate specific heat capacity', 'Calculate specific latent heat', 'Interpret heating/cooling curves'], difficulty: 2 },
          { name: 'Thermal Expansion', objectives: ['Describe expansion of solids', 'Describe expansion of liquids', 'Give practical applications'], difficulty: 1 },
        ]
      },
      'Modern Physics': {
        description: 'Atomic physics and radioactivity',
        weight: 10,
        subTopics: [
          { name: 'Radioactivity', objectives: ['Describe alpha, beta, gamma radiation', 'Write nuclear equations', 'Describe half-life'], difficulty: 2 },
          { name: 'Nuclear Fission', objectives: ['Describe fission process', 'Explain chain reaction', 'Describe nuclear reactor'], difficulty: 3 },
          { name: 'Nuclear Fusion', objectives: ['Describe fusion process', 'Compare fission and fusion', 'Explain energy from stars'], difficulty: 3 },
          { name: 'Particle Physics', objectives: ['Describe standard model', 'Identify fundamental particles', 'Explain antimatter'], difficulty: 4 },
        ]
      }
    }
  },

  // ═══════════════════════════════════════════
  // ENGLISH LANGUAGE — EGCSE & JC
  // ═══════════════════════════════════════════
  'English Language': {
    levels: ['jc', 'egcse'],
    topics: {
      'Grammar': {
        description: 'Parts of speech, sentence structure, and punctuation',
        weight: 20,
        subTopics: [
          { name: 'Parts of Speech', objectives: ['Identify nouns, verbs, adjectives, adverbs', 'Use prepositions correctly', 'Identify conjunctions and interjections'], difficulty: 1 },
          { name: 'Tenses', objectives: ['Use past, present, future tenses', 'Use perfect and continuous forms', 'Maintain tense consistency'], difficulty: 2 },
          { name: 'Sentence Structure', objectives: ['Identify simple, compound, complex sentences', 'Use clauses correctly', 'Avoid sentence fragments'], difficulty: 2 },
          { name: 'Punctuation', objectives: ['Use full stops, commas, question marks', 'Use apostrophes correctly', 'Use quotation marks'], difficulty: 1 },
          { name: 'Subject-Verb Agreement', objectives: ['Match subjects with verbs', 'Handle collective nouns', 'Handle indefinite pronouns'], difficulty: 2 },
        ]
      },
      'Reading Comprehension': {
        description: 'Understanding and analysing texts',
        weight: 25,
        subTopics: [
          { name: 'Literal Understanding', objectives: ['Identify main ideas', 'Recall specific details', 'Follow sequence of events'], difficulty: 1 },
          { name: 'Inference', objectives: ['Make logical inferences', 'Read between the lines', 'Draw conclusions from evidence'], difficulty: 2 },
          { name: 'Author\'s Purpose', objectives: ['Identify purpose (inform, persuade, entertain)', 'Analyse tone and mood', 'Evaluate effectiveness'], difficulty: 3 },
          { name: 'Vocabulary in Context', objectives: ['Use context clues', 'Understand figurative language', 'Interpret unfamiliar words'], difficulty: 2 },
          { name: 'Text Structure', objectives: ['Identify text types', 'Analyse organisational patterns', 'Compare different texts'], difficulty: 2 },
        ]
      },
      'Writing': {
        description: 'Composition and creative writing',
        weight: 25,
        subTopics: [
          { name: 'Essay Structure', objectives: ['Write clear introductions', 'Develop body paragraphs', 'Write effective conclusions'], difficulty: 2 },
          { name: 'Narrative Writing', objectives: ['Develop plot and characters', 'Use descriptive language', 'Maintain narrative voice'], difficulty: 3 },
          { name: 'Argumentative Writing', objectives: ['Present balanced arguments', 'Use evidence and examples', 'Counter opposing views'], difficulty: 3 },
          { name: 'Descriptive Writing', objectives: ['Use sensory details', 'Create vivid imagery', 'Organise descriptions logically'], difficulty: 3 },
          { name: 'Formal Letters', objectives: ['Format letters correctly', 'Use appropriate register', 'Structure formal communication'], difficulty: 2 },
        ]
      },
      'Vocabulary': {
        description: 'Word knowledge and usage',
        weight: 15,
        subTopics: [
          { name: 'Synonyms & Antonyms', objectives: ['Identify synonyms', 'Identify antonyms', 'Use precise vocabulary'], difficulty: 1 },
          { name: 'Word Roots', objectives: ['Identify prefixes and suffixes', 'Understand root meanings', 'Build word families'], difficulty: 2 },
          { name: 'Figurative Language', objectives: ['Identify metaphors and similes', 'Use personification', 'Understand idioms'], difficulty: 2 },
        ]
      },
      'Literature': {
        description: 'Study of literary texts',
        weight: 15,
        subTopics: [
          { name: 'Poetry', objectives: ['Analyse poetic devices', 'Interpret meaning and theme', 'Compare poems'], difficulty: 3 },
          { name: 'Prose', objectives: ['Analyse character development', 'Identify themes and motifs', 'Evaluate narrative techniques'], difficulty: 3 },
          { name: 'Drama', objectives: ['Analyse dialogue and stage directions', 'Identify dramatic devices', 'Interpret character motivation'], difficulty: 3 },
        ]
      }
    }
  },

  // ═══════════════════════════════════════════
  // ICT — EGCSE & JC
  // ═══════════════════════════════════════════
  'ICT': {
    levels: ['jc', 'egcse'],
    topics: {
      'Systems': {
        description: 'Computer systems and components',
        weight: 15,
        subTopics: [
          { name: 'Hardware', objectives: ['Identify input devices and uses', 'Identify output devices and uses', 'Describe CPU components and function'], difficulty: 1 },
          { name: 'Software', objectives: ['Distinguish system vs application software', 'Describe operating system functions', 'Give examples of utility software'], difficulty: 1 },
          { name: 'Storage', objectives: ['Compare storage types', 'Calculate storage capacity', 'Choose appropriate storage'], difficulty: 1 },
        ]
      },
      'Networks': {
        description: 'Network types, protocols, and security',
        weight: 20,
        subTopics: [
          { name: 'Network Types', objectives: ['Describe LAN vs WAN', 'Explain client-server vs P2P', 'Describe network topologies'], difficulty: 1 },
          { name: 'Internet', objectives: ['Describe how internet works', 'Explain IP addressing', 'Describe DNS'], difficulty: 2 },
          { name: 'Network Security', objectives: ['Identify security threats', 'Describe protection methods', 'Explain encryption'], difficulty: 2 },
          { name: 'Protocols', objectives: ['Describe TCP/IP', 'Explain HTTP/HTTPS', 'Explain email protocols'], difficulty: 2 },
        ]
      },
      'Programming': {
        description: 'Programming concepts and logic',
        weight: 20,
        subTopics: [
          { name: 'Variables & Data Types', objectives: ['Declare and assign variables', 'Understand data types', 'Use constants'], difficulty: 1 },
          { name: 'Control Structures', objectives: ['Use IF statements', 'Use FOR loops', 'Use WHILE loops'], difficulty: 2 },
          { name: 'Data Structures', objectives: ['Use arrays/lists', 'Use dictionaries/objects', 'Perform basic operations'], difficulty: 2 },
          { name: 'Algorithms', objectives: ['Design flowcharts', 'Write pseudocode', 'Trace algorithms'], difficulty: 3 },
          { name: 'Testing & Debugging', objectives: ['Identify syntax vs logic errors', 'Use test data', 'Debug code systematically'], difficulty: 2 },
        ]
      },
      'Databases': {
        description: 'Database concepts and SQL',
        weight: 15,
        subTopics: [
          { name: 'Database Concepts', objectives: ['Describe tables, records, fields', 'Define primary and foreign keys', 'Understand relationships'], difficulty: 1 },
          { name: 'SQL Queries', objectives: ['Write SELECT statements', 'Use WHERE clauses', 'Use JOIN operations'], difficulty: 2 },
          { name: 'Data Integrity', objectives: ['Describe validation rules', 'Describe verification', 'Ensure data accuracy'], difficulty: 2 },
        ]
      },
      'Security': {
        description: 'Digital safety and cybersecurity',
        weight: 10,
        subTopics: [
          { name: 'Threats', objectives: ['Identify malware types', 'Describe phishing and social engineering', 'Recognise hacking methods'], difficulty: 1 },
          { name: 'Protection', objectives: ['Use strong passwords', 'Explain firewall function', 'Describe antivirus software'], difficulty: 1 },
          { name: 'Digital Footprint', objectives: ['Explain online privacy', 'Manage digital reputation', 'Understand data protection laws'], difficulty: 2 },
        ]
      },
      'Web Design': {
        description: 'Creating and publishing web content',
        weight: 10,
        subTopics: [
          { name: 'HTML', objectives: ['Create basic HTML structure', 'Use headings, paragraphs, links', 'Insert images and tables'], difficulty: 1 },
          { name: 'CSS', objectives: ['Apply styles to elements', 'Use classes and IDs', 'Create responsive layouts'], difficulty: 2 },
          { name: 'Web Publishing', objectives: ['Understand domain and hosting', 'Upload files via FTP', 'Test website functionality'], difficulty: 2 },
        ]
      }
    }
  },

  // ═══════════════════════════════════════════
  // GEOGRAPHY — EGCSE & JC
  // ═══════════════════════════════════════════
  'Geography': {
    levels: ['jc', 'egcse'],
    topics: {
      'Physical Geography': {
        description: 'Natural processes and landforms',
        weight: 25,
        subTopics: [
          { name: 'Plate Tectonics', objectives: ['Describe plate boundaries', 'Explain earthquake causes', 'Explain volcanic activity'], difficulty: 2 },
          { name: 'Rivers', objectives: ['Describe river processes (erosion, transport, deposition)', 'Identify river landforms', 'Explain drainage basins'], difficulty: 2 },
          { name: 'Coasts', objectives: ['Describe coastal erosion processes', 'Identify coastal landforms', 'Explain coastal management'], difficulty: 2 },
          { name: 'Glaciation', objectives: ['Describe glacial erosion', 'Identify glacial landforms', 'Explain periglacial processes'], difficulty: 3 },
          { name: 'Weather & Climate', objectives: ['Describe weather elements', 'Explain climate zones', 'Interpret climate graphs'], difficulty: 1 },
        ]
      },
      'Human Geography': {
        description: 'Human populations and activities',
        weight: 25,
        subTopics: [
          { name: 'Population', objectives: ['Describe population distribution', 'Explain population change', 'Interpret population pyramids'], difficulty: 2 },
          { name: 'Urbanisation', objectives: ['Describe urbanisation causes', 'Explain urban problems', 'Describe sustainable cities'], difficulty: 2 },
          { name: 'Economic Activity', objectives: ['Classify economic sectors', 'Describe industrial location factors', 'Explain globalisation'], difficulty: 2 },
          { name: 'Development', objectives: ['Measure development (HDI, GDP)', 'Explain development inequalities', 'Describe aid and trade'], difficulty: 2 },
          { name: 'Settlement', objectives: ['Describe settlement hierarchy', 'Explain settlement patterns', 'Describe land use models'], difficulty: 2 },
        ]
      },
      'Map Skills': {
        description: 'Reading and interpreting maps',
        weight: 20,
        subTopics: [
          { name: 'Grid References', objectives: ['Use 4-figure grid references', 'Use 6-figure grid references', 'Locate features accurately'], difficulty: 1 },
          { name: 'Contours', objectives: ['Read contour lines', 'Identify relief features', 'Calculate gradients'], difficulty: 2 },
          { name: 'Compass Directions', objectives: ['Use 8-point compass', 'Measure bearing', 'Describe directions'], difficulty: 1 },
          { name: 'Map Symbols', objectives: ['Identify OS map symbols', 'Interpret map keys', 'Use scale to measure distance'], difficulty: 1 },
        ]
      },
      'Climate': {
        description: 'Climate systems and change',
        weight: 15,
        subTopics: [
          { name: 'Climate Zones', objectives: ['Describe world climate zones', 'Explain climate controls (latitude, altitude)', 'Interpret climate data'], difficulty: 1 },
          { name: 'Climate Change', objectives: ['Describe natural vs human causes', 'Explain greenhouse effect', 'Evaluate mitigation strategies'], difficulty: 2 },
          { name: 'Ecosystems', objectives: ['Describe biome distribution', 'Explain tropical rainforest characteristics', 'Explain desert characteristics'], difficulty: 2 },
        ]
      }
    }
  },

  // ═══════════════════════════════════════════
  // HISTORY — EGCSE & JC
  // ═══════════════════════════════════════════
  'History': {
    levels: ['jc', 'egcse'],
    topics: {
      'Ancient History': {
        description: 'Early civilisations and ancient empires',
        weight: 15,
        subTopics: [
          { name: 'Egyptian Civilisation', objectives: ['Describe Egyptian society', 'Explain pyramid building', 'Describe religious beliefs'], difficulty: 1 },
          { name: 'Greek Civilisation', objectives: ['Describe Athenian democracy', 'Explain Persian Wars', 'Describe Alexander\'s empire'], difficulty: 1 },
          { name: 'Roman Empire', objectives: ['Describe Roman Republic to Empire', 'Explain Roman military expansion', 'Describe Roman daily life'], difficulty: 1 },
        ]
      },
      'Modern History': {
        description: '19th and 20th century world history',
        weight: 25,
        subTopics: [
          { name: 'Industrial Revolution', objectives: ['Describe causes of Industrial Revolution', 'Explain social impacts', 'Describe technological innovations'], difficulty: 2 },
          { name: 'Colonialism', objectives: ['Describe Scramble for Africa', 'Explain colonial administration', 'Evaluate colonial legacy'], difficulty: 2 },
          { name: 'Independence Movements', objectives: ['Describe African independence', 'Explain nationalist movements', 'Analyse post-colonial challenges'], difficulty: 3 },
          { name: 'Cold War', objectives: ['Describe origins of Cold War', 'Explain key events (Cuba, Berlin)', 'Analyse end of Cold War'], difficulty: 3 },
        ]
      },
      'World Wars': {
        description: 'Causes, events, and consequences of world wars',
        weight: 20,
        subTopics: [
          { name: 'World War I', objectives: ['Describe causes (MANIA)', 'Explain trench warfare', 'Describe Treaty of Versailles'], difficulty: 2 },
          { name: 'Interwar Period', objectives: ['Describe League of Nations', 'Explain rise of fascism', 'Describe Great Depression'], difficulty: 2 },
          { name: 'World War II', objectives: ['Describe causes and outbreak', 'Explain key battles and events', 'Describe Holocaust'], difficulty: 3 },
          { name: 'Post-War', objectives: ['Describe UN formation', 'Explain Marshall Plan', 'Describe decolonisation'], difficulty: 2 },
        ]
      },
      'African History': {
        description: 'African civilisations and history',
        weight: 20,
        subTopics: [
          { name: 'Pre-Colonial Africa', objectives: ['Describe Great Zimbabwe', 'Explain Mali Empire', 'Describe Swazi kingdom origins'], difficulty: 2 },
          { name: 'Colonial Africa', objectives: ['Describe Berlin Conference', 'Explain colonial policies', 'Describe African resistance'], difficulty: 2 },
          { name: 'Post-Colonial Africa', objectives: ['Describe independence struggles', 'Explain nation-building challenges', 'Analyse modern Africa'], difficulty: 3 },
          { name: 'Southern African History', objectives: ['Describe apartheid system', 'Explain liberation movements', 'Describe post-apartheid transition'], difficulty: 3 },
        ]
      },
      'Civil Rights': {
        description: 'Movements for equality and justice',
        weight: 10,
        subTopics: [
          { name: 'US Civil Rights', objectives: ['Describe segregation', 'Explain key leaders (MLK, Malcolm X)', 'Describe civil rights legislation'], difficulty: 2 },
          { name: 'Women\'s Suffrage', objectives: ['Describe suffrage movements', 'Explain key figures', 'Evaluate impact'], difficulty: 2 },
          { name: 'Human Rights', objectives: ['Describe Universal Declaration', 'Explain human rights organisations', 'Evaluate progress'], difficulty: 2 },
        ]
      }
    }
  }
};

// ── Add remaining subjects (shorter definitions) ──

// SISWATI
SYLLABUS['Siswati'] = {
  levels: ['jc', 'egcse'],
  topics: {
    'Grammar': {
      description: 'Siswati grammar and syntax',
      weight: 20,
      subTopics: [
        { name: 'Parts of Speech', objectives: ['Identify nouns, verbs, adjectives', 'Use pronouns correctly', 'Apply concords'], difficulty: 1 },
        { name: 'Tenses', objectives: ['Use present, past, future tenses', 'Apply tense markers', 'Form negative constructions'], difficulty: 2 },
        { name: 'Sentence Structure', objectives: ['Form simple and complex sentences', 'Use relative clauses', 'Apply word order rules'], difficulty: 2 },
      ]
    },
    'Vocabulary': {
      description: 'Siswati vocabulary and word formation',
      weight: 20,
      subTopics: [
        { name: 'Word Formation', objectives: ['Identify noun classes', 'Form plurals correctly', 'Derive words using prefixes/suffixes'], difficulty: 2 },
        { name: 'Synonyms & Antonyms', objectives: ['Identify synonyms in Siswati', 'Identify antonyms', 'Build lexical range'], difficulty: 1 },
      ]
    },
    'Comprehension': {
      description: 'Reading and understanding Siswati texts',
      weight: 20,
      subTopics: [
        { name: 'Literal Comprehension', objectives: ['Identify main ideas', 'Recall details', 'Follow narrative sequence'], difficulty: 1 },
        { name: 'Inferential Comprehension', objectives: ['Make inferences', 'Interpret implicit meaning', 'Analyse character motivation'], difficulty: 2 },
      ]
    },
    'Writing': {
      description: 'Siswati composition and creative writing',
      weight: 25,
      subTopics: [
        { name: 'Essay Writing', objectives: ['Structure essays properly', 'Develop arguments', 'Write conclusions'], difficulty: 2 },
        { name: 'Letter Writing', objectives: ['Format formal and informal letters', 'Use appropriate register', 'Organise content'], difficulty: 2 },
        { name: 'Creative Writing', objectives: ['Write narratives', 'Use descriptive language', 'Develop characters and plot'], difficulty: 3 },
      ]
    },
    'Oral Skills': {
      description: 'Speaking and listening in Siswati',
      weight: 15,
      subTopics: [
        { name: 'Pronunciation', objectives: ['Pronounce sounds correctly', 'Apply tone rules', 'Speak clearly'], difficulty: 1 },
        { name: 'Oral Discussion', objectives: ['Participate in discussions', 'Express opinions clearly', 'Listen actively'], difficulty: 2 },
      ]
    }
  }
};

// ACCOUNTING
SYLLABUS['Accounting'] = {
  levels: ['egcse'],
  topics: {
    'Financial Statements': {
      description: 'Preparation of financial statements',
      weight: 25,
      subTopics: [
        { name: 'Income Statement', objectives: ['Prepare trading account', 'Calculate gross profit', 'Calculate net profit'], difficulty: 2 },
        { name: 'Balance Sheet', objectives: ['Classify assets and liabilities', 'Prepare balance sheet', 'Calculate working capital'], difficulty: 2 },
        { name: 'Cash Flow Statement', objectives: ['Identify cash inflows/outflows', 'Prepare cash flow', 'Interpret cash position'], difficulty: 3 },
      ]
    },
    'Bookkeeping': {
      description: 'Double-entry and accounting records',
      weight: 20,
      subTopics: [
        { name: 'Double Entry', objectives: ['Apply debit and credit rules', 'Record transactions', 'Balance accounts'], difficulty: 1 },
        { name: 'Ledger Accounts', objectives: ['Post to ledger accounts', 'Prepare trial balance', 'Identify errors'], difficulty: 2 },
        { name: 'Control Accounts', objectives: ['Prepare sales ledger control', 'Prepare purchases ledger control', 'Reconcile control accounts'], difficulty: 3 },
      ]
    },
    'Ratio Analysis': {
      description: 'Financial ratios and interpretation',
      weight: 15,
      subTopics: [
        { name: 'Profitability Ratios', objectives: ['Calculate gross profit margin', 'Calculate net profit margin', 'Calculate ROCE'], difficulty: 2 },
        { name: 'Liquidity Ratios', objectives: ['Calculate current ratio', 'Calculate quick ratio', 'Interpret liquidity position'], difficulty: 2 },
        { name: 'Efficiency Ratios', objectives: ['Calculate stock turnover', 'Calculate debtor days', 'Calculate creditor days'], difficulty: 3 },
      ]
    }
  }
};

// BUSINESS STUDIES
SYLLABUS['Business Studies'] = {
  levels: ['egcse'],
  topics: {
    'Management': {
      description: 'Business management and leadership',
      weight: 20,
      subTopics: [
        { name: 'Leadership Styles', objectives: ['Describe autocratic, democratic, laissez-faire', 'Evaluate leadership effectiveness', 'Apply to scenarios'], difficulty: 2 },
        { name: 'Organisational Structure', objectives: ['Describe functional areas', 'Explain chain of command', 'Draw organisation charts'], difficulty: 1 },
      ]
    },
    'Marketing': {
      description: 'Marketing principles and strategy',
      weight: 20,
      subTopics: [
        { name: 'Marketing Mix (4Ps)', objectives: ['Describe product decisions', 'Explain pricing strategies', 'Describe promotion methods', 'Explain distribution channels'], difficulty: 2 },
        { name: 'Market Research', objectives: ['Describe primary and secondary research', 'Design questionnaires', 'Analyse research data'], difficulty: 2 },
      ]
    },
    'Finance': {
      description: 'Business finance and accounting',
      weight: 20,
      subTopics: [
        { name: 'Sources of Finance', objectives: ['Identify internal sources', 'Identify external sources', 'Choose appropriate finance'], difficulty: 1 },
        { name: 'Break-Even Analysis', objectives: ['Calculate break-even point', 'Draw break-even charts', 'Interpret margin of safety'], difficulty: 2 },
        { name: 'Profit vs Cash', objectives: ['Distinguish profit and cash', 'Prepare cash flow forecasts', 'Manage working capital'], difficulty: 2 },
      ]
    },
    'Operations': {
      description: 'Production and operations management',
      weight: 15,
      subTopics: [
        { name: 'Production Methods', objectives: ['Describe job, batch, flow production', 'Evaluate production methods', 'Choose appropriate method'], difficulty: 1 },
        { name: 'Quality Management', objectives: ['Describe quality control', 'Explain quality assurance', 'Describe TQM'], difficulty: 2 },
      ]
    }
  }
};

// ECONOMICS
SYLLABUS['Economics'] = {
  levels: ['egcse'],
  topics: {
    'Microeconomics': {
      description: 'Individual markets and decision-making',
      weight: 25,
      subTopics: [
        { name: 'Demand & Supply', objectives: ['Draw demand and supply curves', 'Explain market equilibrium', 'Analyse shifts in curves'], difficulty: 2 },
        { name: 'Elasticity', objectives: ['Calculate price elasticity', 'Interpret elasticity values', 'Apply to business decisions'], difficulty: 2 },
        { name: 'Market Structures', objectives: ['Describe perfect competition', 'Describe monopoly', 'Compare market structures'], difficulty: 3 },
      ]
    },
    'Macroeconomics': {
      description: 'National economies and aggregates',
      weight: 25,
      subTopics: [
        { name: 'GDP & Growth', objectives: ['Define GDP', 'Calculate economic growth', 'Interpret GDP data'], difficulty: 2 },
        { name: 'Inflation', objectives: ['Measure inflation (CPI)', 'Explain causes of inflation', 'Evaluate effects'], difficulty: 2 },
        { name: 'Unemployment', objectives: ['Measure unemployment', 'Explain types of unemployment', 'Evaluate policies'], difficulty: 2 },
      ]
    },
    'Trade & Development': {
      description: 'International trade and economic development',
      weight: 20,
      subTopics: [
        { name: 'Globalisation', objectives: ['Describe globalisation causes', 'Evaluate benefits and costs', 'Explain MNCs'], difficulty: 2 },
        { name: 'Trade Policies', objectives: ['Describe free trade vs protectionism', 'Explain tariffs and quotas', 'Evaluate trade blocs'], difficulty: 2 },
        { name: 'Exchange Rates', objectives: ['Explain exchange rate determination', 'Calculate currency conversions', 'Evaluate exchange rate changes'], difficulty: 3 },
      ]
    }
  }
};

// AGRICULTURE
SYLLABUS['Agriculture'] = {
  levels: ['jc', 'egcse'],
  topics: {
    'Crop Production': {
      description: 'Cultivation of crops',
      weight: 22,
      subTopics: [
        { name: 'Soil Preparation', objectives: ['Describe ploughing and harrowing', 'Explain soil types', 'Prepare seedbeds'], difficulty: 1 },
        { name: 'Planting', objectives: ['Select appropriate seeds', 'Apply correct planting methods', 'Calculate seed rates'], difficulty: 1 },
        { name: 'Crop Management', objectives: ['Apply fertilisers', 'Control weeds', 'Irrigate crops'], difficulty: 2 },
      ]
    },
    'Animal Husbandry': {
      description: 'Livestock management',
      weight: 20,
      subTopics: [
        { name: 'Animal Nutrition', objectives: ['Identify feed types', 'Formulate rations', 'Describe digestive systems'], difficulty: 2 },
        { name: 'Animal Health', objectives: ['Identify common diseases', 'Apply vaccination schedules', 'Maintain hygiene'], difficulty: 2 },
        { name: 'Breeding', objectives: ['Describe breeding methods', 'Select breeding stock', 'Manage reproduction'], difficulty: 2 },
      ]
    },
    'Soil Science': {
      description: 'Soil properties and management',
      weight: 18,
      subTopics: [
        { name: 'Soil Composition', objectives: ['Identify soil components', 'Test soil texture', 'Measure soil pH'], difficulty: 1 },
        { name: 'Soil Fertility', objectives: ['Describe nutrient cycles', 'Apply organic and inorganic fertilisers', 'Practice crop rotation'], difficulty: 2 },
        { name: 'Soil Conservation', objectives: ['Control erosion', 'Practice conservation methods', 'Maintain soil structure'], difficulty: 2 },
      ]
    }
  }
};

// DEVELOPMENT STUDIES
SYLLABUS['Development Studies'] = {
  levels: ['egcse'],
  topics: {
    'Poverty': {
      description: 'Causes, effects, and solutions to poverty',
      weight: 18,
      subTopics: [
        { name: 'Measuring Poverty', objectives: ['Define absolute and relative poverty', 'Use poverty indicators', 'Interpret poverty data'], difficulty: 1 },
        { name: 'Causes of Poverty', objectives: ['Identify economic causes', 'Identify social causes', 'Identify political causes'], difficulty: 2 },
        { name: 'Poverty Alleviation', objectives: ['Describe poverty reduction strategies', 'Evaluate aid effectiveness', 'Explain microfinance'], difficulty: 3 },
      ]
    },
    'Health': {
      description: 'Health issues in developing countries',
      weight: 18,
      subTopics: [
        { name: 'Health Indicators', objectives: ['Measure life expectancy', 'Calculate infant mortality', 'Interpret health data'], difficulty: 1 },
        { name: 'Disease', objectives: ['Describe communicable diseases', 'Describe non-communicable diseases', 'Explain healthcare systems'], difficulty: 2 },
        { name: 'Healthcare', objectives: ['Describe primary healthcare', 'Evaluate health programmes', 'Explain health education'], difficulty: 2 },
      ]
    },
    'Education': {
      description: 'Education and human capital',
      weight: 16,
      subTopics: [
        { name: 'Education Indicators', objectives: ['Measure literacy rates', 'Calculate enrolment ratios', 'Interpret education data'], difficulty: 1 },
        { name: 'Education Quality', objectives: ['Describe quality factors', 'Evaluate education policies', 'Explain barriers to education'], difficulty: 2 },
      ]
    },
    'Sustainability': {
      description: 'Sustainable development',
      weight: 18,
      subTopics: [
        { name: 'SDGs', objectives: ['List Sustainable Development Goals', 'Explain each goal', 'Evaluate progress'], difficulty: 2 },
        { name: 'Environmental Sustainability', objectives: ['Describe resource conservation', 'Explain renewable energy', 'Evaluate environmental policies'], difficulty: 2 },
      ]
    }
  }
};

// COMBINED SCIENCE
SYLLABUS['Combined Science'] = {
  levels: ['jc'],
  topics: {
    'Scientific Method': {
      description: 'Scientific inquiry and experimentation',
      weight: 10,
      subTopics: [
        { name: 'Experimental Design', objectives: ['Identify variables', 'Form hypotheses', 'Design experiments'], difficulty: 1 },
        { name: 'Data Analysis', objectives: ['Record observations', 'Calculate averages', 'Draw conclusions'], difficulty: 1 },
        { name: 'Lab Safety', objectives: ['Identify hazards', 'Use equipment safely', 'Follow safety procedures'], difficulty: 1 },
      ]
    },
    'Cells': {
      description: 'Basic unit of life',
      weight: 15,
      subTopics: [
        { name: 'Cell Structure', objectives: ['Identify cell parts', 'Compare plant and animal cells', 'Describe cell functions'], difficulty: 1 },
        { name: 'Cell Processes', objectives: ['Describe diffusion', 'Describe osmosis', 'Explain active transport'], difficulty: 2 },
      ]
    },
    'Energy': {
      description: 'Energy types and transformations',
      weight: 20,
      subTopics: [
        { name: 'Energy Forms', objectives: ['Identify kinetic, potential, thermal energy', 'Describe energy transformations', 'Apply conservation of energy'], difficulty: 1 },
        { name: 'Energy Resources', objectives: ['Identify renewable resources', 'Identify non-renewable resources', 'Evaluate energy choices'], difficulty: 1 },
      ]
    },
    'Forces': {
      description: 'Forces and motion',
      weight: 20,
      subTopics: [
        { name: 'Types of Forces', objectives: ['Identify gravitational, friction, magnetic forces', 'Measure force with newton meter', 'Describe effects of forces'], difficulty: 1 },
        { name: 'Motion', objectives: ['Calculate speed', 'Interpret distance-time graphs', 'Calculate acceleration'], difficulty: 2 },
      ]
    },
    'Materials': {
      description: 'Properties and uses of materials',
      weight: 15,
      subTopics: [
        { name: 'States of Matter', objectives: ['Describe solid, liquid, gas', 'Explain changes of state', 'Describe particle arrangement'], difficulty: 1 },
        { name: 'Elements & Compounds', objectives: ['Distinguish elements and compounds', 'Identify chemical symbols', 'Name common compounds'], difficulty: 1 },
      ]
    }
  }
};

/**
 * Get the full syllabus for a subject.
 */
function getSubjectSyllabus(subjectName) {
  return SYLLABUS[subjectName] || null;
}

/**
 * Get the breakdown for a specific topic within a subject.
 */
function getTopicBreakdown(subjectName, topicName) {
  const subject = SYLLABUS[subjectName];
  if (!subject) return null;
  const topic = Object.entries(subject.topics).find(([key]) => 
    key.toLowerCase() === topicName.toLowerCase()
  );
  if (!topic) return null;
  return {
    subject: subjectName,
    topicName: topic[0],
    description: topic[1].description,
    weight: topic[1].weight,
    subTopics: topic[1].subTopics.map(st => ({
      ...st,
      subject: subjectName,
      topic: topic[0]
    })),
    totalSubTopics: topic[1].subTopics.length
  };
}

/**
 * Get all available subjects.
 */
function getAvailableSubjects() {
  return Object.keys(SYLLABUS).map(name => ({
    name,
    levels: SYLLABUS[name].levels,
    topicCount: Object.keys(SYLLABUS[name].topics).length
  }));
}

/**
 * Search across all subjects and topics.
 */
function searchSyllabus(query) {
  const q = query.toLowerCase();
  const results = [];
  for (const [subjectName, subject] of Object.entries(SYLLABUS)) {
    for (const [topicName, topic] of Object.entries(subject.topics)) {
      if (topicName.toLowerCase().includes(q) || topic.description.toLowerCase().includes(q)) {
        results.push({
          subject: subjectName,
          topicName,
          description: topic.description,
          weight: topic.weight,
          subTopicCount: topic.subTopics.length
        });
      } else {
        const matchingSubTopics = topic.subTopics.filter(st =>
          st.name.toLowerCase().includes(q) ||
          st.objectives.some(obj => obj.toLowerCase().includes(q))
        );
        if (matchingSubTopics.length > 0) {
          results.push({
            subject: subjectName,
            topicName,
            description: topic.description,
            weight: topic.weight,
            matchingSubTopics: matchingSubTopics.map(st => st.name),
            subTopicCount: topic.subTopics.length
          });
        }
      }
    }
  }
  return results;
}

/**
 * Get study recommendations based on weak areas.
 */
function getStudyRecommendations(weakSubTopics) {
  const recommendations = [];
  for (const weak of weakSubTopics) {
    for (const [subjectName, subject] of Object.entries(SYLLABUS)) {
      for (const [topicName, topic] of Object.entries(subject.topics)) {
        const found = topic.subTopics.find(st => 
          st.name.toLowerCase() === weak.toLowerCase()
        );
        if (found) {
          recommendations.push({
            subject: subjectName,
            topic: topicName,
            subTopic: found.name,
            objectives: found.objectives,
            difficulty: found.difficulty
          });
        }
      }
    }
  }
  return recommendations;
}

module.exports = {
  SYLLABUS,
  getSubjectSyllabus,
  getTopicBreakdown,
  getAvailableSubjects,
  searchSyllabus,
  getStudyRecommendations
};
