import React from "react";

const SearchBar = React.memo(
  ({
    handleClick,
    handleChange,
    searchInput,
    offline,
    handleSubmitHover,
    submitHover,
    loading
  }) => {
    return (
      <div className="search">
        <form onSubmit={handleClick}>
          <input
            type="text"
            className="search-input"
            onChange={handleChange}
            placeholder="Search Pubmed database..."
            value={searchInput}
          />
          <input
            type="submit"
            className="search-button"
            onClick={handleClick}
            value={offline ? "Offline" : "Search"}
            disabled={offline || loading}
            style={{
              backgroundColor: offline
                ? "#CD5C5C"
                : submitHover || loading
                ? "rgba(51, 51, 51, 0.5)"
                : "#f0f0f2",
              color: offline || submitHover ? "#ffffff" : "#383839",
              cursor: offline ? "auto" : "pointer"
            }}
            onMouseEnter={() => handleSubmitHover(true)}
            onMouseLeave={() => handleSubmitHover(false)}
          />
        </form>
      </div>
    );
  }
);

export default SearchBar;
