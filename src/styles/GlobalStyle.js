import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { LoadingKeyframe, KeyFrameSucces } from "./Keyframes";

const GlobalStyle = createGlobalStyle`
  :root {
    --menu-color: #F3EAD6;
    --text-color: #203449;
    --main-button-color: #CF2E2E;
    --background-color: #FCFAF5;
    --search-field: hsl(220, 7%, 17%);
    --highlight-color: hsl(220, 7%, 27%);
    --toolbar-color: hsl(0, 0%, 98%);
    --accent-color: hsl(227, 58%, 65%);
    --remove-color: hsl(0, 38%, 50%);
    --remove-color-highlight: hsl(0, 49%, 70%);
    --offwhite: hsl(192, 15%, 94%);
    --muted: hsl(240, 0%, 46%);
    --favourite: hsl(51, 95%, 58%);
  }

  body {
    width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background: #83a4d4;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #b6fbff, #83a4d4);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #b6fbff, #83a4d4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: var(--text-color);
    overflow-x:hidden;
    padding-bottom: 60px;
  }
  * {
    box-sizing: border-box;
    padding: 0rem;
    margin: 0rem;
    font-family: sans-serif;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }

`;

const Success = styled.div`
  width: 100%;
  padding: 30px 0;
  vertical-align: bottom;
  max-height: 100px;
  background: #4bb543;
  color: white;
  font-size: 3em;
  font-weight: bold;
  text-align: center;
  position: absolute;
  bottom: 0;
  animation: ${LoadingKeyframe} 0.4s ease-in;
`;

const Loading = styled.div`
  width: 100%;
  padding: 30px 0;
  vertical-align: middle;
  max-height: 100px;
  background: var(--text-color);
  color: #fcfaf5;
  font-size: 3em;
  font-weight: bold;
  text-align: center;
  position: absolute;
  top: 50px;
  bottom: 0;
  animation: ${LoadingKeyframe} 0.8s infinite ease-in-out;
`;
const Button = styled.div`
  padding: 0.5em 1.5em;
  margin: 2em 0;
  border: none;
  outline: none;
  background: #4bb543;
  color: white;
  font-size: 2em;
  font-weight: bold;
  border-radius: 0.1em;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.04);
  }
  &:disabled {
    pointer-events: none;
    background-color: grey;
  }
`;

const FormStyle = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* min-height: 160px; */
  padding-top: 40px;

  margin: 0;
  flex-direction: column;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
    width: ${props => (props.fullWidth ? "80%" : "")};
  }
  select {
    width: 100%;
    margin: 0.5em;
    padding: 1em;
    font-size: 1.5em;

    select select {
      -moz-appearance: none; /* Firefox */
      -webkit-appearance: none; /* Safari and Chrome */
      color: var(--main-button-color);
      background-color: var(--main-button-color);
    }
    select::-ms-expand {
      display: none;
    }
  }
  input {
    font-size: 1.5em;
    border: none;
    background-image: none;
    background-color: --menu-color;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    text-align: center;
    padding: 1em;
    margin: 0.5em 0;
    outline: none;
    transition: transform 0.3s ease-in-out;
    width: 100%;
  }
  label {
    margin-left: 2em;
    display: block;
    position: relative;
    margin-top: -1.7em; /* make this margin match whatever your line-height is */
    line-height: 1.4em; /* can be set here, or elsewehere */
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: 1px solid var(--text-color);
    -webkit-text-fill-color: var(--text-color);
    -webkit-box-shadow: 0 0 0px 1000px var(--menu-color) inset;
    transition: background-color 5000s ease-in-out 0s;
    transition: transform 0.3s ease-in-out;
  }
  input::placeholder {
    opacity: 1; /* Firefox */
  }
  input:focus,
  textarea:focus,
  select:focus {
    outline-offset: 0px !important;
  }
  button {
    padding: 0.5em 1.5em;
    margin: 2em 0;
    border: none;
    outline: none;
    background: var(--text-color);
    color: white;
    font-size: 2em;
    font-weight: bold;
    border-radius: 0.1em;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      transform: scale(1.04);
    }
    &:disabled {
      pointer-events: none;
      background-color: grey;
    }
  }
  h1 {
    height: 2em;
    text-align: center;
  }
  p {
    padding: 1em 0 0;
    text-align: center;
    font-size: 1.2em;
  }
`;
export { GlobalStyle, FormStyle, Success, Loading, Button };
