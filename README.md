# BÀI THỰC HÀNH SỐ 3: DỊCH VỤ QUẢN LÝ SẢN PHẨM (SOA)

- **Sinh viên:** Huỳnh Ngọc Khang  
- **MSSV:** 4651050116  
- **Lớp:** K46D - Nhóm 5  

---

## 1. Tổng quan dịch vụ
- **Dịch vụ Sản phẩm:** Chạy trên cổng `3001`, cơ sở dữ liệu `product_db` (MySQL, bảng `products`).
- **Xác thực:** Sử dụng `AuthMiddleware` gọi HTTP sang Auth Service (`http://localhost:3000/auth`) để xác thực JWT token.

---

## 2. Danh sách API

Tất cả API đều yêu cầu header `Authorization: Bearer <token>`.

| Phương thức | Endpoint | Chức năng |
| :--- | :--- | :--- |
| `GET` | `/products` | Lấy danh sách sản phẩm (hỗ trợ `?search=` và `?category=`) |
| `GET` | `/products/:id` | Xem chi tiết sản phẩm theo ID |
| `POST` | `/products` | Thêm mới sản phẩm |
| `PUT` | `/products/:id` | Cập nhật thông tin sản phẩm |
| `DELETE` | `/products/:id` | Xóa sản phẩm |

---

## 3. Kết quả kiểm thử Postman

### 3.1. Đăng nhập lấy Token từ Auth Service (:3000)
![Đăng nhập lấy token](docs/00-login-success.png)

### 3.2. Thêm mới sản phẩm (`POST /products`)
![Thêm sản phẩm](docs/01-create-product.png)

### 3.3. Lấy danh sách sản phẩm (`GET /products`)
![Danh sách sản phẩm](docs/02-get-products.png)
![Chi tiết danh sách](docs/02-get-products-list.png)

### 3.4. Xem chi tiết sản phẩm (`GET /products/1`)
![Chi tiết sản phẩm](docs/03-get-detail.png)

### 3.5. Cập nhật sản phẩm (`PUT /products/1`)
![Cập nhật sản phẩm](docs/04-update-product.png)

### 3.6. Xóa sản phẩm (`DELETE /products/1`)
![Xóa sản phẩm](docs/05-delete-product.png)

### 3.7. Kiểm tra bảo mật khi không có Token (401 Unauthorized)
![Không có token](docs/06-no-token.png)
