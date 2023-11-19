export function createCardsResponseMock(
  arrLength: number,
  limit: number,
  details: boolean
) {
  const animalsJSON = createCardsListResponseMock(arrLength, limit, details);
  const response = {
    animals: animalsJSON,
    page: {
      firstPage: 0,
      lastPage: Math.ceil(arrLength / limit),
      numberOfElements: arrLength,
      pageNumber: 0,
      pageSize: limit,
      totalElements: arrLength,
      totalPages: Math.ceil(arrLength / limit),
    },
    sort: {
      clauses: [],
    },
  };
  return response;
}
export function createCardsListResponseMock(
  arrLength: number,
  limit: number,
  details: boolean
) {
  return new Array(arrLength)
    .fill(undefined)
    .map((_, ind) => {
      return {
        avian: true,
        canine: false,
        earthAnimal: false,
        earthInsect: false,
        feline: false,
        name: details ? 'details' : `testCard-${ind}`,
        uid: ind.toString(),
      };
    })
    .slice(0, limit);
}
