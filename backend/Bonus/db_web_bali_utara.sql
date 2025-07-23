-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 23, 2025 at 09:58 AM
-- Server version: 8.0.30
-- PHP Version: 8.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_web_bali_utara`
--

-- --------------------------------------------------------

--
-- Table structure for table `destination`
--

CREATE TABLE `destination` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `description` text,
  `image` text,
  `rating` float DEFAULT NULL,
  `highlights` text,
  `best_time_start` time DEFAULT NULL,
  `best_time_end` time DEFAULT NULL,
  `gmaps_url` varchar(500) DEFAULT NULL,
  `youtube_id` varchar(255) DEFAULT NULL,
  `admin_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `destination`
--

INSERT INTO `destination` (`id`, `name`, `location`, `category`, `description`, `image`, `rating`, `highlights`, `best_time_start`, `best_time_end`, `gmaps_url`, `youtube_id`, `admin_id`, `created_at`) VALUES
(9, 'Pantai Lovina', 'Singaraja, Buleleng', 'Pantai', 'Pantai berpasir hitam yang terkenal dengan atraksi lumba-lumba liar di pagi hari. Suasananya yang tenang dan ombak yang tidak terlalu besar menjadikannya tempat yang sempurna untuk bersantai, berenang, dan menikmati pemandangan matahari terbit yang memukau.', '[\"/uploads/lovina1.avif\", \"/uploads/lovina2.avif\", \"/uploads/lovina3.avif\"]', 4.8, '[\"Melihat Lumba-lumba\", \"Snorkeling\", \"Matahari Terbit\", \"Perahu Tradisional\"]', '05:30:00', '08:00:00', 'https://maps.google.com/?cid=8431000252746584700', 'https://www.youtube.com/watch?v=kOPptmTo_5s', 1, '2025-07-22 12:28:10');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int NOT NULL,
  `comment` text NOT NULL,
  `user_id` int NOT NULL,
  `destination_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `rating` float NOT NULL
) ;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `comment`, `user_id`, `destination_id`, `created_at`, `rating`) VALUES
(1, 'Would come back again!', 1, 9, '2025-07-23 00:53:25', 4.5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'user'
) ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `role`) VALUES
(1, 'ADmex1@gmail.com', '@ADmex1', 'pbkdf2:sha256:1000000$AOiTDO0K6EsKsX5m$b6af97f27e7a46adbb56d382d23cf80385a7d13105def5ebe9699e52e95f5fb1', 'admin'),
(2, 'Av8R@gmail.com', 'Aviator', 'pbkdf2:sha256:1000000$3WTNPMIm4RdvDj1X$0c6e69cdec2b19753f3e1f89dc5bccb150c79a0ba85cfa49aab8aab1122f342e', 'user'),
(3, 'retard@gmail.com', 'retard', 'pbkdf2:sha256:1000000$QAgFp3PTF69ApEBO$791ff56ad538abcd0eb9295d56e2381c6d9cf87591c0b4027b1484f3413c516d', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `destination`
--
ALTER TABLE `destination`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `destination_id` (`destination_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `destination`
--
ALTER TABLE `destination`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`destination_id`) REFERENCES `destination` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
