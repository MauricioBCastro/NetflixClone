import React, { useEffect, useState } from "react";
import tmdb from "./tmdb";
import MovieRow from "./components/MovieRow";


export default () => {

  const [movieList, setMotvieList] = useState([]);
  
  
  useEffect(()=>{
    const loadAll = async () => {
      //Get na lista total
      let list = await tmdb.getHomeList();
      setMotvieList(list);
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
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
}