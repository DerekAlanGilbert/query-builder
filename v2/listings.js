const consola = require('consola')
const { HOA, BEDROOMS, BATHROOMS, AREA, LOT, YEARS } = require('../types/listings')
const ListingsQuery = require('./search.js')

// #region --  data
const hoaMonthlyFee = 300
const bedroomsMin = 2
const bedrooomsMax = 4
const bathroomsMin = 2
const bathroomsMax = null
const areaMin = null
const areaMax = null
const lotSizeMin = null
const lotSizeMax = null
const yearBuiltMin = null
const yearBuiltMax = null
const types = ['singleFamily']
// #endregion -- data

const filterString = ListingsQuery.where(BEDROOMS)
  .isBetween(bedroomsMin, bedrooomsMax)
  .where(BATHROOMS)
  .isBetween(bathroomsMin, bathroomsMax)
  .where(YEARS)
  .isBetween(yearBuiltMin, yearBuiltMax)
  .where(AREA)
  .isBetween(areaMin, areaMax)
  .where(LOT)
  .isBetween(lotSizeMin, lotSizeMax)
  .where(HOA)
  .isLessThan(hoaMonthlyFee)
  .hasHoa(hoaMonthlyFee)
  .hasPropertyTypes(types)
  .build()

consola.success('GET listings-query:', filterString)
