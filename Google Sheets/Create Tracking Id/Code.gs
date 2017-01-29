/**
 * Fetches and sets an incremented tracking id from the Script Properties.
 */
function setTrackingId() {
  var s = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var sheetName = s.getName();
  var rowNum = s.getActiveCell().getRow();
  var scriptProperties = PropertiesService.getScriptProperties();
  var idNumber = scriptProperties.getProperty(sheetName);
  if(!idNumber){
    idNumber = 1;
  }else{
    idNumber++;
  }
  scriptProperties.setProperty(sheetName, idNumber);
  var idString = createId(sheetName, idNumber);
  updateId(s, rowNum, idString);
}

/**
 * Updates Column A for the highlighted row with the idString.
 * @param {Sheet} A sheet object.
 * @param {number} The integer indicating the current sheet row.
 * @param {String} The id string for the current row.
 */
function updateId(sheet, row, idString){
  sheet.getRange(row, 1).setValue(idString);
}

/**
 * Creates the IdString based on the first letter of the sheet plus the
 * id number.
 * @param {String} The name of the google sheet.
 * @param {String} The idNumber as retrieved from the Script Properties.
 * @return {String} The formatted id e.g. #B00024, #T00159, etc.
 */
function createId(sheetName, idNumber){
  var str = "" + idNumber;
  var sheetFirstLetter = sheetName.substr(0,1);
  var pad = "#" + sheetFirstLetter + "00000";
  var id = pad.substring(0, pad.length - str.length) + str;
  return id;
}

/**
 * Adds the setTrackingId function to the menu bar.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Tracking IDs')
      .addItem('Set Tracking Id', 'setTrackingId')
      .addToUi();
}