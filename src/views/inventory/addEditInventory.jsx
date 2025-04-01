import React, { useState, useEffect } from "react";
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

function AddEditInventory() {
    const history = useHistory();
    const { eid } = useParams(); // Get the ID from the URL (if in edit mode)
    const [inventoryData, setInventoryData] = useState({
        inventoryId: '',
        name: '',
        quantity: '',
        price: '',
        image: null,
    });
    const [imageDisplay, setImageDisplay] = useState('');
    const [saveLoading, setSaveLoading] = useState(false);
    const [loading, setLoading] = useState(!!eid); // Set loading to true if in edit mode

    // Fetch inventory data if in edit mode
    useEffect(() => {
        if (eid) {
            // Simulate fetching data (replace with your API call)
            setLoading(true);
            setTimeout(() => {
                setInventoryData({
                    inventoryId: eid,
                    name: "Sample Item",
                    quantity: "10",
                    price: "100",
                    image: null,
                });
                setImageDisplay("https://via.placeholder.com/150"); // Simulate image URL
                setLoading(false);
            }, 1000);
        }
    }, [eid]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInventoryData({ ...inventoryData, [name]: value });
    };

    // Handle price input (allow only numbers and up to 2 decimal places)
    const handlePriceChange = (e) => {
        const regex = /^\d{0,10}(\.\d{0,2})?$/;
        if (regex.test(e.target.value)) {
            setInventoryData({ ...inventoryData, price: e.target.value });
        }
    };

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageDisplay(reader.result);
                setInventoryData({ ...inventoryData, image: file });
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission (add or edit)
    const handleSubmit = async () => {
        setSaveLoading(true);
        try {
            if (eid) {
                // Edit mode: Update inventory
                await editInventory(inventoryData);
            } else {
                // Add mode: Create new inventory
                await createInventory(inventoryData);
            }
            history.push("/inventory"); // Redirect to inventory list after success
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setSaveLoading(false);
        }
    };

    // Simulate create inventory API call
    const createInventory = async (data) => {
        // Replace with your API call
        console.log("Creating inventory:", data);
        return new Promise((resolve) => setTimeout(resolve, 1000));
    };

    // Simulate edit inventory API call
    const editInventory = async (data) => {
        // Replace with your API call
        console.log("Updating inventory:", data);
        return new Promise((resolve) => setTimeout(resolve, 1000));
    };

    return (
        <div className="t-4 mx-auto max-w-full">
            <div className="flex items-center justify-between">
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink to="/inventory">Inventory</BreadcrumbLink>
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
                        {loading ? (
                            <div className="flex justify-center p-5">
                                <LoaderCircle className="ml-1 h-8 w-8 animate-spin" />
                            </div>
                        ) : (
                            <div className="px-4 py-6 pt-6 flex-auto lg:px-6">
                                <div className="flex flex-wrap">
                                    {/* Name Input */}
                                    <div className="px-4 w-full lg:w-6/12">
                                        <div className="mb-3 relative w-full">
                                            <label className="text-blueGray-600 mb-2 block text-lg font-bold">
                                                Name
                                            </label>
                                            <Input
                                                type="text"
                                                name="name"
                                                className="px-3 py-2"
                                                value={inventoryData.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Quantity Input */}
                                    <div className="px-4 w-full lg:w-6/12">
                                        <div className="mb-3 relative w-full">
                                            <label className="text-blueGray-600 mb-2 block text-lg font-bold">
                                                Quantity
                                            </label>
                                            <Input
                                                type="text"
                                                name="quantity"
                                                className="px-3 py-2"
                                                value={inventoryData.quantity}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Price Input */}
                                    <div className="px-4 w-full lg:w-6/12">
                                        <div className="mb-3 relative w-full">
                                            <label className="text-blueGray-600 mb-2 block text-lg font-bold">
                                                Price
                                            </label>
                                            <Input
                                                type="text"
                                                name="price"
                                                className="px-3 py-2"
                                                value={inventoryData.price}
                                                onChange={handlePriceChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Image Upload */}
                                    <div className="px-4 w-full lg:w-6/12">
                                        <div className="mb-3 relative w-full">
                                            <label className="text-blueGray-600 mb-2 block text-lg font-bold">
                                                Image
                                            </label>
                                            <Input
                                                type="file"
                                                className="w-full"
                                                onChange={handleImageChange}
                                                accept="image/gif,image/jpeg,image/jpg,image/png,image/webp"
                                            />
                                            {imageDisplay && (
                                                <div className="mt-4 w-6/12 border-2 lg:w-3/12">
                                                    <img
                                                        src={imageDisplay}
                                                        alt="Uploaded file preview"
                                                        className="p-2 h-auto max-w-full"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Save and Cancel Buttons */}
                                <div className="pt-5 gap-5 flex justify-end">
                                    <Button
                                        type="button"
                                        variant="cancel"
                                        className="w-24"
                                        onClick={() => history.push("/inventory")}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="black"
                                        className="w-24"
                                        onClick={handleSubmit}
                                        disabled={saveLoading}
                                    >
                                        Save
                                        {saveLoading && <LoaderCircle className="ml-1 h-6 w-6 animate-spin" />}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AddEditInventory;