/// <reference types="vite/client" />

declare module "*.JPG" {
  const content: string;
  export default content;
}

declare module "*.pdf" {
  const content: string;
  export default content;
}
