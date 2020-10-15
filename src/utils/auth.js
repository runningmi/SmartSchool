import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const RolesKey = 'Admin-Roles'
const Name = 'Name'
const RoustName = "RoustName"

export function getToken() {
  return Cookies.get(TokenKey)
}
export function getRoles() {
  return Cookies.get(RolesKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setRoles(token) {
  return Cookies.set(RolesKey, token)
}

export function setName(name) {
  return Cookies.set(Name, name)
}
export function getName() {
  return Cookies.get(Name)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function removeRoles() {
  return Cookies.remove(RolesKey)
}
export function removeName() {
  return Cookies.remove(Name)
}

export function saveRoustName(roustname) {
  return Cookies.set(RoustName, roustname)
}
export function getRoustName() {
  return Cookies.get(RoustName)
}
export function removeRoustName() {
  return Cookies.remove(RoustName)
}
