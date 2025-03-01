interface Config {
  apiUrl: string;
}

const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
};

export default config;
