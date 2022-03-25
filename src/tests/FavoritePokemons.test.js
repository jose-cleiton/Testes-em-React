import React from 'react-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testa Favorite', () => {
  it('Teste se é exibido na tela a mensagem `No favorite pokemon found`, ',
    () => {
      renderWithRouter(<FavoritePokemons />);

      const notFounPokemon = screen.getByText(/no favorite pokemon found/i);
      expect(notFounPokemon).toBeInTheDocument();
    });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const {
      history: { push },
    } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const pokemonFavoritado = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(pokemonFavoritado);
    push('/favorites');

    const name = screen.getByText(/pikachu/i);
    expect(name).toBeInTheDocument();
  });
});
