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

function QrCode() {
    const history = useHistory();
    const [qrList, setQrList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [lastElement, setLastElement] = useState(undefined);
    const [userType, setUserType] = useState();

    useEffect(() => {
        //getProductData()
        const qrList = [
            {
                itemId: 1,
                screenNumber: "Screen 1",
                seatNumber: "A1",
            },
            {
                itemId: 2,
                screenNumber: "Screen 1",
                seatNumber: "A2",
            },
            {
                itemId: 3,
                screenNumber: "Screen 2",
                seatNumber: "B1",
            },
        ];
        setQrList(qrList)
    }, []);

    return (
        <>
            <div className="t-4 mx-auto max-w-full">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-2xl font-bold">QR</h1>
                    <div className="flex gap-2">
                        <Button
                            variant="black"
                            onClick={() => history.push('/qr/create-qr')}
                            className="w-24"
                        >
                            Create
                        </Button>
                        <Button
                            variant="black"
                            onClick={() => history.push('/qr/create-blk-qr')}
                            className="w-34"
                        >
                            Create Bulk QR
                        </Button>
                    </div>
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
                    data={qrList} // Updated data source for inventory
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

export default QrCode;