import {
  FunctionComponent,
  ReactNode,
} from "react";
import Footer from "../Footer/footer";
import Navbar from "../Navbar/navbar";

type Props = {
  children: ReactNode;
};

const Layout: FunctionComponent<Props> = ({children}) => {
  return (
    <div className="content">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
