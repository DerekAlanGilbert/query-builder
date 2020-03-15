const { greaterThan, lesserThan } = require('../types/operators')
const { OR, AND } = require('../types/delimiters')

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

Query.prototype.isBetween = function(min, max) {
  if (!min && !max) return this
  const lastItemInString = this.string.split(' ').pop()
  this.string = this.string.replace(lastItemInString, '')
  this.string += `(${lastItemInString} ${greaterThan} ${min} ${AND} ${lastItemInString} ${lesserThan} ${max})`
  return this
}

Query.prototype.isLessThan = function(value) {
  if (!value) return this
  const lastItemInString = this.string.split(' ').pop()
  this.string = this.string.replace(lastItemInString, '')
  this.string += `${lastItemInString} ${lesserThan} ${value}`
  return this
}

Query.prototype.isGreaterThan = function(value) {
  if (!value) return this
  const lastItemInString = this.string.split(' ').pop()
  this.string = this.string.replace(lastItemInString, '')
  this.string += `${lastItemInString} ${lesserThan} ${value}`
  return this
}

Query.prototype.and = function() {
  this.string += ` ${AND} `
  return this
}

Query.prototype.or = function() {
  this.string += ` ${OR} `
  return this
}

module.exports = Query
