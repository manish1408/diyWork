import { Client } from "./prismicHelpers";
import Prismic from "@prismicio/client";

async function fetchDocs(page = 1, routes = []) {
  const response = await Client().query("", { pageSize: 100, lang: "*", page });
  const allRoutes = routes.concat(response.results);
  if (response.results_size + routes.length < response.total_results_size) {
    return fetchDocs(page + 1, allRoutes);
  }
  return [...new Set(allRoutes)];
}

/** Fetches all Prismic documents and filters them (eg. by document type).
 *  In production, you would probably query documents by type instead of filtering them.
 **/
export const queryRepeatableDocuments = async (filter) => {
  const allRoutes = await fetchDocs();
  return allRoutes.filter(filter);
};

export const queryCategories = async () => {
  const categories =
    (await Client().query(
      Prismic.Predicates.at("document.type", "category")
    )) || {};
  return categories.results;
};

export const queryAuthors = async () => {
  const authors =
    (await Client().query(Prismic.Predicates.at("document.type", "authors"))) ||
    {};
  return authors.results;
};

export const homePageQuery = async () => {
  const allRoutes = await fetchDocs();
  return allRoutes.filter((doc) => doc.type === "post").slice(0, 5);
};
