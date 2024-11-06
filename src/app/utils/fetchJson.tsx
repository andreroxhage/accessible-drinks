export default async function fetchJson(url: string) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${url} returned status ${response.status}`);
    }

    return response.text().then(text => {
      return text ? JSON.parse(text) : {};
    });
  });
}
