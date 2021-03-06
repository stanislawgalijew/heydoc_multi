const fs = require('fs');
const lhciManifest = require('./outputDir/manifest.json');
const medianEntry = lhciManifest.find(entry => entry.isRepresentativeRun)
const medianResult = JSON.parse(fs.readFileSync(medianEntry.jsonPath, 'utf-8'));
console.log('Median performance score was', medianResult.categories.performance.score * 100);
const line2Save ='mobile'+","+medianResult.requestedUrl +','+ medianResult.fetchTime +','+ medianResult.categories.performance.score+','+ medianResult.categories.seo.score+','+ medianResult.categories.accessibility.score+'\n'
console.log('Write to file:',line2Save);
const pathToFileJson = medianEntry.jsonPath
const pathToFileHTML = medianEntry.htmlPath

var fieldsJson = pathToFileJson.split('/');
var nameJson = fieldsJson[7];
var fieldsHTml = pathToFileHTML.split('/');
var nameHtml = fieldsHTml[7];
console.log('nameHtml:',nameHtml);
console.log('nameJson:',nameJson);


fs.appendFileSync('./output/wyniki.csv',  line2Save);

fs.copyFile(pathToFileJson, './output/m'+nameJson, (err) => {
  if (err) throw err;
  console.log('File was copied to destination');
});

fs.copyFile(pathToFileHTML, './output/m'+nameHtml, (err) => {
  if (err) throw err;
  console.log('File was copied to destination');
});

// fs.unlink('./outputDir/*.*',function(err){
//         if(err) return console.log(err);
//         console.log('file deleted successfully');
//    });  
