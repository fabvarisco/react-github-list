import { FunctionComponent } from "react";


type Props = {
  };
const Footer: FunctionComponent<Props> = () =>{
    return (
        <footer>
            Made with <a href="https://reactjs.org/" target="_blank">React</a> & <a href="https://tailwindcss.com/" target="_blank">TailwindCSS</a>
        </footer>
    );
}

export default Footer;