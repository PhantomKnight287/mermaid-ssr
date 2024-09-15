export function getDomain() {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3010"
    : "https://mermaid.chemistrypadhley.com";
}
