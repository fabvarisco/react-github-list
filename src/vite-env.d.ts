/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_TOKEN_GITHUB: string;

}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
