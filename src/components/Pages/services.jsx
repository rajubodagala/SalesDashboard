import http from "./httpService";
import auth from "./authService";
const apiEndpoint = "/transactions";
const user = auth.getCurrentUser();

function transactionUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getTransactions(path,saleDate) {
  var data={path,saleDate};
  return http.post(apiEndpoint,data);
}

