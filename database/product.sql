-- =============================================================================
-- HỌ VÀ TÊN: HUỲNH NGỌC KHANG
-- MSSV: 4651050116 - LỚP K46D - NHÓM 5
-- =============================================================================

CREATE DATABASE IF NOT EXISTS product_db 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE product_db;

CREATE TABLE IF NOT EXISTS products (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255)   NOT NULL,
  category    VARCHAR(100)   NOT NULL DEFAULT 'Phụ kiện',
  description TEXT,
  price       DECIMAL(10, 2) NOT NULL,
  quantity    INT            NOT NULL DEFAULT 0,
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Dữ liệu mẫu ban đầu
INSERT INTO products (name, category, description, price, quantity) VALUES
  ('Laptop Dell XPS 13', 'Máy tính', 'Intel Core Ultra 7, 16GB RAM, 512GB SSD', 28500000.00, 15),
  ('Màn hình Dell UltraSharp U2724D', 'Màn hình', '27 inch 2K IPS 120Hz 100% sRGB', 8900000.00, 20),
  ('Chuột không dây Logitech MX Master 3S', 'Phụ kiện', 'Cảm biến Darkfield 8K DPI, sạc Type-C', 1890000.00, 45),
  ('Bàn phím cơ Keychron K2 Pro', 'Bàn phím', 'Bluetooth / Type-C, RGB Hot-swap Red Switch', 2150000.00, 30),
  ('Tai nghe Sony WH-1000XM5', 'Âm thanh', 'Chống ồn chủ động cao cấp, pin 30 giờ', 6990000.00, 12);