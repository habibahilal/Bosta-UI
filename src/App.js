import "./App.css";
import Header from "./components/Header";
import styled from "@emotion/styled";
import ShipmentProgress from "./components/ShipmentProgress";
import { TranslationProvider } from "./context/TranslationContext";
import { ShipmentTrackingProvider } from "./context/ShipmentTrackingContext";
import ShipmentDetails from "./components/ShipmentDetails";
import DeliveryAddress from "./components/DeliveryAddress";

const BostaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  padding: 30px;
  padding-top: 10px;
  margin: auto;
  width: 90%;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr; /* Single column for screens <= 768px */
  }
`;

function App() {
  return (
    <TranslationProvider>
      <ShipmentTrackingProvider>
        <div>
          <Header />
          <ShipmentProgress />
          <BostaGrid>
            <ShipmentDetails />
            <DeliveryAddress />
          </BostaGrid>
        </div>
      </ShipmentTrackingProvider>
    </TranslationProvider>
  );
}

export default App;
