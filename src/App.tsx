// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Loading from "./components/util/Loading";

function App() {
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUid(user?.uid ?? null);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading)
    return (
      <div className="h-screen w-screen center">
        <Loading />
      </div>
    );

  return (
    <Routes>
      {/* Redirect "/" to "/:uid" if signed in, otherwise to login */}
      <Route path="/" element={<Home authUid={uid} />} />
      <Route
        path="/login"
        element={uid ? <Navigate to={`/${uid}`} /> : <Login />}
      />
      <Route path="/:userId" element={<Home authUid={uid} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
