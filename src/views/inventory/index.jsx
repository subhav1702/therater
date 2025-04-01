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

function Inventory() {
    const history = useHistory();
    const [inventoryList, setInventoryList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [lastElement, setLastElement] = useState(undefined);
    const [userType, setUserType] = useState();

    useEffect(() => {
        //getProductData()
        const inventoryList = [
            {
                itemId: 1,
                itemName: "Coke",
                quantity: 50,
                price: 1.5,
            },
            {
                itemId: 2,
                itemName: "Samosa",
                quantity: 30,
                price: 0.75,
            },
            {
                itemId: 3,
                itemName: "Popcorn",
                quantity: 20,
                price: 2.0,
            },
        ];
        setInventoryList(inventoryList)
    }, []);

    // const getProductData = async () => {

    //     setLastElement(undefined);

    //     const userData = logedInUser();
    //     setUserType(userData.userType)

    //     let conditions;

    //     if (userData.userType !== 4) {
    //         conditions = [
    //             { property: "trainerId", operator: "==", value: userData.userId },
    //         ];
    //     } else {
    //         conditions = [
    //             { property: "trainerId", operator: "==", value: userData.invitedByUserId },
    //         ];
    //     }

    //     const limitquery = await getFirstBatch('Products', conditions, "createdOn")

    //     setProductsList(limitquery.data || []);

    //     if (limitquery.statusCode === 200) {

    //         if (limitquery.data.length >= 10) {

    //             let last = limitquery.lastKey
    //             setLastElement(last)

    //             setHasMore(true)
    //         } else {
    //             setHasMore(false)
    //         }
    //     } else {
    //         alert('error ', limitquery.message);
    //     }

    // }

    // async function removeProduct(productId, productImage) {
    //     try {
    //         let confirmDelete = window.confirm("Are you sure you want to remove this Product?");
    //         if (confirmDelete) {

    //             const updatedProductList = productsList.map((product) =>
    //                 product.productId === productId ? { ...product, isDeleted: true } : product
    //             );

    //             //const filteredProduct = updatedProductList.filter(product => product.productId === productId);
    //             //const filteredProductObject = filteredProduct.find(() => true);

    //             // Update the document in Firestore
    //             //const result = await createorUpdateDocument('Products', productId, filteredProductObject);

    //             // for hard delete document
    //             const result = await deleteDocument('Products', productId)
    //             if (result.statusCode === 200) {
    //                 await deleteFile(`/Products/`, productImage);
    //                 await deleteFile(`/Products/thumbnail/`, productImage);

    //                 alert("Product remove successfully");
    //                 const activeProduct = updatedProductList.filter(product => !product.isDeleted);
    //                 setProductsList(activeProduct);
    //                 return true;
    //             }
    //             return false;
    //         }
    //     } catch (error) {
    //         console.error('Error removing product:', error);
    //     }
    // }

    // const next = async () => {
    //     if (lastElement) {
    //         const userData = logedInUser();

    //         let conditions;

    //         if (userData.userType !== 4) {
    //             conditions = [
    //                 { property: "trainerId", operator: "==", value: userData.userId },
    //             ];
    //         } else {
    //             conditions = [
    //                 { property: "trainerId", operator: "==", value: userData.invitedByUserId },
    //             ];
    //         }

    //         const result = await getNextBatch('Products', conditions, lastElement, "createdOn");

    //         let last = result.lastKey || undefined;

    //         setLastElement(last)
    //         setProductsList([...productsList, ...result.data]);
    //         setHasMore(last ? true : false);
    //     }
    // }


    return (
        <>
            <div className="t-4 mx-auto max-w-full">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-2xl font-bold">Inventory</h1>
                    <Button
                        variant="black"
                        onClick={() => history.push('/inventory/create-inventory')}
                        className="w-24"
                    >
                        Create
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
                            accessor: "itemName", // Accessor for the item name
                        },
                        {
                            Header: "QUANTITY",
                            accessor: "quantity", // Accessor for the quantity in stock
                        },
                        {
                            Header: "PRICE (per unit)",
                            accessor: "price", // Accessor for the price per unit
                        },
                        {
                            Header: "TOTAL VALUE",
                            accessor: "totalValue", // Accessor for the total value (quantity * price)
                            Cell: ({ row }) => {
                                const totalValue = row.original.quantity * row.original.price;
                                return <div>{totalValue.toFixed(2)}</div>; // Display total value with 2 decimal places
                            },
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