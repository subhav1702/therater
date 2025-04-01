import { useEffect, useState } from "react";
import { Route, Redirect } from 'react-router-dom';
import routes from './routes';
import LandingLayout from "../components/landingLayout";
import NotAuthorised from '@/components/notAuthorised';
import secureLocalStorage from "react-secure-storage";
import { logedInUser } from "@/services/helper";

const PrivateRoutes = () => {

    const [privateRoute, setPrivateRoutes] = useState([])

    useEffect(() => {
        const filterRoutes = routes.filter((routes) => !routes.isPublic);
        setPrivateRoutes(filterRoutes);
    }, [])

    function getModuleKeyFromPath(path) {
        return null;
    }

    return privateRoute.map((route, index) => {
        const RouteVal = route.component;
        return (
            <Route
                key={index}
                path={route.path}
                exact
                render={(props) => (
                    //Helper.isAuthenticated()
                    true
                        ? (
                            <LandingLayout>
                                {logedInUser()
                                    ? <RouteVal {...props} />
                                    : <NotAuthorised />}
                            </LandingLayout>
                        )
                        : <Redirect to="/" />
                )}
            >
            </Route>
        )
    })
}

export default PrivateRoutes;