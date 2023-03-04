/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SC_HOST: string;
  readonly VITE_GQL_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
