import {
  FunctionComponent,
  ReactNode,
} from "react";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";


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
