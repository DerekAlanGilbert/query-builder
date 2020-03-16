const consola = require('consola')
const { HOA, BEDROOMS, BATHROOMS, AREA, LOT, YEARS } = require('../types/listings')
const ListingsQuery = require('./search.js')

// #region --  data
const hoaMonthlyFee = null
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
  .and()
  .where(BATHROOMS)
  .isBetween(bathroomsMin, bathroomsMax)
  .and()
  .where(YEARS)
  .isBetween(yearBuiltMin, yearBuiltMax)
  .and()
  .where(AREA)
  .isBetween(areaMin, areaMax)
  .and()
  .where(LOT)
  .isBetween(lotSizeMin, lotSizeMax)
  .and()
  .where(HOA)
  .isLessThan(hoaMonthlyFee)
  .and()
  .hasHoa(hoaMonthlyFee)
  .and()
  .hasPropertyTypes(types)
  .build()

consola.success('GET listings-query:', filterString)
