import React from "react";
import "../styles/App.css";
import SearchBar from "./reusableComponents/SearchBar";
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
      articles: { "": [] },
      error: "",
      loading: false,
      curSearch: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmitHover = this.handleSubmitHover.bind(this);
  }

  componentDidMount() {
    window.addEventListener("offline", () => this.setState({ offline: true }));
    window.addEventListener("online", () => this.setState({ offline: false }));
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(
      {
        loading: true
      },
      async () => {
        try {
          let { searchInput, articles } = this.state;
          searchInput = searchInput.trim();
          if (searchInput.length > 0) {
            if (searchInput in articles) {
              this.setState({
                curResult: articles[searchInput],
                loading: false,
                curSearch: searchInput,
                error: ""
              });
            } else {
              const result = await Api.get(searchInput);
              // console.log(result);
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
                  searchInput,
                  loading: false,
                  curSearch: searchInput,
                  error: ""
                });
              } else {
                this.setState({
                  loading: false,
                  error: "",
                  curSearch: searchInput
                });
              }
            }
          } else {
            this.setState({
              loading: false,
              error: "Please enter keywords to search!"
            });
          }
        } catch (e) {
          console.log("error", e);
          this.setState({ error: "Error! Please try again.", loading: false });
        }
      }
    );
  }

  handleChange(e) {
    this.setState({ searchInput: e.target.value });
  }

  handleSubmitHover(bool) {
    this.setState({ submitHover: bool });
  }

  render() {
    const {
      searchInput,
      offline,
      submitHover,
      articles,
      loading,
      curSearch,
      error
    } = this.state;
    return (
      <div className="App">
        <SearchBar
          handleClick={this.handleClick}
          handleChange={this.handleChange}
          searchInput={searchInput}
          offline={offline}
          handleSubmitHover={this.handleSubmitHover}
          submitHover={submitHover}
          loading={loading}
        />
        <React.Suspense fallback={<div>Loading ...</div>}>
          <SearchResults
            articles={articles}
            curSearch={curSearch}
            error={error}
            loading={loading}
          />
        </React.Suspense>
      </div>
    );
  }
}

export default App;
