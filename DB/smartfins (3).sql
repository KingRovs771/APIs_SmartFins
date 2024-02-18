-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 18, 2024 at 10:15 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smartfins`
--

-- --------------------------------------------------------

--
-- Table structure for table `device_user`
--

CREATE TABLE `device_user` (
  `id_device` int NOT NULL,
  `uuid_device` varchar(250) NOT NULL,
  `uuid_user` varchar(250) NOT NULL,
  `nama_kolam` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `device_user`
--

INSERT INTO `device_user` (`id_device`, `uuid_device`, `uuid_user`, `nama_kolam`, `created_at`) VALUES
(2, 'c3653be47a4e54ff3279bf72e7e3df0b', 'b60bed7fd305b034862c9ae06a51d3ad', 'Kolam 1', '2024-02-18 09:09:23');

-- --------------------------------------------------------

--
-- Table structure for table `sensor`
--

CREATE TABLE `sensor` (
  `id_sensor` int NOT NULL,
  `uuid_device` varchar(250) NOT NULL,
  `sensor_oksigen` float DEFAULT NULL,
  `sensor_suhu` float DEFAULT NULL,
  `sensor_ph` float DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `token_user`
--

CREATE TABLE `token_user` (
  `id_token` int NOT NULL,
  `uid_user` varchar(250) NOT NULL,
  `jsontoken` text NOT NULL,
  `ip_address` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `token_user`
--

INSERT INTO `token_user` (`id_token`, `uid_user`, `jsontoken`, `ip_address`) VALUES
(1, '69ebaf6e2dd9603a20ba96cb518c68aa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ1aWRfdXNlciI6MSwidXVpZF91c2VyIjoiNjllYmFmNmUyZGQ5NjAzYTIwYmE5NmNiNTE4YzY4YWEiLCJuYW1hX3VzZXIiOiJBbGllZiBBcmlmaW4gTWFoYXJkaWtvIiwibm9faHAiOiIwODc3NTg5OTY1NDQiLCJhbGFtYXQiOiJTdXJha2FydGEiLCJlbWFpbCI6ImFsaWVmYXJpZmluQHNpbnVzLmFjLmlkIiwicGFzc3dvcmQiOiI2OWViYWY2ZTJkZDk2MDNhMjBiYTk2Y2I1MThjNjhhYSIsImNyZWF0ZWRfYXQiOiIyMDI0LTAxLTI2VDAyOjI2OjQ0LjAwMFoifV0sImlhdCI6MTcwNjIzNjczOSwiZXhwIjoxNzA2MjYwNzM5fQ.0mRcw_H-tutW-Hh984ZBjECz8L691lP80rv0nqMpJRw', '172.23.64.1'),
(2, 'b60bed7fd305b034862c9ae06a51d3ad', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ1aWRfdXNlciI6MiwidXVpZF91c2VyIjoiYjYwYmVkN2ZkMzA1YjAzNDg2MmM5YWUwNmE1MWQzYWQiLCJuYW1hX3VzZXIiOiJSaXpreSBCdWRpYXJ0byIsImVtYWlsIjoicml6a3lAc2ludXMuYWMuaWQiLCJwYXNzd29yZCI6ImI2MGJlZDdmZDMwNWIwMzQ4NjJjOWFlMDZhNTFkM2FkIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDItMThUMDg6NDY6MzguMDAwWiJ9XSwiaWF0IjoxNzA4MjQ2MDM2LCJleHAiOjE3MDgyNzAwMzZ9.vP5Prcku-QJ3Pg6H5gf5EUlLDARihYMHL5RE0KXlXgs', '169.254.71.79');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid_user` int NOT NULL,
  `uuid_user` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nama_user` varchar(90) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid_user`, `uuid_user`, `nama_user`, `email`, `password`, `created_at`) VALUES
(1, '69ebaf6e2dd9603a20ba96cb518c68aa', 'Alief Arifin Mahardiko', 'aliefarifin@sinus.ac.id', '69ebaf6e2dd9603a20ba96cb518c68aa', '2024-01-26 02:26:44'),
(2, 'b60bed7fd305b034862c9ae06a51d3ad', 'Rizky Budiarto', 'rizky@sinus.ac.id', 'b60bed7fd305b034862c9ae06a51d3ad', '2024-02-18 08:46:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `device_user`
--
ALTER TABLE `device_user`
  ADD PRIMARY KEY (`id_device`);

--
-- Indexes for table `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`id_sensor`);

--
-- Indexes for table `token_user`
--
ALTER TABLE `token_user`
  ADD PRIMARY KEY (`id_token`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `device_user`
--
ALTER TABLE `device_user`
  MODIFY `id_device` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sensor`
--
ALTER TABLE `sensor`
  MODIFY `id_sensor` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `token_user`
--
ALTER TABLE `token_user`
  MODIFY `id_token` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
