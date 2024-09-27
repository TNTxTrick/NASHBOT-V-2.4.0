module.exports = {
  name: 'listbox',
  description: 'List group information and auto leave groups',
  usage: '[nashPrefix]listbox',
  nashPrefix: false,
  execute: async (api, event, args, prefix) => {
    try {
      const inbox = await api.getThreadList(100, null, ['INBOX']);
      // Lọc các nhóm mà bot đã đăng ký và là nhóm chat
      const list = inbox.filter(group => group.isSubscribed && group.isGroup);

      const listthread = [];
      for (const groupInfo of list) {
        const data = await api.getThreadInfo(groupInfo.threadID);
        listthread.push({
          id: groupInfo.threadID,
          name: groupInfo.name,
          sotv: data.userInfo.length,
        });
      }

      const listbox = listthread.sort((a, b) => b.sotv - a.sotv);

      let msg = '';
      for (const [i, group] of listbox.entries()) {
        msg += `${i + 1}. ${group.name}\n🧩TID: ${group.id}\n🐸Member: ${group.sotv}\n\n`;

        // Điều kiện để bot tự động rời khỏi nhóm (ví dụ nếu nhóm có dưới 10 thành viên)
        if (group.sotv < 10) {
          await api.removeUserFromGroup(api.getCurrentUserID(), group.id);
          msg += `🚪 Bot đã tự động rời khỏi nhóm: ${group.name}\n\n`;
        }
      }

      await api.sendMessage(msg, event.threadID, event.messageID);
    } catch (error) {
      console.error('Error in listbox command:', error);
      await api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  }
};
