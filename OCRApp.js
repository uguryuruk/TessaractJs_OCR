import { createWorker, PSM } from 'tesseract.js';
import * as fs from 'fs';
import { exec } from 'child_process';

// file list to OCR process
var fileNames = fs.readdirSync('./awaitingOCR');

mainOCRFunction();

async function mainOCRFunction() {

	for (let i = 0; i < fileNames.length; i++) {

		//Tesseract worker
		const worker = createWorker(
			{
				errorHandler: (err) => {
					//on error, move the failed file to errorFile folder and continue
					fs.rename("./awaitingOCR/" + fileNames[i], "./badFiles/" + fileNames[i], function (err) {
						if (err) throw err
						console.log('Successfully moved!')
					});
					console.log(err);
				},
				// logger: (m) => { console.log(m); }
			}
		);

		await worker.load();
		await worker.loadLanguage('tur');
		await worker.initialize('tur');

		//loop to OCR one by one

		console.log("Processing: " + fileNames[i]);

		const { data: { text } } = await worker.recognize("./awaitingOCR/" + fileNames[i], {
			tessedit_pageseg_mode: PSM.AUTO_OSD,
			errorHandler: (err) => {
				if (err) throw err;
				console.log('\u0007');
			}
		})
			.catch(e => {
				console.log('\u0007');
				if (e) throw e;
			});

		//ON success, write text to completedReport.txt 
		let fileTitle = "\n\n ******** \n\n" + fileNames[i] + "\n" + text;
		fs.appendFile('./OCR_Reports/completedReport.txt', fileTitle, function (err) {
			if (err) throw err;
			console.log(fileNames[i] + ' Saved!');
			// console.log('\u0007');
			exec(`rundll32 user32.dll,MessageBeep`);
		});

		// and move the successfully OCR processed file to completed folder
		fs.rename("./awaitingOCR/" + fileNames[i], "./completedOCR/" + fileNames[i], function (err) {
			if (err) throw err
			console.log('Successfully moved!')
		});

		await worker.terminate();

	}
	//loop ends


}





