
module.exports = {
  name: 'listbox',
  description: 'List group information and optionally remove a user from a group',
  usage: '[nashPrefix]listbox [remove [groupNumber] [userID]]',
  nashPrefix: false,
  execute: async (api, event, args, prefix) => {
    try {
      // Lấy danh sách thread trong inbox, lọc ra nhóm
      const inbox = await api.getThreadList(100, null, ['INBOX']);
      const list = inbox.filter(group => group.isSubscribed && group.isGroup);

      // Duyệt qua các nhóm và lấy thông tin chi tiết của mỗi nhóm
      const listthread = [];
      for (const groupInfo of list) {
        const data = await api.getThreadInfo(groupInfo.threadID);
        listthread.push({
          id: groupInfo.threadID,
          name: groupInfo.name,
          sotv: data.userInfo.length,
        });
      }

      // Sắp xếp danh sách theo số lượng thành viên
      const listbox = listthread.sort((a, b) => b.sotv - a.sotv);

      // Nếu không có tham số nào khác, liệt kê danh sách nhóm
      if (args.length === 0) {
        let msg = '';
        listbox.forEach((group, i) => {
          msg += `${i + 1}. ${group.name}\n🧩TID: ${group.id}\n🐸Member: ${group.sotv}\n\n`;
        });

        return await api.sendMessage(msg, event.threadID, event.messageID);
      }

      // Xử lý trường hợp có tham số 'remove', 'groupNumber', 'userID'
      if (args[0] === 'remove' && args.length === 3) {
        const groupNumber = parseInt(args[1], 10) - 1; // Chuyển groupNumber từ danh sách bắt đầu từ 1 thành index 0
        const userID = args[2];

        // Kiểm tra tính hợp lệ của groupNumber
        if (groupNumber < 0 || groupNumber >= listbox.length) {
          return await api.sendMessage('Invalid group number!', event.threadID, event.messageID);
        }

        const selectedGroup = listbox[groupNumber];

        // Xóa người dùng khỏi nhóm
        await api.removeUserFromGroup(userID, selectedGroup.id);

        return await api.sendMessage(`Removed user ${userID} from group ${selectedGroup.name}.`, event.threadID, event.messageID);
      }

      // Nếu tham số không hợp lệ
      await api.sendMessage('Invalid command usage! Try [nashPrefix]listbox or [nashPrefix]listbox remove [groupNumber] [userID].', event.threadID, event.messageID);
    } catch (error) {
      console.error('Error in listbox command:', error);
      await api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  }
};
