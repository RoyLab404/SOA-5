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

Tất cả API yêu cầu header `Authorization: Bearer <token>`.

| Phương thức | Endpoint | Chức năng |
| :--- | :--- | :--- |
| `GET` | `/products` | Lấy danh sách sản phẩm (hỗ trợ `?search=` và `?category=`) |
| `GET` | `/products/:id` | Xem chi tiết sản phẩm theo ID |
| `POST` | `/products` | Thêm mới sản phẩm |
| `PUT` | `/products/:id` | Cập nhật thông tin sản phẩm |
| `DELETE` | `/products/:id` | Xóa sản phẩm |
