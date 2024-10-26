import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest'; // Import 'vi' if you're using mocking
import { Home } from '@pages/home';
vi.mock('@components/common/header', () => ({
    default: () => _jsx("div", { children: "Mock Header" }),
}));
vi.mock('@components/common/footer', () => ({
    default: () => _jsx("div", { children: "Mock Footer" }),
}));
vi.mock('@components/carousel', () => ({
    default: () => _jsx("div", { children: "Mock Carousel" }),
}));
describe('Home Component', () => {
    it('renders Header, Carousels, and Footer', () => {
        render(_jsx(Home, {}));
        expect(screen.getByText(/mock header/i)).toBeInTheDocument();
        expect(screen.getAllByText(/mock carousel/i)).toHaveLength(3);
        expect(screen.getByText(/mock footer/i)).toBeInTheDocument();
    });
});
