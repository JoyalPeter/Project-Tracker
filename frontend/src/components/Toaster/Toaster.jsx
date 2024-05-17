import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toaster() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      closeOnClick={false}
      draggable={false}
      theme="colored"
      transition:Slide
      pauseOnHover={true}
      data-testid="test-toaster"
     />
  );
}
