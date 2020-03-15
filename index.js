function Query(str = '') {
  this.string = str
}

Query.create = function(str) {
  return new Query(str)
}

Query.prototype.where = function(str) {
  this.string += str
  return this
}
Query.prototype.and = function(str) {
  this.string += ' and '
  return this
}

Query.prototype.or = function(str) {
  this.string += ' or '
  return this
}

const queryString = Query.create()
  .where('bedrooms >= 10')
  .and()
  .where('bathrooms >= 3')
  .and()
  .where('propertyType = singleFamily')

console.log(queryString.string)
