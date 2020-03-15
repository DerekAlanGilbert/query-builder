const Query = require('./index.js')

Query.prototype.hasPropertyTypes = function(properties) {
  if (properties.length === 0) return this
  this.string += `(${properties.map(type => `propertyType = ${type}`).join(' or ')})`
  return this
}

Query.prototype.hasHoa = function(hoaMonthlyFee) {
  if (!hoaMonthlyFee) return this
  this.string += 'hasHoa = "true"'
  return this
}

module.exports = Query
