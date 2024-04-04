export async function commonFetch(url, method_type) {
  const response = await fetch(url, {
    method: method_type,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}

export function isUserLoggedIn() {
  const token = window.localStorage.getItem("access_token") || null;
  return token ? true : false;
}
