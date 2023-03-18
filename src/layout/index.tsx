import {
  FunctionComponent,
  ReactNode,
} from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";



type Props = {
  children: ReactNode;
};

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="content">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
