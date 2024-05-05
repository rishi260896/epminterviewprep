import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddQuestion } from "./components/AddQuestion";
import { EditQuestion } from "./components/EditQuestion";
import SignIn from "./components/SignIn";
import { AuthProvider } from "./components/Auth";
import { RequireAuth } from "./components/RequireAuth";
import { Loading } from "./components/Loading";

const LazyHome = React.lazy(() => import("./components/Home"));

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback = {<Loading />}>
              <LazyHome />
            </React.Suspense>
          }
        />

        <Route
          path="add-question"
          element={
            <RequireAuth>
              <AddQuestion />
            </RequireAuth>
          }
        />
        <Route
          path="edit/:idParam"
          element={
            <RequireAuth>
              <EditQuestion />
            </RequireAuth>
          }
        />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
