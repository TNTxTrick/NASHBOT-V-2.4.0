module.exports = {
  name: 'allbox',
  description: 'List group information',
  usage: '[nashPrefix]allbox',
  nashPrefix: false,
  execute: async (api, event, args, prefix) => {
    try {
      const threadList = await api.getThreadList(100, null); // Fetch up to 100 threads
      let message = 'Group Information:\n\n';

      for (let thread of threadList) {
        const threadInfo = await api.getThreadInfo(thread.threadID);
        message += `Group Name: ${threadInfo.threadName || 'No name'}\n`;
        message += `Thread ID: ${thread.threadID}\n`;
        message += `Participants: ${threadInfo.participantIDs.length}\n\n`;
      }

      api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while fetching the group information.', event.threadID);
    }
  }
};
