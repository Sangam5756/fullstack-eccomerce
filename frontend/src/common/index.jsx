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
    update_Users: {
        url: `${backendDomain}/api/update-user`,
    },
    add_Product: {
        url: `${backendDomain}/api/add-product`,
    },
    get_Product: {
        url: `${backendDomain}/api/get-product`,
    },
    edit_Product: {
        url: `${backendDomain}/api/edit-product`,
    },
    category_Product: {
        url: `${backendDomain}/api/getProduct-category`,
    },
    categoryWise_Product: {
        url: `${backendDomain}/api/category-products`,
    },
    Product_Details: {
        url: `${backendDomain}/api/product-details`,
    },
    addtoCart: {
        url: `${backendDomain}/api/add-to-cart`,
    },

}

export default SummaryApi;