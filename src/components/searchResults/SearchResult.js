import React from "react";
import styles from "../app.css";

const SearchResult = React.memo(({ docs }) => {
  console.log("docs", docs);
  return docs.length > 0 ? (
    <table id="pubmed-info" style={styles.table}>
      <thead>
        <tr>
          <th>Publication Date</th>
          <th>Last Author</th>
          <th>Article Title</th>
        </tr>
      </thead>
      <tbody>
        {docs.map((doc, idx) => {
          let pubDate;
          let lastAuthor;
          let title;
          let articleId;
          for (const Item of doc.querySelectorAll("Item")) {
            const name = Item.attributes.Name.value;
            if (name === "PubDate") {
              pubDate = Item.innerHTML;
            } else if (name === "LastAuthor") {
              lastAuthor = Item.innerHTML;
            } else if (name === "ArticleIds") {
              for (const child of Item.children) {
                if (child.attributes.Name.value === "pubmed") {
                  articleId = child.innerHTML;
                }
              }
            } else if (name === "Title") {
              title = Item.innerHTML;
            }
          }
          return (
            <tr key={idx}>
              <td>{pubDate || "N/A"}</td>
              <td>{lastAuthor || "N/A"}</td>
              <td>
                <a
                  href={`https://www.ncbi.nlm.nih.gov/pubmed/${articleId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {title}
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : null;
});

export default SearchResult;
