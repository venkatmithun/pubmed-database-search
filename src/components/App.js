import React from "react";
import "../styles/App.css";
import SearchBar from "./SearchBar";
import Api from "../state/api";
import extractInfo from "../state/processor";

const SearchResults = React.lazy(() =>
  import("./searchResults/SearchResultsContainer")
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      offline: !navigator.onLine,
      submitHover: false,
      articles: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmitHover = this.handleSubmitHover.bind(this);
    /* 
    PubmedArticle
      MedlineCitation
        PMID -------------------------------
        Article
          Journal
            JournalIssue
              PubDate -------------------------------
          ArticleTitle ----------------------------------
          Abstract ----------------------------------------
            AbstractText
          AuthorList [last one is last author]
            Author ------------------------------------------
              LastName
              ForeName
              Initials
        ChemicalList------------------------------------
          Chemical
            NameOfSubstance 
        MeshHeadingList ------------------------------------------
          MeshHeading 
            DescriptorName 
    */
  }

  componentWillMount() {
    window.addEventListener("offline", () => this.setState({ offline: true }));
    window.addEventListener("online", () => this.setState({ offline: false }));
  }

  async handleClick(e) {
    e.preventDefault();
    try {
      let { searchInput, articles } = this.state;
      searchInput = searchInput.trim();
      if (searchInput.length > 0) {
        if (searchInput in articles) {
          this.setState({ curResult: articles[searchInput] });
        } else {
          const result = await Api.get(searchInput);
          console.log(result);
          if (
            result.PubmedArticleSet &&
            result.PubmedArticleSet.PubmedArticle
          ) {
            const curResponse = extractInfo(
              result.PubmedArticleSet.PubmedArticle
            );
            articles[searchInput] = curResponse;
            this.setState({
              articles: { ...articles },
              searchInput
            });
          } else {
            alert("No results");
          }
        }
      } else {
        alert("Please type something before search!");
      }
    } catch (e) {
      alert(e);
      this.setState({ error: e });
    }
  }

  handleChange(e) {
    this.setState({ searchInput: e.target.value });
  }

  handleSubmitHover(bool) {
    this.setState({ submitHover: bool });
  }

  render() {
    const { searchInput, offline, submitHover, articles } = this.state;
    return (
      <div className="App">
        <SearchBar
          handleClick={this.handleClick}
          handleChange={this.handleChange}
          searchInput={searchInput}
          offline={offline}
          handleSubmitHover={this.handleSubmitHover}
          submitHover={submitHover}
        />
        <React.Suspense fallback={<div>Loading ...</div>}>
          <div className="search-results">
            <SearchResults articles={articles} />
          </div>
        </React.Suspense>
      </div>
    );
  }
}

export default App;
