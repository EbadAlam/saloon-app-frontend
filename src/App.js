import './App.scss';
import './responsive.scss';
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import Signup from './screens/Signup/Signup';
import VerifyEmail from './screens/VerifyEmail/VerifyEmail';
import Stores from './components/Admin/Stores/Stores';
import { ROUTES } from './routes';
import AddStore from './components/Admin/Stores/AddStore';
import ServiceCategoriesPage from './components/Admin/ServiceCategory/ServiceCategory';
import Servicespage from './components/Admin/Services/Services';
import StorePage from './screens/Store/Store';
import EditStore from './components/Admin/Stores/EditStore';
import WorkingHoursPage from './components/Admin/WorkingHours/WorkingHours';
import TeamsPage from './components/Admin/Team/Team';
import MainLayout from './components/MainComponent/MainComponent';
import 'leaflet/dist/leaflet.css';
import WorkerDashboard from './components/Worker/Dashboard/Dashboard';
import ReviewsPage from './components/Worker/Reviews/Reviews';
import PageNotFouond from './screens/404Page/404Page';
import AllReviewsPage from './screens/AllReviews/AllReviews';
import WorkersBookingsPage from './components/Worker/Bookings/Bookings';
import LoginSignupPage from './screens/LoginSignup/LoginSignup';
import CustomerLogin from './screens/Login/CustomerLogin';
import ProfessionalLoginPage from './screens/Login/ProfessionalLogin';
import BookingPage from './screens/Booking/Booking';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AdminBookingsPage from './components/Admin/Bookings/Bookings';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import SearchPage from './screens/SearchPage/SearchPage';
import ForBusiness from './screens/ForBusiness/ForBusiness';
import ProfilePage from './screens/Profile/Profile';
import AppointmentsPage from './screens/Appointments/Appointments';
import FavoritesPage from './screens/Favorites/Favorites';
import MasterAdminLogin from './screens/Login/MasterAdminLogin';
import UsersPage from './components/Admin/MasterAdmin/Users/Users';
import MasterDashboard from './components/Admin/MasterAdmin/Dashboard/Dashboard';
import StoreGalleryPage from './screens/Store/StoreGallery';
import MasterCategoriesPage from './components/Admin/MasterAdmin/Categories/Categories';
import MasterServicesPage from './components/Admin/MasterAdmin/Services/Services';
import MasterStoresPage from './components/Admin/MasterAdmin/Stores/Stores';
import MasterReviewsPage from './components/Admin/MasterAdmin/Reviews/Revieiws';
import MasterBookingsPage from './components/Admin/MasterAdmin/Bookings/Bookings';
import AdminReviewsPage from './components/Admin/Reviews/Reviews';
import PasswordReset from './components/PasswordReset/PasswordReset';
import SocialLoginRedirect from './components/SocialLoginRedirect/SocialLoginRedirect';
import AppWrapper from './ServerCheck';
import Blogs from './screens/Blogs/Blogs';
import MasterBlogsPage from './components/Admin/MasterAdmin/Blogs/Blogs';
import MasterAddEditBlogPage from './components/Admin/MasterAdmin/Blogs/AddBlog';
import BlogDetails from './screens/Blogs/BlogDetails';
import StatusPage from './screens/StatusPage/StatusPage';
import GetTheApp from './screens/GetTheApp/GetTheApp';
import SetupStore from './screens/SetupStore/SetupStore';
import SingleStore from './components/Admin/Stores/SingleStore';
import Pricing from './screens/Pricing/Pricing';
import HelpCenter from './screens/HelpCenter/HelpCenter';
import MasterInqueriesPage from './components/Admin/MasterAdmin/Inqueries/Inqueries';
import CategoryPage from './screens/CategoryPage/CategoryPage';

function App({initialData}) {
  return (
    <AppWrapper>
      {/* <BrowserRouter basename="/new-site/frontend"> */}
        <ScrollToTop />
        <Routes>
            <Route path={ROUTES.setupStore} element={<SetupStore />} />
            <Route element={<MainLayout />}>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.status} element={<StatusPage />} />
            <Route path={ROUTES.getTheApp} element={<GetTheApp />} />
            <Route path={ROUTES.pricing} element={<Pricing />} />
            <Route path={ROUTES.helpCenter} element={<HelpCenter />} />
            <Route path={ROUTES.contact} element={<HelpCenter />} />
            <Route path={ROUTES.blogs} element={<Blogs />} />
            <Route path={ROUTES.blogPage} element={<BlogDetails />} />
            <Route path={ROUTES.categoryPage} element={<CategoryPage />} />
            <Route path={ROUTES.login} element={<Login />} />
            <Route path={ROUTES.signup} element={<Signup />} />
            <Route path="/verify-email/:id/:token" element={<VerifyEmail />} />
            <Route path="/forgot-password/:email/:reset_token" element={<PasswordReset />} />
            <Route path="/auth/callback" element={<SocialLoginRedirect />} />
            <Route path={ROUTES.searchPage} element={<SearchPage />} />
            <Route path={ROUTES.forBusiness} element={<ForBusiness />} />
            <Route path={ROUTES.userProfile} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path={ROUTES.userAppointment} element={<ProtectedRoute><AppointmentsPage /></ProtectedRoute>} />
            <Route path={ROUTES.userFav} element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
            <Route
              path={ROUTES.storePage}
              element={
                <StorePage initialData={initialData} />
              }
            />
            <Route
              path={ROUTES.storeGalleryPage}
              element={
                <StoreGalleryPage />
              }
            />
            <Route
              path={ROUTES.allReviewPage}
              element={
                  <AllReviewsPage />
              }
            />
          </Route>
          <Route path={ROUTES.loginSignup} element={<LoginSignupPage />} />
          <Route path={ROUTES.customerLogin} element={<CustomerLogin />} />
          <Route path={ROUTES.ownerLogin} element={<ProfessionalLoginPage />} />
          <Route path={ROUTES.bookingPage} element={<BookingPage />} />
          <Route
            path={ROUTES.adminDashboard}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.adminAddCategory}
            element={
              <ProtectedRoute>
                <ServiceCategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.adminStores}
            element={
              <ProtectedRoute>
                <Stores />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.adminSingleStore}
            element={
              <ProtectedRoute>
                <SingleStore />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.adminStoresAdd}
            element={
              <ProtectedRoute>
                <AddStore />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.adminEditStore}
            element={
              <ProtectedRoute>
                <EditStore />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.adminAddWorkingHours}
            element={
              <ProtectedRoute>
                <WorkingHoursPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.adminAddServices}
            element={
              <ProtectedRoute>
                <Servicespage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.adminAddTeamMembers}
            element={
              <ProtectedRoute>
                <TeamsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.adminBookings}
            element={
              <ProtectedRoute>
                <AdminBookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.adminReviews}
            element={
              <ProtectedRoute>
                <AdminReviewsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.workerDashboard}
            element={
              <ProtectedRoute>
                <WorkerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.workerBookings}
            element={
              <ProtectedRoute>
                <WorkersBookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.workerReviews}
            element={
              <ProtectedRoute>
                <ReviewsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFouond />} />
            {/* master admin  */}
          <Route path={ROUTES.masterAdminLogin} element={<MasterAdminLogin />} />
          <Route
            path={ROUTES.masterAdminDashboard}
            element={
              <ProtectedRoute admin>
                <MasterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.masterAdminUsers}
            element={
              <ProtectedRoute admin>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.masterAdminServicesCategories}
            element={
              <ProtectedRoute admin>
                <MasterCategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.masterAdminServices}
            element={
              <ProtectedRoute admin>
                <MasterServicesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.masterAdminStores}
            element={
              <ProtectedRoute admin>
                <MasterStoresPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.masterAdminReviews}
            element={
              <ProtectedRoute admin>
                <MasterReviewsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.masterAdminInqueries}
            element={
              <ProtectedRoute admin>
                <MasterInqueriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.masterAdminBookings}
            element={
              <ProtectedRoute admin>
                <MasterBookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.masterAdminBlogs}
            element={
              <ProtectedRoute admin>
                <MasterBlogsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.masterAdminBlogsAdd}
            element={
              <ProtectedRoute admin>
                <MasterAddEditBlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.masterAdminBlogsEdit}
            element={
              <ProtectedRoute admin>
                <MasterAddEditBlogPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      {/* </BrowserRouter> */}
    </AppWrapper>
  );
}

export default App;