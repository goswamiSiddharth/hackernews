import { useState, useEffect } from "react";
import format from 'date-fns';

function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('programming');
  const [text, setText] = useState('');
  const [largeTitle, setLargeTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch(` http://hn.algolia.com/api/v1/search?query=${query}`);
      const data = await res.json();
      console.log(data);
      setItems(data.hits);
      setLargeTitle(data.hits[0]);
    }
     
    fetchArticles();
  },[])
  return (
    <>
      <section className="section">
        <form autoComplete="off">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for Something"
          ></input>
          <button>Search</button>
        </form>
        <article className="title">
          <h1>{largeTitle.title}</h1>
          <a href="">Read full Article</a>
        </article>
        <article className="cards">
          <div>
            <h2>Heading 2</h2>
            <ul>
              <li>By Siddharth</li>
              <li>
                <a href="">Read full Article</a>
              </li>
            </ul>
            <p>Data</p>
          </div>
        </article>
      </section>
    </>
  );
}

export default App;
