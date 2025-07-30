-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 29, 2025 at 01:13 PM
-- Server version: 8.0.30
-- PHP Version: 8.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;

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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
    `id` int NOT NULL,
    `email` varchar(255) NOT NULL,
    `username` varchar(50) DEFAULT NULL,
    `password` varchar(255) NOT NULL,
    `is_admin` varchar(20) NOT NULL DEFAULT 'user',
    `profile_image` varchar(255) DEFAULT NULL
);

--
-- Dumping data for table `users`
--

INSERT INTO
    `users` (
        `id`,
        `email`,
        `username`,
        `password`,
        `is_admin`,
        `profile_image`
    )
VALUES (
        14,
        'ADMex1@gmail.com',
        'ADMex1',
        'pbkdf2:sha256:1000000$sY1Nx6jqXuCXubbk$a2504c3717a45aa7b8177c4bb8031e50668fa5955f842b86ad914aa2ed3c2cd2',
        'admin',
        '14_20250729210212_Viktor_0.jpg'
    ),
    (
        15,
        'viktor@gmail.com',
        'Viktor',
        'pbkdf2:sha256:1000000$fK20OFLcsTWSY2R7$99cf2ef4675c0797a567460d7544cd048c00894a38a35e1498ca86f47389a60c',
        'user',
        '15_20250729205731_Hextech.png'
    );

--
-- Indexes for dumped tables
--

--
-- Indexes for table `destination`
--
ALTER TABLE `destination` ADD PRIMARY KEY (`id`);

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
MODIFY `id` int NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 19;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review` MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users` MODIFY `id` int NOT NULL AUTO_INCREMENT;

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;