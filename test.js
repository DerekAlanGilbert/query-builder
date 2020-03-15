const Query = require('./index.js')

Query.prototype.hasPropertyTypes = function(properties) {
  this.string += `(${properties.map(type => `propertyType = ${type}`).join(' or ')})`
  return this
}

const testCase = Query.create()
  .where('bedrooms < 3')
  .and()
  .hasPropertyTypes(['singleFamily', 'multiFamily', 'ranch'])

console.log('testCase:', testCase.string)
