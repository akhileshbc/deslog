-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 06, 2018 at 08:07 AM
-- Server version: 5.7.20
-- PHP Version: 7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `deslogen`
--

-- --------------------------------------------------------

--
-- Table structure for table `bannerimage`
--

CREATE TABLE `bannerimage` (
  `id` int(10) NOT NULL,
  `image_url` varchar(50) NOT NULL,
  `intro` varchar(50) NOT NULL,
  `upload_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bannerimage`
--

INSERT INTO `bannerimage` (`id`, `image_url`, `intro`, `upload_time`) VALUES
(38, '5d9be013b0824c97.jpg', 'we are world class training', '2018-06-01 20:03:03.739660'),
(48, '0840993f3aeb1fa4.jpg', ',sd,cfcjaklewfh ewiuofejkfdh PUIF', '2018-06-06 14:35:04.807070'),
(49, '1374cf79c337c833.jpg', 'uhflaiurfykuyhlikuhcgliudchdiulkcgbkfhdvf', '2018-06-06 14:35:38.311735');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bannerimage`
--
ALTER TABLE `bannerimage`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bannerimage`
--
ALTER TABLE `bannerimage`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
