import { Routes, Route } from "react-router-dom";
import { Home, Layout } from "./pages";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
