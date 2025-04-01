import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ReactTable from "../../components/reactTable";
import { useHistory } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoaderCircle } from 'lucide-react';
//import helper from '@/services/helper';

export default function order() {
    const history = useHistory();
    const [orderList, setOrderList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [lastElement, setLastElement] = useState(undefined);
    const [userType, setUserType] = useState();

    useEffect(() => {
        //getProductData()
        const orderList = [
            {
                id: 1,
                screenNumber: "Screen 1",
                seatNumber: "A1",
                orderItems: [
                    { name: "Popcorn", quantity: 2 },
                    { name: "Coke", quantity: 1 },
                    { name: "Nachos", quantity: 1 },
                ],
            },
            {
                id: 2,
                screenNumber: "Screen 2",
                seatNumber: "B2",
                orderItems: [
                    { name: "Samosa", quantity: 3 },
                    { name: "Pepsi", quantity: 2 },
                ],
            },
            {
                id: 3,
                screenNumber: "Screen 3",
                seatNumber: "C3",
                orderItems: [
                    { name: "Burger", quantity: 1 },
                    { name: "Fries", quantity: 2 },
                ],
            },
        ];
        setOrderList(orderList)
    }, []);

    return (
        <>
            <div className="t-4 mx-auto max-w-full">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-2xl font-bold">Order</h1>
                </div>
                {/* <InfiniteScroll className="mt-4"
                    style={{ overflow: 'hidden' }}
                    dataLength={productsList?.length}
                    next={next}
                    hasMore={hasMore}
                    loader={
                        <div className="flex justify-center"><LoaderCircle className="mt-5 h-6 w-6 animate-spin" /></div>
                    }
                    scrollThreshold="100px"
                    endMessage={productsList && productsList.length > 0 ?
                        ((productsList.length > 10) && <p className="text-center">
                            <b>Yay! You have seen it all</b>
                        </p>) :
                        (<div className="flex justify-center p-5">
                            <span>No results</span>
                        </div>)
                    }
                > */}
                <ReactTable
                    data={orderList} // Updated data source for inventory
                    columns={[
                        {
                            Header: "SCREEN NUMBER",
                            accessor: "screenNumber", // Accessor for the screen number
                        },
                        {
                            Header: "SEAT NUMBER",
                            accessor: "seatNumber", // Accessor for the seat number
                        },
                        {
                            Header: "ORDER ITEMS",
                            accessor: "orderItems", // Accessor for the order items
                            Cell: ({ row }) => (
                                <div>
                                    {row.original.orderItems.map((item, index) => (
                                        <div key={index}>
                                            {item.name} (Qty: {item.quantity})
                                        </div>
                                    ))}
                                </div>
                            ),
                        },
                        {
                            id: "actions",
                            enableHiding: false,
                            Header: "ACTION",
                            Cell: ({ row }) => {
                                const data = row.original;
                                console.log(data,"data")
                                return (
                                    <DropdownMenu modal={false}>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <DotsVerticalIcon className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    history.push(`/order/view-order/${data.id}`);
                                                }}
                                            >
                                                View
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                );
                            },
                        },
                    ]}
                />
                {/* </InfiniteScroll> */}
            </div>
        </>
    );
}

