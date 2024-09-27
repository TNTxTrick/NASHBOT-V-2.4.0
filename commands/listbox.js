module.exports = {
  name: 'listbox',
  description: 'List group information and leave specific group',
  usage: '[nashPrefix]listbox or [nashPrefix]out <number>',
  nashPrefix: false,
  execute: async (api, event, args, prefix) => {
    try {
      const inbox = await api.getThreadList(100, null, ['INBOX']);
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

      // Nếu có đối số `args` và lệnh là `out`, bot sẽ thoát khỏi nhóm chỉ định
      if (args[0] === 'out' && args[1]) {
        const groupIndex = parseInt(args[1]) - 1; // Chỉ số nhóm trong danh sách (0-based)

        if (groupIndex >= 0 && groupIndex < listbox.length) {
          const groupToLeave = listbox[groupIndex];
          await api.removeUserFromGroup(api.getCurrentUserID(), groupToLeave.id);
          await api.sendMessage(`Bot đã rời khỏi nhóm: ${groupToLeave.name} (TID: ${groupToLeave.id})`, event.threadID, event.messageID);
        } else {
          await api.sendMessage(`Không tìm thấy nhóm với số thứ tự ${args[1]}.`, event.threadID, event.messageID);
        }
        return;
      }

      // Hiển thị danh sách nhóm nếu không có đối số `out`
      let msg = '';
      listbox.forEach((group, i) => {
        msg += `${i + 1}. ${group.name}\n🧩TID: ${group.id}\n🐸Member: ${group.sotv}\n\n`;
      });

      await api.sendMessage(msg, event.threadID, event.messageID);
    } catch (error) {
      console.error('Error in listbox command:', error);
      await api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  }
};
