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
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
//import helper from '@/services/helper';

function Inventory() {
    const history = useHistory();
    const [inventoryList, setInventoryList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [lastElement, setLastElement] = useState(undefined);
    const [userType, setUserType] = useState();

    useEffect(() => {
        //getProductData()
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/items`, {
            headers: { Authorization: `bearer ${secureLocalStorage.getItem("jwt")}` }
        })
            .then(function (response) {
                // handle success
                console.log(response);
                setInventoryList(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }, []);


    return (
        <>
            <div className="t-4 mx-auto max-w-full ">
                <div className="flex justify-between items-center mb-5 hidd">
                    <h1 className="text-2xl font-bold">Inventory</h1>
                    <Button
                        variant="black"
                        onClick={() => history.push('/inventory/create-inventory')}
                        className="w-24"
                    >
                        Create
                    </Button>
                </div>
                <div className="flex justify-between items-center mb-5 hidd">
                    <h1 className="text-2xl font-bold">Inventory</h1>
                    <Button
                        variant="black"
                        onClick={() => history.push('/inventory/create-combo-inventory')}
                        className="w-24"
                    >
                        Combo
                    </Button>
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
                    data={inventoryList} // Updated data source for inventory
                    columns={[
                        {
                            Header: "ITEM NAME",
                            accessor: "name", // Accessor for the item name
                        },
                        {
                            Header: "PRICE (per unit)",
                            accessor: "price", // Accessor for the price per unit
                        },
                       
                        {
                            id: "actions",
                            enableHiding: false,
                            Header: "ACTION",
                            Cell: ({ row }) => {
                                const data = row.original;
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
                                                    history.push(`/inventory/edit-inventory/${data.itemId}`);
                                                }}
                                            >
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => removeItem(data.itemId)}
                                            >
                                                Remove
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

export default Inventory;