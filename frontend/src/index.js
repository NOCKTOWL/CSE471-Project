import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import "./index.css";
import "./indextw.css";
import App from "./App";
// import { ThemeProvider } from "@material-tailwind/react";
import { PersonalExpenseProvider } from "./context/PersonalExpenseContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import { ProfileContextProvider } from "./context/ProfileContext";
import { PersonalTaskProvider } from "./context/PersonalTaskContext";
import { HomeExpenseProvider } from "./context/HomeExpenseContext";
import { HomeContextProvider } from "./context/HomeContext";
import { HomeTaskProvider } from "./context/HomeTaskContext";
import { DebtCreditProvider } from "./context/DebtCreditContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ChatContextProvider>
          {/* <ThemeProvider> */}
          <ProfileContextProvider>
            <HomeContextProvider>
              <PersonalExpenseProvider>
                <PersonalTaskProvider>
                  <HomeTaskProvider>
                    <HomeExpenseProvider>
                      <DebtCreditProvider>
                        <App />
                      </DebtCreditProvider>
                    </HomeExpenseProvider>
                  </HomeTaskProvider>
                </PersonalTaskProvider>
              </PersonalExpenseProvider>
            </HomeContextProvider>
          </ProfileContextProvider>
          {/* </ThemeProvider> */}
        </ChatContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
