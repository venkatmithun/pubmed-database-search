import React from "react";
import { SearchResult } from "./SearchResult";

export const SearchResults = React.memo(
  ({ articles, curSearch, error, loading }) => {
    let total = articles[curSearch] ? articles[curSearch].length : 0;
    return loading ? (
      <div className="loader-container">
        <div className="loader"></div>
        <div>Loading Results...</div>
      </div>
    ) : curSearch || error ? (
      <React.Fragment>
        <div style={{ color: error ? "#CD5C5C" : "#383839" }}>
          {error
            ? error
            : total === 0
            ? "No results found!"
            : `About ${total} results found`}
        </div>
        {total ? (
          <div className="search-results">
            <div
              style={{
                textAlign: "left",
                padding: "10px",
                margin: "20px"
              }}
            >
              Showing results for <span className="bold-font">{curSearch}</span>
            </div>
            {articles[curSearch].map((i, idx) => (
              <SearchResult key={idx} article={i} number={idx + 1} />
            ))}
          </div>
        ) : null}
      </React.Fragment>
    ) : null;
  }
);

export default SearchResults;
