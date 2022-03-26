import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe(' Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.',
    () => {
      renderWithRouter(<App />);
      const encPoke = screen.getByRole('heading', { name: /encountered pokémons/i });
      expect(encPoke).toBeInTheDocument();
    });
  test(
    'Teste se é exibido o próximo Pokémon  quando o botão Próximo pokémon é clicado.',
    () => {
      renderWithRouter(<App />);
      const botaProximoPoke = screen.getByRole('button', { name: 'Próximo pokémon' });
      const pikachu = screen.getByText(/pikachu/i);
      expect(botaProximoPoke).toBeInTheDocument();
      expect(pikachu).toBeInTheDocument();
      userEvent.click(botaProximoPoke);
      const proximo = screen.getByText(/charmander/i);

      expect(proximo).toBeInTheDocument();
    },
  );
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const allBtn = screen.getAllByTestId('pokemon-type-button');
    expect(allBtn[1]).toBeInTheDocument();
    userEvent.click(allBtn[1]);
    const chamander = screen.getByText(/charmander/i);
    expect(chamander).toBeInTheDocument();
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const pokeBug = screen.getByRole('button', { name: /bug/i });
    const pokeFire = screen.getByRole('button', { name: /fire/i });
    const pokPoison = screen.getByRole('button', { name: /poison/i });
    const pokElectric = screen.getByRole('button', { name: /Electric/i });
    const pokPsychic = screen.getByRole('button', { name: /psychic/i });
    expect(pokeBug).toBeInTheDocument();
    expect(pokeFire).toBeInTheDocument();
    expect(pokElectric).toBeInTheDocument();
    expect(pokPoison).toBeInTheDocument();
    expect(pokPsychic).toBeInTheDocument();
    const pokNormal = screen.getByRole('button', { name: /normal/i });
    expect(pokNormal).toBeInTheDocument();
    const pokDragon = screen.getByRole('button', { name: /dragon/i });
    expect(pokDragon).toBeInTheDocument();
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: 'All' });
    const poison = screen.getByText(/Poison/i);
    expect(all).toBeInTheDocument();
    userEvent.click(all);
    expect(poison).toBeInTheDocument();
  });
});
