/**
 * The spreadsheet sheet.
 * @const {Sheet}
 */
var SHEET = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

/**
 * The wikipedia URL prefix.
 * @const {String}
 */
var URL_PREFIX = 'https://en.wikipedia.org/wiki/Category:'
    + 'Association_football_clubs_established_in_';

/**
 * Calls getTeamsForYear method for each year between startYear and endYear.
 */
function main(){
  var years = [];
  var startYear = 1890;
  var endYear = 1916;
  for(var year = startYear; year <= endYear; year++){
    getTeamsForYear(year.toString());
  }
}

/**
 * Scrapes wikipedia page for soccer teams & updates sheet values [Year, Team].
 * @param {String} The year to scrape data for. e.g. "1920".
 */
function getTeamsForYear(year) {
  var allTeams = [];
  var html = UrlFetchApp.fetch(URL_PREFIX + year).getContentText();
  var doc = XmlService.parse(html);
  var html = doc.getRootElement();
  var outerCategoryElem = getElementsByClassName(html, 'mw-category')[0];
  var outerCategoryChildren = outerCategoryElem.getChildren();
  for(var i = 0; i < outerCategoryChildren.length; i++){
    var innerCategoryElem = outerCategoryChildren[i];
    var innerCategoryChildren = innerCategoryElem.getChildren();
    for(var j = 0; j < innerCategoryChildren.length; j++){
      var teamElem = innerCategoryChildren[j];
      var teamElemTag = teamElem.getName();
      if(teamElemTag == "ul"){
        teams = teamElem.getValue().split("\n");
        for(var k = 0; k < teams.length; k++){
          allTeams.push([year, teams[k]])
        }
      }
    }
  }
  var lastRow = SHEET.getLastRow();
  SHEET.getRange(lastRow+1, 1, allTeams.length, 2).setValues(allTeams);
}

// Referenced from https://sites.google.com/site/scriptsexamples/learn-by-example/parsing-html
/**
 * Finds Dom elements based on class name
 * @param {String} The parent element.
 * @param {String} The class name of the element being searched for.
 * @return {Element[]} An array of Dom elements.
 */
function getElementsByClassName(element, classToFind) {
  var data = [];
  var descendants = element.getDescendants();
  descendants.push(element);
  for(i in descendants) {
    var elt = descendants[i].asElement();
    if(elt != null) {
      var classes = elt.getAttribute('class');
      if(classes != null) {
        classes = classes.getValue();
        if(classes == classToFind) data.push(elt);
        else {
          classes = classes.split(' ');
          for(j in classes) {
            if(classes[j] == classToFind) {
              data.push(elt);
              break;
            }
          }
        }
      }
    }
  }
  return data;
}