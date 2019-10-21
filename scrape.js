const puppeteer = require("puppeteer");
const fs = require("fs");
const request = require("request");

//  This is main download function which takes the url of your image
function download(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    request(uri)
    .pipe(fs.createWriteStream(filename))
    .on("close", callback);
 });
}

let scrape = async () => {
 // Actual Scraping goes Here...
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.nytimes.com/spotlight/wedding-announcements");
    await page.waitFor(1000);
    const imageUrl = await page.evaluate(() =>
    document.querySelector("img.image") // image selector
    ); // here we got the image url.
    // Now just simply pass the image url to the downloader function to
    download  the image.
    download(imageUrl, "image.png", function() {
     console.log("Image downloaded");
  });
 };

scrape()
