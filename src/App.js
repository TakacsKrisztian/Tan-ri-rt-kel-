import './App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [ratings, setRatings] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  const fetchData = async () => {
    setFetchPending(true);
    fetch("https://localhost:7253/api/Getter", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
    })
      .then((response) => response.json())
      .then((ratings) => setRatings(ratings))
      .catch(console.log)  
      .finally(() => {
        setFetchPending(false);
  });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 m-auto text-center content bg-ivory">
        {isFetchPending ? (<div className="spinner-border"></div>) : (
        <div>
                {ratings.map((ratings) => (
                    <NavLink key={`/Ratings/${ratings.id}`} to={`/Ratings/${ratings.id}`}>
                      <div key={ratings.id} className="card col-sm-3 d-inline-block ms-4">
                        <div className="card-body">
                          <p>Név:{ratings.nev}</p>
                          <p>Pont: {ratings.pontertek}</p>
                          <p>Szorzó: {ratings.szorzo}</p>
                          <p>Szempont:{ratings.szempontNev}</p>
                          <p>Végsőpont:{ratings.végsőpont}</p>
                        </div>
                      </div>
                    </NavLink>
                ))}
        </div>
        )}
    </div>
  );
}

export default App;