-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 06, 2018 at 08:08 AM
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
-- Table structure for table `our_service`
--

CREATE TABLE `our_service` (
  `id` int(10) NOT NULL,
  `filename` varchar(50) NOT NULL,
  `servicetitle` varchar(100) NOT NULL,
  `servicepageurl` varchar(100) NOT NULL,
  `serviceabout` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `edit` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `our_service`
--

INSERT INTO `our_service` (`id`, `filename`, `servicetitle`, `servicepageurl`, `serviceabout`, `created`, `edit`) VALUES
(8, '0d7140199abd8f85.jpg', 'Training and Certifications', 'unkown', 'We offer range of oil & gas, HSE and management courses and issue certificates that are accepted all over the world:                                              our trainings are comprehensive, cost-effective and most times tailored to meet organizational specific needs. Whether small or large, local or multinational organization we can offer you specialized courses based on real-life situations.', '2018-06-03 09:39:52', 0),
(9, '6fd6a3aa9e4f68ad.jpg', 'Inspection, Test and Corrosion Control', 'unkown', 'Deslog Energy Services Limited (DESL) is a leading company that provides lifting inspections, non destructive testing and corrosion control with the use of wide range of advanced technologies to meet customers’ requirement in accordance to national and international standards. We have built capacity for effective and timely delivery at both offshore and onshore locations. Our engineers are highly trained and seasoned professionals with many years of field experience, they works round the clock to ensure our clients’ satisfactions', '2018-06-03 09:45:44', 0),
(10, 'f0e8b9b81a86cb1a.jpg', 'QHSE and Technical Consultancy', 'unkown', 'Our QHSE and technical consultancy services are provided by a team of experts, renowned engineers with hands-on expertise in helping you address issues relating to quality, risk, health and safety, environment, technology and social responsibility needs to meet your business goals. Our project and program management experts can assure a smooth implementation of the recommended changes and lead you through a successful transformation.', '2018-06-03 09:47:27', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `our_service`
--
ALTER TABLE `our_service`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `our_service`
--
ALTER TABLE `our_service`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
