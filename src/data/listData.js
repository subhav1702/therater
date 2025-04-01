const listData = {
    user: [
        {
            id: 1,
            firstName: "Neil",
            lastName: "Sims",
            date: "05 may,2023",
        },
        {
            id: 2,
            firstName: " Bonnie",
            lastName: "Green",
            date: "05 jul,2023",
        },
        {
            id: 3,
            firstName: " Michael",
            lastName: "Gough",
            date: "06 jul,2023",
        },

        {
            id: 4,
            firstName: "Thomas",
            lastName: "Lean",
            date: "08 jul,2023",
        },
        {
            id: 5,
            firstName: "Bonnie",
            lastName: "Green",
            date: "05 jul,2023",
        }
    ],
    groupUser: [
        {
            id: 1,
            name: "Yoga",
            users_data: [
                {
                    id: 1,
                    name: "Neil Sims",
                    date: "04 jul,2023",
                    time: "40m 30s",
                    distance: "2 ",
                },
                {
                    id: 2,
                    name: " Bonnie Green",
                    date: "05 jul,2023",
                    time: "30m 30s",
                    distance: "52",
                },
                {
                    id: 3,
                    name: " Michael Gough",
                    date: "06 jul,2023",
                    time: "20m 30s",
                    distance: "10",
                },
            ],
            time: "40m 30s",
            distance: "2 ",
        },
        {
            id: 2,
            name: "Zumba",
            users_data: [{
                id: 1,
                name: "gym",
                date: "07 jul,2023",
                time: "10m 30s",
                distance: "30",
            },
            {
                id: 2,
                name: "Thomas Lean",
                date: "08 jul,2023",
                time: "5m 30s",
                distance: "31",
            },],
            time: "30m 30s",
            distance: "52",
        },
        {
            id: 3,
            name: "gym",
            users_data: [
                {
                    id: 1,
                    name: "gym",
                    date: "07 jul,2023",
                    time: "10m 30s",
                    distance: "30",
                },
                {
                    id: 2,
                    name: "Thomas Lean",
                    date: "08 jul,2023",
                    time: "5m 30s",
                    distance: "31",
                },
            ],
            time: "20m 30s",
            distance: "10",
        },
    ],
    media: [
        {
            id: 1,
            name: "Neil Sims",
            description: "To manage the rowProps and ensure it works correctly regardless of whether it evaluates to true or false, you can adjust your logic to handle rowProps more explicitly. Here's a refined version of your code snippet:",
        },
        {
            id: 2,
            name: "Bonnie",
            description: "To manage the rowProps and ensure it works correctly regardless of whether it evaluates to true or false, you can adjust your logic to handle rowProps more explicitly. Here's a refined version of your code snippet:",
        },
        {
            id: 3,
            name: "Thomas Sims",
            description: "To manage the rowProps and ensure it works correctly regardless of whether it evaluates to true or false, you can adjust your logic to handle rowProps more explicitly. Here's a refined version of your code snippet:",
        },
        {
            id: 4,
            name: "Michael",
            description: "To manage the rowProps and ensure it works correctly regardless of whether it evaluates to true or false, you can adjust your logic to handle rowProps more explicitly. Here's a refined version of your code snippet:",
        },
    ],
    products: [
        {
            id: 1,
            trainerId: 2,
            name: "protein powder",
            description: "Created with premium whey, it's packed with an impressive 20g of protein (unflavored version) per serving, delivering the protein you need from a high-quality source.",
            price: 200,
            productImg: "https://static.thcdn.com/productimg/1600/1600/11654622-1074934868503949.jpg",
            isActive: true,
            isDeleted: false,
            createdOn: "now",
            updatedOn: "now"
        },
        {
            id: 2,
            trainerId: 2,
            name: "protein powder",
            description: "Created with premium whey, it's packed with an impressive 20g of protein (unflavored version) per serving, delivering the protein you need from a high-quality source.",
            price: 290,
            productImg: "https://static.thcdn.com/productimg/1600/1600/11654622-1074934868503949.jpg",
            isActive: true,
            isDeleted: false,
            createdOn: "now",
            updatedOn: "now"
        },
        {
            id: 3,
            trainerId: 2,
            name: "protein powder",
            description: "Created with premium whey, it's packed with an impressive 20g of protein (unflavored version) per serving, delivering the protein you need from a high-quality source.",
            price: 350,
            productImg: "https://static.thcdn.com/productimg/1600/1600/11654622-1074934868503949.jpg",
            isActive: true,
            isDeleted: false,
            createdOn: "now",
            updatedOn: "now"
        },
        {
            id: 4,
            trainerId: 2,
            name: "protein powder",
            description: "Created with premium whey, it's packed with an impressive 20g of protein (unflavored version) per serving, delivering the protein you need from a high-quality source.",
            price: 150,
            productImg: "https://static.thcdn.com/productimg/1600/1600/11654622-1074934868503949.jpg",
            isActive: true,
            isDeleted: false,
            createdOn: "now",
            updatedOn: "now"
        },
    ],
    workout: [
        {
            workoutSessionId: 1,
            trainerId: 1,
            name: "Zumba",
            description: "To manage the rowProps and ensure it works correctly regardless of whether it evaluates to true or false, you can adjust your logic to handle rowProps more explicitly. Here's a refined version of your code snippet",
            isActive: true,
            isDeleted: false
        },
        {
            workoutSessionId: 2,
            trainerId: 1,
            name: "Aerobics",
            description: "To manage the rowProps and ensure it works correctly regardless of whether it evaluates to true or false, you can adjust your logic to handle rowProps more explicitly. Here's a refined version of your code snippet",
            isActive: true,
            isDeleted: false
        },
        {
            workoutSessionId: 3,
            trainerId: 1,
            name: "Weight training",
            description: "To manage the rowProps and ensure it works correctly regardless of whether it evaluates to true or false, you can adjust your logic to handle rowProps more explicitly. Here's a refined version of your code snippet",
            isActive: true,
            isDeleted: false
        },
        {
            workoutSessionId: 4,
            trainerId: 1,
            name: "Crossfit",
            description: "To manage the rowProps and ensure it works correctly regardless of whether it evaluates to true or false, you can adjust your logic to handle rowProps more explicitly. Here's a refined version of your code snippet",
            isActive: true,
            isDeleted: false
        },
        {
            workoutSessionId: 5,
            trainerId: 1,
            name: "Zumba",
            description: "To manage the rowProps and ensure it works correctly regardless of whether it evaluates to true or false, you can adjust your logic to handle rowProps more explicitly. Here's a refined version of your code snippet",
            isActive: true,
            isDeleted: false
        },
    ],
    siteContent: [
        { key: "TC", title: "Terms and Conditions", content: "To manage the rowProps and ensure it works correctly regardless of whether it evaluates to true or false"},
        { key: "About", title: "About", content: "ensure it works correctly regardless of whether it evaluates to true or false. Here's a refined version of your code snippet"},
        { key: "Services", title: "Services", content: "you can adjust your logic to handle rowProps more explicitly. Here's a refined version of your code snippet"},
        { key: "PP", title: "Privacy Policy", content: "Here's a refined version of your code snippet. To manage the rowProps and ensure it works correctly regardless"},
        { key: "FAQ", title: "FAQs", content: "To manage the rowProps and ensure it works correctly regardless of whether it evaluates to true or false"},
    ]
}
export default listData;