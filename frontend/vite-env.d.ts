/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_API_URL: string
  // declare aqui outras variáveis que você usa
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
