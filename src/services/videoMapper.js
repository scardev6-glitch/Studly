// ═══════════════════════════════════════════════════
//  Studly Video & Resource Mapper
//  Maps topic names → real asset files from project/assets/
// ═══════════════════════════════════════════════════

const VIDEO_MAP = {
  // ── MATHEMATICS: Edexcel IGCSE Exam Question Videos (60 videos) ──
  'prime factors': { title: 'Prime Factors, HCF, LCM - Edexcel IGCSE', path: '/assets/_1_Prime_Factors,_HCF,_LCM_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'hcf': { title: 'Prime Factors, HCF, LCM - Edexcel IGCSE', path: '/assets/_1_Prime_Factors,_HCF,_LCM_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'lcm': { title: 'Prime Factors, HCF, LCM - Edexcel IGCSE', path: '/assets/_1_Prime_Factors,_HCF,_LCM_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'fractions': { title: 'Fractions - Edexcel IGCSE', path: '/assets/_2_Fractions_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'probability': { title: 'Probability - Edexcel IGCSE', path: '/assets/_3_Probability_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'probability 2': { title: 'Probability 2 - Edexcel IGCSE', path: '/assets/_34_Probability_2_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'sequences': { title: 'Sequences 1 - Edexcel IGCSE', path: '/assets/_4_Sequences_1_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'sequences 2': { title: 'Sequences 2 - Edexcel IGCSE', path: '/assets/_59_Sequences_2_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'constructions': { title: 'Constructions - Edexcel IGCSE', path: '/assets/_5_Constructions_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'transformations': { title: 'Transformations - Edexcel IGCSE', path: '/assets/_6_Transformations_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'averages': { title: 'Averages - Edexcel IGCSE', path: '/assets/_7_Averages_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'mean median mode': { title: 'Averages - Edexcel IGCSE', path: '/assets/_7_Averages_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'frequency tables': { title: 'Frequency Tables - Edexcel IGCSE', path: '/assets/_8_Frequency_Tables_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'ratio': { title: 'Ratio - Edexcel IGCSE', path: '/assets/_9_Ratio_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'proportion': { title: 'Direct and Inverse Proportion - Edexcel IGCSE', path: '/assets/_44_Direct_and_Inverse_Proportion_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'standard form': { title: 'Standard Form - Edexcel IGCSE', path: '/assets/_10_Standard_Form_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'percentages': { title: 'Percentages - Edexcel IGCSE', path: '/assets/_11_Percentages_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'compound interest': { title: 'Compound Interest - Edexcel IGCSE', path: '/assets/_12_Compound_Interest_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'similar shapes': { title: 'Similar Shapes 1 - Edexcel IGCSE', path: '/assets/_13_Similar_Shapes_1_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'similar shapes 2': { title: 'Similar Shapes 2 - Edexcel IGCSE', path: '/assets/_46_Similar_Shapes_2_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'expanding brackets': { title: 'Expanding Brackets - Edexcel IGCSE', path: '/assets/_14_Expanding_Brackets_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'factorising': { title: 'Factorising - Edexcel IGCSE', path: '/assets/_15_Factorising_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'linear equations': { title: 'Linear Equations - Edexcel IGCSE', path: '/assets/_16_Linear_Equations_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'inequalities': { title: 'Inequalities - Edexcel IGCSE', path: '/assets/_17_Inequalities_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'graph inequalities': { title: 'Graph Inequalities - Edexcel IGCSE', path: '/assets/_18_Graph_Inequalities_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'simultaneous equations': { title: 'Simultaneous Equations - Edexcel IGCSE', path: '/assets/_19_Simultaneous_Equations_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'simultaneous equations 2': { title: 'Simultaneous Equations 2 (Quadratic) - Edexcel IGCSE', path: '/assets/_42_Simultaneous_Equations_2__Quadratic__-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'indices': { title: 'Indices - Edexcel IGCSE', path: '/assets/_20_Indices_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'measures': { title: 'Measures - Edexcel IGCSE', path: '/assets/_21_Measures_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'angles': { title: 'Angles - Edexcel IGCSE', path: '/assets/_22_Angles_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'polygons': { title: 'Angles in Polygons - Edexcel IGCSE', path: '/assets/_23_Angles_in_Polygons_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'bearings': { title: 'Bearings - Edexcel IGCSE', path: '/assets/_24_Bearings_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'pythagoras': { title: 'Pythagoras - Edexcel IGCSE', path: '/assets/_25_Pythagoras_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'pythagorean theorem': { title: 'Pythagoras - Edexcel IGCSE', path: '/assets/_25_Pythagoras_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'trigonometry': { title: 'Trigonometry - Edexcel IGCSE', path: '/assets/_26_Trigonometry_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'area': { title: 'Area - Edexcel IGCSE', path: '/assets/_27_Area_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'volume': { title: 'Volume and Surface Area - Edexcel IGCSE', path: '/assets/_28_Volume_and_Surface_Area_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'surface area': { title: 'Volume and Surface Area - Edexcel IGCSE', path: '/assets/_28_Volume_and_Surface_Area_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'cumulative frequency': { title: 'Cumulative Frequency - Edexcel IGCSE', path: '/assets/_29_Cumulative_Frequency_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'straight lines': { title: 'Straight Lines - Edexcel IGCSE', path: '/assets/_30_Straight_Lines_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'sketching graphs': { title: 'Sketching Graphs - Edexcel IGCSE', path: '/assets/_31_Sketching_Graphs_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'quadratics': { title: 'Quadratics - Edexcel IGCSE', path: '/assets/_32_Quadratics_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'quadratic equations': { title: 'Quadratics - Edexcel IGCSE', path: '/assets/_32_Quadratics_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'quadratic inequalities': { title: 'Quadratic Inequalities - Edexcel IGCSE', path: '/assets/_33_Quadratic_Inequalities_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'bounds': { title: 'Bounds - Edexcel IGCSE', path: '/assets/_35_Bounds_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'circle theorems': { title: 'Circle Theorems - Edexcel IGCSE', path: '/assets/_36_Circle_Theorems_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'intersecting chords': { title: 'Intersecting Chords - Edexcel IGCSE', path: '/assets/_37_Intersecting_Chords_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'set theory': { title: 'Set Theory - Edexcel IGCSE', path: '/assets/_38_Set_Theory_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'venn diagrams': { title: 'Venn Diagrams - Edexcel IGCSE', path: '/assets/_39_Venn_Diagrams_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'rearranging formulae': { title: 'Rearranging Formulae - Edexcel IGCSE', path: '/assets/_40_Rearranging_Formulae_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'proof': { title: 'Proof - Edexcel IGCSE', path: '/assets/_41_Proof_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'recurring decimals': { title: 'Recurring Decimals - Edexcel IGCSE', path: '/assets/_43_Recurring_Decimals_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'histograms': { title: 'Histograms - Edexcel IGCSE', path: '/assets/_45_Histograms_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'algebraic fractions': { title: 'Algebraic Fractions - Edexcel IGCSE', path: '/assets/_47_Algebraic_Fractions_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'graph transformations': { title: 'Graph Transformations - Edexcel IGCSE', path: '/assets/_48_Graph_Transformations_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'surds': { title: 'Surds - Edexcel IGCSE', path: '/assets/_49_Surds_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'sectors': { title: 'Sectors - Edexcel IGCSE', path: '/assets/_50_Sectors_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'cones and spheres': { title: 'Cones and Spheres - Edexcel IGCSE', path: '/assets/_51_Cones_and_Spheres_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'sine and cosine rules': { title: 'Sine and Cosine Rules - Edexcel IGCSE', path: '/assets/_52_Sine_and_Cosine_Rules_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  '3d trigonometry': { title: '3D Trigonometry - Edexcel IGCSE', path: '/assets/_53_3D_Trigonometry_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'completing the square': { title: 'Completing the Square - Edexcel IGCSE', path: '/assets/_54_Completing_The_Square_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'perpendicular lines': { title: 'Perpendicular Lines - Edexcel IGCSE', path: '/assets/_55_Perpendicular_Lines_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'functions': { title: 'Functions - Edexcel IGCSE', path: '/assets/_56_Functions_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'differentiation': { title: 'Differentiation - Edexcel IGCSE', path: '/assets/_57_Differentiation_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'kinematics': { title: 'Kinematics - Edexcel IGCSE', path: '/assets/_58_Kinematics_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },
  'vectors': { title: 'Vectors - Edexcel IGCSE', path: '/assets/_60_Vectors_-_Edexcel_IGCSE_Exam_Questions(0).mp4', duration: 600 },

  // ── MATHEMATICS: Advanced / Additional Maths Videos ──
  'function range and domain': { title: 'Function Range and Domain', path: '/assets/1__Function_Range_and_Domain(0).mp4', duration: 600 },
  'composite functions': { title: 'Composite Functions', path: '/assets/2_Composite_Functions(0).mp4', duration: 600 },
  'inverse functions': { title: 'Inverse Functions', path: '/assets/3_Inverse_Functions(0).mp4', duration: 600 },
  'completing square': { title: 'Completing the Square', path: '/assets/4_Completing_the_Square(0).mp4', duration: 600 },
  'graphing equations': { title: 'Graphing Equations', path: '/assets/5_Graphing_Equations(0).mp4', duration: 600 },
  'cubic equations': { title: 'Cubic Equations', path: '/assets/6_Cubic_Equations(0).mp4', duration: 600 },
  'rationalising surds': { title: 'Rationalise Surds', path: '/assets/8_Rationlise_Surds(0).mp4', duration: 600 },
  'factors and polynomials': { title: 'Factors and Polynomials', path: '/assets/9_Factors_and_Polynomials(0).mp4', duration: 600 },
  'factors and polynomials 2': { title: 'Factors and Polynomials Part 2', path: '/assets/10_Factors_and_Polynomial_Part_2(0).mp4', duration: 600 },
  'simultaneous eq advanced': { title: 'Simultaneous Equations', path: '/assets/11_Simultaneous_Equations(0).mp4', duration: 600 },
  'logarithms': { title: 'Logarithms', path: '/assets/12_Logarithm(0).mp4', duration: 600 },
  'logarithms 2': { title: 'Logarithms Part 2', path: '/assets/13_Logarithm_Part_2(0).mp4', duration: 600 },
  'logarithms 3': { title: 'Logarithms Part 3', path: '/assets/14_Logarithm_Part_3(0).mp4', duration: 600 },
  'y=mx+c': { title: 'y=mx+c - Straight Line Graphs', path: '/assets/15_Y=mx_c(0).mp4', duration: 600 },
  'non linear equations': { title: 'Converting Non-Linear Equations', path: '/assets/17_Converting_Non_Linear_Equations(0).mp4', duration: 600 },
  'graph non linear': { title: 'Graphed Non-Linear Equations', path: '/assets/18_Graphed_Non_Linear_Equations(0).mp4', duration: 600 },
  'circular measure': { title: 'Circular Measure', path: '/assets/19_Circular_Measure(0).mp4', duration: 600 },
  'circular measure 2': { title: 'Circular Measure Part 2', path: '/assets/20_Circular_Measure_Part_2(0).mp4', duration: 600 },
  'trig identities': { title: 'Trigo Identities', path: '/assets/21_Trigo_Identities(0).mp4', duration: 600 },
  'trig graphs': { title: 'Trigo Graphs', path: '/assets/22_Trigo_Graphs(0).mp4', duration: 600 },
  'solving trig': { title: 'Solving Trigo Equations', path: '/assets/23_Solving_Trigo(0).mp4', duration: 600 },
  'solving trig 2': { title: 'Solving Trigo Part 2', path: '/assets/24_Solving_Trigo_Part_2(0).mp4', duration: 600 },
  'solving trig identities': { title: 'Solving Trigo With Identities', path: '/assets/25_Solving_Trigo_With_Identities(0).mp4', duration: 600 },
  'permutation combination': { title: 'Permutation & Combination', path: '/assets/26_Permutation___Combination(0).mp4', duration: 600 },
  'permutation combination 2': { title: 'Permutation & Combination Part 2', path: '/assets/27_Permutation___Combination_Part_2(0).mp4', duration: 600 },
  'binomial expansion': { title: 'Binomial Expansion', path: '/assets/28_Binomial_Expansion(0).mp4', duration: 600 },
  'binomial expansion 2': { title: 'Binomial Expansion Part 2', path: '/assets/29_Binomial_Expansion_Part_2(0).mp4', duration: 600 },
  'progression': { title: 'Progression Part 2', path: '/assets/31_Progression_Part_2(0).mp4', duration: 600 },
  'vectors part 1': { title: 'Vectors Part 1', path: '/assets/32_Vectors_part_1(0).mp4', duration: 600 },
  'vectors part 2': { title: 'Vectors Part 2', path: '/assets/33_Vectors_part_2(0).mp4', duration: 600 },
  'vectors part 3': { title: 'Vectors Part 3', path: '/assets/34_Vectors_part_3(0).mp4', duration: 600 },
  'vectors part 4': { title: 'Vectors Part 4', path: '/assets/35_Vectors_part_4(0).mp4', duration: 600 },
  'differentiation trig': { title: 'DYDX Trigo Functions', path: '/assets/36_DYDX_Trigo_Function(0).mp4', duration: 600 },
  'approximate change': { title: 'DYDX Approximate Change Part 1', path: '/assets/37_DYDX_Approximate_Change_Part_1(0).mp4', duration: 600 },
  'approximate change 2': { title: 'DYDX Approximate Change Part 2', path: '/assets/38_DYDX_Approximate_Change_Part_2(0).mp4', duration: 600 },
  'differentiation applications': { title: 'DYDX Application Part 1', path: '/assets/39_DYDX_Application_Part_1(0).mp4', duration: 600 },
  'differentiation applications 2': { title: 'DYDX Application Part 2', path: '/assets/40_DYDX_Application_Part_2(0).mp4', duration: 600 },
  'differentiation applications 3': { title: 'DYDX Application Part 3', path: '/assets/41_DYDX_Application_Part_3(0).mp4', duration: 600 },
  'rate of change': { title: 'DYDX Rate of Change Part 1', path: '/assets/42_DYDX_Rate_of_Change_Part_1(0).mp4', duration: 600 },
  'rate of change 2': { title: 'DYDX Rate of Change Part 2', path: '/assets/43_DYDX_Rate_of_Change_Part_2(0).mp4', duration: 600 },
  'rate of change 3': { title: 'DYDX Rate of Change Part 3', path: '/assets/44_DYDX_Rate_of_Change_Part_3(0).mp4', duration: 600 },
  'integration second derivatives': { title: 'Integration - Finding Y from second derivatives Part 1', path: '/assets/45_Integration_-_Finding_Y_from_second_derivatives_Part_1(0).mp4', duration: 600 },
  'integration second derivatives 2': { title: 'Integration - Finding Y from second derivatives Part 2', path: '/assets/46_Integration_-_Finding_Y_from_second_derivatives_Part_2(0).mp4', duration: 600 },
  'definite integrals': { title: 'Definite Integrals', path: '/assets/47_Definite_Integrals(0).mp4', duration: 600 },
  'area under curve': { title: 'Integration - Area under the curve Part 1', path: '/assets/48_Integration_-_Area_under_the_curve_Part_1(0).mp4', duration: 600 },
  'area under curve 2': { title: 'Integration - Area under the curve Part 2', path: '/assets/49_Integration_-_Area_under_the_curve_Part_2(0).mp4', duration: 600 },
  'area under curve 3': { title: 'Integration - Area under the curve Part 3', path: '/assets/50_Integration_-_Area_under_the_curve_Part_3(0).mp4', duration: 600 },
  'differentiate to integrate': { title: 'Differentiate to Integrate Part 1', path: '/assets/51_Differentiate_to_Integrate_Part_1(0).mp4', duration: 600 },
  'differentiate to integrate 2': { title: 'Differentiate then Integrate Part 2', path: '/assets/52_differentiate_then_integrate_part_2(0).mp4', duration: 600 },
  'kinematics integration': { title: 'Kinematics Part 1', path: '/assets/53_Kinematics_Part_1(0).mp4', duration: 600 },
  'igcse math summary': { title: 'ALL of IGCSE Mathematics in 10 minutes', path: '/assets/ALL of IGCSE Mathematics in 10 minutes (summary) (360 X 640).mp4', duration: 600 },
  'edexcel maths everything': { title: 'Edexcel Maths IGCSE - Everything You Need', path: '/assets/Edexcel_Maths_IGCSE_4MA1_Higher___Everything_You_Need_To_Know___Examples___E.mp4', duration: 1800 },
  'edexcel maths memorise': { title: 'Everything to Memorise for Edexcel iGCSE Maths', path: '/assets/EVERYTHING_you_need_to_MEMORISE_for_your_Edexcel_iGCSE_Maths_exam(0).mp4', duration: 1200 },

  // ── BIOLOGY (IGCSE Biology series - 52 videos) ──
  'characteristics of living organisms': { title: 'Characteristics of Living Organisms (1.1)', path: '/assets/IGCSE Biology - Characteristics of Living Organisms (1.1) (360 X 640).mp4', duration: 480 },
  'classification': { title: 'Concept and Uses of Classification Systems (1.2)', path: '/assets/IGCSE Biology - Concept and Uses of Classification Systems (1.2) (360 X 640).mp4', duration: 480 },
  'features of organisms': { title: 'Features of Organisms (1.3)', path: '/assets/IGCSE Biology - Features of Organisms (1.3) (360 X 640).mp4', duration: 480 },
  'cell structure': { title: 'Cell Structure and Organisation (2.1)', path: '/assets/IGCSE Biology - Cell Structure and Organisation (2.1) (360 X 640).mp4', duration: 600 },
  'cell biology': { title: 'Cell Structure and Organisation (2.1)', path: '/assets/IGCSE Biology - Cell Structure and Organisation (2.1) (360 X 640).mp4', duration: 600 },
  'size of specimens': { title: 'Size of Specimens (2.2)', path: '/assets/IGCSE Biology - Size of Specimens (2.2) (360 X 640).mp4', duration: 360 },
  'diffusion': { title: 'Diffusion (3.1)', path: '/assets/IGCSE Biology - Diffusion (3.1) (360 X 640).mp4', duration: 420 },
  'osmosis': { title: 'Osmosis (3.2)', path: '/assets/IGCSE Biology - Osmosis (3.2) (360 X 640).mp4', duration: 420 },
  'active transport': { title: 'Active Transport (3.3)', path: '/assets/IGCSE Biology - Active Transport (3.3) (360 X 640).mp4', duration: 420 },
  'biological molecules': { title: 'Biological Molecules (4.1)', path: '/assets/IGCSE Biology - Biological Molecules (4.1) (360 X 640).mp4', duration: 540 },
  'enzymes': { title: 'Enzymes (5.1)', path: '/assets/IGCSE Biology - Enzymes (5.1) (360 X 640).mp4', duration: 540 },
  'photosynthesis': { title: 'Photosynthesis (6.1)', path: '/assets/IGCSE Biology - Photosynthesis (6.1) (360 X 640).mp4', duration: 600 },
  'leaf structure': { title: 'Leaf Structure (6.2)', path: '/assets/IGCSE Biology - Leaf structure (6.2) (360 X 640).mp4', duration: 360 },
  'diet': { title: 'Diet (7.1)', path: '/assets/IGCSE Biology - Diet (7.1) (360 X 640).mp4', duration: 480 },
  'digestive system': { title: 'Digestive System (7.2)', path: '/assets/IGCSE Biology - Digestive system (7.2) (360 X 640).mp4', duration: 480 },
  'physical digestion': { title: 'Physical Digestion (7.3)', path: '/assets/IGCSE Biology - Physical digestion (7.3) (360 X 640).mp4', duration: 360 },
  'chemical digestion': { title: 'Chemical Digestion (7.4)', path: '/assets/IGCSE Biology - Chemical digestion (7.4) (360 X 640).mp4', duration: 540 },
  'absorption': { title: 'Absorption (7.5)', path: '/assets/IGCSE Biology - Absorption (7.5) (360 X 640).mp4', duration: 360 },
  'xylem and phloem': { title: 'Xylem and Phloem (8.1)', path: '/assets/IGCSE Biology - Xylem and phloem (8.1) (360 X 640).mp4', duration: 480 },
  'water uptake': { title: 'Water Uptake (8.2)', path: '/assets/IGCSE Biology - Water uptake (8.2) (360 X 640).mp4', duration: 360 },
  'transpiration': { title: 'Transpiration (8.3)', path: '/assets/IGCSE Biology - Transpiration (8.3) (360 X 640).mp4', duration: 480 },
  'translocation': { title: 'Translocation (8.4)', path: '/assets/IGCSE Biology - Translocation (8.4) (360 X 640).mp4', duration: 360 },
  'circulatory systems': { title: 'Circulatory Systems (9.1)', path: '/assets/IGCSE Biology - Circulatory systems (9.1) (360 X 640).mp4', duration: 480 },
  'heart': { title: 'Heart (9.2)', path: '/assets/IGCSE Biology - Heart (9.2) (360 X 640).mp4', duration: 480 },
  'blood vessels': { title: 'Blood Vessels (9.3)', path: '/assets/IGCSE Biology - Blood vessels (9.3) (360 X 640).mp4', duration: 360 },
  'blood': { title: 'Blood (9.4)', path: '/assets/IGCSE Biology - Blood (9.4) (360 X 640).mp4', duration: 480 },
  'diseases and immunity': { title: 'Diseases and Immunity (10.1)', path: '/assets/IGCSE Biology - Diseases and immunity (10.1) (360 X 640).mp4', duration: 600 },
  'gas exchange': { title: 'Gas Exchange in Humans (11.1)', path: '/assets/IGCSE Biology - Gas exchange in humans (11.1) (360 X 640).mp4', duration: 540 },
  'respiration': { title: 'Respiration (12.1)', path: '/assets/IGCSE Biology - Respiration (12.1) (360 X 640).mp4', duration: 480 },
  'aerobic respiration': { title: 'Aerobic and Anaerobic Respiration (12.2, 12.3)', path: '/assets/IGCSE Biology - Aerobic and anaerobic respiration (12.2, 12.3) (360 X 640).mp4', duration: 540 },
  'anaerobic respiration': { title: 'Aerobic and Anaerobic Respiration (12.2, 12.3)', path: '/assets/IGCSE Biology - Aerobic and anaerobic respiration (12.2, 12.3) (360 X 640).mp4', duration: 540 },
  'excretion': { title: 'Excretion in Humans (13.1)', path: '/assets/IGCSE Biology - Excretion in humans (13.1) (360 X 640).mp4', duration: 480 },
  'coordination and response': { title: 'Coordination and Response (14.1)', path: '/assets/IGCSE Biology - Coordination and response (14.1) (360 X 640).mp4', duration: 600 },
  'sense organs': { title: 'Sense Organs (14.2)', path: '/assets/IGCSE Biology - Sense organs (14.2) (360 X 640).mp4', duration: 480 },
  'hormones': { title: 'Hormones (14.3)', path: '/assets/IGCSE Biology - Hormones (14.3) (360 X 640).mp4', duration: 480 },
  'homeostasis': { title: 'Homeostasis (14.4)', path: '/assets/IGCSE Biology - Homeostasis (14.4) (360 X 640).mp4', duration: 540 },
  'tropic responses': { title: 'Tropic Responses (14.5)', path: '/assets/IGCSE Biology - Tropic responses (14.5) (360 X 640).mp4', duration: 360 },
  'drugs': { title: 'Drugs (15.1)', path: '/assets/IGCSE Biology - Drugs (15.1) (360 X 640).mp4', duration: 480 },
  'asexual reproduction': { title: 'Asexual Reproduction (16.1)', path: '/assets/IGCSE Biology - Asexual reproduction (16.1) (360 X 640).mp4', duration: 420 },
  'sexual reproduction': { title: 'Sexual Reproduction (16.2)', path: '/assets/IGCSE Biology - Sexual reproduction (16.2) (360 X 640).mp4', duration: 480 },
  'sexual reproduction in plants': { title: 'Sexual Reproduction in Plants (16.3)', path: '/assets/IGCSE Biology - Sexual reproduction in plants (16.3) (360 X 640).mp4', duration: 540 },
  'sexual reproduction in humans': { title: 'Sexual Reproduction in Humans (16.4)', path: '/assets/IGCSE Biology - Sexual reproduction in humans (16.4) (360 X 640).mp4', duration: 600 },
  'sexual hormones': { title: 'Sexual Hormones in Humans (16.5)', path: '/assets/IGCSE Biology - Sexual hormones in humans (16.5) (360 X 640).mp4', duration: 480 },
  'sexually transmitted infections': { title: 'Sexually Transmitted Infections (16.6)', path: '/assets/IGCSE Biology - Sexually transmitted infections (16.6) (360 X 640).mp4', duration: 420 },
  'chromosomes genes and proteins': { title: 'Chromosomes, Genes and Proteins (17.1)', path: '/assets/IGCSE Biology - Chromosomes, genes and proteins (17.1) (360 X 640).mp4', duration: 480 },
  'mitosis and meiosis': { title: 'Mitosis and Meiosis (17.2, 17.3)', path: '/assets/IGCSE Biology - Mitosis and meiosis (17.2, 17.3) (360 X 640).mp4', duration: 600 },
  'monohybrid inheritance': { title: 'Monohybrid Inheritance (17.4)', path: '/assets/IGCSE Biology - Monohybrid inheritance (17.4) (360 X 640).mp4', duration: 540 },
  'variation': { title: 'Variation (18.1)', path: '/assets/IGCSE Biology - Variation (18.1) (360 X 640).mp4', duration: 420 },
  'adaptive features': { title: 'Adaptive Features (18.2)', path: '/assets/IGCSE Biology - Adaptive features (18.2) (360 X 640).mp4', duration: 360 },
  'selection': { title: 'Selection (18.3)', path: '/assets/IGCSE Biology - Selection (18.3) (360 X 640).mp4', duration: 420 },
  'energy flow': { title: 'Energy Flow (19.1) / Food Chains (19.2)', path: '/assets/IGCSE Biology - Energy flow (19.1) Food chains and food webs (19.2) (360 X 640).mp4', duration: 540 },
  'nutrient cycles': { title: 'Nutrient Cycles (19.3)', path: '/assets/IGCSE Biology - Nutrient cycles (19.3) (360 X 640).mp4', duration: 480 },
  'populations': { title: 'Populations (19.4)', path: '/assets/IGCSE Biology - Populations (19.4) (360 X 640).mp4', duration: 360 },
  'food supply': { title: 'Food Supply (20.1)', path: '/assets/IGCSE Biology - Food supply (20.1) (360 X 640).mp4', duration: 420 },
  'habitat destruction': { title: 'Habitat Destruction (20.2)', path: '/assets/IGCSE Biology - Habitat destruction (20.2) (360 X 640).mp4', duration: 360 },
  'pollution': { title: 'Pollution (20.3)', path: '/assets/IGCSE Biology - Pollution (20.3) (360 X 640).mp4', duration: 480 },
  'conservation': { title: 'Conservation (20.4)', path: '/assets/IGCSE Biology - Conservation (20.4) (360 X 640).mp4', duration: 420 },
  'biotechnology': { title: 'Biotechnology (21.2)', path: '/assets/IGCSE Biology - Biotechnology (21.2) (360 X 640).mp4', duration: 480 },
  'genetic modification': { title: 'Genetic Modification (21.3)', path: '/assets/IGCSE Biology - Genetic modification (21.3) (360 X 640).mp4', duration: 480 },
  'biotechnology and genetic modification': { title: 'Biotechnology and Genetic Modification (21.1)', path: '/assets/IGCSE Biology - Biotechnology and genetic modification (21.1) (360 X 640).mp4', duration: 600 },
  'ecology': { title: 'Ecology Overview', path: '/assets/IGCSE Biology - Energy flow (19.1) Food chains and food webs (19.2) (360 X 640).mp4', duration: 540 },
  'human physiology': { title: 'Human Physiology Overview', path: '/assets/IGCSE Biology - Heart (9.2) (360 X 640).mp4', duration: 480 },
  'genetics': { title: 'Genetics Overview', path: '/assets/IGCSE Biology - Chromosomes, genes and proteins (17.1) (360 X 640).mp4', duration: 480 },

  // ── ICT (IGCSE ICT series) ──
  'types and components of computer systems': { title: 'ICT Ch1 - Types and Components (Part 1)', path: '/assets/ICT IGCSE Chapter 1 - Types and components of computer systems - Part 1 (360 X 640).mp4', duration: 600 },
  'computer systems': { title: 'ICT Ch1 - Types and Components (Part 1)', path: '/assets/ICT IGCSE Chapter 1 - Types and components of computer systems - Part 1 (360 X 640).mp4', duration: 600 },
  'input devices': { title: 'ICT Ch2 - Input and Output Devices (Part 1)', path: '/assets/ICT IGCSE Chapter 2 - Input and output devices - Part 1 (360 X 640).mp4', duration: 600 },
  'output devices': { title: 'ICT Ch2 - Input and Output Devices (Part 3)', path: '/assets/ICT IGCSE Chapter 2 - Input and output devices - Part 3 (360 X 640).mp4', duration: 600 },
  'storage devices': { title: 'ICT Ch3 - Storage Devices (Part 1)', path: '/assets/ICT IGCSE Chapter 3 - Storage devices and media - Part 1 (360 X 640).mp4', duration: 540 },
  'storage media': { title: 'ICT Ch3 - Storage Devices (Part 2)', path: '/assets/ICT IGCSE Chapter 3 - Storage devices and media - Part 2 (360 X 640).mp4', duration: 540 },
  'networks': { title: 'ICT Ch4 - Networks (Part 1)', path: '/assets/ICT IGCSE Chapter 4 - Networks and the effects of using them - Part 1 (360 X 640).mp4', duration: 720 },
  'network': { title: 'ICT Ch4 - Networks (Part 1)', path: '/assets/ICT IGCSE Chapter 4 - Networks and the effects of using them - Part 1 (360 X 640).mp4', duration: 720 },
  'effects of using it': { title: 'ICT Ch5 - Effects of Using IT', path: '/assets/ICT IGCSE Chapter 5 - The effects of using IT (360 X 640).mp4', duration: 600 },
  'internet': { title: 'ICT Networks', path: '/assets/Networks___iGCSE_ICT_#12.MP4', duration: 600 },
  'databases': { title: 'ICT Database Concepts', path: '/assets/subject/school/ict/videoplayback.mp4', duration: 600 },
  'programming': { title: 'ICT Programming Concepts', path: '/assets/subject/school/ict/videoplayback (1).mp4', duration: 600 },
  'web design': { title: 'ICT Web Design', path: '/assets/subject/school/ict/videoplayback (2).mp4', duration: 600 },
  'email': { title: 'ICT Email and Communication', path: '/assets/subject/school/ict/videoplayback (3).mp4', duration: 600 },
  'spreadsheets': { title: 'ICT Spreadsheets', path: '/assets/subject/school/ict/videoplayback (4).mp4', duration: 600 },

  // ── ACCOUNTING ──
  'accounting principles': { title: 'Accounting Principles', path: '/assets/Accounting_Principles_IGCSE_Accounting(0).mp4', duration: 600 },
  'purpose of accounting': { title: 'Purpose of Accounting', path: '/assets/IGCSE_ACCOUNTING__PURPOSE_OF_ACCOUNTING(0).mp4', duration: 600 },
  'bank reconciliation': { title: 'Bank Reconciliation System', path: '/assets/Bank_Reconciliation_System_IGCSE_Accounting(0).mp4', duration: 600 },
  'control accounts': { title: 'Control Accounts Part 1', path: '/assets/IGCSE_ACCOUNTING__CONTROL_ACCOUNTS__PART_1(0).mp4', duration: 600 },
  'control accounts 2': { title: 'Control Accounts Part 2', path: '/assets/IGCSE_ACCOUNTING__CONTROL_ACCOUNTS_PART_2(0).mp4', duration: 600 },
  'manufacturing accounts': { title: 'Manufacturing Accounts Part 1', path: '/assets/IGCSE_ACCOUNTING__MANUFACTURING_ACCOUNTS__PART_1(0).mp4', duration: 600 },
  'manufacturing accounts 2': { title: 'Manufacturing Accounts Part 2', path: '/assets/IGCSE_ACCOUNTING__MANUFACTURING_ACCOUNTS__Pt_2(0).mp4', duration: 600 },
  'partnership accounts': { title: 'Partnership Accounts Part 1 Theory', path: '/assets/IGCSE_ACCOUNTING__PARTNERSHIP_ACCOUNTS__PART_1__THEORY(0).mp4', duration: 600 },
  'partnership accounts 2': { title: 'Partnership Accounts Part 2', path: '/assets/IGCSE_ACCOUNTING__PARTNERSHIP_ACCOUNTS__PART_2(0).mp4', duration: 600 },
  'bad debts': { title: 'Bad Debts Complete Lesson', path: '/assets/IGCSE_Accounting_-_Bad_debts_Complete_lesson(0).mp4', duration: 600 },
  'manufacturing accounts trading': { title: 'Manufacturing Account Trading Section', path: '/assets/IGCSE_Accounts_0452_-Manufacturing_account_-_trading_section(0).mp4', duration: 600 },
  'clubs and societies': { title: 'Clubs and Societies Part 1', path: '/assets/Clubs_and_Societies__Part_1_Igcse_Accounting(0).mp4', duration: 600 },
  'limited companies': { title: 'Limited Companies Part 1', path: '/assets/Limited_companies_Part_1_Igcse_Accounting(0).mp4', duration: 600 },
  'subscriptions account': { title: 'Subscriptions Account Solved', path: '/assets/CAMBRIDGE_IGCSE_ACCOUNTS_0452_-_Subscriptions_account___solved_past_papers(0.mp4', duration: 600 },

  // ── BUSINESS STUDIES ──
  'business activity': { title: 'Business Studies 1.1 Business Activity', path: '/assets/IGCSE_Business_Studies__Chapter_1.1_Business_Activity(0).mp4', duration: 600 },
  'classification of businesses': { title: 'Business Studies 1.2 Classification', path: '/assets/IGCSE_Business_Studies__Chapter_1.2_Classification_of_Businesses(0).mp4', duration: 600 },
  'enterprise growth size': { title: 'Business Studies 1.3 Enterprise Growth', path: '/assets/IGCSE_Business_Studies__Chapter_1.3_Enterprise,_Growth_and_Size(0).mp4', duration: 600 },
  'business organisations': { title: 'Business Studies 1.4 Business Organisations', path: '/assets/IGCSE_Business_Studies__Chapter_1.4_Types_of_Business_Organisations(0).mp4', duration: 600 },
  'business objectives': { title: 'Business Studies 1.5 Objectives & Stakeholders', path: '/assets/IGCSE_Business_Studies__Chapter_1.5_Business_Objectives_and_Stakeholder_Obje.mp4', duration: 600 },
  'motivating employees': { title: 'Business Studies 2.1 Motivating Employees', path: '/assets/IGCSE_Business_studies__Chapter_2.1_Motivating_employees(0).mp4', duration: 600 },
  'organisation and management': { title: 'Business Studies 2.2 Organisation & Management', path: '/assets/IGCSE_Business_Studies__Chapter_2.2_Organisation_and_management(0).mp4', duration: 600 },
  'communication': { title: 'Business Studies 2.4 Communication', path: '/assets/IGCSE_Business_Studies__Chapter_2.4_Internal_and_external_communication(0).mp4', duration: 600 },
  'marketing competition': { title: 'Business Studies 3.1 Marketing & Competition', path: '/assets/IGCSE_Business_Studies__Chapter_3.1_Marketing,_competition_and_the_customer(.mp4', duration: 600 },
  'market research': { title: 'Business Studies 3.2 Market Research', path: '/assets/IGCSE_Business_Studies__Chapter_3.2_Market_Research(0).mp4', duration: 600 },
  'marketing mix place': { title: 'Business Studies 3.3.3 Marketing Mix - Place', path: '/assets/IGCSE_Business_Studies__Chapter_3.3.3_Marketing_mix_-_Place(0).mp4', duration: 600 },
  'marketing mix promotion': { title: 'Business Studies 3.3.4 Marketing Mix - Promotion', path: '/assets/IGCSE_Business_Studies__Chapter_3.3.4_Marketing_mix_-_Promotion(0).mp4', duration: 600 },
  'marketing strategy': { title: 'Business Studies 3.4 Marketing Strategy', path: '/assets/IGCSE_Business_Studies__Chapter_3.4_Marketing_strategy(0).mp4', duration: 600 },
  'production': { title: 'Business Studies 4.1 Production of Goods', path: '/assets/IGCSE_Business_Studies__Chapter_4.1__Production_of_goods_and_services(0).mp4', duration: 600 },
  'costs break even': { title: 'Business Studies 4.2 Costs & Break-even', path: '/assets/IGCSE_Business_Studies__Chapter_4.2__Costs,_scale_of_production_and_break-ev.mp4', duration: 600 },
  'quality production': { title: 'Business Studies 4.3 Quality Production', path: '/assets/IGCSE_Business_Studies__Chapter_4.3__Achieving_quality_production(0).mp4', duration: 600 },
  'location decisions': { title: 'Business Studies 4.4 Location', path: '/assets/IGCSE_Business_Studies__Chapter_4.4__Location_decisions(0).mp4', duration: 600 },
  'business finance': { title: 'Business Studies 5.1 Business Finance', path: '/assets/IGCSE_Business_Studies__Chapter_5.1_Business_Finance__Needs_and_Sources(0).mp4', duration: 600 },
  'cash flow': { title: 'Business Studies 5.2 Cash-flow', path: '/assets/IGCSE_Business_Studies__Chapter_5.2_Cash-flow_forecasting_and_working_capita.mp4', duration: 600 },
  'income statements': { title: 'Business Studies 5.3 Income Statements', path: '/assets/IGCSE_Business_Studies__Chapter_5.3_Income_Statements(0).mp4', duration: 600 },
  'statement of financial position': { title: 'Business Studies 5.4 Balance Sheet', path: '/assets/IGCSE_Business_Studies__Chapter_5.4_Statement_of_Financial_Position(0).mp4', duration: 600 },
  'analysis of accounts': { title: 'Business Studies 5.5 Analysis of Accounts', path: '/assets/IGCSE_Business_Studies__Chapter_5.5_Analysis_of_accounts(0).mp4', duration: 600 },
  'economic issues': { title: 'Business Studies 6.1 Economic Issues', path: '/assets/IGCSE_Business_Studies__Chapter_6.1_Economic_Issues(0).mp4', duration: 600 },
  'environmental ethics': { title: 'Business Studies 6.2 Environmental Issues', path: '/assets/IGCSE_Business_Studies_Chapter_6.2__Environmental_and_ethical_issues(0).mp4', duration: 600 },
  'international economy': { title: 'Business Studies 6.3 International Economy', path: '/assets/IGCSE_Business_Studies__Chapter_6.3__Business_and_the_international_economy(.mp4', duration: 600 },
  'business calculation trick': { title: 'Business Studies Calculation Trick!', path: '/assets/IGCSE_Business_studies__Calculation_trick!(0).mp4', duration: 300 },

  // ── ECONOMICS ──
  'basic economic problem': { title: 'Economics 1 - Basic Economic Problem', path: '/assets/IGCSE_Economics_Chapter_1_The_Basic_Economic_Problem__Updated_for_2027_speci.mp4', duration: 600 },
  'role of markets': { title: 'Economics 2.1 - Role of Markets', path: '/assets/IGCSE_Economics_Chapter_2.1_The_role_of_markets_in_allocating_resources__Upd.mp4', duration: 600 },
  'demand': { title: 'Economics 2.2 - Demand', path: '/assets/IGCSE_Economics__Chapter_2.2_Demand__Updated_for_2027_syllabus_(0).mp4', duration: 600 },
  'supply': { title: 'Economics 2.3 - Supply', path: '/assets/IGCSE_Economics__Chapter_2.3_Supply__Updated_for_2027_syllabus_(0).mp4', duration: 600 },
  'price determination': { title: 'Economics 2.4 - Price Determination', path: '/assets/IGCSE_Economics__Chapter_2.4_Price_determination__Updated_for_2027_syllabus_.mp4', duration: 600 },
  'price changes': { title: 'Economics 2.5 - Price Changes', path: '/assets/IGCSE_Economics__Chapter_2.5_Price_changes__Updated_for_2027_syllabus_(0).mp4', duration: 600 },
  'price elasticity of demand': { title: 'Economics 2.6 - PED', path: '/assets/IGCSE_Economics__Chapter_2.6_Price_elasticity_of_demand__Updated_for_2027_sy.mp4', duration: 600 },
  'price elasticity of supply': { title: 'Economics 2.7 - PES', path: '/assets/IGCSE_Economics__Chapter_2.7_Price_elasticity_of_supply__Updated_for_2027_sy.mp4', duration: 600 },
  'market failure': { title: 'Economics 2.8-9 - Market Economy & Failure', path: '/assets/IGCSE_Economics_Chapter_2.8-9_Market_economic_system_and_market_failure__Upd.mp4', duration: 600 },
  'money and banking': { title: 'Economics 3.1 - Money & Banking', path: '/assets/IGCSE_Economics__Chapter_3.1_Money_and_banking__Updated_for_2027_syllabus_(0.mp4', duration: 600 },
  'households': { title: 'Economics 3.2 - Households', path: '/assets/IGCSE_Economics__Chapter_3.2_Households__Updated_for_2027_syllabus_(0).mp4', duration: 600 },
  'workers': { title: 'Economics 3.3 - Workers', path: '/assets/IGCSE_Economics__Chapter_3.3_Workers__Updated_for_2027_syllabus_(0).mp4', duration: 600 },
  'firms': { title: 'Economics 3.4 - Firms', path: '/assets/IGCSE_Economics__Chapter_3.4_Firms__Updated_for_2027_syllabus_(0).mp4', duration: 600 },
  'production economics': { title: 'Economics 3.5 - Firms & Production', path: '/assets/IGCSE_Economics__Chapter_3.5_Firms_and_production__Updated_for_2027_syllabus.mp4', duration: 600 },
  'firm revenue': { title: 'Economics 3.6 - Revenue & Objective', path: '/assets/IGCSE_Economics__Chapter_3.6_Firms_revenue_and_objective__Updated_for_2027_s.mp4', duration: 600 },
  'types of markets': { title: 'Economics 3.7 - Types of Markets', path: '/assets/IGCSE_Economics__Chapter_3.7_Types_of_markets__Updated_for_2027_syllabus_(0).mp4', duration: 600 },
  'government intervention': { title: 'Economics 4.1 - Government Intervention', path: '/assets/IGCSE_Economics_Chapter_4.1_Government_Macroeconomic_intervention__Updated_f.mp4', duration: 600 },
  'fiscal policy': { title: 'Economics 4.2 - Fiscal Policy', path: '/assets/IGCSE_Economics_Chapter_4.2_Fiscal_policy__Updated_for_the_2027_syllabus_(0).mp4', duration: 600 },
  'monetary policy': { title: 'Economics 4.3 - Monetary Policy', path: '/assets/IGCSE_Economics_Chapter_4.3_Monetary_policy__Updated_for_the_2027_syllabus_(.mp4', duration: 600 },
  'supply side policy': { title: 'Economics 4.4 - Supply Side Policy', path: '/assets/IGCSE_Economics_Chapter_4.4_Supply_Side_Policy__Updated_for_2027_syllabus_(0.mp4', duration: 600 },
  'economic growth': { title: 'Economics 4.5 - Economic Growth', path: '/assets/IGCSE_Economics_Chapter_4.5_Economic_Growth__Updated_for_2027_syllabus_(0).mp4', duration: 600 },
  'unemployment': { title: 'Economics 4.6 - Employment & Unemployment', path: '/assets/IGCSE_Economics_Chapter_4.6_Employment_and_unemployment__Updated_for_the_202.mp4', duration: 600 },
  'inflation': { title: 'Economics 4.7 - Inflation', path: '/assets/IGCSE_Economics_Chapter_4.7_Inflation__Updated_for_the_2027_syllabus_(0).mp4', duration: 600 },
  'economic development': { title: 'Economics 5.1 - Economic Development', path: '/assets/IGCSE_Economics_Chapter_5.1_Economic_development__Updated_for_the_2027_sylla.mp4', duration: 600 },
  'poverty': { title: 'Economics 5.2 - Poverty', path: '/assets/IGCSE_Economics_Chapter_5.2_Poverty__Updated_for_2027_syllabus_(0).mp4', duration: 600 },
  'population': { title: 'Economics 5.3 - Population', path: '/assets/IGCSE_Economics_Chapter_5.3_Population__Updated_for_the_2027_syllabus_(0).mp4', duration: 600 },
  'differences in development': { title: 'Economics 5.4 - Differences in Development', path: '/assets/IGCSE_Economics_Chapter_5.4_Differences_in_economic_development__Updated_for.mp4', duration: 600 },
  'specialisation and trade': { title: 'Economics 6.1 - Specialisation & Trade', path: '/assets/IGCSE_Economics_Chapter_6.1_Specialisation_and_free_trade__updated_for_the_2.mp4', duration: 600 },
  'globalisation': { title: 'Economics 6.2 - Globalisation & Trade Restrictions', path: '/assets/IGCSE_Economics_Chapter_6.2_Globalisation_and_trade_restrictions__Updated_fo.mp4', duration: 600 },
  'foreign exchange rates': { title: 'Economics 6.3 - Foreign Exchange Rates', path: '/assets/IGCSE_Economics_Chapter_6.3_Foreign_exchange_rates__Updated_for_the_2027_syl.mp4', duration: 600 },
  'current account': { title: 'Economics 6.4 - Current Account', path: '/assets/IGCSE_Economics_Chapter_6.4_Current_account__Updated_for_the_2027_syllabus_(.mp4', duration: 600 },

  // ── GEOGRAPHY ──
  'migration': { title: 'Geography 1.2 Migration', path: '/assets/IGCSE_Geography__1.2_Migration(0).mp4', duration: 600 },
  'urban settlements': { title: 'Geography 1.6 Urban Settlements', path: '/assets/IGCSE_Geography__1.6_Urban_Settlements(0).mp4', duration: 600 },
  'urbanisation': { title: 'Geography 1.7 Urbanisation', path: '/assets/IGCSE_Geography__1.7_Urbanisation(0).mp4', duration: 600 },
  'earthquakes and volcanoes': { title: 'Geography 2.1 Earthquakes & Volcanoes', path: '/assets/IGCSE_Geography__2.1_Earthquakes_and_Volcanoes(0).mp4', duration: 600 },
  'rivers': { title: 'Geography 2.2 Rivers', path: '/assets/IGCSE_Geography__2.2_Rivers(0).mp4', duration: 600 },
  'coasts': { title: 'Geography 2.3 Coasts', path: '/assets/IGCSE_Geography__2.3_Coasts(0).mp4', duration: 600 },
  'weather': { title: 'Geography 2.4 Weather', path: '/assets/IGCSE_Geography__2.4_Weather(0).mp4', duration: 600 },
  'development': { title: 'Geography 3.1 Development', path: '/assets/IGCSE_Geography__3.1_Development(0).mp4', duration: 600 },
  'tourism': { title: 'Geography 3.4 Tourism', path: '/assets/IGCSE_Geography__3.4_Tourism(0).mp4', duration: 600 },
  'energy resources': { title: 'Geography 3.5 Energy', path: '/assets/IGCSE_Geography__3.5_Energy(0).mp4', duration: 600 },
  'water resources': { title: 'Geography 3.6 Water', path: '/assets/IGCSE_Geography__3.6_Water(0).mp4', duration: 600 },
  'environmental risks': { title: 'Geography 3.7 Environmental Risk', path: '/assets/IGCSE_Geography__3.7_Environmental_Risk_of_Economic_Development(0).mp4', duration: 600 },
  'geography introduction': { title: 'Geography Introduction', path: '/assets/IGCSE_Geography__Introduction(0).mp4', duration: 600 },
  'geography paper 1 narrated': { title: 'IGCSE Paper 1 Narrated', path: '/assets/IGCSE_Paper_1_Narrated(0).mp4', duration: 1200 },

  // ── HISTORY ──
  'cold war': { title: 'History Cold War Notes Part 1 - Reasons for Cold War', path: '/assets/History_Edexcel_IGCSE_Cold_War_notes___Part_1_5__Reasons_for_the_Cold_War___.mp4', duration: 600 },
  'cold war 1945 1949': { title: 'History Cold War Notes Part 2 - Cold War 1945-49', path: '/assets/History_Edexcel_IGCSE_Cold_War_notes___Part_2_5__Cold_War,_1945-49___2_effec.mp4', duration: 600 },
  'cold war 1950s': { title: 'History Cold War Notes Part 3 - Cold War in the 1950s', path: '/assets/History_Edexcel_IGCSE_Cold_War_notes___Part_3_5__The_Cold_War_in_the_1950s__.mp4', duration: 600 },
  'roaring twenties': { title: 'History USA Notes Part 1 - The Roaring Twenties', path: '/assets/History_Edexcel_IGCSE_USA_notes___Part_1_5__The_Roaring_Twenties___2_key_fea.mp4', duration: 600 },

  // ── DESIGN & TECHNOLOGY ──
  'manufactured boards': { title: 'D&T - Manufactured Boards', path: '/assets/GCSE_Design_Technology__9-1___Manufactured_Boards(0).mp4', duration: 600 },
  'metals and alloys': { title: 'D&T - Metals and Alloys', path: '/assets/GCSE_Design_Technology__9-1___Metals_and_alloys(0).mp4', duration: 600 },
  'composites smart materials': { title: 'D&T - Composites and Smart Materials', path: '/assets/Mr_Ridley_s_RMT_011_Composites_and_Smart_Materials(0).mp4', duration: 600 },
  'joining metal': { title: 'D&T - Joining Metal', path: '/assets/Mr_Ridley_s_RMT_Revision_003_Joining_Metal(0).mp4', duration: 600 },
  'wood joints': { title: 'D&T - Wood Joints', path: '/assets/Mr_Ridley_s_RMT_Revision_004_Wood_Joints(0).mp4', duration: 600 },
  'sustainability': { title: 'D&T - Sustainability', path: '/assets/MR_Ridley_s_RMT_Revision_006_Sustainability(0).mp4', duration: 600 },
  'hand tools': { title: 'D&T - Hand Tools', path: '/assets/Mr_Ridleys_RMT_Revison_007_Hand_Tools(0).mp4', duration: 600 },
  'health and safety dnt': { title: 'D&T - Health and Safety', path: '/assets/Mr_Ridleys_RMT_Revision_008_Health_and_Safety(0).mp4', duration: 600 },
  'types of plastics': { title: 'D&T - Types of Plastics', path: '/assets/Mr_Ridleys_RMT_009_Types_of_Plastics(0).mp4', duration: 600 },
  'plastic shaping': { title: 'D&T - Plastic Shaping Processes', path: '/assets/MR_Ridley_s_RMT_Revision_10_Plastic_Shaping_Processes(0).mp4', duration: 600 },
  'injection moulding': { title: 'D&T - Injection Moulding', path: '/assets/Injection_Moulding(0).mp4', duration: 600 },
  'plastic injection molding': { title: 'D&T - Plastic Injection Molding', path: '/assets/Plastic_Injection_Molding(0).mp4', duration: 600 },
  'types of metal': { title: 'D&T - Types of Metals', path: '/assets/Types_of_Metals_002(0).mp4', duration: 600 },
  'types of wood': { title: 'D&T - Types of Wood', path: '/assets/Types_of_wood_and_Manufactured_Boards_001(0).mp4', duration: 600 },
  'polymers': { title: 'Polymers - Crash Course Chemistry', path: '/assets/Polymers__Crash_Course_Chemistry__45(0).mp4', duration: 600 },
  'uses of polymers': { title: 'Uses of Polymers', path: '/assets/Uses_Of_Polymers___Organic_Chemistry___Chemistry___FuseSchool(0).mp4', duration: 600 },
  'vacuum forming': { title: 'Vacuum Forming Walkthrough', path: '/assets/Vacuum_Forming_Walkthrough(0).mp4', duration: 600 },
  'dnt revision hour': { title: 'One Hour Revision for GCSE D&T', path: '/assets/One_hour_of_revision_for_GCSE_Design_and_Technology_!(0).mp4', duration: 3600 },
  'thermochromic': { title: 'Thermochromic Pigment', path: '/assets/Thermochromic_pigment___Thermopaint_-_mindsetsonline.co.uk(0).mp4', duration: 300 },

  // ── FOOD & NUTRITION ──
  'food nutrition': { title: 'Food Brainwash - Food & Nutrition Overview', path: '/assets/Food_Brainwash__0648_PAPER_1_OCT_NOV_2020_FOOD_AND_NUTRITION(0).mp4', duration: 600 },
  'pregnancy menu': { title: 'Food Brainwash - Pregnancy Menu Planning', path: '/assets/Food_Brainwash__Episode_1-Pregnancy_menu_planning_advice_for_0648_Practical_.mp4', duration: 600 },
  'herbs and spices': { title: 'Food Brainwash - Herbs and Spices', path: '/assets/Food_Brainwash__Herbs_and_Spices_knowledge_video(0).mp4', duration: 600 },
  'minerals': { title: 'Food Brainwash - The Mineral Gang', path: '/assets/Food_Brainwash__The_Mineral_gang(0).mp4', duration: 600 },

  // ── STUDY TIPS ──
  'study tips': { title: 'How to Study Effectively Without Distraction', path: '/assets/How_to_study_EFFECTIVELY_without_distraction__for_long_time_(360p).mp4', duration: 600 },
  'study motivation': { title: 'Getting ADDICTED to STUDYING is Easy', path: '/assets/Getting_ADDICTED_to_STUDYING_is_Easy,_Actually(360p).mp4', duration: 600 },
  'study skills': { title: 'The ASIAN SECRET to STUDYING EFFECTIVELY', path: '/assets/the_ASIAN_SECRET_to_STUDYING_EFFECTIVELY(360p).mp4', duration: 600 },
  'efficient studying': { title: 'How to ACE Everything in a Fraction of the Time', path: '/assets/EFFICIENT_studying__How_to_ACE_everything_in_a_FRACTION_of_the_time(360p).mp4', duration: 600 },
  'grades improvement': { title: 'Study Tips - How to Improve Your Grades', path: '/assets/10_Study_Tips_II_How_to_improve_your_grades.(360p).mp4', duration: 600 },
  'lazy student': { title: "If You're a Lazy But Ambitious Student", path: '/assets/If_you_re_a_lazy_but_ambitious_student,_please_watch_this_video.(360p).mp4', duration: 600 },
};

// Fallback study tips videos for any unmapped topic
const STUDY_TIPS_VIDEOS = [
  '/assets/the_ASIAN_SECRET_to_STUDYING_EFFECTIVELY(360p).mp4',
  '/assets/EFFICIENT_studying__How_to_ACE_everything_in_a_FRACTION_of_the_time(360p).mp4',
  '/assets/Getting_ADDICTED_to_STUDYING_is_Easy,_Actually(360p).mp4',
  '/assets/10_Study_Tips_II_How_to_improve_your_grades.(360p).mp4',
  '/assets/If_you_re_a_lazy_but_ambitious_student,_please_watch_this_video.(360p).mp4'
];

// ── PDF Resource Map (for notes/exercises/past papers) ──
const PDF_MAP = {
  // Mathematics
  'math syllabus 2024': '/assets/subject/Mathematics/EGCSE Mathematics 2024-2026 Syllabus.pdf',
  'math past paper 1 2020': '/assets/exercises/EGCSE Mathematics 2020 Question Paper 1 (1).pdf',
  'math past paper 1 2021': '/assets/exercises/EGCSE Mathematics 2021 Question Paper 1-1662016885.pdf',
  'math past paper 2 2021': '/assets/exercises/EGCSE Mathematics 2021 Question Paper 2-1662016949.pdf',
  'math past paper 1 2022': '/assets/exercises/EGCSE Mathematics 2022 Question Paper 1.pdf',
  'math past paper 2 2022': '/assets/exercises/EGCSE Mathematics 2022 Question Paper 2 (1).pdf',
  'math past paper 1 2023': '/assets/exercises/EGCSE Mathematics 2023 Question Paper 1.pdf',
  'math past paper 2 2023': '/assets/exercises/EGCSE Mathematics 2023 Question Paper 2.pdf',
  'algebraic roots and indices': '/assets/exercises/algebraic-roots-and-indices-f2P7TGWKj4b6YFKx.pdf',
  'circle theorems pdf': '/assets/exercises/circle-theorems-dmpYbRrGBt7m57Rf.pdf',
  'congruence and similarity': '/assets/exercises/congruence-and-similarity-pjQqcpXHGh4H2mqT.pdf',
  'coordinates straight lines': '/assets/exercises/coordinates-and-straight-line-graphs-wRxTXjQ6MpDQnbY3.pdf',
  'linear equations pdf': '/assets/exercises/linear-equations-dKtqm6ccfFZY3jpC.pdf',
  'proportion pdf': '/assets/exercises/proportion-7jwVcpq9gF785b3D.pdf',
  'quadratic equations pdf': '/assets/exercises/quadratic-equations-tCzTSFpwJVBW99VB.pdf',
  'rearranging formulas': '/assets/exercises/rearranging-formulas-N5MTxw2Z9S5qCpsT.pdf',
  'scatter graphs': '/assets/exercises/scatter-graphs-and-correlation-SKZBXmJgrTqMpybQ.pdf',
  'simplifying fractions': '/assets/exercises/simplifying-algebraic-fractions-tyKBMhnd9X3jZcfv.pdf',
  'sine cosine rule': '/assets/exercises/sine-cosine-rule-and-area-of-triangles-SPKPkCzXQ8hK6DWs.pdf',
  'statistical diagrams': '/assets/exercises/statistical-diagrams-JC8crBgCnBXSjK4g.pdf',
  'tree diagrams': '/assets/exercises/tree-diagrams-and-multiple-events-H5DXm7V4qQdNGqTV.pdf',
  'trigonometric graphs': '/assets/exercises/trigonometric-graphs-and-equations-PRZKfx3xyZpGp3dh.pdf',
  'trigonometry pdf': '/assets/exercises/trigonometry-mRCnxs22Q6fQwvp9.pdf',

  // Biology
  'bio syllabus 2024': '/assets/subject/Biology/EGCSE Biology 2024-2026 Syllabus.pdf',
  'bio past paper 2 2020': '/assets/subject/Biology/EGCSE Biology 2020 Question Paper 2.pdf',
  'bio past paper 2 2022': '/assets/subject/Biology/EGCSE Biology 2022 Question Paper 2.pdf',
  'bio past paper 2 2023': '/assets/subject/Biology/EGCSE Biology 2023 Question Paper 2.pdf',
  'bio past paper 2 2024': '/assets/subject/Biology/EGCSE Biology 2024 Question Paper 2.pdf',

  // Chemistry
  'chemistry past papers': '/assets/subject/Chemistry/0620_s05_qp_1.pdf',

  // Physics / Physical Science
  'physics past papers': '/assets/subject/Physics/0625_m17_qp_32.pdf',
  'physical science syllabus': '/assets/subject/Physical_Science/EGCSE Physical Science 2024-2026 Syllabus.pdf',
  'physical science past paper 2 2020': '/assets/subject/Physical_Science/EGCSE Physical Science 2020 Question Paper 2.pdf',
  'physical science past paper 2 2022': '/assets/subject/Physical_Science/EGCSE Physical Science 2022 Question Paper 2.pdf',
  'physical science past paper 2 2024': '/assets/subject/Physical_Science/EGCSE Physical Science 2024 Question Paper 2.pdf',

  // English
  'english syllabus': '/assets/subject/English/EGCSE English language 2024-2026 Syllabus.pdf',

  // ICT
  'ict syllabus': '/assets/EPCSE Information and Communication Technology 2025-2026 Syllabus.pdf',
  'ict communication': '/assets/subject/ICT/2023-Communication-IGCSE-ICT-0417.pdf',

  // Design & Technology
  'dnt plastics': '/assets/subject/Design_and_Technology/EGCSE_RM_Plastics_Notes.pdf',
  'dnt wood metals': '/assets/subject/Design_and_Technology/EGCSE_RM_Wood_Metals_Notes.pdf',

  // SiSwati
  'siswati syllabus': '/assets/subject/SiSwati/EGCSE First Language SiSwati 2024-2026 Syllabus.pdf',

  // Religious Education
  're syllabus': '/assets/subject/Religious_Education/EGCSE Religious Education 2024-2026 Syllabus.pdf',
  're luke notes': '/assets/notes/re/Notes-on-Luke-P1-5.pdf',
  're acts notes': '/assets/notes/re/The-Acts-of-the-Apostles-Latest.pdf',

  // Study Guides
  'study guide': '/assets/subject/Study_Guides/effective_study_guide.pdf',
  'psychology guide': '/assets/subject/Study_Guides/aura_and_psychology_guide.pdf',
};

function findVideoForTopic(topicName) {
  if (!topicName) return null;
  const key = topicName.toLowerCase().trim();

  // Exact match
  if (VIDEO_MAP[key]) return VIDEO_MAP[key];

  // Fuzzy match — check if the topic name contains any key, or key contains topic
  for (const [k, v] of Object.entries(VIDEO_MAP)) {
    if (key.includes(k) || k.includes(key)) return v;
  }

  // Word-by-word matching (e.g. "Linear Equations in Algebra" → "linear equations")
  const words = key.split(/\s+/);
  for (const [k, v] of Object.entries(VIDEO_MAP)) {
    const keyWords = k.split(/\s+/);
    const matchCount = keyWords.filter(w => words.includes(w)).length;
    if (matchCount >= Math.min(2, keyWords.length) && matchCount / keyWords.length >= 0.5) {
      return v;
    }
  }

  // Fallback: return a random study tip video
  const randomTip = STUDY_TIPS_VIDEOS[Math.floor(Math.random() * STUDY_TIPS_VIDEOS.length)];
  return { title: `Study Tips: ${topicName}`, path: randomTip, duration: 600 };
}

function findPdfForTopic(topicName) {
  if (!topicName) return null;
  const key = topicName.toLowerCase().trim();
  if (PDF_MAP[key]) return PDF_MAP[key];
  // Fuzzy match
  for (const [k, v] of Object.entries(PDF_MAP)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return null;
}

function getAllVideoMappings() {
  return VIDEO_MAP;
}

function getAllPdfMappings() {
  return PDF_MAP;
}

module.exports = { findVideoForTopic, findPdfForTopic, getAllVideoMappings, getAllPdfMappings };
