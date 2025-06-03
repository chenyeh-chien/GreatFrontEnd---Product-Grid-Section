import { useState, useEffect } from "react";
import { Link } from "react-router";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BsList } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { clsx } from "clsx";
import type { NavbarLink } from "../types";
import appIcon from '../../../assets/stylenest.svg';

const links: NavbarLink[] = [{
  id: 1,
  name: "Shop all",
  path: "/"
},
{
  id: 2,
  name: "Latest arrivals",
  path: "/latest-arrivals"
}];

export default function NavbarMain() {
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    if (showLinks) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showLinks]);

  function handleWindowResize(event: UIEvent) {
    event.preventDefault();

    if (showLinks) {
      setShowLinks(false);
    }
  }

  return (
    <header className="flex flex-col px-4 md:px-8 w-full bg-white">
      <nav 
        className={clsx(
          'flex items-center self-stretch justify-between',
          'h-[68px] xl:gap-[103px] xl:py-3 z-20'
        )}
        aria-label="Main navigation">
        <Link 
          to="/"
          aria-label="Homepage">
          <img 
            src={appIcon}
            alt="App logo" />
        </Link>
        <ul className="hidden xl:flex xl:gap-8 xl:flex-grow-1">
          {links.map(info => {
            return (
              <li key={info.id}>
                <Link to={info.path}>
                  {info.name}
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="flex gap-4">
          {
            showLinks
            ? <button>
                <RxCross2
                  className="w-6 h-6 hover:cursor-pointer"
                  aria-label="Close navigation menu"
                  onClick={() => setShowLinks(false)}/>
              </button>
            : (
              <>
                <button>
                  <RiShoppingBag3Line 
                    className="w-6 h-6 hover:cursor-pointer"
                    aria-label="View shopping cart"/>
                </button>
                <button>
                  <BsList 
                    className="w-6 h-6 hover:cursor-pointer xl:hidden"
                    aria-label="Open navigation menu"
                    onClick={() => setShowLinks(true)}/>
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
          'bg-white w-full'
        )}
        aria-label="Mobile navigation menu">
        <ul className="flex flex-col gap-2 self-stretch">
          {links.map(info => {
            return (
              <li 
                className="px-3 py-2"
                key={info.id}
                onClick={() => setShowLinks(false)}>
                <Link to={info.path}>
                  {info.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}