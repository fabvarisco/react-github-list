import {
  FunctionComponent,
  ReactNode,
} from "react";
import Footer from "@layout/Footer";
import Navbar from "@layout/Navbar";


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
