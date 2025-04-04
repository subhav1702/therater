import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Eye, EyeOff, AtSign } from 'lucide-react';
import secureLocalStorage from "react-secure-storage";
//import backgroundImage from "@/assets/images/top-view-weights-floor.jpg"
import axios from "axios";

function Login() {

    const history = useHistory();
    const [isPasswordShown, setPasswordShown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);

    useEffect(() => {
        if (!!JSON.parse(secureLocalStorage.getItem('userData')) || !!JSON.parse(secureLocalStorage.getItem('adminData'))) {
            secureLocalStorage.clear();
            window.location.reload();
        } 
    }, [])

    function handleLogin(e) {
        e.preventDefault();
        let isValid = validateInputs();
        if (isValid) {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
                email: email,
                password: password
            })
            .then(function (response) {
                console.log(response);
                secureLocalStorage.setItem('userData', JSON.stringify(response.data.user))   
                secureLocalStorage.setItem('jwt', response.data.access_token)            
                history.push("/order")
            })
            .catch(function (error) {
                console.log(error);
            });
           
        }
    }

    function validateInputs() {
        let messages = '';

        if (email.trim() === "") {
            messages += "Please enter email address";
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            messages += 'Please enter valid email address';
        }

        if (password.trim() === "") {
            messages += "Please enter password";
        }
        //Showing alert if messages are available
        if (messages.trim().length > 0) {
            alert(messages)
            return false;
        }
        return true;
    }

    const redirectToRegister = () => {
        history.push('/register');
    };

    return (

        <div className="m-auto h-screen bg-cover bg-center bg-no-repeat" style={{ background: "#82C8E5"/*backgroundImage: `url(${backgroundImage})`*/ }}>
            <div className="h-screen mx-auto max-w-screen-xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-sm">
                    <form onSubmit={handleLogin} className="mb-0 mt-4 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-6 bg-white">
                        <p className="text-center  font-medium text-3xl">Login</p>
                        <div>
                            <label htmlFor="email" className="block text-blueGray-600 text-lg font-bold mb-2">Email Address</label>
                            <div className="relative">
                                <Input
                                    type="email"
                                    className="px-3 py-2"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    disabled={loadingStatus ? true : false}
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <div className="size-4 text-gray-400" >
                                        <AtSign size={18} color="#9ca3af" />
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-blueGray-600 text-lg font-bold mb-2">Password</label>
                            <div className="relative">
                                <Input
                                    type={isPasswordShown ? "text" : "password"}
                                    className="px-3 py-2"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    autoComplete="on"
                                    disabled={loadingStatus ? true : false}
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <div
                                        className="size-4 text-gray-400 cursor-pointer"
                                        onClick={() => setPasswordShown(!isPasswordShown)}
                                    >
                                        {!isPasswordShown ? <EyeOff size={18} color="#9ca3af" /> : <Eye size={18} color="#9ca3af" />}
                                    </div>
                                </span>
                            </div>
                        </div>
                        <Button
                            disabled={loadingStatus ? true : false}
                            type="submit"
                            className="w-full"
                            variant="black"
                        >
                            {loadingStatus && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Login
                        </Button>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Login;