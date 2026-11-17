import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders the Eltern subpage when visiting /parents', () => {
  window.history.pushState({}, '', '/parents');
  render(<App />);

  // heading should exist (avoids matching the nav button)
  expect(screen.getByRole('heading', { name: /Für Eltern/i })).toBeInTheDocument();
  expect(screen.getByText(/Mit Insides sprechen Jugendliche über Liebe, Beziehungen und Gesundheit/i)).toBeInTheDocument();
});

test('shows survey responses in the selected language', async () => {
  window.history.pushState({}, '', '/');
  render(<App />);
  const primarySet = document.querySelector('.testimonials-set:not([aria-hidden="true"])');

  expect(screen.getByRole('heading', { name: 'Was Teilnehmende sagen' })).toBeInTheDocument();
  expect(within(primarySet).getByText('Vor allem für junge Menschen ist es manchmal schwierig sich (ohne scham) zu informieren über Sex etc.; viele Jugendliche haben ihre „Erfahrung“ von pornos, was einfach nicht die Realität widerspiegelt')).toBeInTheDocument();
  expect(screen.getAllByText('Anonyme:r Umfrageteilnehmer:in')).toHaveLength(4);

  await userEvent.click(screen.getByRole('button', { name: 'EN' }));

  expect(screen.getByRole('heading', { name: 'What survey respondents say' })).toBeInTheDocument();
  expect(within(primarySet).getByText('Especially for young people, it can sometimes be difficult to find information about sex without feeling ashamed. Many young people get their ‘experience’ from pornography, which simply does not reflect reality.')).toBeInTheDocument();
  expect(screen.getAllByText('Anonymous parent survey respondent')).toHaveLength(4);
});

test('continuously scrolls duplicated responses and pauses on hover', () => {
  window.history.pushState({}, '', '/');
  const { container } = render(<App />);

  const marquee = container.querySelector('.testimonials-marquee');
  const track = container.querySelector('.testimonials-track');
  expect(marquee).toBeInTheDocument();
  expect(track.querySelectorAll('.testimonial-card')).toHaveLength(8);
  expect(track).toHaveClass('testimonials-track');

  fireEvent.mouseEnter(marquee);
  expect(marquee).toHaveClass('is-paused');

  fireEvent.mouseLeave(marquee);
  expect(marquee).not.toHaveClass('is-paused');

  fireEvent.click(screen.getByRole('button', { name: 'Automatisches Abspielen pausieren' }));
  expect(marquee).toHaveClass('is-paused');
  expect(screen.getByRole('button', { name: 'Automatisches Abspielen fortsetzen' })).toHaveAttribute('aria-pressed', 'true');
});

test('renders sourced statistics and the answer section in German and English', async () => {
  window.history.pushState({}, '', '/');
  render(<App />);

  expect(screen.getByText('79 %')).toBeInTheDocument();
  expect(screen.getByText('45 %')).toBeInTheDocument();
  expect(screen.getByText('15 %')).toBeInTheDocument();
  expect(screen.getByText('Mindestens 1,2 Millionen')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Common Sense Media, 2023/ })).toHaveAttribute(
    'href',
    'https://www.commonsensemedia.org/sites/default/files/research/report/2022-teens-and-pornography-final-web.pdf'
  );
  expect(screen.getByRole('heading', { name: 'Unsere Antwort: Orientierung statt Sprachlosigkeit' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Kontakt aufnehmen' })).toHaveAttribute(
    'href',
    'https://mail.google.com/mail/?view=cm&fs=1&to=info%40insides-official.com'
  );
  expect(screen.getByRole('img', { name: 'Die Insides-Mitgründerinnen Anne und Jil sitzen nebeneinander.' })).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: 'EN' }));

  expect(screen.getByText('At least 1.2 million')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Our response: Guidance instead of silence' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Get in touch' })).toHaveAttribute(
    'href',
    'https://mail.google.com/mail/?view=cm&fs=1&to=info%40insides-official.com'
  );
});

test('launch signup CTA focuses the name field and the arrow scrolls to the top', async () => {
  window.history.pushState({}, '', '/');
  const { container } = render(<App />);
  const hero = container.querySelector('#hero');
  hero.scrollIntoView = jest.fn();
  const scrollTo = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});

  await userEvent.click(screen.getByRole('button', { name: 'Jetzt vormerken' }));

  expect(screen.getByPlaceholderText('Dein Name')).toHaveFocus();
  expect(hero.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

  fireEvent.click(screen.getByRole('button', { name: 'Nach oben scrollen' }));
  expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  scrollTo.mockRestore();
});

test('renders individual team portraits, LinkedIn profiles, and email links', async () => {
  window.history.pushState({}, '', '/');
  render(<App />);

  const profiles = [
    { name: 'Anne', email: 'hermann.anne-maria@web.de', linkedin: 'https://www.linkedin.com/in/anne-miller-hermann-7a35b6249/', image: '/anne-profile.jpg' },
    { name: 'Jil', email: 'jil.clausen@web.de', linkedin: 'https://www.linkedin.com/in/jil-clausen-925774240/', image: '/jil-profile.jpg' },
    { name: 'Ifrah', email: 'ifrahasif30@gmail.com', linkedin: 'https://www.linkedin.com/in/ifrah-asif-1945b6139/', image: '/ifrah-profile.png' },
    { name: 'Tooba', email: 'toobadeutsch@gmail.com', linkedin: 'https://www.linkedin.com/in/syeda-tooba-hasnain-a9a17119a/', image: '/tooba-profile.jpg' },
  ];

  profiles.forEach(profile => {
    expect(screen.getByRole('img', { name: `Porträt von ${profile.name}` })).toHaveAttribute('src', profile.image);
    expect(screen.getByRole('link', { name: `LinkedIn-Profil von ${profile.name}` })).toHaveAttribute('href', profile.linkedin);
    expect(screen.getByRole('link', { name: profile.email })).toHaveAttribute('href', `mailto:${profile.email}`);
  });

  expect(screen.getByText('Design, Research und CTO.')).toBeInTheDocument();
  expect(screen.getByText('Softwareentwicklung.')).toBeInTheDocument();
  expect(screen.getByText('„Wir möchten ein gesundes Umfeld für alle schaffen.“')).toBeInTheDocument();
  expect(screen.getByText('„Ich möchte Technologie entwickeln, die Menschen informiert, unterstützt und stärkt.“')).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: 'EN' }));

  expect(screen.getByText('Design, Research and CTO.')).toBeInTheDocument();
  expect(screen.getByText('Software Development.')).toBeInTheDocument();
  expect(screen.getByText('“We want to create a healthy environment for everyone.”')).toBeInTheDocument();
  expect(screen.getByText('“I want to build technology that informs, supports, and empowers people.”')).toBeInTheDocument();
});
