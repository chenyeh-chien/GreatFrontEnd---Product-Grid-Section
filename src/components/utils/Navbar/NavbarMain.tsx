import { useState, useRef } from "react";
import { Link } from "react-router";
import { CSSTransition } from "react-transition-group";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BsList } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { clsx } from "clsx";
import type { NavbarLink } from "../types";
import appIcon from '../../../assets/stylenest.svg';
import './NavbarMain.css';

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
  const nodeRef = useRef(null);

  return (
    <nav className="flex flex-col ">
      <div className={clsx(
        'flex items-center self-stretch justify-between',
        'px-4 h-[68px] xl:gap-[103px]'
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
      </div>
      <CSSTransition
        in={showLinks}
        timeout={300}
        classNames="dropdown"
        nodeRef={nodeRef}
        unmountOnExit>
        <ul 
          ref={nodeRef}
          className="flex flex-col gap-2">
          {links.map(info => {
            return (
              <li 
                className="px-3 py-2"
                key={info.id}>
                <Link to={info.path}>
                  {info.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </CSSTransition>
    </nav>
  )
}