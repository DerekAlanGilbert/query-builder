// import { ERRORS } from './errors'
const consola = require('consola')

const log = (type, item) => consola[type](item)
const keys = object => Object.keys(object)
const isNested = item => typeof item === 'object' && !Array.isArray(item)
const operators = {
  min: '<=',
  max: '>=',
  equalsTo: '='
}
const mapMinMax = minMaxObject =>
  keys(minMaxObject)
    .map(key =>
      keys(minMaxObject[key])
        .map(nestedKey => `${key} ${operators[nestedKey]} "${minMaxObject[key][nestedKey]}"`)
        .join(' and ')
    )
    .join(' and ')

const mapPropertyType = (propertyArray, d) => `(${propertyArray.map(type => `propertyType = "${type}"`).join(` ${d} `)})`
const mapHoa = hoaObject =>
  `(${keys(hoaObject)
    .map(key => {
      if (isNested(hoaObject[key])) return keys(hoaObject[key]).map(nestedKey => `${key} ${operators[nestedKey]} ${hoaObject[key][nestedKey]}`)
      else return `${key} = "${hoaObject[key]}"`
    })
    .join(' and ')})`

const propertyTypesFilterables = ['singleFamily', 'condo']
// examples objects start
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

const buildFilter = (...blocks) => blocks.map(([filterObject, mapCallback]) => mapCallback(filterObject)).join(' and ')

const filterString = buildFilter([minMaxFilterables, mapMinMax], [hoaFilterables, mapHoa], [propertyTypesFilterables, mapPropertyType])
log('success', `Generated filter string:\n ${filterString}`)
