import React from 'react-dom';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
  });
  test('Teste se a página contém um heading `h2` com o texto `About Pokédex`.', () => {
    const abotPokedex = screen.getByRole('heading', { name: /about pokédex/i,
      level: 2 });
    expect(abotPokedex).toBeDefined();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const paragrafo1 = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia/i,
    );
    const paragrafo2 = screen.getByText(
      /one can filter pokémons by type, and see more details for each one of them/i,
    );
    expect(paragrafo1).toBeDefined();
    expect(paragrafo2).toBeDefined();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const imagePoke = screen.getByRole('img', { name: /pokédex/i });
    expect(imagePoke.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
