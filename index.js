function Query() {
  this.string = ''
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

// const queryString = Query.create()
//   .where('bedrooms >= 10')
//   .and()
//   .where('bathrooms >= 3')

// console.log(queryString.string)

module.exports = Query
