import * as fs from 'fs';



var OCR_ReportFile = 'OCRSonSonuc.txt' //to generate the report.
var mainDirectory = './completedOCR/'  //directory that contains completed OCR files.
var fileNames = fs.readdirSync('./completedOCR'); //same as above

//converts completed files to an array, and deletes the first element which is useless
var completedFiles = fs.readFileSync('./OCR_Reports/completedReport.txt').toString().split('********');
completedFiles.shift(); //ilk eleman boş geliyordu, yıldızdan böldüğü için
let title = "ID,NAME,SURNAME,(0-173)SCORE,(8)ISNAMEINCLUDED,(64)ISSURNAMEINCLUDED,(100)ISLEVELINCLUDED,(1)ISCOMPANYINCLUDED\n"

//These are the list that you want to check within text file. you should add these manually, maybe with an excel formula
var idList = [
	//filename-id list here

];
var allNameList = [
	//name list here
];
var allSurnameList = [

	//surname list here
];

//keyword list here
var levelList = ["C1", "C 1", "C-1", "C2", "C 2", "C-2", "CI dü", "Ci dü"];
var companyList = ["vers", "VERS", "merkez", "MERKEZ", "ENST", "enst"];


var finalList = [];

//#region void main() :)

//run #01 and #02, comment and uncomment and run #01 and #03 together
//#01 scoring
var fullList = scoreOCR();

//#02 writing scores - run with #01
// writeScoresToFile(fullList);

//#03 parsing the directories by score-run last with #01
parseDirectories(fullList, mainDirectory);

//#endregion
//searchs name, surname, level and company in completed OCR array and gives a score to each of them. You can change the score per each. Returns the final fulfilled.
function scoreOCR() {

	for (let i = 0; i < completedFiles.length; i++) {

		let puan = 0;
		//in order to search multiple word names
		let nameList = allNameList[i].split(' ');
		nameList.forEach(element => {
			nameList.push(element.toLowerCase());
		});
		//in order to search multiple word surnames
		let surnameList = allSurnameList[i].split(' ');
		surnameList.forEach(ele => {
			surnameList.push(ele.toLowerCase());
		});

		//this is the result array, later we will write it to a text file.
		let myResult = { id: 'no', name: allNameList[i], surname: allSurnameList[i], nameIncluded: "no", surnameIncluded: "no", levelIncluded: "no", companyIncluded: "no", score: 0, fileName: fileNames[i] };

		if (completedFiles[i].includes(idList[i])) {
			myResult.id = idList[i];
		}

		if (levelList.some(substring => completedFiles[i].includes(substring))) {
			puan += 100;
			myResult.levelIncluded = "yes";
		}
		//liste göndermek gerekir, adları split yapıp.
		if (nameList.some(substring => completedFiles[i].includes(substring))) {
			puan += 8;
			myResult.nameIncluded = "yes";
		}
		if (surnameList.some(substring => completedFiles[i].includes(substring))) {
			puan += 64;
			myResult.surnameIncluded = "yes";
		}
		if (companyList.some(substring => completedFiles[i].includes(substring))) {
			puan += 1;
			myResult.companyIncluded = "yes";
		}

		// console.log(i + ": " + puan);
		myResult.score = puan;
		finalList.push(myResult);
	}
	return finalList;
}

//after scoring process, this function writes the results to the text file. Later you can use it in excel etc.
function writeScoresToFile(resultListP) {

	//Appends title to the top
	fs.appendFileSync(OCR_ReportFile, title);
	//Appends list
	resultListP.forEach(element => {

		let insertion = `${element.id},${element.name},${element.surname},${element.score},${element.nameIncluded},${element.surnameIncluded},${element.levelIncluded},${element.companyIncluded}\n`

		fs.appendFileSync(OCR_ReportFile, insertion);

	});
}


//after scoring process, this function seperates the completedOCR files to three directories, high sçore, average score and low score. Then you can check them easily.
function parseDirectories(resultListP, sourceDirectoryP) {
	resultListP.forEach(element => {

		//high score dir- which I don't need to check
		if (element.score >= 170) {
			console.log("./HIGHSCORE/" + element.fileName);

			fs.rename(sourceDirectoryP + element.fileName, "./HIGHSCORE/" + element.fileName, function (err) {
				if (err) throw err
			});

		} else if (element.score < 170 && element.score > 70) {
			//average score dir, somehow some elements are included but need to check manually.
			console.log("./AVGSCORE/" + element.fileName);

			fs.rename(sourceDirectoryP + element.fileName, "./AVGSCORE/" + element.fileName, function (err) {
				if (err) throw err
			});
		} else {
			//low resolution files, wrong files etc. need to check all.
			console.log("./LOWSCORE/" + element.fileName);
			fs.rename(sourceDirectoryP + element.fileName, "./LOWSCORE/" + element.fileName, function (err) {
				if (err) throw err
			});

		}

	});
}
