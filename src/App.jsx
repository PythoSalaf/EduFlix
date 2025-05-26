import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  Course,
  CourseDetails,
  CourseLayout,
  ErrorPage,
  Home,
  Layout,
} from "./pages";
function App() {
  return (
    <>
    <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<Home />} />
        </Route>
        <Route path="/courses" element={<CourseLayout />}>
          <Route index={true} element={<Course />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
