import axios from "axios";
import { esearch, efetch } from "./config";
import convert from "xml-js";

const Api = {
  get: async query => {
    try {
      const searchRes = await axios.get(esearch(query));

      // console.log("searchRes", searchRes.data);
      // parse WebEnv and QueryKey
      const web = /<WebEnv>(\S+)<\/WebEnv>/.exec(searchRes.data)[1];
      const key = /<QueryKey>(\d+)<\/QueryKey>/.exec(searchRes.data)[1];

      // console.log("web, key", web, key);

      const fetchRes = await axios.get(efetch(web, key));

      // console.log("fetchRes", fetchRes.data);

      const xml2json = convert.xml2json(fetchRes.data, {
        compact: true,
        spaces: 4,
        ignoreDoctype: true
      });

      return JSON.parse(xml2json);
    } catch (error) {
      throw error;
    }
  }
};
export default Api;
