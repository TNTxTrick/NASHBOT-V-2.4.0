module.exports = {
  name: 'tx',
  description: 'game',
  usage: '[nashPrefix]tx',
  nashPrefix: false,
  execute: async (api, event, args, prefix) => {
    try {
      // Tài Xỉu game logic
      const bet = args[0]; // Assuming first argument is the bet amount
      if (!bet || isNaN(bet)) {
        return api.sendMessage("Vui lòng đặt cược một số hợp lệ!", event.threadID, event.messageID);
      }

      // Generate random dice roll (1-6 for three dice)
      const dice1 = Math.floor(Math.random() * 6) + 1;
      const dice2 = Math.floor(Math.random() * 6) + 1;
      const dice3 = Math.floor(Math.random() * 6) + 1;
      const total = dice1 + dice2 + dice3;

      // Determine the result: Tài (Big) or Xỉu (Small)
      const result = total >= 11 ? 'Tài' : 'Xỉu';

      // Message to be edited with results
      const message = `🎲 Xúc xắc: [${dice1}, ${dice2}, ${dice3}] - Tổng: ${total} \nKết quả: ${result}`;

      // Send an initial message and then edit it later
      const sentMessage = await api.sendMessage('Đang quay xúc xắc...', event.threadID);

      // Simulate a delay before editing (e.g., to simulate the dice roll animation)
      setTimeout(() => {
        api.editMessage(message, event.threadID, sentMessage.messageID);
      }, 2000); // Delay of 2 seconds
      
    } catch (error) {
      console.error(error);
      api.sendMessage("Có lỗi xảy ra khi chơi game tài xỉu!", event.threadID, event.messageID);
    }
  }
};
