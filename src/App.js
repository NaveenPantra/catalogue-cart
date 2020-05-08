import React from 'react';
import Catalogue from "./pages/Catalogue";
import Header from "./components/commons/Header";

const CurrencyContext = React.createContext("₹");

function App() {
  return (
      <CurrencyContext.Provider value={"₹"}>
          <Header/>
          <Catalogue/>
      </CurrencyContext.Provider>
  );
}

export default App;
export {CurrencyContext}
