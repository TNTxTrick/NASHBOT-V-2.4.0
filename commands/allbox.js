
module.exports = {
  name: 'allbox',
  description: 'List group information',
  usage: '[nashPrefix]allbox',
  nashPrefix: false,
  execute: async (api, event, args, prefix) => {
    try {
      // Lấy danh sách các threads
      const threadList = await api.getThreadList(100, null, ["INBOX"]);

      // Tạo thông điệp hiển thị thông tin
      let message = 'Group Information:\n\n';
      
      // Duyệt qua từng thread trong danh sách
      for (let thread of threadList) {
        // Kiểm tra nếu đó là group (threadType === 2 là nhóm)
        if (thread.threadType === 2) {
          message += `Group Name: ${thread.name || 'No name'}\n`;
          message += `Thread ID: ${thread.threadID}\n`;
          message += `Participants: ${thread.participants.length}\n`;
          message += `Unread Count: ${thread.unreadCount}\n`;
          message += `Last Message: ${thread.snippet || 'No messages yet'}\n\n`;
        }
      }

      // Gửi tin nhắn kết quả
      api.sendMessage(message, event.threadID);

    } catch (error) {
      // In lỗi ra console và thông báo cho người dùng
      console.error('Error fetching group information:', error);
      api.sendMessage('An error occurred while fetching the group information.', event.threadID);
    }
  }
};
