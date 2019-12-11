import Axios from 'axios'
const baseURL = 'http://localhost:3000/api'

export function getApi (pathname: string) {
  return Axios.create({
    baseURL: baseURL + pathname
  })
}
