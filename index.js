// import { ERRORS } from './errors'
const consola = require('consola')

// #region - helper functions
const log = (type, item) => consola[type](item)
const keys = object => Object.keys(object)
const isNested = item => typeof item === 'object' && !Array.isArray(item)
const operators = {
  min: '>=',
  max: '<='
  // equalTo: '=',
  // greaterThan: '>',
  // greaterThanOrEqualTo: '>=',
  // lessThanOrEqualTo: '=<',
  // not: '!',
  // notEqualTo: '!='
}
// #endregion
// #region - mappers
const mapMinMax = minMaxObject =>
  keys(minMaxObject)
    .map(key =>
      keys(minMaxObject[key])
        .map(nestedKey => `${key} ${operators[nestedKey]} "${minMaxObject[key][nestedKey]}"`)
        .join(' and ')
    )
    .join(' and ')

const mapPropertyType = propertyArray => `(${propertyArray.map(type => `propertyType = "${type}"`).join(' or ')})`
const mapHoa = hoaObject =>
  `(${keys(hoaObject)
    .map(key => {
      if (isNested(hoaObject[key])) return keys(hoaObject[key]).map(nestedKey => `${key} ${operators[nestedKey]} ${hoaObject[key][nestedKey]}`)
      else return `${key} = "${hoaObject[key]}"`
    })
    .join(' and ')})`
// #endregion
// #region - fake data
const propertyTypesFilterables = ['singleFamily', 'condo']
const hoaFilterables = {
  hasHoa: true,
  hoaMonthlyFee: {
    max: 400
  }
}
const minMaxFilterables = {
  bedrooms: {
    min: 2,
    max: 4
  },
  bathrooms: {
    min: 2
  },
  priceInPennies: {
    min: 100000,
    max: 400000
  },
  area: {
    min: 2000,
    max: 4000
  },
  yearBuilt: {
    min: 2000,
    max: 2019
  }
}
// #endregion

const buildFilter = (glue, ...blocks) => blocks.map(([filterObject, mapCallback]) => mapCallback(filterObject)).join(glue)

const filterString = buildFilter(' and ', [minMaxFilterables, mapMinMax], [hoaFilterables, mapHoa], [propertyTypesFilterables, mapPropertyType])

log('success', `Generated filter string:\n ${filterString}`)
