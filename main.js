///////////////email = 'selesa3161@ekbasia.com'
///////////password = '123456'

let HRLink  = 'https://www.hackerrank.com/auth/login';
let email = 'selesa3161@ekbasia.com';
let password = '123456';
const puppeteer = require('puppeteer');
const codeObj = require('./codes');



// const browser = puppeteer.launch({
//     headless : false,
//     args: [ '--start-maximized',],
//     defaultViewport: null
// });


(async function (){
   try {
    const browser = await puppeteer.launch({
        headless : false,
        args: [ '--start-maximized',],
        defaultViewport: null
    });
    let HRpage = await browser.newPage();
     await HRpage.goto(HRLink);
    await HRpage.waitForSelector("input[id = 'input-1']");
    await HRpage.type("input[id = 'input-1']", email,{delay: 50})
    await HRpage.type("input[id = 'input-2']",password,{delay: 50})
    await HRpage.click("button[data-Analytics = 'LoginPassword']");
   //// await HRpage.waitForSelector(".topic-card a[data-attr1 = 'algorithms']");
    await waitAndClick(".topic-card a[data-attr1 = 'algorithms']", HRpage);
    await waitAndClick("input[value = 'warmup']",HRpage);
      //await HRpage.setTimeout(3000)
      let allChallenges =await HRpage.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay :50});
      console.log(allChallenges.length);
    await questionSolver(HRpage, allChallenges[0], codeObj.answers[0]);
    await HRpage.keyboard.down('Control');
    await HRpage.keyboard.press('A',{delay:10});
    await HRpage.keyboard.press('x',{delay:100});
    await HRpage.keyboard.up('Control');
    await waitAndClick('.monaco-editor.no-user-select.vs',HRpage);
    await HRpage.keyboard.down('Control');
    await HRpage.keyboard.press('A',{delay:10});
    await HRpage.keyboard.press('V',{delay:10});
    await HRpage.keyboard.up('Control');
    await waitAndClick('.hr-monaco-submit',HRpage)


   }catch(error){
     console.log(error);
   }



})();




async function waitAndClick(selector, cpage){
  
    await cpage.waitForSelector(selector);
    let selectorclicked = cpage.click(selector);
    return selectorclicked;
}

async function questionSolver(page, question, answer){
     await question.click();
    await waitAndClick('.monaco-editor.no-user-select.vs',page)
    await waitAndClick('input[type = "checkbox"]',page);

    await waitAndClick('textarea.custominput',page)
    await page.type('textarea.custominput', answer, {delay:10})
}