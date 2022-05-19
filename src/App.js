import "./assets/sass/style.css";
//import "./assets/css/App.css";
import KidsRoutes from "./routes/KidsRoutes";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { SnackbarProvider } from "notistack";
import Toast from "./components/toast";

function App() {
  return (
    <Provider store={configureStore()}>
      <SnackbarProvider
        maxSnack={3}
        content={(key, { ...message }) => (
          <Toast id={key} message={message} duration={3000} />
        )}
        autoHideDuration={3000}
      >
        <KidsRoutes />
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
