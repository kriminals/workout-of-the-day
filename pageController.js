const {addDays, isBefore, isWeekend, format} = require('date-fns');

const pageScraper = require('./pageScraper');

async function scrapeAll(browserInstance){
    // Quarantine Day 1
    let qd1 = new Date('2020-11-2');
    let today = new Date();
    // Get wodDays from quarantine Day 1 until today, except weekends
    let currentDay = qd1;
    let wodDays = [];
    while (isBefore(currentDay, today)) {
        if (!isWeekend(currentDay)) wodDays.push(format(currentDay, 'd-M-yyyy'));
        currentDay = addDays(currentDay, 1);
    };
    console.log(wodDays);
    
    let browser;
    try{
        browser = await browserInstance;
        await wodDays.reduce(async (acc, date) => {
            await pageScraper.scraper(browser, date);
        }, undefined )
        
    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)