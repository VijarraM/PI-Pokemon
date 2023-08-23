import React from 'react';
import styles from './SinglePokemon.module.css';
import defaultPokemonImage from '../../images/defaultPokemonImage.png'; // Ajusta la ruta de la imagen por defecto

const SinglePokemon = ({ pokemon }) => {
  return (
    <div key={pokemon.id} className={styles.gridItem}>
      <div className={styles.name}>{pokemon.name}</div>
      <div className={styles.imageContainer}>
        <img
          src={pokemon.image || defaultPokemonImage}
          alt={pokemon.name}
          className={styles.pokemonImage}
        />
      </div>
      <div className={styles.types}>
        {!pokemon.Types[0]
          ? 'No tiene tipos'
          : pokemon.Types.map((type) => (
              <div key={type.name} className={styles.type}>
                {type.name}
              </div>
            ))}
      </div>
    </div>
  );
};

export default SinglePokemon;
