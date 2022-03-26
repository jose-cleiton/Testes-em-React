import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe(' Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      renderWithRouter(<NotFound />);

      const pagNotFound = screen
        .getByRole('heading', {
          name: /page requested not found/i,
          level: 2,
        });
      expect(pagNotFound).toBeInTheDocument();
    });
  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);

    const srcImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageNotFound = screen.getByRole('img', { name: /pikachu crying because /i });
    expect(imageNotFound).toBeInTheDocument();
    expect(imageNotFound).toHaveAttribute('src', srcImg);
  });
});
