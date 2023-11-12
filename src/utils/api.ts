import { apiResponse } from './types';

export async function searchCards(
  searchValue: string,
  pageNumber: number,
  pageSize: number
) {
  const url = `https://stapi.co/api/v1/rest/animal/search?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  try {
    const response = searchValue
      ? await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `${encodeURIComponent('name')}=${encodeURIComponent(
            searchValue
          )}`,
        })
      : await fetch(url, {
          method: 'GET',
        });

    const json: apiResponse = await response.json();
    return json;
  } catch {
    throw new Error('Error with server');
  }
}
