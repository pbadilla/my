import { screen } from "@testing-library/react";
import { renderWithProviders } from "./testUtils";
import { describe, it, expect } from "vitest";
import Home from "../../src/pages/Home";

describe("Home Page", () => {
  it("renders all movie carousels with correct titles", () => {
    renderWithProviders(<Home />);

    // Check for the top rated carousel
    expect(screen.getByText(/Top Rated Movies/i)).toBeInTheDocument();

    // Check for the popular carousel
    expect(screen.getByText(/Popular Movies/i)).toBeInTheDocument();

    // Check for the upcoming carousel
    expect(screen.getByText(/Upcoming Movies/i)).toBeInTheDocument();
  });
});
