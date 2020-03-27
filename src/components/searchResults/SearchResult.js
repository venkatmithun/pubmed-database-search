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
        hover
          ? {
              boxShadow: "1px 2px 4px rgba(0, 0, 0, .5)"
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
      <div style={{ paddingLeft: "18px" }}>
        Published on:{" "}
        <span style={{ fontWeight: "bold" }}>{article.PubDate}</span>; Last
        Author: <span style={{ fontWeight: "bold" }}>{article.LastAuthor}</span>
      </div>
      {article.ChemicalNames ? (
        <div style={{ paddingLeft: "18px" }}>
          Chemical Names:{" "}
          <span style={{ fontWeight: "bold" }}>
            {article.ChemicalNames.join(", ")}
          </span>
        </div>
      ) : null}
      {article.MeshTerms ? (
        <div style={{ paddingLeft: "18px" }}>
          MeSH Terms:{" "}
          <span style={{ fontWeight: "bold" }}>
            {article.MeshTerms.join(", ")}
          </span>
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
