import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("/shop-all", "./pages/Shop All/ShopAll.tsx"),
  route("/latest-arrivals", "./pages/Latest Arrivals/LatestArrivals.tsx"),
  route("*?", "catchall.tsx"),
] satisfies RouteConfig;