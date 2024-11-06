export default async function fetchJson(url) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${url} returned status ${response.status}`);
    }
    return response.json();
  });
}
