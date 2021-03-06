import styled from "styled-components";
import {
  KeyFrameSidebar,
  KeyFrameSidebarIn,
  KeyFrameSidebarFade
} from "../../styles/Keyframes";

export const Navbar = styled.div`
  height: 60px;
  width:100%;
  border: none;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: baseline;
  align-content: center;
  align-items: center;
  font-size: 1rem;
  color: var(--text-color);
  background-color: lightGrey;
  z-index: 10000;
  button {
    background: none;
    border: none;
    outline: none;
    padding: 20px;
    cursor: pointer;
  }
`;

export const Overlay = styled.aside`
  min-height: 100vh;
  background: #83a4d4;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #b6fbff, #83a4d4);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #b6fbff, #83a4d4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  width: 25%;
  z-index: 1000;

  @media (max-width: 1100px) {
    width: 100%;
  }
  ${props => !props.open} {
    animation: ${KeyFrameSidebar} 0.6s forwards;
  }
  ${props => props.open} {
    animation: ${KeyFrameSidebarIn} 0.6s forwards;
    pointer-events: none;
  }
  ul {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    img {
      width: 40%;
      padding: 0 0 100px;
    }
    li {
      
      min-width: 200px;
      background: var(--background-color);
      border-radius: 10px;
      margin: 4px 0;
      font-size:12px;

      a {
        display: block;
        padding: 20px;
        font-size: 2.5em;
        color: var(--text-color);
        margin: 10px 0;
        transition: 0.4s;
      }
    }
  }
`;

export const NavigationExit = styled.button`
  position: absolute;
  top: 5px;
  left: 15px;
  transition: 0.4s;
  margin: 0 0;
  padding: 0 0;
  :hover {
    transition: 0.4s;
    transform: scale(1.1);
  }
`;

export const Sidebar = styled.div`
  width: 100%;
  min-height: 100vh;
  top: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  ${props => props.open === true} {
    animation: ${KeyFrameSidebarFade} 0.6s forwards;
  }
`;
