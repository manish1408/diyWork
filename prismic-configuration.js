// -- Prismic API endpoint
// Determines which repository to query and fetch data from
// Configure your site's access point here
export const apiEndpoint = "https://diywork.cdn.prismic.io/api/v2";

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = "";

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (doc.type === "post") {
    return `/blog/${doc.uid}`;
  }
  return "/";
};

// Additional helper function for Next/Link components
export const hrefResolver = (doc) => {
  if (doc.type === "post") {
    return "/blog/[uid]";
  }
  return "/";
};

export const linkResolverCat = (doc) => {
  if (doc.type === "category") {
    return `/categories/${doc.uid}`;
  }
  return "/";
};

// Additional helper function for Next/Link components
export const hrefResolverCat = (doc) => {
  if (doc.type === "category") {
    return "/categories/[category]";
  }
  return "/";
};

export const linkResolverAuthor = (doc) => {
  if (doc) {
    return `/authors/${doc.uid}`;
  }
  return "/";
};

// Additional helper function for Next/Link components
export const hrefResolverAuthor = (doc) => {
  if (doc) {
    return "/authors/[author]";
  }
  return "/";
};
