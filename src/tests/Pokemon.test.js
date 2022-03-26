import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test(
    'Teste se é renderizado um card com as informações de determinado pokémon.',
    () => {
      renderWithRouter(<App />);
      const nome = screen.getByTestId('pokemon-name');
      const type = screen.getByTestId('pokemon-type');
      const weight = screen.getByTestId('pokemon-weight');
      const pikachu = screen.getByText(/pikachu/i);
      const eletric = screen.getAllByText(/electric/i);
      expect(nome).toBe(pikachu);
      expect(type).toBe(eletric[0]);
      expect(weight).toBe(weight);

      const picaSprite = screen.getByAltText(/pikachu sprite/i);
      expect(picaSprite).toBeInTheDocument();
      const imagem = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
      expect(picaSprite).toHaveAttribute('src', imagem);
    // screen.logTestingPlaygroundURL();
    },
  );
  test(
    'Ao clicar em navegação do Pokémon, é  direciona  para a página de detalhes.',
    () => {
      const { history } = renderWithRouter(<App />);
      const pikachu = screen.getByText(/pikachu/i);
      const linkDetais = screen.getByRole('link', { name: 'More details' });
      expect(pikachu).toBeInTheDocument();
      expect(linkDetais).toBeInTheDocument();
      userEvent.click(linkDetais);
      const { pathname } = history.location;
      expect(pathname).toBe('/pokemons/25');
    },
  );
  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    const detais = screen.getByRole('link', { name: 'More details' });
    expect(pikachu).toBeInTheDocument();
    expect(detais).toBeInTheDocument();
    userEvent.click(detais);
    const { pathname } = history.location;
    const favoritarPokemon = screen.getByLabelText('Pokémon favoritado?');
    expect(pathname).toBe('/pokemons/25');
    expect(favoritarPokemon).toBeInTheDocument();
    userEvent.click(favoritarPokemon);
    const pikachuMarked = screen.getByAltText('Pikachu is marked as favorite');
    const starUrl = '/star-icon.svg';
    expect(pikachuMarked).toBeInTheDocument();
    expect(pikachuMarked).toHaveAttribute('src', starUrl);
  });
});
