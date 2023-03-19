import { FunctionComponent } from "react";

const Footer: FunctionComponent = () =>{
    return (
        <footer>
            Made with <a href="https://reactjs.org/" target="_blank">React</a> & <a href="https://tailwindcss.com/" target="_blank">TailwindCSS</a>
            <br/>
            <a href="https://github.com/fabriciovo/react-github-list" target="_blank" className="underline">Repository Link</a>
        </footer>
    );
}

export default Footer;