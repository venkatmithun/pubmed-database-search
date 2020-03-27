import _ from "lodash";

const extractInfo = pubmedArticles => {
  return pubmedArticles.map(A => {
    const result = {};
    //Extracting Article ID
    result["PMID"] = A.MedlineCitation.PMID._text;
    //Extracting Publication Date
    if (A.MedlineCitation.Article.Journal.JournalIssue.PubDate.MedlineDate) {
      result["PubDate"] =
        A.MedlineCitation.Article.Journal.JournalIssue.PubDate.MedlineDate._text;
    } else {
      let pubDate = "";
      if (A.MedlineCitation.Article.Journal.JournalIssue.PubDate.Year) {
        pubDate += `${A.MedlineCitation.Article.Journal.JournalIssue.PubDate.Year._text}`;
      }
      if (A.MedlineCitation.Article.Journal.JournalIssue.PubDate.Month) {
        pubDate += `-${A.MedlineCitation.Article.Journal.JournalIssue.PubDate.Month._text}`;
      }
      if (A.MedlineCitation.Article.Journal.JournalIssue.PubDate.Day) {
        pubDate += `-${A.MedlineCitation.Article.Journal.JournalIssue.PubDate.Day._text}`;
      }
      result["PubDate"] = pubDate;
    }
    //Extracting Article Title
    result["ArticleTitle"] = A.MedlineCitation.Article.ArticleTitle._text;
    //Extracting Article Abstract
    result["Abstract"] = "";
    if (A.MedlineCitation.Article.Abstract) {
      if (_.isArray(A.MedlineCitation.Article.Abstract.AbstractText)) {
        A.MedlineCitation.Article.Abstract.AbstractText.map(t => {
          if (t._attributes) {
            result.Abstract += `${t._attributes.Label}: ${t._text} \n \n `;
          }
        });
      } else {
        result["Abstract"] =
          A.MedlineCitation.Article.Abstract.AbstractText._text || "";
      }
    }
    //Extracting Last Author to the article
    let LastAuthorName = "";

    if (A.MedlineCitation.Article.AuthorList) {
      let LastAuthor = _.isArray(A.MedlineCitation.Article.AuthorList.Author)
        ? A.MedlineCitation.Article.AuthorList.Author[
            A.MedlineCitation.Article.AuthorList.Author.length - 1
          ]
        : A.MedlineCitation.Article.AuthorList.Author;
      if (LastAuthor.CollectiveName) {
        LastAuthorName += LastAuthor.CollectiveName._text;
      } else {
        if (LastAuthor.LastName) {
          LastAuthorName += `${LastAuthor.LastName._text} `;
        }
        if (LastAuthor.Initials) {
          LastAuthorName += LastAuthor.Initials._text;
        }
      }
    }

    result["LastAuthor"] = LastAuthorName;
    //Extracting Chemical Names
    if (A.MedlineCitation.ChemicalList) {
      if (_.isArray(A.MedlineCitation.ChemicalList.Chemical)) {
        result["ChemicalNames"] = A.MedlineCitation.ChemicalList.Chemical.map(
          c => c.NameOfSubstance._text
        );
      } else {
        result["ChemicalNames"] = [
          A.MedlineCitation.ChemicalList.Chemical.NameOfSubstance._text
        ];
      }
    }
    //Extracting MESH Terms
    if (A.MedlineCitation.MeshHeadingList) {
      if (_.isArray(A.MedlineCitation.MeshHeadingList.MeshHeading)) {
        result["MeshTerms"] = A.MedlineCitation.MeshHeadingList.MeshHeading.map(
          c => c.DescriptorName._text
        );
      } else {
        result["MeshTerms"] = [
          A.MedlineCitation.MeshHeadingList.MeshHeading.DescriptorName._text
        ];
      }
    }
    return result;
  });
};

export default extractInfo;
