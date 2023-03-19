import {
  FunctionComponent,
  ReactNode,
} from "react";
import Footer from "./Footer";



type Props = {
  children: ReactNode;
};

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="content">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
