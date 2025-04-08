import { Routes, Route } from "react-router-dom";
import { Course, CourseLayout, Home, Layout } from "./pages";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<Home />} />
        </Route>
        <Route path="/courses" element={<CourseLayout />}>
          <Route index={true} element={<Course />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
