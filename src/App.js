import React, { useEffect, useState } from "react";
import tmdb from "./tmdb";
import MovieRow from "./components/MovieRow";
import './App.css';
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";


export default () => {

  const [movieList, setMotvieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  
  
  useEffect(()=>{
    const loadAll = async () => {
      //Get na lista total
      let list = await tmdb.getHomeList();
      setMotvieList(list);
      
      //Getting Featured Movie
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      }
      else {
        setBlackHeader(false);
      }

    }

    window.addEventListener('scroll' ,scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
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

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>


      <footer>
        Made with <span role="img" aria-label="coração">💓</span> by Mauricio Britto de Castro<br/>
        Image rights for Netflix<br/>
        Data from Themoviedb.org
      </footer>
    </div>
  );
}