import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ReactTable from "../../components/reactTable";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export default function order() {
    const history = useHistory();
    const [orderList, setOrderList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [lastElement, setLastElement] = useState(undefined);
    const [userType, setUserType] = useState();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
            headers: { Authorization: `bearer ${secureLocalStorage.getItem("jwt")}` }
        })
            .then(function (response) {
                setOrderList(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const handleOrderComplete = (orderId) => {
        // Add your order complete logic here
        console.log("Order completed:", orderId);
        // You might want to make an API call to update the order status
    };

    const handleOrderReject = (orderId) => {
        // Add your order reject logic here
        console.log("Order rejected:", orderId);
        // You might want to make an API call to update the order status
    };

    return (
        <>
            <div className="t-4 mx-auto max-w-full">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-2xl font-bold">Order</h1>
                </div>
                <ReactTable
                    data={orderList}
                    columns={[
                        {
                            Header: "SCREEN NUMBER",
                            Cell: ({ row }) => (                                
                                <div>
                                    {row.original.theater.screenNo}
                                </div>
                            ),
                        },
                        {
                            Header: "SEAT NUMBER",
                            Cell: ({ row }) => (                                
                                <div>
                                    {row.original.screen.screenNumber}
                                </div>
                            ),
                        },
                        {
                            Header: "Status",
                            Cell: ({ row }) => (                                
                                <div>
                                </div>
                            ),
                        },
                        {
                            id: "actions",
                            enableHiding: false,
                            Header: "ACTION",
                            Cell: ({ row }) => {
                                const data = row.original;
                               
                                return (
                                    <div className="flex space-x-2">
                                        
                                        <Button 
                                            variant="default"
                                            onClick={() => handleOrderComplete(data.id)}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            Complete
                                        </Button>
                                        <Button 
                                            variant="destructive"
                                            onClick={() => handleOrderReject(data.id)}
                                        >
                                            Reject
                                        </Button>
                                        <Button 
                                            variant="outline"
                                            onClick={() => history.push(`/order/view-order/${data.id}`)}
                                        >
                                            View
                                        </Button>
                                    </div>
                                );
                            },
                        },
                    ]}
                />
            </div>
        </>
    );
}