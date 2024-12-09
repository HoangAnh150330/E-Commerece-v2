export const registerFormControls = [
  {
    name: "userName",
    label: "Tên người dùng",
    placeholder: "Nhập tên người dùng của bạn",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Nhập email của bạn",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Mật khẩu",
    placeholder: "Nhập mật khẩu của bạn",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Nhập email của bạn",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Mật khẩu",
    placeholder: "Nhập mật khẩu của bạn",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Tiêu đề",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Nhập tiêu đề sản phẩm",
  },
  {
    label: "Mô tả",
    name: "description",
    componentType: "textarea",
    placeholder: "Nhập mô tả sản phẩm",
  },
  {
    label: "Danh mục",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Nam" },
      { id: "women", label: "Nữ" },
      { id: "kids", label: "Trẻ em" },
      { id: "accessories", label: "Phụ kiện" },
      { id: "footwear", label: "Giày dép" },
    ],
  },
  {
    label: "Thương hiệu",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Giá",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá sản phẩm",
  },
  {
    label: "Giá giảm",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá giảm (tùy chọn)",
  },
  {
    label: "Tổng số lượng",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Nhập tổng số lượng",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Trang chủ",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Sản phẩm",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Nam",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Nữ",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Trẻ em",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Giày dép",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Phụ kiện",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Tìm kiếm",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  men: "Nam",
  women: "Nữ",
  kids: "Trẻ em",
  accessories: "Phụ kiện",
  footwear: "Giày dép",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "men", label: "Nam" },
    { id: "women", label: "Nữ" },
    { id: "kids", label: "Trẻ em" },
    { id: "accessories", label: "Phụ kiện" },
    { id: "footwear", label: "Giày dép" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Giá: Thấp đến Cao" },
  { id: "price-hightolow", label: "Giá: Cao đến Thấp" },
  { id: "title-atoz", label: "Tiêu đề: A đến Z" },
  { id: "title-ztoa", label: "Tiêu đề: Z đến A" },
];

export const addressFormControls = [
  {
    label: "Địa chỉ",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Nhập địa chỉ của bạn",
  },
  {
    label: "Thành phố",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Nhập thành phố của bạn",
  },
  {
    label: "Mã bưu điện",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Nhập mã bưu điện của bạn",
  },
  {
    label: "Số điện thoại",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Nhập số điện thoại của bạn",
  },
  {
    label: "Ghi chú",
    name: "notes",
    componentType: "textarea",
    placeholder: "Nhập ghi chú (nếu có)",
  },
];
