import queryString from "query-string";

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (err) {
    return null;
  }
};

export const parseQueryString = (payload) => queryString.parse(payload);
