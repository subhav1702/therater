import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import secureLocalStorage from "react-secure-storage";
import Logo from "@/assets/images/Sip_Eat.png"


function Header({ toggle, sidebarState }) {
    const [adminData, setAdminData] = useState(true);
    const [userData, setUserData] = useState(true);
    const logout = () => {
        secureLocalStorage.clear();
        window.location = '/login';
    };
    useEffect(() => {
        const adminData = secureLocalStorage.getItem('adminData');
        const userData = secureLocalStorage.getItem('userData');
        setAdminData(JSON.parse(adminData))
        setUserData(JSON.parse(userData))
    }, []);

    const backToAdmin = () => {

        if (adminData && userData) {
            secureLocalStorage.setItem('userData', null);
            window.location = "/dashboard";
        }
    };

    return (
        <>
            <nav className="top-0 bg-gray-700 border-gray-500 fixed z-50 w-full border-b">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button onClick={() => { toggle(!sidebarState) }} type="button" className="inline-flex items-center p-2 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                          

                            <img src={Logo} width="50"></img>
                            {/* <a className="flex ms-2 md:me-24">
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white" >App</span>
                            </a> */}
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div className="pr-5 text-white hidden md:block" >
                                    Welcome {userData?.firstName || adminData?.firstName} {userData?.lastName || adminData?.lastName}
                                </div>
                                {adminData && userData ?
                                    <div className="pr-3">
                                        <Button type="button" onClick={backToAdmin} >
                                            Go to admin panel
                                        </Button>
                                    </div>
                                    : null}
                                <div className="pr-3">
                                    <Button type="button" onClick={logout} >
                                        Logout
                                    </Button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;