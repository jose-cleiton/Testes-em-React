import React from 'react-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste sea aplicação contém um conjunto fixo de links de navegação.', () => {
  test('O primeiro link deve possuir o texto Home.', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
  });
  test('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    expect(about).toBeInTheDocument();
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favPok = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favPok).toBeInTheDocument();
  });
});
describe('Testa se os links estão funcionando', () => {
  it('Testa se é redirecionada para a página inicial ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/about');
      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toBeDefined();
      userEvent.click(homeLink);
      expect(history.location.pathname).toBe('/');
    });
  it('Testa se é redirecionada para a página About ao clicar no link.',
    () => {
      const { history } = renderWithRouter(<App />);

      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink).toBeDefined();
      userEvent.click(aboutLink);
      expect(history.location.pathname).toBe('/about');
    });
  it('Testa se é redirecionada para a página About ao clicar no link.',
    () => {
      const { history } = renderWithRouter(<App />);

      const favPok = screen.getByRole('link', { name: /favorite pokémons/i });
      expect(favPok).toBeDefined();
      userEvent.click(favPok);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
  it('Testa se é redirecionada para a página notFond ao clicar no link.',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/url-invalida');
      const notFond = screen.getByRole('heading', {
        name: 'Page requested not found Crying emoji',
        level: 2 });
      userEvent.click(notFond);
      const { pathname } = history.location;
      expect(notFond).toBeDefined();
      expect(pathname).toBe('/url-invalida');
    });
});
