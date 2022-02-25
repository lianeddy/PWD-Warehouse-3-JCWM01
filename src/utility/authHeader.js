import { parseJwt } from "./parsing";

export default function authHeader() {
  const userTokenStorage = localStorage.getItem("dataToken");
  const decodedJwt = parseJwt(userTokenStorage);

  if (decodedJwt && userTokenStorage) {
    return { Authorization: "Bearer " + userTokenStorage };
  } else {
    return {};
  }
}
