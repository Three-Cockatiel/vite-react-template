/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SYSTEM_NAME: string;
}

interface ImportMate {
  readonly env: ImportMetaEnv;
}
