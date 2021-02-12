const scraperObject = {
    url: 'https://www.boosterfitness.gr/12-2-2021/',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        await page.waitForSelector('.content');
        let wod = await page.$$eval('div.content p', exercises => exercises.map(p => p.textContent));
        console.log(wod);

    }
}

module.exports = scraperObject;