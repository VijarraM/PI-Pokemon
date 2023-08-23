import React, { useState, useEffect } from 'react';
import { grid } from '../SinglePokemon/SinglePokemon.module.css';
import styles from './Home.module.css';
import axios from 'axios';
import SinglePokemon from '../SinglePokemon/SinglePokemon';

const ITEMS_PER_PAGE = 12;

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get('/pokemon');
      setPokemons(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const totalPages = Math.ceil(pokemons.length / ITEMS_PER_PAGE);
  const displayedPokemons = pokemons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      {/* Search Bar */}

      {/* Grid */}
      <div className={grid}>
        {displayedPokemons.map((pokemon) => (
          <SinglePokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className={styles.paginationContainer}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`${styles.paginationButton} ${
              currentPage === index + 1 ? styles.active : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
