import React, { useEffect, useState } from "react";
import tmdb from "./tmdb";
import MovieRow from "./components/MovieRow";
import './App.css';
import FeaturedMovie from "./components/FeaturedMovie";


export default () => {

  const [movieList, setMotvieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  
  
  useEffect(()=>{
    const loadAll = async () => {
      //Get na lista total
      let list = await tmdb.getHomeList();
      setMotvieList(list);
      
      //Getting Featured Movie
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
    }

    loadAll();
  }, []);

  return(

    /* Lista da divisão da page principal:
      - Header
      - Destaque
      - As Listas:
        - Originais da Netflix
        - Recomendados (Trending = Destaque)
        - Em alta (Top Rated)
        - Ação
        - Comédia
        - Terror 
        - Romance
        - Documentários
      - Rodapé 
    */

    <div className="page">

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
}