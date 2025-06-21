import { NavLink } from "react-router";
import { BsList } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { clsx } from "clsx";
import type { NavbarLink } from "../types";
import { useOverflowHidden } from "../hooks";
import ShoppingCart from "./Shopping Cart/ShoppinfCart";
import appIcon from '../../../assets/stylenest.svg';

const links: NavbarLink[] = [{
  id: 1,
  name: "Shop all",
  path: "/shop-all"
},
{
  id: 2,
  name: "Latest arrivals",
  path: "/latest-arrivals"
}];

export default function NavbarMain() {
  const [showLinks, setShowLinks] = useOverflowHidden(document.body);

  return (
    <header className="flex flex-col px-4 md:px-8 w-full bg-white">
      <nav 
        className={clsx(
          'flex items-center self-stretch justify-between',
          'h-[68px] xl:gap-[103px] xl:py-3 z-20'
        )}
        aria-label="Main navigation">
        <NavLink 
          to="/"
          aria-label="Homepage">
          <img 
            src={appIcon}
            alt="App logo" 
            loading="lazy"/>
        </NavLink>
        <ul className="hidden xl:flex xl:gap-8 xl:flex-grow-1">
          {links.map(info => {
            return (
              <li key={info.id}>
                <NavLink to={info.path}>
                  {info.name}
                </NavLink>
              </li>
            )
          })}
        </ul>
        <div className="flex gap-4">
          {
            showLinks
            ? <button onClick={() => setShowLinks(false)}>
                <RxCross2
                  className="w-6 h-6 hover:cursor-pointer"
                  aria-label="Close navigation menu" />
              </button>
            : (
              <>
                <ShoppingCart />
                <button onClick={() => setShowLinks(true)}>
                  <BsList 
                    className="w-6 h-6 hover:cursor-pointer xl:hidden"
                    aria-label="Open navigation menu" />
                </button>
              </>
            )
          }
        </div>
      </nav>
      <nav 
        className={clsx(
          'fixed left-0 h-full px-4 py-[68px]',
          'opacity-0 duration-300 ease-in-out -translate-x-full',
          showLinks && 'opacity-100 translate-x-0',
          'bg-white w-full overflow-y-auto'
        )}
        aria-label="Mobile navigation menu">
        <ul className="flex flex-col gap-2 self-stretch">
          {links.map(info => {
            return (
              <li 
                className="px-3 py-2"
                key={info.id}
                onClick={() => setShowLinks(false)}>
                <NavLink to={info.path}>
                  {info.name}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}