import React, { useState } from "react";
import Header from "./header";
import { withRouter } from "react-router-dom";
import Sidebar from "./sidebar";
import routes from "../router/routes";
import secureLocalStorage from "react-secure-storage";

function LandingLayout(props) {
    const [sidebar, setSidebar] = useState(window.innerWidth > 640 ? false : true);

    const handleSidebarToggle = (toggle) => {
        setSidebar(toggle);
    }
    const { children, ...rest } = props;

    const filterRoutes = routes.filter((route) => {
        
        const userdata = JSON.parse(secureLocalStorage.getItem('userData'))

        let moduleName = route.name?.replace(" ","").toLowerCase()
        const isPermissionGranted = userdata?.modulePermissions?.[moduleName] === true;

        const isDashboard = moduleName === 'dashboard';
        const isTeamModule = moduleName === 'team';

        if (userdata && userdata?.userType !== 1) {
            if (userdata?.userType === 4 && isTeamModule) {
                return false; 
            }
            return (isDashboard || (!route.isPublic && route.isInSidebar && route.isTrainers && isPermissionGranted));
        } else {
            return (isDashboard || (route.isAdmin && route.isInSidebar));
        }
    });

    return (
        <>
            <div >
                <Header toggle={handleSidebarToggle} sidebarState={sidebar} />
            </div>
            <div >
                <Sidebar {...rest} routes={filterRoutes} sidebarToggle={handleSidebarToggle} sidebarState={sidebar} />

                <div className="h-full min-h-screen bg-gray-200 p-4 sm:ml-64">
                    <div className="p-4 mt-14">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(LandingLayout);