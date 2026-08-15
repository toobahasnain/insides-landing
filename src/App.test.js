import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Eltern subpage when visiting /parents', () => {
  window.history.pushState({}, '', '/parents');
  render(<App />);

  // heading should exist (avoids matching the nav button)
  expect(screen.getByRole('heading', { name: /Für Eltern/i })).toBeInTheDocument();
  expect(screen.getByText(/Mit Insides sprechen Jugendliche über Liebe, Beziehungen und Gesundheit/i)).toBeInTheDocument();
});
