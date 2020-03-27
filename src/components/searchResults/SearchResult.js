import React, { useState } from "react";
import "../../styles/App.css";
import Abstract from "./Abstract";

export const SearchResult = React.memo(({ article, number }) => {
  const [showAbstract, setShowAbstract] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <div
      className="search-result"
      onClick={() => {
        if (showAbstract) {
          setHover(false);
        }
        setShowAbstract(!showAbstract);
      }}
      style={
        hover && article.Abstract
          ? {
              boxShadow: "1px 2px 4px rgba(0, 0, 0, .5)",
              cursor: "pointer"
            }
          : {}
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div>
        {`${number}. `}
        <a
          href={`https://www.ncbi.nlm.nih.gov/pubmed/${article.PMID}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {article.ArticleTitle}
        </a>
      </div>
      <div className="pa-left-18">
        Published on: <span className="bold-font">{article.PubDate}</span>; Last
        Author: <span className="bold-font">{article.LastAuthor}</span>
      </div>
      {article.ChemicalNames ? (
        <div className="pa-left-18">
          Chemical Names:{" "}
          <span className="bold-font">{article.ChemicalNames.join(", ")}</span>
        </div>
      ) : null}
      {article.MeshTerms ? (
        <div className="pa-left-18">
          MeSH Terms:{" "}
          <span className="bold-font">{article.MeshTerms.join(", ")}</span>
        </div>
      ) : null}
      {showAbstract && article.Abstract ? (
        <div>
          <Abstract abstract={article.Abstract} />
        </div>
      ) : null}
    </div>
  );
});
