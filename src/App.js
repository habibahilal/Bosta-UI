import "./App.css";
import Header from "./components/Header";
import { TranslationProvider } from "./context/TranslationContext";

function App() {
  return (
    <TranslationProvider>
      <div>
        <Header />
      </div>
    </TranslationProvider>
  );
}

export default App;
