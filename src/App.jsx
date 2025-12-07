import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import PostForm from './PostForm'

const ListaKomponens = ({ elemek }) => {
  const items = Object.values(elemek || {});
  return (
    <div className="cards-grid">
      {items.map((elem, index) => (
        <div className="card" key={elem.id ?? index}>
          <img src={elem.image_url} className="card-img-top" alt={elem.name} />
          <div className="card-body">
            <h5 className="card-title">{elem.name}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export const App = () => {
  const [adatok, setAdatok] = useState({});

  useEffect(() => {
    fetch('https://pizza.sulla.hu/pizza')
    .then((res) => (res.ok? res.json() : []))
    .then((tartalom) => setAdatok(tartalom));
  }, [])

  return (
    <div className="app-wrap">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="app-title">Pizzák</h1>
          <Link to="/new" className="btn-new">Új poszt</Link>
        </div>
        <div className="row m-5 p-5 border app-panel">
          <ListaKomponens elemek={adatok} />
        </div>
      </div>
    </div>
  )
}

export default App;
