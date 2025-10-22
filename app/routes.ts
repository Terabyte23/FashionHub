import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
  route("mees", "routes/mees.tsx"),
  route("naiste", "routes/naiste.tsx"),
] satisfies RouteConfig;
