// Khởi tạo đối tượng để lưu trữ số lượng tin nhắn của từng người dùng
const messageCounts = {};

module.exports = {
  name: 'checktt',
  description: 'Kiểm tra số lượng tin nhắn của user trong nhóm',
  usage: '[nashPrefix]checktt',
  nashPrefix: false,
  execute: async (api, event, args, prefix) => {
    try {
      const userID = event.senderID;

      // Lấy thông tin nhóm
      const threadInfo = await api.getThreadInfo(event.threadID);

      // Nếu không phải nhóm (isGroup = false)
      if (!threadInfo.isGroup) {
        await api.sendMessage('Lệnh này chỉ dùng cho nhóm.', event.threadID, event.messageID);
        return;
      }

      // Lấy số lượng tin nhắn của người gửi lệnh
      const userMessagesCount = messageCounts[userID] || 0;

      // Tạo tin nhắn phản hồi
      const msg = `Số lượng tin nhắn của bạn trong nhóm: ${userMessagesCount}`;

      // Gửi tin nhắn phản hồi
      await api.sendMessage(msg, event.threadID, event.messageID);
    } catch (error) {
      console.error('Error in checktt command:', error);
      await api.sendMessage('Có lỗi xảy ra khi xử lý lệnh.', event.threadID);
    }
  }
};

// Hàm xử lý tin nhắn mới
module.exports.handleMessage = (api, event) => {
  const userID = event.senderID;

  // Tăng số lượng tin nhắn của người gửi
  if (!messageCounts[userID]) {
    messageCounts[userID] = 0;
  }
  messageCounts[userID]++;
};
