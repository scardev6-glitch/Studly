/**
 * SYLLABUS BREAKDOWN AGENT
 * 
 * Maps EGCSE subjects → topics → granular sub-topics
 * with learning objectives, difficulty ratings, and exam weight.
 * 
 * RESTRICTED TO: Mathematics, Additional Mathematics, Biology, Chemistry, Physics, ICT, Siswati
 * NO LEVELS: All subjects are EGCSE only (no JC/levels distinction)
 *
 * This is the authoritative source for the syllabus structure.
 * Used by: study planner, quiz engine, focus sessions, progress tracking.
 */

const SYLLABUS = {

  // ═══════════════════════════════════════════
  // MATHEMATICS — EGCSE ONLY
  // ═══════════════════════════════════════════
  'Mathematics': {
    topics: {
      'Algebra': {
        description: 'Algebraic expressions, equations, and functions',
        weight: 25,
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
  // ADDITIONAL MATHEMATICS — EGCSE ONLY
  // ═══════════════════════════════════════════
  'Additional Mathematics': {
    topics: {
      'Advanced Algebra': {
        description: 'Advanced algebraic concepts and techniques',
        weight: 30,
        subTopics: [
          { name: 'Exponential Functions', objectives: ['Graph exponential functions', 'Solve exponential equations', 'Apply exponential growth/decay'], difficulty: 3 },
          { name: 'Logarithmic Functions', objectives: ['Understand logarithm definition', 'Apply logarithm rules', 'Solve logarithmic equations'], difficulty: 3 },
          { name: 'Partial Fractions', objectives: ['Decompose rational expressions', 'Apply partial fractions to integration', 'Solve complex fractions'], difficulty: 3 },
          { name: 'Complex Numbers', objectives: ['Perform operations with complex numbers', 'Represent in Argand diagram', 'Use De Moivre\'s theorem'], difficulty: 4 },
          { name: 'Binomial Expansion', objectives: ['Apply binomial theorem', 'Find coefficients', 'Use binomial series'], difficulty: 3 },
        ]
      },
      'Trigonometry': {
        description: 'Advanced trigonometric concepts',
        weight: 25,
        subTopics: [
          { name: 'Trig Identities', objectives: ['Prove advanced identities', 'Use double angle formulas', 'Apply product-to-sum formulas'], difficulty: 3 },
          { name: 'Inverse Trig Functions', objectives: ['Apply inverse sine, cosine, tangent', 'Find principal values', 'Solve inverse trig equations'], difficulty: 3 },
          { name: 'Harmonic Form', objectives: ['Express in harmonic form', 'Find maximum and minimum', 'Solve using harmonic form'], difficulty: 4 },
          { name: 'Trig Equations', objectives: ['Solve higher level trig equations', 'Apply general solutions', 'Interpret graphically'], difficulty: 3 },
        ]
      },
      'Calculus': {
        description: 'Advanced differentiation and integration',
        weight: 25,
        subTopics: [
          { name: 'Differentiation Rules', objectives: ['Apply chain rule', 'Apply product rule', 'Apply quotient rule', 'Differentiate transcendental functions'], difficulty: 3 },
          { name: 'Integration Techniques', objectives: ['Integration by parts', 'Integration by substitution', 'Integrate rational functions'], difficulty: 3 },
          { name: 'Differential Equations', objectives: ['Solve first-order differential equations', 'Apply separable variables', 'Model real-world scenarios'], difficulty: 4 },
          { name: 'Sequences & Series', objectives: ['Find sums of infinite series', 'Apply convergence tests', 'Use Taylor and Maclaurin series'], difficulty: 4 },
        ]
      },
      'Coordinate Geometry': {
        description: 'Analytical geometry and curves',
        weight: 20,
        subTopics: [
          { name: 'Conic Sections', objectives: ['Identify parabolas, ellipses, hyperbolas', 'Find equations of conics', 'Interpret eccentricity'], difficulty: 3 },
          { name: 'Parametric Equations', objectives: ['Convert between parametric and Cartesian', 'Find derivatives parametrically', 'Apply to curves'], difficulty: 3 },
          { name: 'Polar Coordinates', objectives: ['Convert between polar and Cartesian', 'Plot polar curves', 'Calculate areas in polar form'], difficulty: 4 },
        ]
      }
    }
  },

  // ═══════════════════════════════════════════
  // BIOLOGY — EGCSE ONLY
  // ═══════════════════════════════════════════
  'Biology': {
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
          { name: 'Population Dynamics', objectives: ['Describe population growth', 'Identify limiting factors', 'Apply growth models'], difficulty: 2 },
          { name: 'Succession', objectives: ['Describe primary succession', 'Describe secondary succession', 'Explain climax communities'], difficulty: 2 },
          { name: 'Conservation', objectives: ['Describe biodiversity importance', 'Explain conservation methods', 'Evaluate protected areas'], difficulty: 2 },
        ]
      },
      'Organism Organisation': {
        description: 'Plant and animal physiology',
        weight: 12,
        subTopics: [
          { name: 'Plant Transport', objectives: ['Describe xylem function', 'Describe phloem function', 'Explain transpiration'], difficulty: 2 },
          { name: 'Animal Transport', objectives: ['Describe blood circulation', 'Identify blood vessels', 'Explain gas exchange'], difficulty: 2 },
          { name: 'Nervous System', objectives: ['Describe neuron structure', 'Explain synaptic transmission', 'Describe reflex arcs'], difficulty: 2 },
          { name: 'Hormones', objectives: ['Describe endocrine system', 'Explain hormone action', 'Describe feedback mechanisms'], difficulty: 2 },
          { name: 'Homeostasis', objectives: ['Explain thermoregulation', 'Describe osmoregulation', 'Explain blood glucose control'], difficulty: 3 },
          { name: 'Reproduction', objectives: ['Describe human reproduction', 'Explain gametogenesis', 'Describe contraception methods'], difficulty: 2 },
        ]
      },
      'Health and Disease': {
        description: 'Disease, immunity, and health',
        weight: 8,
        subTopics: [
          { name: 'Pathogens', objectives: ['Identify disease-causing organisms', 'Describe transmission routes', 'Explain disease spread'], difficulty: 1 },
          { name: 'Immune System', objectives: ['Describe innate immunity', 'Describe acquired immunity', 'Explain immune response'], difficulty: 2 },
          { name: 'Vaccination', objectives: ['Explain vaccination mechanism', 'Describe vaccine types', 'Evaluate vaccine effectiveness'], difficulty: 2 },
          { name: 'Non-communicable Diseases', objectives: ['Describe cancer biology', 'Explain cardiovascular disease', 'Describe lifestyle factors'], difficulty: 2 },
        ]
      },
      'Photosynthesis & Respiration': {
        description: 'Detailed biochemical pathways',
        weight: 8,
        subTopics: [
          { name: 'Light-dependent Reactions', objectives: ['Describe photosystem II', 'Describe photosystem I', 'Explain electron transport chain'], difficulty: 3 },
          { name: 'Light-independent Reactions', objectives: ['Describe Calvin cycle', 'Explain carbon fixation', 'Describe regeneration'], difficulty: 3 },
          { name: 'Aerobic Respiration', objectives: ['Describe glycolysis', 'Describe Krebs cycle', 'Describe electron transport chain', 'Calculate ATP yield'], difficulty: 3 },
          { name: 'Anaerobic Respiration', objectives: ['Explain fermentation pathways', 'Compare with aerobic respiration', 'Describe lactate accumulation'], difficulty: 2 },
        ]
      }
    }
  },

  // ═══════════════════════════════════════════
  // CHEMISTRY — EGCSE ONLY
  // ═══════════════════════════════════════════
  'Chemistry': {
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
  // PHYSICS — EGCSE ONLY
  // ═══════════════════════════════════════════
  'Physics': {
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
  // ICT — EGCSE ONLY
  // ═══════════════════════════════════════════
  'ICT': {
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
  // SISWATI — EGCSE ONLY
  // ═══════════════════════════════════════════
  'Siswati': {
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
  }
};

/**
 * Get syllabus for a specific subject.
 * @param {string} subject - Subject name (e.g., 'Mathematics')
 * @returns {object|null} Subject object with topics and subtopics, or null if not found
 */
function getSubjectSyllabus(subject) {
  return SYLLABUS[subject] || null;
}

/**
 * Get detailed breakdown of a specific topic within a subject.
 * @param {string} subject - Subject name
 * @param {string} topic - Topic name
 * @returns {object|null} Topic object with subTopics, or null if not found
 */
function getTopicBreakdown(subject, topic) {
  const subjectData = SYLLABUS[subject];
  if (!subjectData) return null;
  return subjectData.topics[topic] || null;
}

/**
 * Get all available subjects (EGCSE only, 7 subjects).
 * @returns {array} Array of subject objects with name and topic count
 */
function getAvailableSubjects() {
  return Object.keys(SYLLABUS).map(name => ({
    name,
    topicCount: Object.keys(SYLLABUS[name].topics).length
  }));
}

/**
 * Search across all subjects and topics.
 * @param {string} query - Search query string
 * @returns {array} Array of matching results
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
 * @param {array} weakSubTopics - Array of weak subtopic names
 * @returns {array} Array of recommendations
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
