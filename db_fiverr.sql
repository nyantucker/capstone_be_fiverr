/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `BinhLuan` (
  `ma_binh_luan` int NOT NULL AUTO_INCREMENT,
  `ma_cong_viec` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `ngay_binh_luan` datetime DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  PRIMARY KEY (`ma_binh_luan`),
  KEY `ma_cong_viec` (`ma_cong_viec`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`ma_cong_viec`) REFERENCES `CongViec` (`ma_cong_viec`),
  CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `NguoiDung` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ChiTietCongViec` (
  `ma_chi_tiet_loai` int NOT NULL AUTO_INCREMENT,
  `ten_chi_tiet` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `ma_loai_cong_viec` int DEFAULT NULL,
  PRIMARY KEY (`ma_chi_tiet_loai`),
  KEY `ma_loai_cong_viec` (`ma_loai_cong_viec`),
  CONSTRAINT `ChiTietCongViec_ibfk_1` FOREIGN KEY (`ma_loai_cong_viec`) REFERENCES `LoaiCongViec` (`ma_loai_cong_viec`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `CongViec` (
  `ma_cong_viec` int NOT NULL AUTO_INCREMENT,
  `ten_cong_viec` varchar(255) DEFAULT NULL,
  `danh_gia` int DEFAULT NULL,
  `gia_tien` int DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `mo_ta_ngan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sao_cong_viec` int DEFAULT NULL,
  `ma_chi_tiet_loai` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`ma_cong_viec`),
  KEY `ma_chi_tiet_loai` (`ma_chi_tiet_loai`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `CongViec_ibfk_1` FOREIGN KEY (`ma_chi_tiet_loai`) REFERENCES `ChiTietCongViec` (`ma_chi_tiet_loai`),
  CONSTRAINT `CongViec_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `NguoiDung` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LoaiCongViec` (
  `ma_loai_cong_viec` int NOT NULL AUTO_INCREMENT,
  `ten_loai_cong_viec` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_loai_cong_viec`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `birth_day` varchar(10) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `skill` varchar(255) DEFAULT NULL,
  `certification` varchar(255) DEFAULT NULL,
  `refToken` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ThueCongViec` (
  `ma_thue` int NOT NULL AUTO_INCREMENT,
  `ma_cong_viec` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `ngay_thue` datetime DEFAULT NULL,
  `hoan_thanh` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ma_thue`),
  KEY `ma_cong_viec` (`ma_cong_viec`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ThueCongViec_ibfk_1` FOREIGN KEY (`ma_cong_viec`) REFERENCES `CongViec` (`ma_cong_viec`),
  CONSTRAINT `ThueCongViec_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `NguoiDung` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`ma_binh_luan`, `ma_cong_viec`, `user_id`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(1, 1, 2, '2024-02-12 00:00:00', 'Great job on the web development project!', 5);
INSERT INTO `BinhLuan` (`ma_binh_luan`, `ma_cong_viec`, `user_id`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(3, 1, 5, '2024-02-07 06:04:12', 'Hay qué', 5);
INSERT INTO `BinhLuan` (`ma_binh_luan`, `ma_cong_viec`, `user_id`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(5, 4, 5, '2024-02-07 06:04:43', 'Hay qué trời', 4);
INSERT INTO `BinhLuan` (`ma_binh_luan`, `ma_cong_viec`, `user_id`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(7, 1, 4, '2024-02-07 06:05:05', 'Dở qué trời đất ơi', 1),
(13, 4, 5, '2024-02-07 23:22:48', 'tỆ rất', 3);

INSERT INTO `ChiTietCongViec` (`ma_chi_tiet_loai`, `ten_chi_tiet`, `hinh_anh`, `ma_loai_cong_viec`) VALUES
(1, 'Programming', 'programming.jpg', 1);
INSERT INTO `ChiTietCongViec` (`ma_chi_tiet_loai`, `ten_chi_tiet`, `hinh_anh`, `ma_loai_cong_viec`) VALUES
(2, 'Logo Design', 'logo_design.jpg', 2);
INSERT INTO `ChiTietCongViec` (`ma_chi_tiet_loai`, `ten_chi_tiet`, `hinh_anh`, `ma_loai_cong_viec`) VALUES
(3, 'Social & Marketing Videos', 'sss.jpg', 1);
INSERT INTO `ChiTietCongViec` (`ma_chi_tiet_loai`, `ten_chi_tiet`, `hinh_anh`, `ma_loai_cong_viec`) VALUES
(4, 'nammo', '1707204489377_IMG_20231103_235646.png', NULL),
(7, 'tam 13', NULL, NULL),
(10, 'Toán cộng + trừ', NULL, 1);

INSERT INTO `CongViec` (`ma_cong_viec`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `user_id`) VALUES
(1, 'Web Development', 4, 500, 'web_dev.jpg', 'Description for web development', 'Short description', 5, 1, 1);
INSERT INTO `CongViec` (`ma_cong_viec`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `user_id`) VALUES
(2, 'Logo Redesign', 5, 300, 'logo_redesign.jpg', 'Description for logo redesign', 'Short description', 4, 2, 2);
INSERT INTO `CongViec` (`ma_cong_viec`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `user_id`) VALUES
(4, 'AI', 0, 1000, '715915_1706079122.gif', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'AAAAAAA', 5, 2, 5);
INSERT INTO `CongViec` (`ma_cong_viec`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `user_id`) VALUES
(5, 'ABBBBBBBBI', 0, 1000, '1707347760583_lay.png', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'AAAAAAA', 5, 2, 5),
(8, 'stringstringstring', 3, 3000, 'string', 'string', 'string', 2, 2, 5),
(9, 'ASSZ', 3, 4000, 'string', 'string', 'string', 2, 2, 5),
(10, '57DD', 3, 4000, 'string', 'string', 'string', 2, 2, 5),
(12, 'AAA 95ĐXX0DF', 3, 90000, 'string', 'string', 'string', 2, 2, 5);

INSERT INTO `LoaiCongViec` (`ma_loai_cong_viec`, `ten_loai_cong_viec`) VALUES
(1, 'IT Services');
INSERT INTO `LoaiCongViec` (`ma_loai_cong_viec`, `ten_loai_cong_viec`) VALUES
(2, 'Graphic Design');
INSERT INTO `LoaiCongViec` (`ma_loai_cong_viec`, `ten_loai_cong_viec`) VALUES
(3, 'FT');
INSERT INTO `LoaiCongViec` (`ma_loai_cong_viec`, `ten_loai_cong_viec`) VALUES
(4, 'Cái bàn'),
(9, 'Tính');

INSERT INTO `NguoiDung` (`user_id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`, `refToken`, `avatar`) VALUES
(1, 'lam nam nam', 'nam@nam.nam', 'password123', '123456789', '2005-01-01', 'male', 'USER', '', '', 'refToken123', NULL);
INSERT INTO `NguoiDung` (`user_id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`, `refToken`, `avatar`) VALUES
(2, 'Tran Thi B', 'tranthib@example.com', 'pass456', '987654321', '1985-05-15', 'Female', 'ADMIN', 'Design', 'Cert2', 'refToken456', NULL);
INSERT INTO `NguoiDung` (`user_id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`, `refToken`, `avatar`) VALUES
(3, 'nam nam nam', 'nam@nam.nam', '$2b$10$CwzoLXbFk.DRg/n9rC/8NepRjUj2G0AG5gcLgPaRhG/idlQG.ERCm', '123456789', '2005-01-01', 'male', 'USER', '', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjMsImtleSI6MTcwNzEzODM4MTk1OH0sImlhdCI6MTcwNzEzODM4MSwiZXhwIjoxNzA3NzQzMTgxfQ.nDZPvAySiI70S0tTtE-gfav5pstyYkG2-7HL-hPSkCU', '1707142915057_pexels-huyn-nguyen-4851530.jpg');
INSERT INTO `NguoiDung` (`user_id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`, `refToken`, `avatar`) VALUES
(4, 'LAM', 'LAM@LAM', '$2b$10$AgMGM3yvtwqdOPsgrR3ucOAcg4MjBmU4rL.aGwfawyqVuyxFO9lLm', '123456789', '2005-01-01', 'male', 'USER', '', '', '', NULL),
(5, 'ADMIN', 'admin@admin', '$2b$10$edkzG0mob9yWV2WzIEYXke8ZrtnTg3eJHm2dSyXMHd7VPl8YTmF6G', '123456789', '2005-01-01', 'male', 'ADMIN', '', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjUsImtleSI6MTcwNzM0NTMxMDYzMH0sImlhdCI6MTcwNzM0NTMxMCwiZXhwIjoxNzA3OTUwMTEwfQ.kyL6PlKyw5gKvoghpuXVXNE6bRM1JwGBWoHwXvgibUE', '1707346446466_delicate-white-lotus-flower.jpg'),
(6, 'long', 'long@long', '$2b$10$h807evgVBXNMEHcpsHEtzuk7DInUpa5nhsJh37UJG.SBVfkxDIqnq', '123456789', '2005-01-01', 'male', 'USER', 'long', 'long', '', NULL),
(7, 'tam tam', 'ttam@nam.nam', '$2b$10$t4aF9WV26dZdvQFJqWWKAOqv40TIqBMJHXmlUGc/42kfiUH2mChkS', '123456789', '2005-01-01', 'male', 'USER', '', '', '', NULL),
(9, 'stringA', '1234', '$2b$10$CwEPPKk/ulRRhuAEFlNhmuscfG0bbCPnKwgKIq20migo9Wd8oHYzO', 'string', 'string', 'string', 'USER', 'string', 'string', '', NULL),
(11, 'string', 'stringAAA', '$2b$10$Cru6mT/0VW7nyHuRnB5IHODFAf7laGzMLJ7INUQXtpbfnOBbjAMFO', 'string', 'string', 'string', 'USER', 'string', 'string', '', NULL),
(12, 'string AAA', 'stringBBBBBB', '$2b$10$m5kn5i3HvFsQ.W9tP4rlC.vUXyvTWH.aKjseUvORNAGZkv9MFEkea', 'string', 'string', 'string', 'USER', 'stringA', 'string', '', NULL);

INSERT INTO `ThueCongViec` (`ma_thue`, `ma_cong_viec`, `user_id`, `ngay_thue`, `hoan_thanh`) VALUES
(2, 8, 2, '2024-02-11 00:00:00', 0);
INSERT INTO `ThueCongViec` (`ma_thue`, `ma_cong_viec`, `user_id`, `ngay_thue`, `hoan_thanh`) VALUES
(6, 4, 5, '2024-02-07 06:56:30', 1);
INSERT INTO `ThueCongViec` (`ma_thue`, `ma_cong_viec`, `user_id`, `ngay_thue`, `hoan_thanh`) VALUES
(7, 4, 5, '2024-02-07 06:56:31', 0);
INSERT INTO `ThueCongViec` (`ma_thue`, `ma_cong_viec`, `user_id`, `ngay_thue`, `hoan_thanh`) VALUES
(8, 5, 5, '2024-02-07 06:56:33', 1),
(9, 5, 5, '2024-02-07 06:56:34', 1),
(13, 8, 5, '2024-02-07 23:26:41', 0);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;