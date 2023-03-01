interface Rendering {
  componentName: string;
  placeholders?: Placeholders;
}

export interface RenderingCount {
  count: number;
}

export interface Placeholders {
  [key: string]: Rendering;
}

export type RenderingMap = Map<string, number>;

function reduceRenderingsToMap(
  map: RenderingMap,
  rendering: Rendering
): RenderingMap {
  const { componentName, placeholders } = rendering;
  if (map.has(componentName)) {
    const existingCount = map.get(componentName);
    if (existingCount !== undefined) {
      map.set(componentName, existingCount + 1);
    }
  } else {
    map.set(componentName, 1);
  }

  if (placeholders !== undefined) {
    return Object.values(placeholders).reduce(reduceRenderingsToMap, map);
  }

  return map;
}

export default function createRenderingMap(
  placeholders: Placeholders
): RenderingMap {
  return Object.values(placeholders).reduce(
    reduceRenderingsToMap,
    new Map<string, number>()
  );
}
