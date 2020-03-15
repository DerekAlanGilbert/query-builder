const consola = require('consola')
const { HOA, BEDROOMS, BATHROOMS, AREA, LOT, YEARS } = require('../types/listings')
const ListingsQuery = require('./search.js')

const hoaMonthlyFee = 300
const bedroomsMin = 2
const bedrooomsMax = 4
const bathroomsMin = 2
const bathroomsMax = 4
const areaMin = 3000
const areaMax = 5000
const lotSizeMin = 400
const lotSizeMax = 900
const yearBuiltMin = 1989
const yearBuiltMax = 2010
const types = ['singleFamily', 'multiFamily']

const query = ListingsQuery.create()
  .where(BEDROOMS)
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

consola.success('listings-query:', query.string)
