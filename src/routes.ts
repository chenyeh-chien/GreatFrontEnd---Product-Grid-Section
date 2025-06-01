import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("/latest-arrivals", "./pages/Latest Arrivals/LatestArrivals.tsx"),
  route("*?", "catchall.tsx"),
] satisfies RouteConfig;