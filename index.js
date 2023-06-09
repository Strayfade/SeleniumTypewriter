let WPM = 110
let StartupURL = 'https://www.typing.com/'

async function SendKey(driver, t) {
    await driver.actions().sendKeys(t).perform()
}

const selenium = require('selenium-webdriver');
const main = async function () {
    var driver = new selenium.Builder().withCapabilities(selenium.Capabilities.firefox()).build();
    await driver.get(StartupURL);
    process.stdin.on('data', await async function (d) {
        while (true) {
            let Finish = false
            driver.findElements(selenium.By.className('letter')).then(await async function (elements) {
                let TotalHTML = ""
                elements.forEach(await async function (element) {
                    element.getAttribute('innerHTML').then(await async function (innerHTML) {
                        TotalHTML += innerHTML.toString().replace("&nbsp;", " ").replace("⏎", "\n")
                        if (element == elements[elements.length - 1]) {
                            Finish = false;
                            for (let x = 0; x < TotalHTML.length; x++) {
                                SendKey(driver, TotalHTML[x])
                                await new Promise(r => setTimeout(r, 1000 / (WPM / 60 * (Math.random() + 5.0))));
                            }
                            Finish = true;
                        }
                    });
                });
            });
            while (!Finish) {
                await new Promise(r => setTimeout(r, 100));
            }
            let button = await driver.wait(selenium.until.elementLocated(selenium.By.css('button[data-tooltip="Tip: Press ENTER to continue"]')), 9999999);
            await new Promise(r => setTimeout(r, 1000));
            await button.click();
        }
    })
}

main()