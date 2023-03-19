import {
  FunctionComponent,
  ReactNode,
} from "react";



type Props = {
  children: ReactNode;
};

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="content">
      {children}
    </div>
  );
};

export default Layout;
