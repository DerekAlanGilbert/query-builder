const { greaterThanOrEqualTo, lesserThanOrEqualTo } = require('../types/operators')
const { OR, AND } = require('../types/delimiters')

function Query(str = '') {
  this.string = str
  this.skip = false
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
    this.skip = true
    return this
  } else if (min && max) {
    this.string += `${lastItemInString} ${greaterThanOrEqualTo} ${min} ${AND} ${lastItemInString} ${lesserThanOrEqualTo} ${max}`
  } else if (min && !max) {
    this.string += `${lastItemInString} ${greaterThanOrEqualTo} ${min}`
  } else if (!min && max) {
    this.string += `${lastItemInString} ${lesserThanOrEqualTo} ${max}`
  }
  // this.string += ` ${AND} `
  return this
}

Query.prototype.isLessThan = function(value) {
  const lastItemInString = this.string.split(' ').pop()
  this.string = this.string.replace(lastItemInString, '')
  if (!value) {
    this.skip = true
    return this
  }
  this.string += `${lastItemInString} ${lesserThanOrEqualTo} ${value}`
  // this.string += ` ${AND} `
  return this
}

Query.prototype.isGreaterThan = function(value) {
  const lastItemInString = this.string.split(' ').pop()
  this.string = this.string.replace(lastItemInString, '')
  if (!value) {
    this.skip = true
    return this
  }
  this.string += `${lastItemInString} ${greaterThanOrEqualTo} ${value}`
  // this.string += ` ${AND} `
  return this
}

Query.prototype.and = function() {
  if (this.skip) {
    this.skip = false
    return this
  }
  this.string += ` ${AND} `
  return this
}

Query.prototype.or = function() {
  if (this.skip) {
    this.skip = false
    return this
  }
  this.string += ` ${OR} `
  return this
}

Query.prototype.build = function() {
  return this.string
}

module.exports = Query
