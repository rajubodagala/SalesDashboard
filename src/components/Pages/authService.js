import http from "./httpService";

const apiEndpoint = "/login";
const tokenKey = "token";
const rtokenKey = "rtoken";
const path = "userpath";


export async function login(username, password) {
  const { data} = await http.post(apiEndpoint, { username, password });
   localStorage.setItem(tokenKey, data.loginResult[0].UserName);
   localStorage.setItem(path, "%"+ data.loginResult[0].Path+ '%');
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(path);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getrJwt() {
  return localStorage.getItem(rtokenKey);
}

export function getUserPath() {
  return localStorage.getItem(path);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);  
    return jwt;
  } catch (ex) {
    return null;
  }
}

export default { login, logout, getCurrentUser,getUserPath, loginWithJwt, getJwt };
