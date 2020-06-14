const Telegraf = require('telegraf')
const axios = require('axios')

//Send Telegram the API key for the bot
const bot = new Telegraf('xxx');

//Basic Variables

//Bot Start Message
bot.start((ctx) => {
    // startBackgroundCheck(ctx)
    ctx.reply('✌🏼Hello, I am the Kucoin Price Bot✌🏼 \n I am merely a bot, so please dont abuse me. \n \nMy sole purpose in this life is to help you retrive price data for digital assets listed on Kucoin! This version is currently in alpha and functionality will be LIMITED for a indefinite period of time, meaning updates will only come as I have free time to contribute. I encourage those with development experience to contribute to the GitHub and help me develop features. Feel free to contact me or make a pull request to the Github repo. \n \nCommands: \n- /p (ticker): To get the price, volume, high/low of day. \n\nTo see the menu of the possible commands just send me /help')
})

//Grab price command
bot.command('/kp', (ctx) => {

    let userInputText = ctx.message.text;
    let userInput = userInputText.replace('/kp ','');

    //API Call for price feed
    axios.get('https://api.kucoin.com/api/v1/market/stats?symbol=' + userInput)
        .then(response => {          
            console.log(response.data);
            let last = response.data.data.last;
            let dayHigh = response.data.data.high;
            let dayLow = response.data.data.low;
            let btcVol = Math.round(response.data.data.volValue);
            let dailyAvg = response.data.data.averagePrice;
            let dailyGL = ((response.data.data.changeRate)*100);

            ctx.reply(userInput + ": \n" + last + " ₿ | Current Price \n" + dayHigh + " ₿ | 📈 Daily High \n" + dayLow + " ₿ | 📉 Daily Low \n" + dailyAvg + " ₿ | Daily Average Price \n" + btcVol + " | Volume in quote currency\n" + dailyGL + "% | 📅 24h Performance");
            console.log(userInput);
        })
        .catch(error => {
            console.log(error);
            ctx.reply("Please enter using proper syntax and make sure the asset is traded on Kucoin.")
        });

    }
);


//Launch bot
bot.launch()