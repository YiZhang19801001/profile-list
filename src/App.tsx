/**
 * enter point of whole application
 * will put router configration here
 * when application growing size
 */
import React from "react";
import { UserListPage } from "./pages";
import { AppCover } from "./components";
import "./App.module.scss";
function App() {
  return (
    <>
      <AppCover />
      <UserListPage />
    </>
  );
}

export default App;
