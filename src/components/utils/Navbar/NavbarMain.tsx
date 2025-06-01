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

    return () => document.body.classList.remove("overflow-hidden");
  }, [showLinks]);

  return (
    <header className="flex flex-col px-4 w-full bg-white">
      <nav className={clsx(
        'flex items-center self-stretch justify-between',
        'h-[68px] xl:gap-[103px] z-20'
      )}>
        <Link to="/">
          <img src={appIcon} />
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
            ? <RxCross2
                className="w-6 h-6 hover:cursor-pointer"
                onClick={() => setShowLinks(false)}/>
            : (
              <>
                <RiShoppingBag3Line className="w-6 h-6 hover:cursor-pointer"/>
                <BsList 
                  className="w-6 h-6 hover:cursor-pointer xl:hidden"
                  onClick={() => setShowLinks(true)}/>
              </>
            )
          }
        </div>
      </nav>
      <nav className={clsx(
        'fixed left-0 h-full px-4 py-[68px]',
        'opacity-0 duration-300 ease-in-out',
        showLinks && 'opacity-100',
        'bg-white w-full'
      )}>
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