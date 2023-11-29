const puppeteer = require('puppeteer');


async function start(){

const browser =await puppeteer.launch({headless: 'false'});
const page=await browser.newPage();


await page.goto("https://economictimes.indiatimes.com/news",{ waitUntil: "domcontentloaded"});



const news = await page.evaluate(() => {
   
    document.querySelector("#featuredNews > section.flt.halfWidth > article:nth-child(1) > h2 > a");

console.log(news)

});


await browser.close();


}

start()