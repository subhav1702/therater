import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, useHistory } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LoaderCircle } from 'lucide-react';
import QRCode from "react-qr-code";
import html2canvas from "html2canvas"; // Import html2canvas

function AddQrCode(props) {
    let history = useHistory();
    const { eid } = useParams();
    const [screenNumber, setScreenNumber] = useState(''); // State for screen number
    const [seatNumber, setSeatNumber] = useState(''); // State for seat number
    const [qrValue, setQrValue] = useState(''); // State to store QR code value
    const [saveLoading, setSaveLoading] = useState(false);
    const [loading, setLoading] = useState(eid ? true : false);
    const [userType, setUserType] = useState();
    const qrCodeRef = useRef(null); // Ref to capture the QR code element

    // Handle screen number input change
    const handleScreenNumberChange = (e) => {
        setScreenNumber(e.target.value);
        generateQrCode(e.target.value, seatNumber);
    };

    // Handle seat number input change
    const handleSeatNumberChange = (e) => {
        setSeatNumber(e.target.value);
        generateQrCode(screenNumber, e.target.value);
    };

    // Generate QR code value
    const generateQrCode = (screen, seat) => {
        if (screen && seat) {
            const qrData = `Screen: ${screen}, Seat: ${seat}`;
            setQrValue(qrData);
        } else {
            setQrValue('');
        }
    };

    // Download QR code as PNG
    const downloadQRCode = () => {
        if (qrCodeRef.current) {
            html2canvas(qrCodeRef.current).then((canvas) => {
                const link = document.createElement("a");
                link.download = `QRCode_${screenNumber}_${seatNumber}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
            });
        }
    };

    return (
        <div className="t-4 mx-auto max-w-full">
            <div className="flex items-center justify-between">
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink to="/inventory">
                                    Inventory
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{eid ? "Edit" : "Create"}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <section>
                <div className="mt-6 mx-auto w-full">
                    <div className="min-w-0 mb-6 bg-blueGray-100 bg-white relative flex w-full flex-col break-words rounded-lg border-0 shadow-lg">
                        <div className="px-4 py-6 pt-6 flex-auto lg:px-6">
                            <div className="flex flex-wrap">
                                {/* Screen Number Input */}
                                <div className="px-4 w-full lg:w-6/12">
                                    <div className="mb-3 relative w-full">
                                        <label className="text-blueGray-600 mb-2 block text-lg font-bold">
                                            Screen Number
                                        </label>
                                        <Input
                                            type="text"
                                            className="px-3 py-2"
                                            value={screenNumber}
                                            onChange={handleScreenNumberChange}
                                        />
                                    </div>
                                </div>

                                {/* Seat Number Input */}
                                <div className="px-4 w-full lg:w-6/12">
                                    <div className="mb-3 relative w-full">
                                        <label className="text-blueGray-600 mb-2 block text-lg font-bold">
                                            Seat Number
                                        </label>
                                        <Input
                                            type="text"
                                            className="px-3 py-2"
                                            value={seatNumber}
                                            onChange={handleSeatNumberChange}
                                        />
                                    </div>
                                </div>

                                {/* QR Code Display */}
                                {qrValue && (
                                    <div className="px-4 w-full mt-6">
                                        <div className="mb-3 relative w-full">
                                            <label className="text-blueGray-600 mb-2 block text-lg font-bold">
                                                Generated QR Code
                                            </label>
                                            <div className="flex justify-center">
                                                <div ref={qrCodeRef}>
                                                    <QRCode value={qrValue} size={128} />
                                                </div>
                                            </div>
                                            {/* Download Button */}
                                            <div className="flex justify-center mt-4">
                                                <Button
                                                    type="button"
                                                    variant="black"
                                                    className="w-24"
                                                    onClick={downloadQRCode}
                                                >
                                                    Download QR Code
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Save and Cancel Buttons */}
                            <div className="pt-5 gap-5 flex justify-end">
                                <Button
                                    type="button"
                                    variant="cancel"
                                    className="w-24"
                                    onClick={() => {
                                        history.push("/products");
                                    }}
                                >
                                    Cancel
                                </Button>
                                {userType !== 4 && (
                                    <Button
                                        type="submit"
                                        variant="black"
                                        className="w-24"
                                        onClick={() => addeditProduct(inventoryData.inventoryId)}
                                        disabled={saveLoading}
                                    >
                                        Save
                                        {saveLoading && <LoaderCircle className="ml-1 h-6 w-6 animate-spin" />}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AddQrCode;