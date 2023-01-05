import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { useCallback, useEffect } from "react";

interface ModalProps {
  title: string,
  description?: string,
  showState: [boolean, Dispatch<SetStateAction<boolean>>],
}

export const Modal = ({ title, description, showState, children }: PropsWithChildren<ModalProps>) => {

  const [show, setShow] = showState;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShow(false);
    }
  }, [setShow]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {show && <div className="modal modal-open">
        <div className="modal-box">
          {/* modal close button */}
          <label className="btn btn-sm btn-circle absolute right-2 top-2"
                 onClick={() => setShow(false)}
          >
            ✕
          </label>

          {/* modal title and description */}
          <h3 className="font-bold text-lg">{title}</h3>
          {description && <p className="py-4">{description}</p>}

          {children}
        </div>
      </div>}
    </>
  );
};