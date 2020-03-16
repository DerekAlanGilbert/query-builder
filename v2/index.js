// const { lastItemInString, removeItemFromString } = require('../utils')
const { greaterThanOrEqualTo, lesserThanOrEqualTo } = require('../types/operators')
const { OR, AND } = require('../types/delimiters')

function Query(str = '') {
  this.string = str
}

Query.create = function() {
  return new Query()
}

Query.prototype.where = function(str) {
  this.string += str
  return this
}

Query.prototype.isBetween = function(min, max) {
  const lastItemInString = this.string.split(' ').pop()
  this.string = this.string.replace(lastItemInString, '')
  if (!min && !max) {
    return this
  } else if (min && max) {
    this.string += `${lastItemInString} ${greaterThanOrEqualTo} ${min} ${AND} ${lastItemInString} ${lesserThanOrEqualTo} ${max}`
  } else if (min && !max) {
    this.string += `${lastItemInString} ${greaterThanOrEqualTo} ${min}`
  } else if (!min && max) {
    this.string += `${lastItemInString} ${lesserThanOrEqualTo} ${max}`
  }
  this.string += ` ${AND} `
  return this
}

Query.prototype.isLessThan = function(value) {
  if (!value) return this
  const lastItemInString = this.string.split(' ').pop()
  this.string = this.string.replace(lastItemInString, '')
  this.string += `${lastItemInString} ${lesserThanOrEqualTo} ${value}`
  this.string += ` ${AND} `
  return this
}

Query.prototype.isGreaterThan = function(value) {
  if (!value) return this
  const lastItemInString = this.string.split(' ').pop()
  this.string = this.string.replace(lastItemInString, '')
  this.string += `${lastItemInString} ${greaterThanOrEqualTo} ${value}`
  this.string += ` ${AND} `
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

Query.prototype.build = function() {
  // this.string = this.string.trim()
  this.string = this.string.slice(0, -4)
  return this.string
}

module.exports = Query
