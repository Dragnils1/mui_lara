import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import CabinetHeader from './components/cabinet/cabinetHeader';
import Login from './components/login';
import MainPage from './components/mainPage';
import NotFound from './routes/NotFound';
import useInitCSRF from './hooks/useInitCSRF';
import ClippedDrawer from './components/admin/constituents/sidebar';
import PrivateWrapper from "./routes/ProtectedRoute";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";


function App() {

  useInitCSRF()

  return (
    <>
      <BrowserRouter >
        <Routes >
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<Login />} />


          {/* This page give access for all cards and some pages from admin panel */}
          {/* <Route path='/base' element={<CabinetHeader />}>
            <Route path='' element={<BaseAdminers />}/>
            <Route path='/admin' element={<BaseAdminers />} />
            <Route path='/users' element={<BaseAdminers />} />
          </Route> */}


            <Route  element={<PrivateWrapper allowedRoles={['4JoWnkJXL4']} />}>

                <Route path='/admin' element={<ClippedDrawer />}>
                    {AdminRoutes.map(({path, elem}) => {
                        <Route key={path} path={path} element={{elem}} />
                    })}
                </Route>

            </Route>


            <Route  element={<PrivateWrapper allowedRoles={['4JoWnkJXL4']} />}>

                <Route path='/cabinet/:user_id' element={<CabinetHeader />}>
                    {UserRoutes.map(({path, elem}) => {
                        <Route key={path} path={path} element={{elem}} />
                    })}
                </Route>

            </Route>



          <Route path='*' element={<NotFound />}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
