import { describe, expect, test } from "vitest";
import renderingReducer, {
  RenderingState,
  addRendering,
  selectRenderings,
} from "./renderingSlice";
import { RootState } from "./store";

describe("renderingSlice", () => {
  describe("addRendering", () => {
    test("should add rendering to state", () => {
      // Arrange
      const expectedState: RenderingState = {
        renderings: [
          {
            id: 0,
            renderingName: "any-rendering-name",
            count: 1,
          },
        ],
        urls: [
          {
            renderingId: 0,
            url: "any-url",
          },
        ],
      };

      // Act
      const actualState = renderingReducer(
        undefined,
        addRendering({
          renderingName: "any-rendering-name",
          url: "any-url",
        })
      );

      // Assert
      expect(actualState).toEqual(expectedState);
    });

    test("should update rendering in state", () => {
      // Arrange
      const expectedState: RenderingState = {
        renderings: [
          {
            id: 0,
            renderingName: "any-rendering-name",
            count: 2,
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
        ],
      };

      // Act
      const actualState = renderingReducer(
        {
          renderings: [
            {
              id: 0,
              renderingName: "any-rendering-name",
              count: 1,
            },
          ],
          urls: [
            {
              renderingId: 0,
              url: "any-url-1",
            },
          ],
        },
        addRendering({
          renderingName: "any-rendering-name",
          url: "any-url-2",
        })
      );

      // Assert
      expect(actualState).toEqual(expectedState);
    });
  });

  describe("selectRenderings", () => {
    test("should get renderings and associated URLs", () => {
      // Arrange
      const state: RootState = {
        reducer: {
          renderings: [
            {
              id: 0,
              count: 2,
              renderingName: "rendering-name-1",
            },
            {
              id: 1,
              count: 1,
              renderingName: "rendering-name-2",
            },
          ],
          urls: [
            {
              renderingId: 0,
              url: "any-url-1",
            },
            {
              renderingId: 1,
              url: "any-url-1",
            },
            {
              renderingId: 0,
              url: "any-url-2",
            },
          ],
        },
      };

      // Act
      const result = selectRenderings(state);

      // Assert
      expect(result).toHaveLength(2);
      const [firstRendering, secondRendering] = result;
      expect(firstRendering.renderingName).toEqual("rendering-name-1");
      expect(firstRendering.count).toEqual(2);
      expect(firstRendering.urls).toEqual(["any-url-1", "any-url-2"]);
      expect(secondRendering.renderingName).toEqual("rendering-name-2");
      expect(secondRendering.count).toEqual(1);
      expect(secondRendering.urls).toEqual(["any-url-1"]);
    });
  });
});
