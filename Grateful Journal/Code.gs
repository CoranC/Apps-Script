/**
 * The logged in user's email address.
 * @const {string}
 */
USER_EMAIL = Session.getEffectiveUser().getEmail();

/**
 * The name of the spreadsheet sheet used as the database.
 * @const {string}
 */
GRATEFUL_DB_SHEET = 'Grateful DB';

/**
 * The favicon url.
 * @const {string}
 */
FAVICON = 'http://www.iconsdb.com/icons/preview/caribbean-blue/circle-xxl.png';

// Creates and saves a url reference to a private spreadsheet for each new user
// to save data to.
if(PropertiesService.getScriptProperties().getProperty(USER_EMAIL)){
  SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty(
      USER_EMAIL);
  SPREADSHEET = SpreadsheetApp.openById(SPREADSHEET_ID);
}else{
  SPREADSHEET = SpreadsheetApp.create('Grateful Journal - ' + USER_EMAIL);
  SPREADSHEET_ID = SPREADSHEET.getId();
  PropertiesService.getScriptProperties().setProperty(USER_EMAIL,
      SPREADSHEET_ID);
  SHEET = SPREADSHEET.getSheets()[0];
  SHEET.setName(GRATEFUL_DB_SHEET);
  SHEET.getRange(1, 1, 1, 3).setValues([['Date', 'User', 'Entry']]);

}

/**
 * Special function that handles HTTP GET requests to the published web app.
 * @return {HtmlOutput} The HTML page to be served.
 */
function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
      .setTitle('Grateful Journal')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .addMetaTag('viewport', 'width=device-width, initial-scale=0.85')
      .setFaviconUrl(FAVICON);
}

/**
 * Gets the current date in the format "YYYY-MM-DD"
 * @return {String} The current date.
 */
function _getDate() {
  return Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM-dd');
}

/**
 * Gets the username from the logged in user's email.
 * @return {String} A username.
 */
function _getUsername() {
  var email = Session.getEffectiveUser().getEmail();
  return email.substr(0, email.search('@'));
}

/**
 * Saves data to the spreadsheet.
 * @param {String} The date.
 * @param {String} The username.
 * @param {String} The grateful entry the user has submitted.
 */
function _saveEntry(date, username, entry) {
  if(!date || !username || !entry ){
    return;
  }
  var sheet = SPREADSHEET.getSheetByName(GRATEFUL_DB_SHEET)
  sheet.getRange(sheet.getLastRow()+1, 1, 1, 3).setValues([[date, username,
      entry]])
}

/**
 * Gets data from the spreadsheet.
 * @return {String[][]} The grateful values as submitted by the web app.
 */
function _getPastGratefuls() {
  var sheet = SPREADSHEET.getSheetByName(GRATEFUL_DB_SHEET);
  return sheet.getRange(2, 3, sheet.getLastRow(), 1).getValues();
}