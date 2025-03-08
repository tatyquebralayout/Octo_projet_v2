/**
 * @vitest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../../../components/layout/Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    // Reset the DOM before each test
    document.body.innerHTML = '';
  });

  test('renders copyright information', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    const copyright = screen.getByText(/direitos reservados/i);
    expect(copyright).toBeInTheDocument();
  });

  test('renders social media links', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    const instagramLink = screen.getByLabelText(/instagram/i);
    const linkedinLink = screen.getByLabelText(/linkedin/i);
    
    expect(instagramLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    
    expect(instagramLink.getAttribute('href')).toContain('instagram.com');
    expect(linkedinLink.getAttribute('href')).toContain('linkedin.com');
  });

  test('renders navigation links', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    const capacitaPcdLink = screen.getByText('Capacita PcD');
    const noticiasLink = screen.getByText('Últimas Notícias');
    
    expect(capacitaPcdLink).toBeInTheDocument();
    expect(noticiasLink).toBeInTheDocument();
    
    expect(capacitaPcdLink.getAttribute('href')).toBe('/octo-faz/capacita-pcd');
    expect(noticiasLink.getAttribute('href')).toBe('/noticias');
  });
}); 