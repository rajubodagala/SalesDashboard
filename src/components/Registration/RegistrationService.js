import http from "../Pages/httpService";
import auth from "../Pages/authService";
const apiCustEndpoint = "/customer";
const apiItemEndpoint = "/item";
const apiRegisterEndpoint = "/register";
const user = auth.getCurrentUser();

export function getCustomers() {
  return http.get(apiCustEndpoint);
}

export function getItems() {
    return http.get(apiItemEndpoint);
  }

  export function saveRegistration(data,id) {
    console.log(data,id);
    return http.post(apiRegisterEndpoint+"/"+id , data);
  }

  