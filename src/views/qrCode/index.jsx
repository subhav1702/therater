import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from 'lucide-react';
import QRCode from "react-qr-code";
import html2canvas from "html2canvas"; 
import { Input } from "@/components/ui/input";
import { jsPDF } from "jspdf";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function QrCode() {
    let history = useHistory();
    const [screenNumber, setScreenNumber] = useState('');
    const [rowNumber, setRowNumber] = useState('');
    const [seatNumber, setSeatNumber] = useState('');
    const [qrValue, setQrValue] = useState('');
    const [saveLoading, setSaveLoading] = useState(false);
    const [userType, setUserType] = useState();
    const qrCodeRef = useRef(null);

    const handleScreenNumberChange = (e) => {
        const value = e.target.value;
        setScreenNumber(value);
        generateQrCode(value, rowNumber, seatNumber);
    };

    const handleRowNumberChange = (e) => {
        const value = e.target.value;
        setRowNumber(value);
        generateQrCode(screenNumber, value, seatNumber);
    };

    const handleSeatNumberChange = (e) => {
        const value = e.target.value;
        setSeatNumber(value);
        generateQrCode(screenNumber, rowNumber, value);
    };

    const generateQrCode = (screen, row, seat) => {
        if (screen && row && seat) {
            const qrData = `https://www.google.com/?screen=${screen}&row=${row}&seat=${seat}`;
            setQrValue(qrData);
        } else {
            setQrValue('');
        }
    };

    const downloadQRCode = () => {
        if (!qrCodeRef.current) return;
        
        setSaveLoading(true);
        
        html2canvas(qrCodeRef.current, {
            scale: 2, // Higher quality
            backgroundColor: '#FFFFFF' // White background for PDF
        })
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm'
            });

            // Calculate dimensions to center the QR code
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = 50; // width of the image in mm
            const imgHeight = 50; // height of the image in mm
            
            // Center the image on the page
            const x = (pageWidth - imgWidth) / 2;
            const y = (pageHeight - imgHeight) / 2;
            
            // Add QR code image
            pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
            
            // Add text below the QR code
            pdf.setFontSize(12);
            pdf.text(`Screen: ${screenNumber}, Row: ${rowNumber}, Seat: ${seatNumber}`, pageWidth / 2, y + imgHeight + 10, { align: 'center' });
            
            // Save the PDF
            pdf.save(`QRCode_${screenNumber}_${rowNumber}_${seatNumber}.pdf`);
        })
        .catch((error) => {
            console.error("Error generating PDF:", error);
        })
        .finally(() => {
            setSaveLoading(false);
        });
    };

    return (
        <>
            <div className="t-4 mx-auto max-w-full">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-2xl font-bold">QR</h1>
                    <div className="flex gap-2">
                        <Button
                            variant="black"
                            onClick={() => history.push('/qr/create-blk-qr')}
                            className="w-34"
                        >
                            Create Bulk QR
                        </Button>
                    </div>
                </div>
                <section>
                    <div className="mt-6 mx-auto w-full">
                        <div className="min-w-0 mb-6 bg-blueGray-100 bg-white relative flex w-full flex-col break-words rounded-lg border-0 shadow-lg">
                            <div className="px-4 py-6 pt-6 flex-auto lg:px-6">
                                <div className="flex flex-wrap">
                                    {/* Screen Number Input */}
                                    <div className="px-4 w-full lg:w-4/12">
                                        <div className="mb-3 relative w-full">
                                            <label className="text-blueGray-600 mb-2 block text-lg font-bold">
                                                Screen Number
                                            </label>
                                            <Input
                                                type="text"
                                                className="px-3 py-2"
                                                value={screenNumber}
                                                onChange={handleScreenNumberChange}
                                                placeholder="Enter screen number"
                                            />
                                        </div>
                                    </div>

                                    {/* Row Number Input */}
                                    <div className="px-4 w-full lg:w-4/12">
                                        <div className="mb-3 relative w-full">
                                            <label className="text-blueGray-600 mb-2 block text-lg font-bold">
                                                Row Number
                                            </label>
                                            <Input
                                                type="text"
                                                className="px-3 py-2"
                                                value={rowNumber}
                                                onChange={handleRowNumberChange}
                                                placeholder="Enter row number"
                                            />
                                        </div>
                                    </div>

                                    {/* Seat Number Input */}
                                    <div className="px-4 w-full lg:w-4/12">
                                        <div className="mb-3 relative w-full">
                                            <label className="text-blueGray-600 mb-2 block text-lg font-bold">
                                                Seat Number
                                            </label>
                                            <Input
                                                type="text"
                                                className="px-3 py-2"
                                                value={seatNumber}
                                                onChange={handleSeatNumberChange}
                                                placeholder="Enter seat number"
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
                                                    <div ref={qrCodeRef} className="p-2 bg-white">
                                                        <QRCode 
                                                            value={qrValue} 
                                                            size={128}
                                                            bgColor="#FFFFFF"
                                                            fgColor="#000000"
                                                            level="H" // Higher error correction
                                                        />
                                                    </div>
                                                </div>
                                                {/* Download Button */}
                                                <div className="flex justify-center mt-4">
                                                    <Button
                                                        type="button"
                                                        variant="black"
                                                        className="w-44"
                                                        onClick={downloadQRCode}
                                                        disabled={saveLoading}
                                                    >
                                                        {saveLoading ? (
                                                            <>
                                                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                                                Generating...
                                                            </>
                                                        ) : 'Download QR Code'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Save and Cancel Buttons */}
                              
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default QrCode;