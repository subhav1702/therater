import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function ViewOrder() {
    const { oid } = useParams();

    // Mock data for demonstration purposes
    const orderDetails = {
        id: oid,
        screenNumber: "Screen 1",
        seatNumber: "A1",
        orderItems: [
            { name: "Popcorn", quantity: 2 },
            { name: "Coke", quantity: 1 },
            { name: "Nachos", quantity: 1 },
        ],
    };

    const handleDownload = () => {
        // Implement download functionality here
        alert(`Downloading order details for order ID: ${oid}`);
    };

    return (
        <div className="t-4 mx-auto max-w-full">
            <section>
                <div className="min-w-0 mb-6 bg-blueGray-100 bg-white relative flex w-full flex-col break-words rounded-lg border-0 shadow-lg">
                    <div className="px-4 py-6 pt-6 flex-auto lg:px-6">
                        <div className="p-4">
                            <h1 className="text-2xl font-bold mb-4">Order Details</h1>
                            <div className="space-y-4">
                                <p><strong>Screen Number:</strong> {orderDetails.screenNumber}</p>
                                <p><strong>Seat Number:</strong> {orderDetails.seatNumber}</p>
                                <div>
                                    <strong>Order Items:</strong>
                                    <ul className="list-disc pl-5">
                                        {orderDetails.orderItems.map((item, index) => (
                                            <li key={index}>
                                                {item.name} (Qty: {item.quantity})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <Button onClick={handleDownload} className="mt-4">
                                Download Order Details
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}