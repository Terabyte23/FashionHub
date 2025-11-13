import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("cart", "routes/cart.tsx"),
  route("profile", "routes/profile.tsx"),

  route("mees", "routes/mees/index.tsx", [
    index("routes/mees/mees.tsx"),
    route("riided", "routes/mees/riided/index.tsx", [
      route("hitt", "routes/mees/riided/hitt.tsx"),
      route("hot-drop", "routes/mees/riided/hot-drop.tsx"),
    ]),
  ]),

  route("naiste", "routes/naiste/index.tsx", [
    index("routes/naiste/naiste.tsx"),
    route("riided", "routes/naiste/riided/index.tsx", [
      route("uued", "routes/naiste/riided/uued.tsx"),
    ]),
  ]),

] satisfies RouteConfig;
