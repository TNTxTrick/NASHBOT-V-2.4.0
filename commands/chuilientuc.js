module.exports = {
    name: "compliment",
    description: "Send a series of fun compliments to a tagged user",
    nashPrefix: false,
    version: "1.0.0",
    cooldowns: 7,
    aliases: ["compliment"],
    execute(api, event, args, prefix) {
        var mention = Object.keys(event.mentions)[0];
        if (!mention) return api.sendMessage("You need to tag someone to compliment!", event.threadID);
        
        let name = event.mentions[mention];
        var arraytag = [];
        arraytag.push({ id: mention, tag: name });
        
        var sendMsg = function (message) {
            api.sendMessage(message, event.threadID);
        };

        sendMsg("Get ready for some compliments!");
        setTimeout(() => { sendMsg({ body: "You are amazing, " + name + "!", mentions: arraytag }); }, 3000);
        setTimeout(() => { sendMsg({ body: "You're a superstar, " + name + "!", mentions: arraytag }); }, 5000);
        setTimeout(() => { sendMsg({ body: "You're so kind and thoughtful, " + name + "!", mentions: arraytag }); }, 7000);
        setTimeout(() => { sendMsg({ body: "You light up every room you enter, " + name + "!", mentions: arraytag }); }, 9000);
        setTimeout(() => { sendMsg({ body: "Your smile is contagious, " + name + "!", mentions: arraytag }); }, 12000);
        setTimeout(() => { sendMsg({ body: "You're the life of the party, " + name + "!", mentions: arraytag }); }, 15000);
        setTimeout(() => { sendMsg({ body: "You are truly one of a kind, " + name + "!", mentions: arraytag }); }, 17000);
        setTimeout(() => { sendMsg({ body: "You're going to achieve great things, " + name + "!", mentions: arraytag }); }, 20000);
        setTimeout(() => { sendMsg({ body: "You're always there for others, " + name + "!", mentions: arraytag }); }, 23000);
        setTimeout(() => { sendMsg({ body: "You inspire everyone around you, " + name + "!", mentions: arraytag }); }, 25000);
        setTimeout(() => { sendMsg({ body: "You have a heart of gold, " + name + "!", mentions: arraytag }); }, 28500);
        setTimeout(() => { sendMsg({ body: "Your positivity is infectious, " + name + "!", mentions: arraytag }); }, 31000);
        setTimeout(() => { sendMsg({ body: "You're a beacon of light, " + name + "!", mentions: arraytag }); }, 36000);
        setTimeout(() => { sendMsg({ body: "You're unstoppable, " + name + "!", mentions: arraytag }); }, 39000);
        setTimeout(() => { sendMsg({ body: "You're brilliant and talented, " + name + "!", mentions: arraytag }); }, 40000);
        setTimeout(() => { sendMsg({ body: "You deserve all the good things in life, " + name + "!", mentions: arraytag }); }, 65000);
        setTimeout(() => { sendMsg({ body: "You're an incredible friend, " + name + "!", mentions: arraytag }); }, 70000);
        setTimeout(() => { sendMsg({ body: "You're the definition of awesome, " + name + "!", mentions: arraytag }); }, 75000);
        setTimeout(() => { sendMsg({ body: "Keep shining like the star you are, " + name + "!", mentions: arraytag }); }, 80000);
        setTimeout(() => { sendMsg({ body: "You're a gift to the world, " + name + "!", mentions: arraytag }); }, 85000);
        setTimeout(() => { sendMsg("You're incredible, and the world is better with you in it!"); }, 90000);
        setTimeout(() => { sendMsg({ body: "Stay awesome, " + name + "!", mentions: arraytag }); }, 95000);
        setTimeout(() => { sendMsg({ body: "Thanks for being you, " + name + "!", mentions: arraytag }); }, 100000);
        setTimeout(() => { sendMsg({ body: "Keep being a legend, " + name + "!", mentions: arraytag }); }, 105000);
        setTimeout(() => { sendMsg("Goodbye for now, you're awesome! 😊"); }, 110000);
    }
};
