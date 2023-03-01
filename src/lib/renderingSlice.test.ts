import { describe, expect, test } from 'vitest';
import renderingReducer, {
  RenderingState,
  addRendering,
} from './renderingSlice';

describe('renderingSlice', () => {
  describe('addRendering', () => {
    test('should add rendering to state', () => {
      // Arrange
      const expectedState: RenderingState = {
        rendering: [
          {
            id: 0,
            renderingName: 'any-rendering-name',
            count: 1,
          },
        ],
        urls: [
          {
            renderingId: 0,
            url: 'any-url',
          },
        ],
      };

      // Act
      const actualState = renderingReducer(
        undefined,
        addRendering({
          renderingName: 'any-rendering-name',
          url: 'any-url',
        })
      );

      // Assert
      expect(actualState).toEqual(expectedState);
    });

    test('should update rendering in state', () => {
      // Arrange
      const expectedState: RenderingState = {
        rendering: [
          {
            id: 0,
            renderingName: 'any-rendering-name',
            count: 2,
          },
        ],
        urls: [
          {
            renderingId: 0,
            url: 'any-url-1',
          },
          {
            renderingId: 0,
            url: 'any-url-2',
          },
        ],
      };

      // Act
      const actualState = renderingReducer(
        {
          rendering: [
            {
              id: 0,
              renderingName: 'any-rendering-name',
              count: 1,
            },
          ],
          urls: [
            {
              renderingId: 0,
              url: 'any-url-1',
            },
          ],
        },
        addRendering({
          renderingName: 'any-rendering-name',
          url: 'any-url-2',
        })
      );

      // Assert
      expect(actualState).toEqual(expectedState);
    });
  });
});
