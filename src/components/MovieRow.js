import React from "react";
import './MovieRow.css';

export default ({title, items}) => {
    return(
        <div>
            <h2>{title}</h2>
            <div className="movieRow--listarea">
                {items.results.lenght > 0 && items.results.map((item, key) => (
                    <img src={`https://imagem.tmdb.org/t/p/w400${item.poster_path}`} alt={item.original_title}/>
                ))}
            </div>
        </div>
    );
}