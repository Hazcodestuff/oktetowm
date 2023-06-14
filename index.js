const { Client } = require('whatsapp-web.js');
const snoowrap = require('snoowrap');
const { v4: uuidv4 } = require('uuid');

// Initialize the WhatsApp client
const client = new Client();

// Event: Client is ready
client.on('ready', () => {
  console.log('Client is ready!');
});

// Event: New message received
client.on('message', async (message) => {
  // Process the incoming message
  console.log('New message:', message.body);

  // Reply to the message
  await message.reply('Hello! I am your WhatsApp bot.');

  // React to the message with an emoji
  await message.react('💀');
});

// Start the client
client.initialize();

// Initialize the snoowrap instance for Reddit API
const redditClient = new snoowrap({
  userAgent: 'MyRedditApp',
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  username: 'YOUR_REDDIT_USERNAME',
  password: 'YOUR_REDDIT_PASSWORD'
});

// Example usage of snoowrap to fetch memes from r/dankmemes
redditClient.getSubreddit('dankmemes').getTop({ time: 'day', limit: 1 })
  .then(([post]) => {
    console.log('Meme:', post.url);
  })
  .catch((err) => {
    console.error('Error fetching meme:', err);
  });
