import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [data, setData] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true);
      const result = await axios('http://localhost:8083/rss/dashboard',
        {
          headers:{"Access-Control-Allow-Origin": "*"}
        }
      );
      setData(result.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            News
          </h3>
        </div>
        <div className="panel-body">
          {isLoading ? (
            <div>Loading</div>
          ) : (
            <ul className="list-group">
              {data.map(item =>
                <li key="{item.id}" className="list-group-item mt-3">
                  <div>
                    <a target="_blank" href={item.url} rel="noopener noreferrer">
                      {item.title}
                    </a>
                  </div>
                  <span className="small">
                    {item.publishedAt}
                  </span>
                  <div className="mt-2" dangerouslySetInnerHTML={{__html: item.description}} />
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;