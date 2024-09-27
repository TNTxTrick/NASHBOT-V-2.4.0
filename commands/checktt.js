module.exports = {
  name: 'checktt',
  description: 'Kiểm tra số lượng tin nhắn của user trong nhóm',
  usage: '[nashPrefix]checktt',
  nashPrefix: false,
  execute: async (api, event, args, prefix) => {
    try {
      // Lấy ID của người gửi lệnh
      const userID = event.senderID;

      // Lấy thông tin người dùng
      const userInfo = await api.getUserInfo(userID);
      
      // Lấy thông tin nhóm
      const threadInfo = await api.getThreadInfo(event.threadID);

      // Nếu không phải nhóm (isGroup = false)
      if (!threadInfo.isGroup) {
        await api.sendMessage('Lệnh này chỉ dùng cho nhóm.', event.threadID, event.messageID);
        return;
      }

      // Lấy danh sách người tham gia trong nhóm
      const participants = threadInfo.userInfo;

      // Kiểm tra số tin nhắn của người gửi lệnh
      const userMessagesCount = participants.find(user => user.userID === userID)?.messageCount || 0;

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
