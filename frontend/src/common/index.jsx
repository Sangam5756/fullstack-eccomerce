const backendDomain = "http://localhost:5001"

const SummaryApi = {


    signUp: {
        url: `${backendDomain}/api/signup`,
    },
    signIn: {
        url: `${backendDomain}/api/login`,
    },

    current_User: {
        url: `${backendDomain}/api/user-details`,
    },
    user_Logout: {
        url: `${backendDomain}/api/user-Logout`,
    },
    all_Users: {
        url: `${backendDomain}/api/all-users`,
    },
    
}

export default SummaryApi;