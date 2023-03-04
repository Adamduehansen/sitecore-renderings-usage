import { describe, test, expect } from "vitest";
import { screen } from "@testing-library/react";
import Result from "./Result";
import { renderWithProviders } from "../utils/testUtils";

describe("Result", () => {
  test("should show rendering names", () => {
    // Arrange
    renderWithProviders(<Result />, {
      preloadedState: {
        reducer: {
          renderings: [
            {
              id: 0,
              renderingName: "rendering-name-1",
              count: 23,
            },
            {
              id: 1,
              renderingName: "rendering-name-2",
              count: 19,
            },
          ],
          urls: [
            {
              renderingId: 0,
              url: "any-url-1",
            },
            {
              renderingId: 0,
              url: "any-url-2",
            },
            {
              renderingId: 1,
              url: "any-url-2",
            },
          ],
        },
      },
    });

    // Act
    const renderingElements = screen.getAllByText(/rendering-name-/);
    const urls = screen.getAllByText(/any-url-/);

    // Assert
    expect(renderingElements).toHaveLength(2);
    expect(urls).toHaveLength(3);
  });
});
