import React from "react";
import { Route } from 'react-router-dom';
import routes from './routes';
import Layout from "../components/layout";

const PublicRoutes = () => {
    const publicRoutes = routes.filter((routes) => routes.isPublic);

    return publicRoutes.map((route) => {
        const RouteVal = route.component;

        return (
            <Route
                key={route.id}
                path={route.path}
                exact
                render={(props) => (
                    <Layout>
                        <RouteVal {...props} />
                    </Layout>
                )}
            >
            </Route>
        )
    })
}

export default PublicRoutes;