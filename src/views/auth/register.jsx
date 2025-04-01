import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Eye, EyeOff, AtSign } from 'lucide-react';
//import backgroundImage from "@/assets/images/top-view-weights-floor.jpg"

function Register(props) {
    const { useremail, iid } = useParams();
    const history = useHistory();
    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [countryCode, setCountryCode] = useState();

    const [loadingStatus, setLoadingStatus] = useState(false);
    const [invitedByUserId, setInvitedByUserId] = useState("");

    const [imageDisplay, setImageDisplay] = useState('');
    const [files, setFiles] = useState({
        image: null,
    })


    function validateInputs() {
        let message = '';

        if (message.trim().length > 0) {
            alert(message)
            return false;
        }
        return true;
    }

    async function handleSignUp(e) {
        e.preventDefault();
        let isValid = validateInputs();

        if (isValid) {
            setLoadingStatus(true)

        }
    }

    return (
        // style={{ backgroundImage: `url(${backgroundImage})` }}
        <div className="m-auto bg-cover bg-fixed bg-center bg-no-repeat" >

            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-xl">
                    <form onSubmit={handleSignUp} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
                        <p className="text-center text-lg font-bold">Sign up here to manage your account</p>
                        <p className="text-center text-lg">Register</p>

                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block text-blueGray-600 text-lg  font-bold mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type="email"
                                            className="px-3 py-2 bg-gray-300"

                                            value={email}
                                            disabled
                                        //onChange={e => setEmail(e.target.value)}
                                        />
                                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                            <div
                                                className="size-4 text-gray-400"
                                            >
                                                <AtSign size={18} color="#9ca3af" />
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block text-blueGray-600 text-lg  font-bold mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={passwordShow ? "text" : "password"}
                                            className="px-3 py-2 pr-[40px]"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                            <div
                                                className="size-4 text-gray-400 cursor-pointer"
                                                onClick={() => setPasswordShow(!passwordShow)}
                                            >
                                                {!passwordShow ? <EyeOff size={18} color="#9ca3af" /> : <Eye size={18} color="#9ca3af" />}
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block text-blueGray-600 text-lg  font-bold mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={confirmPasswordShow ? "text" : "password"}
                                            className="px-3 py-2 pr-[40px]"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                        />
                                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                            <div
                                                className="size-4 text-gray-400 cursor-pointer"
                                                onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                                            >
                                                {!confirmPasswordShow ? <EyeOff size={18} color="#9ca3af" /> : <Eye size={18} color="#9ca3af" />}
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block text-blueGray-600 text-lg  font-bold mb-2">
                                        First Name
                                    </label>
                                    <Input
                                        type="text"
                                        className="px-3 py-2"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block text-blueGray-600 text-lg  font-bold mb-2">
                                        Last Name
                                    </label>
                                    <Input
                                        name="lastName"
                                        type="text"
                                        className="px-3 py-2"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">

                                    {Boolean(imageDisplay) ?

                                        <div className="mt-4 border-2 w-8/12" >
                                            <img src={imageDisplay} alt="Uploaded file preview" className="max-w-full h-auto p-2" />
                                        </div>
                                        : null
                                    }

                                </div>
                            </div>
                        </div>

                        <div className="w-full px-4">
                            <Button
                                disabled={loadingStatus ? true : false}
                                variant="black"
                                type="submit"
                                className="w-full"
                            >
                                {loadingStatus && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Register
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Register;