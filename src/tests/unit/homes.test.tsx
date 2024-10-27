import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest'; // Import 'vi' if you're using mocking
import { Home } from '@pages/home';

vi.mock('@components/common/header', () => ({
  default: () => <div>Mock Header</div>,
}));

vi.mock('@components/common/footer', () => ({
  default: () => <div>Mock Footer</div>,
}));

vi.mock('@components/carousel', () => ({
  default: () => <div>Mock Carousel</div>,
}));

describe('Home Component', () => {
  it('renders Header, Carousels, and Footer', () => {
    render(<Home />);
    expect(screen.getByText(/mock header/i)).toBeInTheDocument();
    expect(screen.getAllByText(/mock carousel/i)).toHaveLength(3);
    expect(screen.getByText(/mock footer/i)).toBeInTheDocument();
  });
});
