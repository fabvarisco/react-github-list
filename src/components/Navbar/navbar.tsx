import { FunctionComponent } from "react";

type Props = {};
const Navbar: FunctionComponent<Props> = () => {
  return (
    <nav>
      <div className="h-4 ml-2 mr-auto">
        <h1>Github List</h1>
      </div>
    </nav>
  );
};

export default Navbar;
