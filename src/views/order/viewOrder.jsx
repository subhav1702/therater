import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

export default function ViewOrder() {
    const { oid } = useParams();
    const [orderDetails, setOrderDetails] = useState({});
    
    useEffect(() => {
        if (oid) {  
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders/${oid}`, {
                headers: { Authorization: `bearer ${secureLocalStorage.getItem("jwt")}` }
            })
                .then(function (response) {
                    console.log("asas",response.data);
                    setOrderDetails(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [oid]);  

    const handlePrint = () => {
        const printContent = `
            <div style="padding: 20px; font-family: Arial, sans-serif;">
                <h1 style="text-align: center; margin-bottom: 20px;">Order Details</h1>
                <p><strong>Order ID:</strong> ${oid}</p>
                <p><strong>Screen Number:</strong> ${orderDetails.screen?.screenNumber || 'N/A'}</p>
                <p><strong>Seat Number:</strong> ${orderDetails.theater?.screenNo || 'N/A'}</p>
                <div>
                    <strong>Order Items:</strong>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <thead>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <th style="text-align: left; padding: 8px;">Item Name</th>
                                <th style="text-align: right; padding: 8px;">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orderDetails.items?.map(item => `
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 8px;">${item.name}</td>
                                    <td style="text-align: right; padding: 8px;">${item.quantity}</td>
                                </tr>
                            `).join('') || '<tr><td colspan="2" style="padding: 8px;">No items</td></tr>'}
                        </tbody>
                    </table>
                </div>
                <p style="margin-top: 30px; text-align: center; font-size: 12px;">
                    Printed on ${new Date().toLocaleString()}
                </p>
            </div>
        `;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Order Details - ${oid}</title>
                    <style>
                        @media print {
                            body { -webkit-print-color-adjust: exact; }
                            @page { size: auto; margin: 10mm; }
                        }
                    </style>
                </head>
                <body>
                    ${printContent}
                    <script>
                        window.onload = function() {
                            setTimeout(function() {
                                window.print();
                                window.close();
                            }, 100);
                        }
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    const handleOrderComplete = () => {
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/orders/${oid}/complete`, {}, {
            headers: { Authorization: `bearer ${secureLocalStorage.getItem("jwt")}` }
        })
        .then(response => {
            alert('Order marked as complete successfully!');
        })
        .catch(error => {
            console.error('Error completing order:', error);
            alert('Failed to complete order');
        });
    };

    const handleOrderReject = () => {
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/orders/${oid}/reject`, {}, {
            headers: { Authorization: `bearer ${secureLocalStorage.getItem("jwt")}` }
        })
        .then(response => {
            alert('Order rejected successfully!');
        })
        .catch(error => {
            console.error('Error rejecting order:', error);
            alert('Failed to reject order');
        });
    };

    return (
        <div className="t-4 mx-auto max-w-full">
            <section>
                <div className="min-w-0 mb-6 bg-blueGray-100 bg-white relative flex w-full flex-col break-words rounded-lg border-0 shadow-lg">
                    <div className="px-4 py-6 pt-6 flex-auto lg:px-6">
                        <div className="p-4">
                            <h1 className="text-2xl font-bold mb-4">Order Details</h1>
                            <div className="space-y-4">
                                <p><strong>Order ID:</strong> {oid}</p>
                                <p><strong>Screen Number:</strong> {orderDetails.screen?.screenNumber || 'N/A'}</p>
                                <p><strong>Seat Number:</strong> {orderDetails.theater?.screenNo || 'N/A'}</p>
                                <div>
                                    <strong>Order Items:</strong>
                                    <div className="mt-2 overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {orderDetails.items?.length > 0 ? (
                                                    orderDetails.items.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{item.quantity}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="2" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No items</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-6">
                                <Button 
                                    variant="default" 
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={handleOrderComplete}
                                >
                                    Order Complete
                                </Button>
                                <Button 
                                    variant="destructive" 
                                    onClick={handleOrderReject}
                                >
                                    Order Reject
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={handlePrint}
                                >
                                    Print
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}