import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

type Props = {
  isOpen: true | false;
  children: JSX.Element;
};

const Dialog: React.FC<Props> = ({ isOpen = false, children }) => {
  return (
    <DialogPrimitive.Root open={isOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="bg-white bg-opacity-60 data-[state=open]:animate-overlayShow fixed inset-0" />
        <DialogPrimitive.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] p-[25px] focus:outline-none">
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
