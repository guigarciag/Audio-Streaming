import * as React from "react";
import MainContainer from "./navigation/MainContainer";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <MainContainer />
    </AuthProvider>
  );
}

export default App;
