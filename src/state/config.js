const base = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";
const db = "pubmed";

export const esearch = query => {
  return `${base}esearch.fcgi?db=${db}&term=${query}&usehistory=y`;
};

export const esummary = (web, key) => {
  return `${base}esummary.fcgi?db=${db}&query_key=${key}&WebEnv=${web}`;
};

export const efetch = (web, key) => {
  return `${base}efetch.fcgi?db=${db}&query_key=${key}&WebEnv=${web}&retmode=xml`;
};
