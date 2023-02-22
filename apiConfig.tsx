let url: string = "http://localhost:3000";
if (process.env.NODE_ENV === "production") {
  url = "https://tstetris.herokuapp.com";
}
const api = {
  config: url,
};
export default api;
