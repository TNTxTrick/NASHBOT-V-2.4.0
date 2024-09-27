const axios = require('axios');
const fs = require('fs');
const { join } = require("path");
const { PasteClient } = require('pastebin-api');

module.exports = {
  name: "adc",
  description: "Share code trong file hoặc từ liên kết lên Pastebin",
  usage: "[nashPrefix]adc", 
  nashPrefix: true, 
  dependencies: {
    "pastebin-api": "",
    "cheerio": "",
    "request": ""
  },
  execute: async (api, event, args, prefix) => {
    const { senderID, threadID, messageID, messageReply, type } = event;
    const name = args[0];  // Lấy tên tệp hoặc tiêu đề của paste
    let text = '';

    if (type == "message_reply") {
        text = messageReply.body;
    }

    // Nếu không có tên tệp và cũng không có reply
    if (!text && !name) {
      return api.sendMessage('❎ Vui lòng reply link muốn áp dụng code hoặc ghi tên file để up code lên Pastebin!', threadID, messageID);
    }

    // Nếu chỉ có tên tệp, lấy nội dung từ tệp và upload lên Pastebin
    if (!text && name) {
      try {
        const filePath = join(__dirname, `${args[0]}.js`);
        const data = fs.readFileSync(filePath, "utf-8");

        // Tạo client Pastebin
        const client = new PasteClient("P5FuV7J-UfXWFmF4lUTkJbGnbLBbLZJo");

        // Tạo paste trên Pastebin
        const url = await client.createPaste({
          code: data,
          expireDate: 'N',
          format: "javascript",
          name: name,
          publicity: 1
        });

        const id = url.split('/')[3];
        const pasteLink = `https://pastebin.com/raw/${id}`;
        return api.sendMessage(pasteLink, threadID, messageID);

      } catch (err) {
        return api.sendMessage(`❎ Tệp ${args[0]} không tồn tại hoặc lỗi khi đọc tệp.`, threadID, messageID);
      }
    }

    // Nếu có liên kết trong reply
    const urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const url = text.match(urlR);

    if (url) {
      try {
        const response = await axios.get(url[0]);
        const data = response.data;

        fs.writeFile(`${__dirname}/${args[0]}.js`, data, "utf-8", (err) => {
          if (err) return api.sendMessage(`⚠️ Đã xảy ra lỗi khi áp dụng code vào ${args[0]}.js`, threadID, messageID);
          return api.sendMessage(`✅ Đã áp dụng code vào ${args[0]}.js`, threadID, messageID);
        });

      } catch (err) {
        return api.sendMessage(`❎ Lỗi khi tải dữ liệu từ liên kết: ${err.message}`, threadID, messageID);
      }
    }
  },
};
