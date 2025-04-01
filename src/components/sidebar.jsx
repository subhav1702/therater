import React, { useEffect } from "react";
import UserGesture from "../lib/userGesture"
import { NavLink } from "react-router-dom/cjs/react-router-dom";
function Sidebar(props) {
    const { ref, isComponentVisible, setIsComponentVisible } = UserGesture(true);

    const activeRoute = (routeName) => {
        return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };


    useEffect(() => {
        if (!isComponentVisible && window.innerWidth < 640) {
            setIsComponentVisible(true);
            if (!props.sidebarState) {
                props.sidebarToggle(true);
            }
        }
    }, [isComponentVisible])

    const createLinks = (routes) => {
        return routes.map((manuItem, key) => {
            if (manuItem.redirect) {
                return null;
            }
            return (
                <NavLink to={manuItem.path} key={manuItem.id}
                    className={`m-1 flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group no-underline`} activeClassName="bg-gray-700"
                >
                    <div>                        
                            {manuItem.icon} 
                    </div>
                    <div className={activeRoute("/" + manuItem.path.split("/")[1])} key={key}>
                        <div data-cy={manuItem.name} to={"/" + manuItem.path.split("/")[1]}>
                            <>
                                <div className="sidebar-normal pl-4">{manuItem.name === "Schedules" ?"Sessions":manuItem.name}</div>
                            </>
                        </div>
                    </div>
                </NavLink>
            );
        });
    };

    return (
        <>
            <aside ref={ref} id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform border-r sm:translate-x-0 bg-gray-700 border-gray-700 ${props.sidebarState && '-translate-x-full'}`} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-700">
                    <span >{createLinks(props.routes)}</span>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;