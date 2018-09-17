-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2018 at 04:57 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `angularapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `fe_users`
--

DROP TABLE IF EXISTS `fe_users`;
CREATE TABLE `fe_users` (
  `uid` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `salt_value` varchar(255) NOT NULL,
  `user_token` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `user_status` tinyint(1) NOT NULL,
  `create_date` int(10) NOT NULL,
  `last_login` int(10) NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fe_users`
--

INSERT INTO `fe_users` (`uid`, `username`, `password`, `salt_value`, `user_token`, `first_name`, `last_name`, `user_status`, `create_date`, `last_login`, `is_admin`) VALUES
(1, 'admin', '$2y$11$5YzXc1bv.fsKqHChqRgFZ.nvehiqJwJn5zyowYWMS1EA2W0A7lmea', '5Sq?X(*gJ+lMA$6vYk_s{@wUu}c)pfQm4ObCDd9nREKjIL1Gthi0!HozNaV2W3y7xeFB8^PZ&#T%r', '', 'Rajdeep', 'Das', 1, 1536245720, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fe_users`
--
ALTER TABLE `fe_users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fe_users`
--
ALTER TABLE `fe_users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
