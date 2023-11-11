export function createCardsResponseMock(
  arrLength: number,
  limit: number,
  postRequest: boolean
) {
  const animalsJSON = createCardsListResponseMock(
    arrLength,
    limit,
    postRequest
  );
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
  postRequest: boolean
) {
  return new Array(arrLength)
    .fill(undefined)
    .map((el, ind) => {
      return {
        avian: true,
        canine: false,
        earthAnimal: false,
        earthInsect: false,
        feline: false,
        name: postRequest ? 'postRequestCardName' : `testCard-${ind}`,
        uid: ind.toString(),
      };
    })
    .slice(0, limit);
}
