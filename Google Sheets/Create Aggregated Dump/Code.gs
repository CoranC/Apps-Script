/**
 * Sorts targetData values based on refData values.
 * @param {Object[]} An array of values to sort.
 * @param {Object[]} An array of values to base sorting from.
 * @param {Object[]} The sorted targetData values.
 */
function refSort(targetData, refData) {
  // Create an array of indices [0, 1, 2, ...N].
  var indices = Object.keys(refData);

  // Sort array of indices according to the reference data.
  indices.sort(function(indexA, indexB) {
    if (refData[indexA] < refData[indexB]) {
      return -1;
    } else if (refData[indexA] > refData[indexB]) {
      return 1;
    }
    return 0;
  });

  // Map array of indices to corresponding values of the target array.
  return indices.map(function(index) {
    return targetData[index];
  });
}

/**
 * Creates a new sheet comprising of the multiple sheets data sorted by sheet name.
 */
function createAggregatedDump(){
  var s = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = s.getSheets();
  var sheetNames = [sheet.getSheetName() for each(sheet in sheets)];
  var sortedSheetsByName = refSort(sheets, sheetNames);
  var newAggregatedSheet = s.insertSheet("Aggregated Dump");
  for(var i = 0; i < sortedSheetsByName.length; i++){
    var sheet = sortedSheetsByName[i];
    var offsetRow = (i==0) ? 0 : 1; // used to only include the table headers once
    sheet.getRange(1+offsetRow, 1, sheet.getLastRow(), sheet.getLastColumn()).
      copyValuesToRange(newAggregatedSheet, 1, sheet.getLastColumn(),
          newAggregatedSheet.getLastRow()+1,
          sheet.getLastRow() + newAggregatedSheet.getLastRow()+1)
  }
}

/**
 * Adds the createAggregatedDump function to the menu bar.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Aggregation')
      .addItem('Create Aggregated Dump', 'createAggregatedDump')
      .addToUi();
}