const UserProgress = require("../models/UserProgress");
const Topic = require("../models/Topic");
const User = require("../models/User");

async function getOverallStats(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const progressList = await UserProgress.find({ userId });

    const totalTopics = progressList.length;
    const averageMastery =
      totalTopics > 0
        ? Math.round(
            progressList.reduce((acc, curr) => acc + curr.masteryLevel, 0) /
              totalTopics,
          )
        : 0;

    const totalQuizzes = progressList.reduce(
      (acc, curr) => acc + curr.totalAttempts,
      0,
    );

    res.json({
      points: user.points,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      averageMastery,
      totalTopics,
      totalQuizzes,
      totalXp: user.totalXp || 0,
      gamificationLevel: user.gamificationLevel || 1,
      aiCredits: user.aiCredits || 0,
    });
  } catch (error) {
    console.error("getOverallStats Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getTopicProgress(req, res) {
  try {
    const userId = req.user.id;
    const progressList = await UserProgress.find({ userId }).populate(
      "topicId",
    );

    res.json(progressList);
  } catch (error) {
    console.error("getTopicProgress Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getSubjectProgress(req, res) {
  try {
    const userId = req.user.id;
    const topics = await Topic.find();
    const progressList = await UserProgress.find({ userId });

    const progressByTopic = {};
    progressList.forEach((p) => {
      progressByTopic[p.topicId.toString()] = p;
    });

    const subjects = {};
    topics.forEach((topic) => {
      if (!subjects[topic.subject]) {
        subjects[topic.subject] = {
          subject: topic.subject,
          totalTopics: 0,
          completedTopics: 0,
          masterySum: 0,
          topics: [],
        };
      }
      const prog = progressByTopic[topic._id.toString()];
      const isCompleted = prog && prog.masteryLevel >= 80;

      subjects[topic.subject].totalTopics++;
      if (isCompleted) subjects[topic.subject].completedTopics++;
      subjects[topic.subject].masterySum += prog ? prog.masteryLevel : 0;
      subjects[topic.subject].topics.push({
        _id: topic._id,
        name: topic.name,
        description: topic.description,
        level: topic.level,
        subTopics: topic.subTopics,
        mastery: prog ? prog.masteryLevel : 0,
        isCompleted,
        isStarted: !!prog,
        lastQuizScore:
          prog?.correctAttempts > 0
            ? Math.round(
                (prog.correctAttempts /
                  (prog.correctAttempts + prog.mistakes)) *
                  100,
              )
            : 0,
        totalAttempts: prog?.totalAttempts || 0,
      });
    });

    const result = Object.values(subjects).map((s) => ({
      ...s,
      averageMastery:
        s.totalTopics > 0 ? Math.round(s.masterySum / s.totalTopics) : 0,
      completionPercentage:
        s.totalTopics > 0
          ? Math.round((s.completedTopics / s.totalTopics) * 100)
          : 0,
      topics: s.topics.sort((a, b) => {
        if (a.isCompleted !== b.isCompleted) return a.isCompleted ? -1 : 1;
        return 0;
      }),
    }));

    res.json(result);
  } catch (error) {
    console.error("getSubjectProgress Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getGameStats(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalXp = user.totalXp || 0;
    const level = user.gamificationLevel || 1;

    // Calculate XP thresholds based on gamification engine formula
    // Level = floor(XP / 100) + 1
    const nextLevelXp = level * 100;
    const prevLevelXp = (level - 1) * 100;
    const currentLevelXp = totalXp - prevLevelXp;

    res.json({
      level,
      totalXp,
      aiCredits: user.aiCredits || 0,
      points: user.points || 0,
      nextLevelXp,
      currentLevelXp,
      xpProgress: Math.min(
        100,
        Math.round((currentLevelXp / (nextLevelXp - prevLevelXp)) * 100),
      ),
    });
  } catch (error) {
    console.error("getGameStats Error:", error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getOverallStats,
  getTopicProgress,
  getSubjectProgress,
  getGameStats,
};
