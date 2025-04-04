import Login from "../views/auth/login";
import Register from "../views/auth/register";
import Inventory from "../views/inventory/index";
import AddEditInventory from "../views/inventory/addEditInventory";
import QrCode from "../views/qrCode/index";
import AddQrCode from "../views/qrCode/addQrCode";
import Order from "../views/order/index";
import ViewOrder from "../views/order/viewOrder";
import FoodManu from "../views/foodManu/index";
import { User, House,ShoppingCart,QrCode as Qr} from 'lucide-react';
import AddBulkQrCode from "@/views/qrCode/addBulkQrCode";

const routes = [
    {
        id: 1,
        path: '/',
        component: Login,
        isPublic: true,
    },
    {
        id: 2,
        path: '/login',
        component: Login,
        isPublic: true,
    },
    {
        id: 3,
        path: '/register/:useremail/:iid',
        component: Register,
        isPublic: true,
    },
    {
        id: 30,
        path: '/register/:useremail',
        component: Register,
        isPublic: true,
    },
    {
        id: 4,
        path: '/order',
        component: Order,
        name: "Order",
        isPublic: false,
        icon: <House size={20} />,
        isInSidebar: true,
        isAdmin: true,
        isTrainers: true
    },
    
    {
        id: 2,
        path: '/inventory',
        component: Inventory,
        name: "Inventory",
        isPublic: false,
        icon: <ShoppingCart size={20} />,
        isInSidebar: true,
        isAdmin: true,
    },
    {
        id: 4,
        path: '/qr',
        component: QrCode,
        name: "QR",
        isPublic: false,
        icon: <Qr  size={20} />,
        isInSidebar: true,
        isAdmin: true,
        isTrainers: true
    },

    {
        id: 5,
        path: '/inventory/create-inventory',
        component: AddEditInventory,
        isPublic: false,
    },
    
    {
        id: 6,
        path: '/inventory/edit-inventory/:eid',
        component: AddEditInventory,
        isPublic: false,
    },
    {
        id: 5,
        path: '/qr/create-qr',
        component: AddQrCode,
        isPublic: false,
    },
    {
        id: 5,
        path: '/qr/create-blk-qr',
        component: AddBulkQrCode,
        isPublic: false,
    },
    {
        id: 5,
        path: '/order/view-order/:oid',
        component: ViewOrder,
        isPublic: false,
    },
    {
        id: 5,
        path: '/food-manu',
        component: FoodManu,
        isPublic: true,
    },
]
export default routes;