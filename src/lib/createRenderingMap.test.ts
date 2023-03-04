import { describe, test, expect } from "vitest";
import createRenderingMap, {
  Placeholders,
  RenderingMap,
} from "./createRenderingMap";

describe("createRenderingMap", () => {
  test("should create map from placeholder object", () => {
    // Arrange
    const expectedRenderingMap: RenderingMap = new Map<string, number>();
    expectedRenderingMap.set("any-component-name-1", 2);
    expectedRenderingMap.set("any-component-name-2", 1);
    expectedRenderingMap.set("any-component-name-3", 1);

    const placeholders: Placeholders = {
      "any-placeholder-1": [
        {
          componentName: "any-component-name-1",
          placeholders: {
            "any-placeholder-4": [
              {
                componentName: "any-component-name-3",
              },
            ],
          },
        },
      ],
      "any-placeholder-2": [
        {
          componentName: "any-component-name-2",
          placeholders: {
            "any-placeholder-3": [
              {
                componentName: "any-component-name-1",
              },
            ],
          },
        },
      ],
    };

    // Act
    const map = createRenderingMap(placeholders);

    // Assert
    expect(map).toEqual(expectedRenderingMap);
  });
});
