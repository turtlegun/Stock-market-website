import React, { useEffect, useState } from "react";
import "./news.css";
import Footer from "./footer";
import { Link } from "react-router-dom";

function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch data from your Express backend (replace 'http://localhost:3000/new2' with your actual API endpoint)
    fetch("http://localhost:3000/new2")
      .then((response) => response.json())
      .then((data) => setArticles(data.feed || [])) // Ensure 'feed' is an array or default to an empty array
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <>
      <div className="headnew">
        <h2>Top News Headlines</h2>
        <Link to="/"> home</Link>
      </div>
      <div>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.feed}
            </a>
            <h4>{article.title}</h4>
            <p>{article.summary}</p>
            <a href="https://www.marketwatch.com/story/elon-musks-x-apocalyptic-moment-b8b41710">
              {" "}
              for more
            </a>
          </li>
        ))}
      </ul>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default News;
