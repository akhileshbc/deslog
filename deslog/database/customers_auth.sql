-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 15, 2018 at 05:09 AM
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
-- Table structure for table `customers_auth`
--

CREATE TABLE `customers_auth` (
  `uid` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `sex` varchar(50) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customers_auth`
--

INSERT INTO `customers_auth` (`uid`, `firstname`, `middlename`, `lastname`, `email`, `phone`, `sex`, `created`, `password`) VALUES
(5, 'ugbana', 'sunday', 'ekenekiso', 'senenerst@gmail.com', '08065615447', 'male', '2018-02-15 11:34:47', '$2a$10$7ef03b5f69dab318adb55uvRH5gbziSlmXoNyzYuuEmSx/B.UPzOO'),
(6, 'ugbanawaji', 's', 'ekene', 'sen_enerst@gmail.com', '08055090200', 'male', '2018-02-15 11:39:57', '$2a$10$7e0fd913a4dce4d3eb4f2eiWSfoO1ako41pthr7xg2zgW9t.w0jPW'),
(7, 'theo', 'theo', 'uka', 'sen_enerst@yahoo.com', '09099000199', 'male', '2018-02-15 11:49:42', '$2a$10$d70bf17dc94ab3fde9721ei.dk1UBvfPbwE0xb3k9JIZyag/3Ddj6');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers_auth`
--
ALTER TABLE `customers_auth`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers_auth`
--
ALTER TABLE `customers_auth`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
