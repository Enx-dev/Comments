import { ToastContainer } from "react-toastify";
import Container from "./Components/Container";
function App() {
  return (
    <div className='App'>
      <Container />
      <ToastContainer
        position='bottom-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        containerId={1}
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
