###Create Tracking Id

A Reddit user requested a way to keep track of bug and task ids in a Google Spreadsheet. The user wanted a simple way to increment bug and task ids without using formulas. The reason for this is that sorting the spreadsheet would also sort the formula and break the logic that allowed the increment of the ids.

The request was as follows:
* Need an ID number for bugs or tasks.
* Should follow this structure "#B00001" for bugs and "#T00001" for tasks.
* Should increment each time a new bug or task is created.
* Should be written as a value and not as a formula so the cells can be formatted without losing id sequence.
* Should be simple to add to the sheet.

The solution was as follows:
* Create a function that creates a bug id or task id and assigns that id value to the ScriptProperties so it can be recalled and incremented.
* Use the Sheet Names "Bugs" and "Tasks" as the user had mentioned to determine if a bug or task was required. Strip the first letter from the sheet and append it to the id.
* Add a menu item to the Spreadsheet to easily add it to the sheet.

URL: https://docs.google.com/spreadsheets/d/1GioZ7GSMsEfV0i2LQnVBpwIZXpPar4tdCg_HkIDEEZ8/edit#gid=0
