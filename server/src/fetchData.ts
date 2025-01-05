import { fetchDataAndPopulateDatabase } from "./fetchandpopulate";

if (process.env.NODE_ENV !== "test") {
  fetchDataAndPopulateDatabase();
}
