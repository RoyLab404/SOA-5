# HƯỚNG DẪN CHỤP ẢNH KẾT QUẢ POSTMAN

Thư mục này dùng để lưu ảnh chụp màn hình kiểm thử API qua Postman để chèn vào báo cáo.

### Danh sách các ảnh cần chụp:
1. `01-create-product.png`: Chụp màn hình khi gửi `POST http://localhost:3001/products` với token hợp lệ và body JSON sản phẩm (kết quả trả về `201 Created`).
2. `02-get-products.png`: Chụp màn hình khi gửi `GET http://localhost:3001/products` có kèm token (kết quả trả về danh sách sản phẩm `200 OK`).
3. `03-get-detail.png`: Chụp màn hình khi gửi `GET http://localhost:3001/products/1` có kèm token (kết quả trả về `200 OK`).
4. `04-update-product.png`: Chụp màn hình khi gửi `PUT http://localhost:3001/products/1` có kèm token (kết quả trả về `200 OK`).
5. `05-delete-product.png`: Chụp màn hình khi gửi `DELETE http://localhost:3001/products/1` có kèm token (kết quả trả về `200 OK`).
6. `06-no-token.png`: Chụp màn hình khi gọi API nhưng **không** truyền Header `Authorization` (kết quả trả về `401 Unauthorized`).
7. `07-invalid-token.png`: Chụp màn hình khi truyền token sai hoặc hết hạn (kết quả trả về `401 Unauthorized`).

> **Gợi ý:** Bạn có thể dùng phím tắt `Windows + Shift + S` để chụp vùng cửa sổ Postman, sau đó lưu file ảnh vào thư mục `docs/` này với các tên tương ứng.

