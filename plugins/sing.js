const { Module } = require('../main');
const { MODE } = require('../config');
const { skbuffer } = require('raganork-bot');

var x = MODE === 'public' ? false : true;
Module({
    pattern: "video ?(.*)",
    fromMe: x,
    use: 'nothing',
    dontAddCommandList: true
}, async (message, match) => {
    var text = match[1];

    // Validate the text for YouTube URLs
    if (
        !text ||
        !(
            /^https?:\/\/(www\.)?youtube\.com\/watch\?v=/.test(text) || 
            /^https?:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}/.test(text) ||
            /^https?:\/\/youtube\.com\/shorts\/[a-zA-Z0-9_-]{11}/.test(text)
        )
    ) {
        return await message.client.sendMessage(
            message.jid,
            { text: "Please provide a valid YouTube URL." },
            { quoted: message.data }
        );
    }

    // Construct the API URL
    var api_url = "https://api-x-demon-dev.hf.space/api/ytmp4?url=" + text;

    try {
        // Fetch the API response
        var response = await fetch(api_url);
        var result = await response.json();

        if (!result.success || response.status !== 200) {
            throw new Error("Failed to fetch video data.");
        }

        // Extract required details from response
        var { title, download_url, thumbnail, quality, creator } = result;

        // Download the video file
        var video = await skbuffer(download_url);

        // Send the video as a message
        await message.client.sendMessage(
            message.jid,
            {
                video,
                mimetype: 'video/mp4',
                caption: `🎥 *${title}*\n📌 *Quality:* ${quality}\n👤 *Creator:* ${creator}\n\n_Made by DOT_007 ❤️_`,
                thumbnail: await skbuffer(thumbnail)
            },
            { quoted: message.data }
        );

    } catch (error) {
        // Handle errors gracefully
        await message.client.sendMessage(
            message.jid,
            { text: "An error occurred while processing your request. Please try again later." },
            { quoted: message.data }
        );
        console.error("Error fetching video:", error);
    }
});

Module({
    pattern: "song ?(.*)",
    fromMe: x,
    use: 'nothing',
    dontAddCommandList: true
}, async (message, match) => {
    var text = match[1];

    // Validate the text for YouTube URLs
    if (
        !text ||
        !(
            /^https?:\/\/(www\.)?youtube\.com\/watch\?v=/.test(text) || 
            /^https?:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}/.test(text) ||
            /^https?:\/\/youtube\.com\/shorts\/[a-zA-Z0-9_-]{11}/.test(text)
        )
    ) {
        return await message.client.sendMessage(
            message.jid,
            { text: "Please provide a valid YouTube URL." },
            { quoted: message.data }
        );
    }

    // Construct the API URL
    var api_url = "https://api-x-demon-dev.hf.space/api/ytmp3?url=" + text;

    try {
        // Fetch the API response
        var response = await fetch(api_url);
        var result = await response.json();

        if (!result.success || response.status !== 200) {
            throw new Error("Failed to fetch audio data.");
        }

        // Extract required details from response
        var { title, download_url, thumbnail, quality, creator } = result;

        // Download the audio file
        var audio = await skbuffer(download_url);

        // Send the audio as a voice message
        await message.client.sendMessage(
            message.jid,
            {
                audio,
                mimetype: 'audio/mp4',
                ptt: true,
                caption: `🎵 *${title}*\n📌 *Quality:* ${quality}\n👤 *Creator:* ${creator}\n\n_Made by DOT_007 ❤️_`,
                thumbnail: await skbuffer(thumbnail)
            },
            { quoted: message.data }
        );

    } catch (error) {
        // Handle errors gracefully
        await message.client.sendMessage(
            message.jid,
            { text: "An error occurred while processing your request. Please try again later." },
            { quoted: message.data }
        );
        console.error("Error fetching audio:", error);
    }
});
