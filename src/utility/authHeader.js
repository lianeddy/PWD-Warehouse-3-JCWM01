import { parseJwt } from "./parsing";

export default function authHeader() {
  const userTokenStorage = localStorage.getItem("dataToken");
  const decodedJwt = parseJwt(userTokenStorage);

  console.log(userTokenStorage);
  console.log(decodedJwt);

  if (decodedJwt && userTokenStorage) {
    return { Authorization: "Bearer " + userTokenStorage };
  } else {
    return {};
  }
}
