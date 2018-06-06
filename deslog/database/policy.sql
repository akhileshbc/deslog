-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 06, 2018 at 08:09 AM
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
-- Table structure for table `policy`
--

CREATE TABLE `policy` (
  `policytitle` varchar(200) NOT NULL,
  `policycontent` text NOT NULL,
  `edit` varchar(20) NOT NULL,
  `policypageurl` varchar(100) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `policy`
--

INSERT INTO `policy` (`policytitle`, `policycontent`, `edit`, `policypageurl`, `created`, `update`, `id`) VALUES
('Corporate Social Responsibility', 'As a standard corporate organization we maintain community-friendly policies that focuses on the best interest of our host community', 'false', '#', '2018-06-04 13:11:53', '2018-06-04 13:11:53', 9),
('QHSE Policy', 'We instituted and currently maintain safety policies that aim at improving workers health and welfare', 'false', '#', '2018-06-04 13:13:29', '2018-06-04 13:13:29', 10),
('Quality Assurance Policy', 'We are committed to the concept of: Sustaining & improving the quality of services provided to our customers', 'false', '#', '2018-06-04 13:14:30', '2018-06-04 13:14:30', 11),
('Quality Assurance Policy po', 'We are committed to the concept of: Sustaining & improving the quality of services provided to our customers', 'false', '#', '2018-06-04 13:15:42', '2018-06-04 13:15:42', 12);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `policy`
--
ALTER TABLE `policy`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `policy`
--
ALTER TABLE `policy`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
