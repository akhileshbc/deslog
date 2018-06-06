-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 06, 2018 at 08:14 AM
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
-- Table structure for table `who_we_are`
--

CREATE TABLE `who_we_are` (
  `id` int(10) NOT NULL,
  `heading` varchar(200) NOT NULL,
  `intro` text NOT NULL,
  `content` text NOT NULL,
  `edit` varchar(10) NOT NULL,
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `who_we_are`
--

INSERT INTO `who_we_are` (`id`, `heading`, `intro`, `content`, `edit`, `lastupdate`, `createdDate`) VALUES
(7, 'Who we are', 'International oil and gas, quality Health Safety and Environment Training provider', 'We are passionate about what we do and our strength and continued growth lies in the quality of our certified professional staff and management\'s commitment to offer statutory training, test and inspection services that meet our client\'s requirement of international and local standard. With several years of experience we have helped many companies including multinationals reach global accepted standards by training their staff to be up to date with the latest methods and good practices - and to consistently adopt the \"right attitude\" - in the fields of quality, health, safety and environmental protection', 'false', '2018-05-31 21:01:09', '2018-05-31 21:01:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `who_we_are`
--
ALTER TABLE `who_we_are`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `who_we_are`
--
ALTER TABLE `who_we_are`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
