import { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Modal: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 outline-none overflow-x-hidden overflow-y-auto">
      <div className="bg-white px-16 py-14 rounded-md text-center w-full h-96 overflow-auto mx-4">
          
        {children}
      </div>
    </div>
  );
};
export default Modal;
