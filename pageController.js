const {addDays, isBefore, isWeekend, format} = require('date-fns');

const pageScraper = require('./pageScraper');

async function scrapeAll(browserInstance){
    let browser;
    // Quarantine Day 1
    let qd1 = new Date('2020-11-2');
    let today = new Date('2020-11-7');
    // Fill wodDays from quarantine Day 1 untill today, except weekends
    let currentDay = qd1;
    let wodDays = [];
    while (isBefore(currentDay, today)) {
        if (!isWeekend(currentDay)) wodDays.push(format(currentDay, 'd-M-yyyy'));
        currentDay = addDays(currentDay, 1);
    };
    console.log(wodDays);
    let startDate = format(qd1, 'd-M-yyyy');
    let endDate = format(today, 'd-M-yyyy'); 
    try{
        browser = await browserInstance;
        await wodDays.reduce(async (acc, date) => {
            await pageScraper.scraper(browser, date);
            //await browser.close();
        }, undefined )
        
    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)