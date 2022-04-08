import { FunctionComponent } from "react";

type Props = {};
const Navbar: FunctionComponent<Props> = () => {
  return (
    <nav>
      <div className="logo">
        <h1>Github List</h1>
      </div>
    </nav>
  );
};

export default Navbar;
