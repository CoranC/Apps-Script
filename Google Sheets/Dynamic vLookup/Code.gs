/**
 * Returns the Nth occurence of a value in the targetColumn from a searchKey in sourceColumn..
 * @param {String} searchKey The value to search for. For example, 42, "Cats", or I24.
 * @param {Range} sourceColumn The range to consider for the search. The first column in the range is searched for the key specified in searchKey.
 * @param {Range} targetColumn The column range from which the value should be returned.
 * @param {number} n The rank of occurence you are looking for. e.g. If there are two possible occurences of a search key and you require the second occurence, input 2 into this field.
 * @customfunction
 */
function lookupByNthValue(searchKey, sourceColumn, targetColumn, n) {
  if(arguments.length < 4){
    throw new Error( "Only " + arguments.length + " arguments provided. Requires 4." );
  }
  var count = 1;
  for(var i = 0; i < sourceColumn.length; i++){
    if(sourceColumn[i] != searchKey){
      continue;
    }
    if(count == n){
      return targetColumn[i];
    }
    count++;
  }
}
