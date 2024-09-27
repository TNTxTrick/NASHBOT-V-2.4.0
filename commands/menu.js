module.exports = {
    name: "menu",
    description: "Xem danh sách lệnh",
    nashPrefix: false,
    version: "1.0.2",
    role: 0,
    cooldowns: 7,
    aliases: ["menu"],
    execute(api, event, args, prefix) {
        const commands = global.NashBoT.commands;
        const events = global.NashBoT.events;
        const { threadID, messageID } = event;

        const aiCommands = [];
        const otherCommands = [];
        const eventEntries = Array.from(events.keys());

        // Filter AI-related commands
        commands.forEach((cmd, name) => {
            if (name.toLowerCase().includes("ai")) {
                aiCommands.push(name);
            } else {
                otherCommands.push(name);
            }
        });

        // Join all commands and events into one line
        const allEntries = [...aiCommands, ...otherCommands, ...eventEntries];
        const commandList = `[MENU]:\n\n` +
                            allEntries.join(', ') + 
                            `\n`;

        api.sendMessage(commandList, threadID, messageID);
    }
};
