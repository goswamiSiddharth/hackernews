import { useState, useEffect } from "react";
import format from 'date-fns/format';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("programming");
  const [text, setText] = useState("");
  const [largeTitle, setLargeTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          ` https://hn.algolia.com/api/v1/search?query=${query}`
        );
        const data = await res.json();
        console.log(data);
        setItems(data.hits);
        setLargeTitle(data.hits[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticles();
    setIsLoading(false);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!text){
      toast('Input is Empty');
    }else{
      setQuery(text);
      setText('');
    }
  }
  return (
    <>
      <section className="section">
        <form autoComplete="off"  onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            id="search"
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="Search for Something"
          ></input>
          <button>Search</button>
        </form>
        
        <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />

        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <article className="title">
              <h1>{largeTitle.title}</h1>
              <a href={largeTitle.url} target='_blank' rel='noreferrer'>Read full Article</a>
            </article>

            <p className="category">Category: <span>{query}</span></p>

            <article className="cards">
              {items.map(({author, created_at, title, url, objectId}) => (
                  <div key={objectId}>
                    <h2>{title}</h2>
                    <ul>
                      <li>By: {author}</li>
                      <li><a href={url} target = '_blank' rel='noreferrer'>Read full Article</a></li>
                    </ul>
                    <p>{format(new Date(created_at), 'dd MMMM yyyy')}</p>
                  </div>   
              ))}
            </article>
          </>
        )}
      </section>
    </>
  );
}

export default App;
