const Notification = require('../models/Notification');

const REMINDER_MESSAGES = {
  review_reminder: [
    { title: 'Time to Review!', message: 'Your spaced repetition schedule says it\'s time to review {topic}. A quick 5-minute session will lock it in.' },
    { title: 'Don\'t Forget!', message: '{topic} is due for review. Spaced repetition works best when you stick to the schedule.' },
    { title: 'Review Alert', message: 'It\'s review day for {topic}. Boost your mastery before it fades!' }
  ],
  streak: [
    { title: 'Streak Saver', message: 'Your {count}-day streak is on the line! One study session today keeps it alive.' },
    { title: 'Almost There!', message: 'You\'re {count} days into a streak. Don\'t break it now!' }
  ],
  achievement: [
    { title: 'Milestone Unlocked!', message: 'You\'ve completed {count} topics this week. Keep the momentum!' }
  ],
  tip: [
    { title: 'Study Tip', message: 'Active recall beats re-reading. Try closing your notes and explaining the concept out loud.' },
    { title: 'Pro Tip', message: 'Studying in 25-minute blocks with 5-minute breaks (Pomodoro) boosts retention.' },
    { title: 'Did You Know?', message: 'Teaching a concept to someone else is one of the fastest ways to master it.' }
  ]
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function createReviewReminder(userId, topicName, topicLink = '') {
  const template = pickRandom(REMINDER_MESSAGES.review_reminder);
  return Notification.create({
    userId,
    type: 'review_reminder',
    title: template.title,
    message: template.message.replace('{topic}', topicName),
    link: topicLink
  });
}

async function createStreakReminder(userId, count) {
  const template = pickRandom(REMINDER_MESSAGES.streak);
  return Notification.create({
    userId,
    type: 'streak',
    title: template.title,
    message: template.message.replace('{count}', count),
    link: '/study'
  });
}

async function createAchievementNotification(userId, title, message, link = '') {
  return Notification.create({ userId, type: 'achievement', title, message, link });
}

async function createSessionReminder(userId, topicName, topicLink = '') {
  return Notification.create({
    userId,
    type: 'session_reminder',
    title: 'Study Session Ready',
    message: `Your study session on ${topicName} is ready. Pick up where you left off.`,
    link: topicLink
  });
}

async function scheduleReviewReminders(userId, progressList) {
  const now = Date.now();
  const created = [];
  for (const progress of progressList) {
    if (progress.nextReviewDate && new Date(progress.nextReviewDate).getTime() <= now) {
      const topicName = progress.topicId?.name || 'a topic';
      const notif = await createReviewReminder(userId, topicName, `/study`);
      created.push(notif);
    }
  }
  return created;
}

module.exports = {
  createReviewReminder,
  createStreakReminder,
  createAchievementNotification,
  createSessionReminder,
  scheduleReviewReminders
};
