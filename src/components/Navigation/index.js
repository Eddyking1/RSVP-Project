import React from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../Session";
import { Navbar, Sidebar, Overlay, NavigationExit } from "./styles";
import { HamburgerMenu, NavCross } from "../../styles/Icons";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";

const Navigation = ({ sidebarToggleClickHandler, open }) => {
  return (
    <Navbar>
      <button name="menu" onClick={sidebarToggleClickHandler}>
        <HamburgerMenu />
      </button>
      <Sidebar onClick={sidebarToggleClickHandler} open={open}>
        <Overlay open={open}>
          <AuthUserContext.Consumer>
            {authUser =>
              authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
          </AuthUserContext.Consumer>
        </Overlay>
      </Sidebar>
    </Navbar>
  );
};

const NavigationAuth = () => (
  <ul>
    <NavigationExit>
      <NavCross />
    </NavigationExit>
    <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>
    <li>
      <Link to={ROUTES.LANDING}>Hem</Link>
    </li>
    <li>
      <Link to={ROUTES.OSA}>OSA</Link>
    </li>
    <li>
      <Link to={ROUTES.CREATE_OSA}>Create New</Link>
    </li>
    <SignOutButton />
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <NavigationExit>
      <NavCross />
    </NavigationExit>

    <li>
      <Link to={ROUTES.SIGN_IN}> Logga in </Link>
    </li>
  </ul>
);

export default Navigation;
