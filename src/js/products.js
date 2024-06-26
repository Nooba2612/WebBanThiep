const products = [
    {
        id: "001",
        type: "newyear",
        status: "Còn hàng",
        image: "../assets/images/products/product-001.jpg",
        name: "Thiệp Tết - 18 x 12 cm",
        occasion: "Tết",
        price: "10.100",
    },
    {
        id: "002",
        type: "newyear",
        status: "Còn hàng",
        image: "../assets/images/products/product-002.jpg",
        name: "Thiệp Tết - 18 x 12 cm",
        occasion: "Tết",
        price: "10.100",
    },
    {
        id: "003",
        type: "valentine",
        status: "Còn hàng",
        image: "../assets/images/products/product-003.jpg",
        name: "Thiệp Valentine - 15 x 10.5 cm",
        occasion: "Valentine",
        price: "20.500",
    },
    {
        id: "004",
        type: "aniversary",
        status: "Còn hàng",
        image: "../assets/images/products/product-004.jpg",
        name: "Thiệp Chúc Mừng LUX - Blueangel",
        occasion: "Chúc mừng",
        price: "7.500",
    },
    {
        id: "005",
        type: "newyear",
        status: "Còn hàng",
        image: "../assets/images/products/product-005.jpg",
        name: "Thiệp Tết - 18 x 12 cm",
        occasion: "Tết",
        price: "15.100",
    },
    {
        id: "006",
        type: "newyear",
        status: "Còn hàng",
        image: "../assets/images/products/product-006.jpg",
        name: "Thiệp Chúc Mừng Ngày Nhà Giáo Việt Nam 20.11 - 15 x 11 cm",
        occasion: "Tết",
        price: "9.900",
    },
    {
        id: "007",
        type: "womanday",
        status: "Còn hàng",
        image: "../assets/images/products/product-007.jpg",
        name: "Thiệp Chúc Mừng Ngày Phụ Nữ Việt Nam - 20.10",
        occasion: "Ngày Phụ Nữ Việt Nam",
        price: "5.500",
    },
    {
        id: "008",
        type: "teacherday",
        status: "Còn hàng",
        image: "../assets/images/products/product-008.jpg",
        name: "Thiệp Chúc Mừng Ngày Nhà Giáo Việt Nam 20.11 ",
        occasion: "Ngày Nhà Giáo Việt Nam",
        price: "8.600",
    },
    {
        id: "009",
        type: "birthday",
        status: "Còn hàng",
        image: "../assets/images/products/product-009.jpg",
        name: "Thiệp Happy Birthday",
        occasion: "Sinh Nhật",
        price: "11.200",
    },
    {
        id: "010",
        type: "valentine",
        status: "Còn hàng",
        image: "../assets/images/products/product-010.jpg",
        name: "Thiệp Valentine - 15 x 10.5 cm",
        occasion: "Valentine",
        price: "9.500",
    },
    {
        id: "011",
        type: "teacherday",
        status: "Còn hàng",
        image: "../assets/images/products/product-011.jpg",
        name: "Thiệp Chúc Mừng Ngày Nhà Giáo Việt Nam 20.11",
        occasion: "Ngày Nhà Giáo Việt Nam",
        price: "8.800",
    },
    {
        id: "012",
        type: "newyear",
        status: "Còn hàng",
        image: "../assets/images/products/product-012.jpg",
        name: "Thiệp Quilling Tết 16 x 16 cm",
        occasion: "Tết",
        price: "10.100",
    },
    {
        id: "013",
        type: "newyear",
        status: "Còn hàng",
        image: "../assets/images/products/product-013.jpg",
        name: "Thiệp Tết - 18 x 12 cm",
        occasion: "Tết",
        price: "15.100",
    },
    {
        id: "014",
        type: "valentine",
        status: "Còn hàng",
        image: "../assets/images/products/product-014.jpg",
        name: "Thiệp I Love You - 10.5 x 7.5 cm",
        occasion: "Valentine",
        price: "6.100",
    },
    {
        id: "015",
        type: "teacherday",
        status: "Còn hàng",
        image: "../assets/images/products/product-015.jpg",
        name: "Thiệp Chúc Mừng Ngày Nhà Giáo Việt Nam 20.11",
        occasion: "Ngày Nhà Giáo Việt Nam",
        price: "8.600",
    },
    {
        id: "016",
        type: "christmas",
        status: "Còn hàng",
        image: "../assets/images/products/product-016.jpg",
        name: "Thiệp giáng sinh Christmas Wreath",
        occasion: "Giáng Sinh",
        price: "9.600",
    },
    {
        id: "017",
        type: "christmas",
        status: "Còn hàng",
        image: "../assets/images/products/product-017.jpg",
        name: "Thiệp Giáng Sinh Christmas - Thiệp Grey",
        occasion: "Giáng Sinh",
        price: "9.600",
    },
    {
        id: "018",
        type: "christmas",
        status: "Còn hàng",
        image: "../assets/images/products/product-018.jpg",
        name: "Thiệp giáng sinh Christmas Tree",
        occasion: "Giáng Sinh",
        price: "9.600",
    },
    {
        id: "019",
        type: "christmas",
        status: "Còn hàng",
        image: "../assets/images/products/product-019.jpg",
        name: "Thiệp Giáng sinh - Noel Handmade",
        occasion: "Giáng Sinh",
        price: "9.600",
    },
    {
        id: "020",
        type: "christmas",
        status: "Còn hàng",
        image: "../assets/images/products/product-020.jpg",
        name: "Thiệp Giáng sinh - Noel Handmade",
        occasion: "Giáng Sinh",
        price: "9.600",
    },
    {
        id: "021",
        type: "wedding",
        status: "Còn hàng",
        image: "../assets/images/products/product-021.jpg",
        name: "Thiệp đám cưới sang trọng",
        occasion: "Đám cưới",
        price: "10.100",
    },
    {
        id: "022",
        type: "wedding",
        status: "Còn hàng",
        image: "../assets/images/products/product-022.jpg",
        name: "Thiệp Cưới Sắc Đỏ Chữ Hỷ Truyền Thống",
        occasion: "Đám cưới",
        price: "10.100",
    },
    {
        id: "023",
        type: "wedding",
        status: "Còn hàng",
        image: "../assets/images/products/product-023.jpg",
        name: "Thiệp Cưới Sắc Hồng Pastel Họa Tiết Cô Dâu Chú Rể",
        occasion: "Đám cưới",
        price: "10.100",
    },
    {
        id: "024",
        type: "wedding",
        status: "Còn hàng",
        image: "../assets/images/products/product-024.jpg",
        name: "Thiệp Cưới Hoa Đào Sắc Hồng Lãng Mạn",
        occasion: "Đám cưới",
        price: "10.100",
    },
    {
        id: "025",
        type: "wedding",
        status: "Còn hàng",
        image: "../assets/images/products/product-025.jpg",
        name: "Thiệp Cưới Hoa, Cổng Cưới Lãng Mạn, Tinh Tế",
        occasion: "Đám cưới",
        price: "10.100",
    },
    {
        id: "026",
        type: "wedding",
        status: "Còn hàng",
        image: "../assets/images/products/product-026.jpg",
        name: "Thiệp Cưới Đỏ Hoa Văn Baroque Họa Tiết Hoa Tinh Tế",
        occasion: "Đám cưới",
        price: "10.100",
    },
    {
        id: "027",
        type: "wedding",
        status: "Còn hàng",
        image: "../assets/images/products/product-027.jpg",
        name: "Thiệp Cưới Hoa Tracing Nét Quyến Rũ Mơ Màng.",
        occasion: "Đám cưới",
        price: "10.100",
    },
    {
        id: "028",
        type: "thanks",
        status: "Còn hàng",
        image: "../assets/images/products/product-028.jpg",
        name: "Thiệp cảm ơn trang trọng",
        occasion: "Cảm ơn",
        price: "10.100",
    },
    {
        id: "029",
        type: "thanks",
        status: "Còn hàng",
        image: "../assets/images/products/product-029.jpg",
        name: "Thiệp cảm ơn tối giản",
        occasion: "Cảm ơn",
        price: "10.100",
    },
    {
        id: "030",
        type: "thanks",
        status: "Còn hàng",
        image: "../assets/images/products/product-030.jpg",
        name: "Thiệp cảm ơn cổ điển",
        occasion: "Cảm ơn",
        price: "10.100",
    },
];

export { products };
