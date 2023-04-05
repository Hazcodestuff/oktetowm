const { Client } = require('whatsapp-web.js');
const Snoowrap = require('snoowrap');
const { v4: uuidv4 } = require('uuid');

const client = new Client();
const reddit = new Snoowrap({
  userAgent: 'myBot/1.0.0',
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  username: 'your_reddit_username',
  password: 'your_reddit_password',
});

client.on('message', async (message) => {
  if (message.body === '.meme') {
    const meme = await reddit.getRandomSubmission('memes');
    const mediaUrl = meme.url;
    const chat = await message.getChat();
    const mediaType = await client.getMessageMediaInfo(message);

    if (mediaType === 'image' || mediaType === 'video') {
      const media = await client.downloadMedia(message);
      chat.sendMessage(media, {
        caption: 'Here is your meme!',
        quotedMessageId: message.id._serialized,
        sendMediaAsSticker: false,
      });
    } else {
      chat.sendMessage(mediaUrl, {
        caption: 'Here is your meme!',
        quotedMessageId: message.id._serialized,
        sendMediaAsSticker: false,
      });
    }
  }
});

client.initialize();
