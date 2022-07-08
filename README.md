# Tesseract OCR APP

## HISTORY

I had to check the Turkish exam files of nearly 33k students and wanted to complete it ASAP. In a correct file, there are student name, surname (one of them at least), C1 or C2 level (less is unacceptable) and a university name. So I have created this app to OCR and analyze files.

## HOW TO USE

### CREATE FOLDERS
awaitingOCR
badFiles
completedOCR
AVGSCORE
HIGHSCORE
LOWSCORE
### OCR APP

First, I have rotated all the files using Windows Photo editor.
Then, copy them into awaitingOCR folder. (between 50kb to 1024kb)
in the terminal,
"node OCRApp"
Enjoy your day! But keep an eye on it for bad image files.

### AFTER OCR

When the OCR process is completed, there will be a single text file which includes all OCR results. If you have a excel checklist, keywords etc. you can use
"node fileOps.js"
to analyze this data, give a score and parse them into several directories by score.

## TROUBLESHOOTING

There are some bad image files which cause error and the app crashes. Write
"node clearError"
and then write
"node OCRApp"
again to restart the App.

(I tried to handle but I was not able to. I guess it is derived from tesseract library. For stackoverflow issue:

)

### TIPS:

You can always use cmd "dir /b" to list the file names in a directory.
You can use excel formula which converts cell values to an array element ="'"&A2&"',"
This app uses a lot of memory and CPU, so try to use it in a seperate machine, for example put your laptop next to your Desktop PC etc.
In the function parameters I have used "P" at the end of the word, in order to emphasize it is a parameter- for beginners and newbies.
You can customize the scores, keywords, filenames etc.
