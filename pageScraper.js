const scraperObject = {
    url: 'https://www.boosterfitness.gr',
    async scraper(browser, date){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}/${date}/...`);
        await page.goto(`${this.url}/${date}/`, {
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0
        });
        await page.waitForSelector('.content');
        let wod = await page.$$eval('div.content p', exercises => exercises.map(p => p.textContent));
        console.log(wod);
        await page.close();

    }
}

module.exports = scraperObject;