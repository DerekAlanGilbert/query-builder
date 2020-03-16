const { AND, OR } = require('../types/delimiters')
const { equalTo } = require('../types/operators')
const Query = require('./index.js')

Query.prototype.hasPropertyTypes = function(properties) {
  if (properties.length === 0) {
    this.skip = true
    return this
  }
  this.string += `(${properties.map(type => `propertyType = ${type}`).join(` ${OR} `)})`
  // this.string += ` ${AND} `
  return this
}

Query.prototype.hasHoa = function(hoaMonthlyFee) {
  if (!hoaMonthlyFee) {
    this.skip = true
    return this
  }
  this.string += `hasHoa ${equalTo} "true"`
  // this.string += ` ${AND} `
  return this
}

module.exports = Query.create()
