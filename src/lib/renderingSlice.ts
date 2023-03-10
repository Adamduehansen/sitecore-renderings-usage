import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Rendering {
  id: number;
  renderingName: string;
  count: number;
}

interface Url {
  renderingId: number;
  url: string;
}

export interface RenderingState {
  renderings: Rendering[];
  urls: Url[];
}

const initialStore: RenderingState = {
  renderings: [],
  urls: [],
};

interface AddRenderingPayload {
  renderingName: string;
  url: string;
}

function addRenderingReducer(
  state: RenderingState,
  action: PayloadAction<AddRenderingPayload>
) {
  const { renderingName, url } = action.payload;

  const existingRendering = state.renderings.find(
    (rendering) => rendering.renderingName === renderingName
  );

  if (existingRendering !== undefined) {
    existingRendering.count += 1;
    state.urls.push({
      renderingId: existingRendering.id,
      url: url,
    });
  } else {
    const id = Math.max(
      ...state.renderings.map((rendering) => rendering.id + 1),
      0
    );

    state.renderings.push({
      id: id,
      renderingName: renderingName,
      count: 1,
    });
    state.urls.push({
      renderingId: id,
      url: url,
    });
  }
}

const renderingSlice = createSlice({
  name: "rendering",
  initialState: initialStore,
  reducers: {
    addRendering: addRenderingReducer,
  },
});

export const { addRendering } = renderingSlice.actions;

export interface SelectedRendering {
  id: number;
  renderingName: string;
  count: number;
  urls: string[];
}

export function selectRenderings({ reducer }: RootState): SelectedRendering[] {
  return reducer.renderings.map(
    ({ renderingName, count, id }): SelectedRendering => {
      return {
        id: id,
        renderingName: renderingName,
        count: count,
        urls: reducer.urls
          .filter((url) => url.renderingId === id)
          .map((url) => url.url),
      };
    }
  );
}

export default renderingSlice.reducer;
