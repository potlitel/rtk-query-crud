/* eslint-disable react/prop-types */
import ReactDom from "react-dom";

const TaskModal = ({ openNoteModal, setOpenNoteModal, children }) => {
  if (!openNoteModal) return null;
  return ReactDom.createPortal(
    <>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,.5)] z-[1000]"
        onClick={() => setOpenNoteModal(false)}
      ></div>
      <div className="max-w-lg w-full rounded-md fixed top-0 xl:top-[10%] left-1/2 -translate-x-1/2 bg-white z-[1001] p-6">
        {children}
      </div>
    </>,
    document.getElementById("note-modal")
  );
};

export default TaskModal;
