module.exports = {
  name: 'listbox',
  description: 'List group information, leave specific groups, or leave all groups',
  usage: '[nashPrefix]listbox or [nashPrefix]out <numbers> or [nashPrefix]outall',
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

      // Thoát khỏi tất cả các nhóm
      if (args[0] === 'outall') {
        for (const group of listbox) {
          await api.removeUserFromGroup(api.getCurrentUserID(), group.id);
        }
        await api.sendMessage(`Bot đã rời khỏi tất cả các nhóm.`, event.threadID, event.messageID);
        return;
      }

      // Nếu có đối số `args` và lệnh là `out`, bot sẽ thoát khỏi các nhóm chỉ định
      if (args[0] === 'out' && args[1]) {
        // Tách các số chỉ định ra (ví dụ: 'out 1 2 3' sẽ thành [1, 2, 3])
        const groupIndexes = args.slice(1).map(n => parseInt(n) - 1); // 0-based index

        const groupsToLeave = groupIndexes.map(i => listbox[i]).filter(g => g !== undefined);

        if (groupsToLeave.length > 0) {
          for (const group of groupsToLeave) {
            await api.removeUserFromGroup(api.getCurrentUserID(), group.id);
            await api.sendMessage(`Bot đã rời khỏi nhóm: ${group.name} (TID: ${group.id})`, event.threadID);
          }
        } else {
          await api.sendMessage(`Không tìm thấy nhóm với các số thứ tự bạn đã nhập.`, event.threadID, event.messageID);
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
