import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
  } from "react-router";
import NavbarMain from "./components/utils/Navbar/NavbarMain";
import './index.css';
  
  export function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="./src/assets/favicon.ico" />
          <meta name="description" content="GreatFrontEnd practicing project"/>
          <meta name="keywords" content="GreatFrontEnd,GFE,Product Page" />
          <meta name="author" content="ChenYeh Chien" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Product Grid Section</title>
          <Meta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }
  
  export default function Root() {
    return (
      <>
        <NavbarMain />
        <Outlet />
      </>
    )
  }