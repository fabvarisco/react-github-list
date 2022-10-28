import {
  forwardRef,
  ReactNode,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from "react";

interface Ref {
  handleOpenModal: () => void;
};

interface Props {
  children: ReactNode;
  name: string;
};

const Modal: ForwardRefRenderFunction<Ref, Props> = (
  { children, name }: Props,
  ref
) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleOpenModal = () => {
    setVisible(!visible);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        handleOpenModal,
      };
    },
    []
  );

  return (
    visible ? (
      <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 outline-none overflow-x-hidden overflow-y-auto">
        <div className="bg-white rounded-md text-center w-full h-96 overflow-auto mx-8">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-xl font-medium leading-normal text-gray-800"
            >
              {name}
            </h5>
            <button
              onClick={() => setVisible(false)}
              type="button"
              className="btn-close box-content w-4 h-4 p-1 text-indigo-500 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              X
            </button>
          </div>
          {children}
        </div>
      </div>
    ) : null
  );
};

export default forwardRef(Modal);
