-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-06-2022 a las 22:14:34
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `medical-appointments`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medical_appointment`
--

CREATE TABLE `medical_appointment` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `psycho_id` int(11) NOT NULL,
  `date_request` datetime NOT NULL,
  `date_appointment` datetime NOT NULL,
  `status_appointment` varchar(20) NOT NULL,
  `psycho_diagnosis` varchar(200) NOT NULL,
  `student_rating` varchar(50) NOT NULL,
  `psycho_treatment` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `medical_appointment`
--
ALTER TABLE `medical_appointment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `psycho_id` (`psycho_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `medical_appointment`
--
ALTER TABLE `medical_appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `medical_appointment`
--
ALTER TABLE `medical_appointment`
  ADD CONSTRAINT `medical_appointment_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `medical_appointment_ibfk_2` FOREIGN KEY (`psycho_id`) REFERENCES `psychology` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
