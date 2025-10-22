import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SideBar from '../SideBar/SideBar'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { ROUTES } from '../../../routes'


function AdminLayout({ children }) {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    if (token) {
        if (user.user_info.role === 'owner' || user.user_info.role === 'worker' || user.user_info.role === 'master-admin') {
            return (
                <>
                    <div className='dashboard-main-wrapper'>
                        <Header />
                        <SideBar />
                        <div className='dashboard-wrapper'>
                            {children}
                            <Footer />
                        </div>
                    </div>

                </>
            )
        } else {
            navigate('/');
        }
    } else {
        navigate(ROUTES.loginSignup, { replace: true,state: { redirectToState: "home" }});
    }
}

export default AdminLayout