import axios from 'axios'

const BASE_URL = 'localhost:3003/api'

export function getList() {
  const request = axios.get(`${}/billingCycles`)
  return  {
    type: 'BILLING_CYCLES_FETCHED',
    payload: request
  }
}