// import { ERRORS } from './errors'

const log = item => console.log(item)
const keys = object => Object.keys(object)
const isNested = item => typeof item === 'object' && !Array.isArray(item)
const operators = {
  min: '<=',
  max: '>=',
  equalsTo: '='
}
const mapMinMax = object => {
  return keys(object)
    .map(key => {
      return keys(object[key])
        .map(nestedKey => `${key} ${operators[nestedKey]} "${object[key][nestedKey]}"`)
        .join(' and ')
    })
    .join(' and ')
}
const mapPropertyType = propertyArray => `(${propertyArray.map(type => `propertyType = "${type}"`).join(' or ')})`
const mapHoa = HOAObject => {
  return keys(HOAObject)
    .map(key => {
      if (isNested(HOAObject[key])) {
        return keys(HOAObject[key]).map(nestedKey => `${key} ${operators[nestedKey]} ${HOAObject[key][nestedKey]}`)
      } else {
        return `${key} = "${HOAObject[key]}"`
      }
    })
    .join(' and ')
}

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

const buildFilter = (...blocks) => {
  return blocks
    .map(block => {
      const [filterObject, mapCallback] = block
      log(filterObject)
      return mapCallback(filterObject)
    })
    .join(' and ')
}

const filterString = buildFilter([minMaxFilterables, mapMinMax], [propertyTypesFilterables, mapPropertyType], [hoaFilterables, mapHoa])
log(filterString)
