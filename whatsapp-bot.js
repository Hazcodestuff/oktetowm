import axios from 'axios';
import fs from 'fs';

let handler = async (m, { conn }) => {
	try {
		const credsFile = fs.readFileSync('./creds.json');
		const creds = JSON.parse(credsFile);

		const subReddit = 'dankmemes';
		const response = await axios.get(`https://www.reddit.com/r/${subReddit}.json`, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0',
			},
		});

		const memes = response.data.data.children.filter((child) => {
			const memeData = child.data;
			return memeData.post_hint === 'image' && !memeData.over_18;
		});

		if (memes.length === 0) {
			throw new Error('No memes found');
		}

		const randomIndex = Math.floor(Math.random() * memes.length);
		const memeUrl = memes[randomIndex].data.url;

		conn.sendFile(m.chat, memeUrl, '', `Here's a meme from r/${subReddit}:`, m, false, { thumbnail: Buffer.alloc(0) });
		m.react('💀');
	} catch (error) {
		console.error(error);
	}
};

handler.help = ['meme'];
handler.tags = ['img'];
handler.command = ['meme'];
handler.diamond = true;

export default handler;
