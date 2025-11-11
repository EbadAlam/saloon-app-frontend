export const ROUTES = {
    home: '/',
    loginSignup: '/user-flow',
    customerLogin: '/auth/customer',
    ownerLogin: '/auth/professional',
    login: '/login',
    signup: '/signup',
    status: '/status',
    pricing: '/pricing',
    helpCenter: '/help-and-support',
    contact: '/contact',
    blogs: '/blogs',
    blogPage: '/blogs/:slug',
    getBlogPage: (slug) => `/blogs/${slug}`,
    categoryPage:'/categories/:slug',
    getCategoryPage: (slug) => `/categories/${slug}`,

    adminDashboard: '/vendor/dashboard',
    adminStores: '/vendor/stores',
    adminSingleStore: '/vendor/stores/:storeId',
    getAdminSingleStore: (storeId) => `/vendor/stores/${storeId}`,
    adminStoresAdd: '/vendor/add-store',
    adminEditStore: '/vendor/stores/:storeId/edit',
    getAdminEditStore: (storeId) => `/vendor/stores/${storeId}/edit`,
    adminAddCategory: '/vendor/stores/:storeId/category',

    getAdminAddWorkingHours: (storeId) => `/vendor/stores/${storeId}/working-hours`,
    adminAddWorkingHours: '/vendor/stores/:storeId/working-hours',

    getAdminAddTeamMembers: (storeId) => `/vendor/stores/${storeId}/team`,
    adminAddTeamMembers: '/vendor/stores/:storeId/team',

    getAdminBookings: (storeId) => `/vendor/stores/${storeId}/bookings`,
    adminBookings: '/vendor/stores/:storeId/bookings',

    getAdminReviews: (storeId) => `/vendor/stores/${storeId}/reviews`,
    adminReviews: '/vendor/stores/:storeId/reviews',

    getAdminAddCategory: (storeId) => `/vendor/stores/${storeId}/category`,
    adminAddServices: '/vendor/stores/:storeId/services',
    getAdminAddServices: (storeId) => `/vendor/stores/${storeId}/Services`,
    storePage: '/stores/:slug',
    getStoreFrontPage: (slug) => `/stores/${slug}`,

    allReviewPage: '/stores/:slug/reviews',
    getAllReviewPage: (slug) => `/stores/${slug}/reviews`,
    //
    setupStore:'/professional/setup-business',
    // worker routes 
    workerDashboard: '/worker/dashboard',
    workerBookings: '/worker/bookings',
    workerReviews: '/worker/reviews',
    
    getBookingPage: (slug) => `/stores/${slug}/booking`,
    bookingPage: '/stores/:slug/booking',

    getStoreGalleryPage: (slug) => `/stores/${slug}/gallery`,
    storeGalleryPage: '/stores/:slug/gallery',
    
    getUserBookingPage: (slug) => `/user/${slug}/bookings`,
    userBookingPage: '/user/:slug/bookings',

    getTheApp: '/app',
    searchPage: '/search',
    forBusiness: '/for-business',
    userProfile: '/profile',
    userAppointment: '/appointments',
    userFav: '/favorites',
    // master addmin 
    masterAdminLogin: '/master-login',
    masterAdminDashboard: '/admin/dashboard',
    masterAdminServicesCategories: '/admin/categories',
    masterAdminServices: '/admin/services',
    masterAdminStores: '/admin/stores',
    masterAdminBookings: '/admin/bookings',
    masterAdminReviews: '/admin/reviews',
    masterAdminUsers: '/admin/users',
    masterAdminInqueries: '/admin/inqueries',
    masterAdminBlogs: '/admin/blogs',
    masterAdminBlogsAdd: '/admin/blogs/add',
    masterAdminBlogsEdit: '/admin/blogs/edit/:blogId',
    getMasterAdminBlogsEdit: (blogId) => `/admin/blogs/edit/${blogId}`,
};