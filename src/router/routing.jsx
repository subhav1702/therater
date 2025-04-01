import React from "react";
import PublicRoutes from "./publicRoutes";
import PrivateRoutes from "./privateRoutes";

function Routing() {
    return (
        <>
            <PublicRoutes />
            <PrivateRoutes />
        </>
    )
}
export default Routing;