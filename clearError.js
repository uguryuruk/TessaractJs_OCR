import * as fs from 'fs';

var fileNames = fs.readdirSync('./awaitingOCR');

clearErrorFile(fileNames);

//moves bad image file to badFiles directory

export function clearErrorFile(fileNamesP) {
	fs.rename("./awaitingOCR/" + fileNamesP[0], "./badFiles/" + fileNamesP[0], function (err) {
		if (err) throw err
		console.log(`${fileNamesP[0]} Successfully moved!`)
	});
}
