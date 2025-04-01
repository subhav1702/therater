import { useEffect, useState } from 'react';
import { logedInUser } from '../services/helper';

export default function notAuthorised() {

    const [warning, setWarning] = useState("Sorry, you are not authorised to access this module. Please contact your administrator.");

    useEffect(() => {
        const userData = logedInUser()

        if (userData?.userType === 1) {
            setWarning("Please login as a trainer to access this module.")
        }
    }, [])

    return (
        <div className="flex items-center">
            <div className="bg-white w-full p-5 rounded-md text-red-500 font-medium">
                {warning}
            </div>
        </div>
    );
}
