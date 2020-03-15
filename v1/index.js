const consola = require('consola')

// #region - helper functions
const log = (type, item) => consola[type](item)
const keys = object => Object.keys(object)
const isNested = item => typeof item === 'object' && !Array.isArray(item)
const operators = {
  min: '>=',
  max: '<='
}
// #endregion
// #region - mappers
const mapMinMax = minMaxObject =>
  keys(minMaxObject)
    .map(key => {
      return keys(minMaxObject[key])
        .map(nestedKey => {
          if (!minMaxObject[key][nestedKey]) return ''
          return `${key} ${operators[nestedKey]} "${minMaxObject[key][nestedKey]}"`
        })
        .filter(el => el !== '')
        .join(' and ')
    })
    .filter(el => el !== '')
    .join(' and ')

const mapPropertyType = propertyArray => {
  if (propertyArray.length <= 1) return ''
  return `(${propertyArray.map(type => `propertyType = "${type}"`).join(' or ')})`
}
const mapHoa = hoaObject =>
  `(${keys(hoaObject)
    .map(key => {
      if (isNested(hoaObject[key])) return keys(hoaObject[key]).map(nestedKey => `${key} ${operators[nestedKey]} ${hoaObject[key][nestedKey]}`)
      else return `${key} = "${hoaObject[key]}"`
    })
    .join(' and ')})`
// #endregion
// #region - fake data
const propertyTypesFilterables = []
const hoaFilterables = {
  hasHoa: true,
  hoaMonthlyFee: {
    max: 400
  }
}
const minMaxFilterables = {
  bedrooms: {
    min: 2,
    max: null
  },
  bathrooms: {
    min: 2
  },
  priceInPennies: {
    min: 100000,
    max: null
  },
  area: {
    min: null,
    max: null
  },
  yearBuilt: {
    min: null,
    max: null
  }
}
// #endregion

const buildFilter = (...blocks) =>
  blocks
    .map(([filterObject, mapCallback]) => mapCallback(filterObject))
    .filter(el => el !== '')
    .join(' and ')

const filterString = buildFilter([minMaxFilterables, mapMinMax], [hoaFilterables, mapHoa], [propertyTypesFilterables, mapPropertyType])

log('success', `Generated filter string:\n ${filterString}`)
