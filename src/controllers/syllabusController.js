const syllabusEngine = require('../services/syllabusEngine');

/**
 * GET /api/syllabus/subjects
 * Returns list of all available subjects in the syllabus.
 */
async function getSubjects(req, res) {
  try {
    const subjects = syllabusEngine.getAvailableSubjects();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * GET /api/syllabus/:subject
 * Returns the full syllabus breakdown for a subject.
 */
async function getSubjectBreakdown(req, res) {
  try {
    const { subject } = req.params;
    const syllabus = syllabusEngine.getSubjectSyllabus(subject);
    if (!syllabus) {
      return res.status(404).json({ message: `Syllabus not found for: ${subject}` });
    }
    res.json({
      subject,
      levels: syllabus.levels,
      topics: Object.entries(syllabus.topics).map(([name, data]) => ({
        name,
        description: data.description,
        weight: data.weight,
        subTopicCount: data.subTopics.length,
        subTopics: data.subTopics
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * GET /api/syllabus/:subject/:topic
 * Returns detailed breakdown for a specific topic.
 */
async function getTopicBreakdown(req, res) {
  try {
    const { subject, topic } = req.params;
    const breakdown = syllabusEngine.getTopicBreakdown(subject, topic);
    if (!breakdown) {
      return res.status(404).json({ message: `Topic '${topic}' not found in ${subject}` });
    }
    res.json(breakdown);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * GET /api/syllabus/search?q=query
 * Search across all subjects, topics, and sub-topics.
 */
async function searchSyllabus(req, res) {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.json([]);
    }
    const results = syllabusEngine.searchSyllabus(q);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * POST /api/syllabus/recommendations
 * Get study recommendations based on weak sub-topics.
 */
async function getRecommendations(req, res) {
  try {
    const { weakSubTopics } = req.body;
    if (!weakSubTopics || !Array.isArray(weakSubTopics) || weakSubTopics.length === 0) {
      return res.json([]);
    }
    const recommendations = syllabusEngine.getStudyRecommendations(weakSubTopics);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getSubjects,
  getSubjectBreakdown,
  getTopicBreakdown,
  searchSyllabus,
  getRecommendations
};
