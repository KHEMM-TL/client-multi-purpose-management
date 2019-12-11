import { getApi } from './config'

const api = getApi('/employee')

export async function auth (login: string, password: string) {
  const req = await api.post('', { login, password })
  return req.data
}
