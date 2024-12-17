import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Loader from "./Loader/Loader"

const SellerProtectedRoute = ({ children }) => {
    const { isLoading, isSeller, seller } = useSelector((state) => state.seller)

    if (isLoading === true) {
        return <Loader />

    }
    else {

        if (!isSeller) {
            return <Navigate to={`/`} replace />
        }
        return children

    }


}

export default SellerProtectedRoute