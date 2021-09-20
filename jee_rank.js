let pdfkit=require("pdfkit");
let path=require('path');
let fs=require('fs');
const puppeteer = require("puppeteer");
let resonance_link="https://www.resonance.ac.in/answer-key-solutions/JEE-Main/2020/Rank-Predictor.aspx";
let matrix_link="https://www.matrixedu.in/jossacounselling/jeemainrankpredictor";
let details={
    name:"Jack Wilson",
    Mobile:'7341112243',
    Email:'damodap906@tst999.com',
    Total_Marks:'184',
    Percentile:'99'
};
(async function fn() {
    let browser=puppeteer.launch({
        headless:false,
    defaultViewport: null,
  args: ["--start-maximized"]
    })
 let  page = await (await browser).newPage();
    await page.goto(resonance_link);
    await page.waitForSelector("input[name='txtNAME']",{display:true});
    await page.click("input[name='txtNAME']")
    // waitAndClick(page,"input[name='txtNAME']");
    await page.type("input[name='txtNAME']",details.name,{delay:100});
    waitAndClick(page,'input[name="txtMOBILE"]',{delay:100});
    await page.type('input[name="txtMOBILE"]',details.Mobile,{delay:100});
    waitAndClick(page,'input[name="txtEMAIL"]',{delay:100});
    await page.type('input[name="txtEMAIL"]',details.Email,{delay:100});
    await page.waitForSelector('#ddlCATEGORY');
    await page.click("#ddlCATEGORY");
    await page.keyboard.press('ArrowDown');
    waitAndClick(page,'input[name="txtTPJEEMain"]',{delay:100});
    await page.type('input[name="txtTPJEEMain"]',details.Total_Marks,{delay:100});
    await page.waitForSelector("input[type='submit']");
    await page.click("input[type='submit']");
   let f_message= await page.waitForSelector(".alert.alert-info strong",{delay:100});
    let mssg=await page.evaluate(function(element)
    {
        return element.textContent;
    },f_message);
    page.close();
    let text = JSON.stringify(mssg);
    let pdfDoc=new pdfkit();
   let file_path = path.join(process.cwd(),"Rank(Resonance)"+ ".pdf");
      pdfDoc.pipe(fs.createWriteStream(file_path));
      pdfDoc.text(text);
      pdfDoc.end();
      console.log("PDF Generated from Resonance Rank Predictor");
      page = await (await browser).newPage();
    await page.goto("https://www.inspirenignite.com/jee-main-rank-predictor/");
    await page.waitForSelector('#score',{display:true});
    waitAndClick(page,'#score');
    await page.type('#score',details.Total_Marks,{delay:100});
    await page.waitForSelector('#submit_button',{display:true});
    await page.click('#submit_button',{delay:500});
   await page.waitForSelector('.col-twelve.tab-full h2');
  let final_details=  await page.$(".col-twelve.tab-full"); 
   let mssg1=await page.evaluate(function(element)
    {
        return element.textContent;
    },final_details);
    // page.close();
    let text1 = JSON.stringify(mssg1);
     pdfDoc=new pdfkit();
   let file_path1 = path.join(process.cwd(),"Rank(Inspire Ignite)"+ ".pdf");
      pdfDoc.pipe(fs.createWriteStream(file_path1));
      pdfDoc.text(text1);
      pdfDoc.end();
      console.log("PDF Generated from Inspire Ignite Rank Predictor");
       await page.goto(matrix_link);
       await page.waitForSelector('select[name="category"]',{delay:100})
       await page.click('select[name="category"]',{delay:100});
       await page.keyboard.press('ArrowDown',{delay:100});
       await page.keyboard.press('Enter',{delay:100});
       waitAndClick(page,'input[name ="jeemainpercentile"]');
       await page.type('input[name ="jeemainpercentile"]',details.Percentile,{delay:100});
     waitAndClick(page,'button[type = "submit"]');
   let d3=   await page.waitForSelector('p strong');
     let mssg2=await page.evaluate(function(element)
    {
        return element.textContent;
    },d3);
    page.close();
    let text2 = JSON.stringify(mssg2.trim());
     pdfDoc=new pdfkit();
   let file_path2 = path.join(process.cwd(),"Rank(Matrix Edu)"+ ".pdf");
      pdfDoc.pipe(fs.createWriteStream(file_path2));
      pdfDoc.text(text2);
      pdfDoc.end();
      console.log("PDF Generated from Matrix Edu Predictor");
  console.log("!!!!!!!!!!ALL PDF Generated!!!!!!!!");
  // pe.close();
})();
function waitAndClick(page, selector) {
  (async function fn() {
    await page.waitForSelector(selector, { display: true });
    await page.click(selector);
  })();
}