import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './pages/Login'
import Applications from './pages/Applications';
import Home from './pages/Home'
import MainLayout from './layout/MainLayout';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Courses from './pages/Courses'
import Products from './pages/Products';
import Users from './pages/Users';
import Setting from './pages/Setting';
import Support from './pages/Support';
import Promocode from './pages/Promocode';
import AddProduct from './pages/AddProduct';
import AddCourses from './pages/AddCourses';
import ProductDetail from './pages/ProductDetail';
import UserDetail from './pages/UserDetail';
import CourseDetail from './pages/CourseDetail';
import AddLesson from './pages/AddLesson';
import Contacts from './pages/Contacts';
import AddPromocode from './pages/AddPromocode'
import LessonDetail from './pages/LessonDetail';
import EditPhone from './pages/Contacts/EditPhone';
import EditWhatsapp from './pages/Contacts/EditWhatsapp';
import EditSocial from './pages/Contacts/EditSocial';
import AnswerToSupport from './pages/AnswerToSuppor';
import EditCourse from './pages/EditCourse';
import ApplicationDetail from './pages/ApplicationDetail';

function App() {
  const router=createBrowserRouter([
    {
      path: "/login",
			element: <Login />,
    },
    {
      path: "*",
      element: <h1>404 ERROR</h1>
    },
    {
      element: <MainLayout />,
      children: [
        {
					path: "/",
					element: <Home />,
				},
				{
					path: "/applications",
					element: <Applications />,
				},
        {
					path: "/applications/:applicationId",
					element: <ApplicationDetail/>
				},
        {
          path: "/courses",
          element: <Courses/>
        },
        {
          path: "/courses/add",
          element: <AddCourses/>
        },
        {
          path: "/courses/:courseId/lessons",
          element: <CourseDetail/>
        },
        {
          path: "/courses/:courseId",
          element: <EditCourse/>
        },
        {
          path: "/courses/:courseId/addLesson",
          element: <AddLesson/>
        },
        {
          path: "/courses/:courseId/lessons/:lessonId",
          element: <LessonDetail/>
        },
        {
          path: "/products",
          element: <Products/>
        },
        {
          path: "/products/:productId",
          element: <ProductDetail/>
        },
        {
          path: "/products/add",
          element: <AddProduct/>
        },
        {
          path: "/users",
          element: <Users/>
        },
        {
          path: "/users/:userId",
          element: <UserDetail />
        },
        {
          path: "/setting",
          element: <Setting/>
        },
        {
          path: "/support",
          element: <Support/>
        },
        {
          path: "/support/:supportId",
          element: <AnswerToSupport/>
        },
        {
          path: "/promocode",
          element: <Promocode/>
        },
        {
          path: "/promocode/add",
          element: <AddPromocode/>
        },
        {
          path: "/setting/contacts",
          element: <Contacts/>
        },
        {
          path: "/setting/contacts/phone",
          element: <EditPhone/>
        },
        {
          path: "/setting/contacts/whatsapp",
          element: <EditWhatsapp/>
        },
        {
          path: "/setting/contacts/social",
          element: <EditSocial/>
        },
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
    </div>
  );
}

export default App;
