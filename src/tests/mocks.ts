export function createCardsResponseMock(arrLength: number, limit: number) {
  const animalsJSON = createCardsListResponseMock(arrLength, limit);
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
export function createCardsListResponseMock(arrLength: number, limit: number) {
  return new Array(arrLength)
    .fill(undefined)
    .map((_, ind) => {
      return {
        avian: true,
        canine: false,
        earthAnimal: false,
        earthInsect: false,
        feline: false,
        name: `testCard-${ind}`,
        uid: ind.toString(),
      };
    })
    .slice(0, limit);
}

export const useMutationMockValue = [
  () => {},
  {
    data: {
      animals: [
        {
          avian: true,
          canine: false,
          earthAnimal: false,
          earthInsect: false,
          feline: false,
          name: 'postRequestCardName',
          uid: '0',
        },
      ],
      page: {
        firstPage: 0,
        lastPage: 1,
        numberOfElements: 1,
        pageNumber: 0,
        pageSize: 10,
        totalElements: 1,
        totalPages: 1,
      },
      sort: {
        clauses: [],
      },
    },
    endpointName: 'searchByValue',
    fulfilledTimeStamp: 1700323816522,
    isError: false,
    isLoading: false,
    isSuccess: true,
    isUninitialized: false,
    originalArgs: {
      pageNumber: 0,
      pageSize: 1000,
      searchValue: 'postRequestCardName',
    },
    requestId: 'k4PYHjbuSvZuXK50hpvQu',
    reset: () => {},
    startedTimeStamp: 1700323816487,
    status: 'fulfilled',
  },
];
