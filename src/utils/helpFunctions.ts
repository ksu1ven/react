import { ParsedUrlQuery } from "querystring";
import { URLParams } from "./types";

export function updateQueryParams(
  params: ParsedUrlQuery,
  newKey: "page" | "search" | "details" | "search" | "limit",
  newValue: string
) {
  let newParams = params as URLParams;
  switch (newKey) {
    case "search": {
      delete newParams.page;
      if (!newValue) delete newParams.search;
      else {
        newParams[newKey] = newValue;
      }
      break;
    }
    case "limit":
      delete newParams.page;
      newParams[newKey] = newValue;
      break;
    default:
      if (!newValue) delete newParams[newKey];
      else {
        newParams[newKey] = newValue;
      }
  }

  return new URLSearchParams(newParams);
}
