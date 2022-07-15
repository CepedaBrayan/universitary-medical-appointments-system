-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-07-2022 a las 06:45:38
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
-- Estructura de tabla para la tabla `frequent_questions`
--

CREATE TABLE `frequent_questions` (
  `id` int(11) NOT NULL,
  `question` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `answer` varchar(500) COLLATE utf8_spanish_ci DEFAULT NULL,
  `asked_by` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `answered_by` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `frequent_questions`
--

INSERT INTO `frequent_questions` (`id`, `question`, `answer`, `asked_by`, `answered_by`, `created_at`, `updated_at`) VALUES
(1, 'Cuándo me voy a recuperar', 'No lo sé Rick', 'Psycho', 'Psycho', '2022-06-22 08:57:26', '2022-06-22 08:57:26'),
(2, 'Cuándo me voy a recuperar de esto?', 'No lo sé Rick', 'Student', 'Psycho', '2022-06-22 09:01:13', '2022-06-22 09:01:13'),
(3, 'Cuándo me voy a recuperar de esto??', 'No lo sé Rick again', 'Anonymous', 'Psycho', '2022-06-23 08:40:15', '2022-06-23 08:40:15'),
(4, 'Cuándo me voy a recuperar de esto pana??', 'No lo sé Rick again', 'Anonymous', 'Psycho', '2022-06-23 08:32:52', '2022-06-23 08:32:52'),
(5, 'Cuándo me voy a recuperar de esto panaaaaa??', 'No lo sé Rick again', 'Anonymous', 'Psycho', '2022-06-23 08:32:27', '2022-06-23 08:32:27'),
(6, 'Cuándo me voy a recuperar del corazón :c??', 'No lo sé Rick again', 'Anonymous', 'ta', '2022-06-23 08:47:28', '2022-06-23 08:47:28'),
(7, 'Cuándo me voy a recuperar del corazón  y de ella:c??', 'Nunca', 'yo', 'ta', '2022-06-23 08:47:47', '2022-06-23 08:47:47'),
(8, 'Cuándo seré feliz??', 'Nunca', 'yo', 'superior2', '2022-06-23 08:51:05', '2022-06-23 08:51:05'),
(9, 'Cuándo seré feliz pana??', 'Nunca', 'yo', 'superior2', '2022-06-23 09:03:54', '2022-06-23 09:03:54'),
(10, 'Cuándo seré feliz en la vida??', 'Nunca pez', 'yo', 'ta', '2022-06-23 09:11:25', '2022-06-23 09:11:25'),
(11, 'Cuándo seré feliz en la vida pór favor??', 'No lo sé', 'yo', 'ta', '2022-06-23 15:46:55', '2022-06-23 15:46:55');

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
  `psycho_diagnosis` varchar(200) DEFAULT NULL,
  `student_rating` int(11) DEFAULT 0,
  `psycho_treatment` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `medical_appointment`
--

INSERT INTO `medical_appointment` (`id`, `student_id`, `psycho_id`, `date_request`, `date_appointment`, `status_appointment`, `psycho_diagnosis`, `student_rating`, `psycho_treatment`, `created_at`, `updated_at`) VALUES
(1, 16, 3, '2022-06-29 21:17:29', '2023-06-30 08:00:00', 'canceled', '', 0, '', '2022-07-14 22:56:49', '2022-07-14 22:56:49'),
(2, 18, 4, '2022-06-30 12:50:49', '2023-06-30 20:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:31:54', '2022-07-14 22:31:54'),
(3, 18, 4, '2022-06-30 12:52:08', '2022-06-02 15:21:19', 'finished', 'está malito', 5, 'reposo', '2022-06-30 16:10:49', '2022-06-30 16:10:49'),
(4, 18, 4, '2022-06-30 12:52:23', '2022-01-07 19:00:00', 'finished', 'está malote', 2, 'reposo', '2022-06-30 16:12:00', '2022-06-30 16:12:00'),
(5, 18, 4, '2022-06-30 13:19:22', '2023-07-01 21:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:31:54', '2022-07-14 22:31:54'),
(6, 18, 4, '2022-06-30 13:37:56', '2023-07-01 16:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:31:54', '2022-07-14 22:31:54'),
(7, 18, 4, '2022-06-30 13:40:57', '2023-07-01 11:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:31:54', '2022-07-14 22:31:54'),
(8, 18, 4, '2022-06-30 13:49:46', '2023-07-01 06:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:31:54', '2022-07-14 22:31:54'),
(9, 18, 4, '2022-06-30 14:58:46', '2023-07-01 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:31:54', '2022-07-14 22:31:54'),
(11, 18, 4, '2022-06-30 15:03:01', '2023-07-01 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:22:15', '2022-07-14 22:22:15'),
(12, 18, 3, '2022-06-30 16:08:41', '2023-08-01 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:51:29', '2022-07-14 22:51:29'),
(13, 18, 3, '2022-06-30 16:09:16', '2023-09-01 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:51:29', '2022-07-14 22:51:29'),
(14, 18, 3, '2022-06-30 16:09:58', '2023-10-01 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:51:30', '2022-07-14 22:51:30'),
(15, 18, 3, '2022-06-30 16:14:06', '2023-10-02 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:51:30', '2022-07-14 22:51:30'),
(16, 18, 3, '2022-06-30 16:16:07', '2023-10-03 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:51:29', '2022-07-14 22:51:29'),
(17, 18, 3, '2022-06-30 16:16:36', '2023-10-04 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:51:30', '2022-07-14 22:51:30'),
(18, 18, 3, '2022-06-30 16:19:02', '2023-10-05 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:51:30', '2022-07-14 22:51:30'),
(19, 18, 3, '2022-06-30 16:36:43', '2023-10-06 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:51:30', '2022-07-14 22:51:30'),
(20, 18, 3, '2022-06-30 16:37:05', '2023-10-07 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:51:30', '2022-07-14 22:51:30'),
(21, 18, 3, '2022-06-30 16:39:22', '2023-10-08 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:51:30', '2022-07-14 22:51:30'),
(22, 18, 3, '2022-06-30 16:39:57', '2023-10-09 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:51:30', '2022-07-14 22:51:30'),
(23, 18, 3, '2022-06-30 16:41:53', '2023-10-10 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:51:30', '2022-07-14 22:51:30'),
(24, 18, 3, '2022-06-30 16:43:55', '2023-10-11 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:51:30', '2022-07-14 22:51:30'),
(25, 18, 3, '2022-06-30 16:45:15', '2023-10-12 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:51:30', '2022-07-14 22:51:30'),
(26, 18, 3, '2022-06-30 16:45:47', '2023-10-13 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:51:30', '2022-07-14 22:51:30'),
(27, 18, 3, '2022-06-30 16:46:23', '2023-10-14 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:36:34', '2022-07-14 22:36:34'),
(28, 18, 3, '2022-06-30 16:56:16', '2023-10-15 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:36:34', '2022-07-14 22:36:34'),
(29, 18, 3, '2022-06-30 16:58:11', '2023-10-16 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:36:34', '2022-07-14 22:36:34'),
(30, 18, 3, '2022-06-30 16:59:00', '2023-10-17 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:36:34', '2022-07-14 22:36:34'),
(31, 18, 3, '2022-06-30 17:00:00', '2023-10-18 08:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:36:34', '2022-07-14 22:36:34'),
(32, 18, 3, '2022-06-30 17:00:52', '2023-10-19 08:00:00', 'canceled', NULL, 0, NULL, '2022-06-30 12:47:51', '2022-06-30 12:47:51'),
(33, 18, 3, '2022-06-30 17:01:15', '2023-10-20 08:00:00', 'canceled', NULL, 0, NULL, '2022-06-30 12:47:20', '2022-06-30 12:47:20'),
(34, 18, 3, '2022-07-03 16:45:56', '2023-10-21 13:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:36:34', '2022-07-14 22:36:34'),
(35, 18, 3, '2022-07-15 02:24:16', '2025-10-21 13:00:00', 'canceled', NULL, 0, NULL, '2022-07-14 22:56:49', '2022-07-14 22:56:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `psychology`
--

CREATE TABLE `psychology` (
  `id` int(11) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `city` varchar(25) NOT NULL,
  `code_psychology` varchar(7) NOT NULL,
  `office` varchar(100) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `rating_average` float DEFAULT 0,
  `appointments_number` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `psychology`
--

INSERT INTO `psychology` (`id`, `nickname`, `name`, `password`, `email`, `phone`, `city`, `code_psychology`, `office`, `active`, `rating_average`, `appointments_number`, `created_at`, `updated_at`) VALUES
(1, 'm', 'string', '$2b$10$RgDjliFpzNAWhx.HZT', 'string', 'string', 'string', '11', '25', 1, 10, 5, '2022-07-14 18:39:15', '2022-07-14 18:39:15'),
(3, 'ma', 'string', '$2b$10$fn5OFOk/aycZYG75ScXCQuDT/0Opw72oeEUlQacOFYHI7JNJfSphu', 'riveracepedabrayan@gmail.com', 'string', 'string', '111', NULL, 0, 0, 5, '2022-07-14 22:56:49', '2022-07-14 22:56:49'),
(4, 'mas', 'string', '$2b$10$Jrp1hpCj7nHsQaM4ubrJ6e1Tf1IcvWZB69zyuJ2hqe7VGg99rmRL6', 'string@a', 'string', 'string', '1112', NULL, 1, 3.5, 2, '2022-07-14 22:07:10', '2022-07-14 22:07:10'),
(5, 'ta', 'ta', '$2b$10$mhyj5Yoy/S1nF.RirjyAveBjFI3XmtVy9mU6Awlnez9l87So9yUEy', 'ta@a', 'string', 'string', '11121', NULL, 1, 0, 5, '2022-06-22 22:14:40', '2022-06-22 22:14:40'),
(11, 'tas', 'tas', '$2b$10$NcOKHA2UKSeYv4o8SFsWwOzPclMSM/HVtzgcrYSz/58vj53h/ZDXu', 'tas@a', 'string', 'string', '1112112', NULL, 1, 0, 5, '2022-06-23 12:50:14', '2022-06-23 12:50:14'),
(14, 'tasa', 'tasa', '$2b$10$KpHYi/g7ybkYOewjDn/H6ucQTlTt9b4NadJ6kxDzcc0NRSeWSORwC', 'tasa@a', 'string', 'string', '23', NULL, 1, 0, 5, '2022-06-23 20:42:30', '2022-06-23 20:42:30'),
(15, 'tasaa', 'tasaa', '$2b$10$Zt9k7vK0TR3CY7jWqfMSuOtMnVIgDm6FAPJCJE8PjyoTv0y2fTpii', 'tasa@aa', 'string', 'string', '223', NULL, 1, 0, 5, '2022-06-23 21:07:37', '2022-06-23 21:07:37'),
(16, 'LA', 'LA', '$2b$10$4VVlzJ/Zz8zsxxMDp2Ie..8/BRHfybXXNRjWQIrQ1GD43VC/ZgiQq', 'LA@LA', 'LA', 'LA', '321', 'via zoom LA', 1, 0, 5, '2022-07-14 23:38:30', '2022-07-14 23:38:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `city` varchar(25) NOT NULL,
  `code_student` varchar(7) NOT NULL,
  `academic_program` int(5) NOT NULL,
  `semester` int(3) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `student`
--

INSERT INTO `student` (`id`, `nickname`, `name`, `password`, `email`, `phone`, `city`, `code_student`, `academic_program`, `semester`, `created_at`, `updated_at`) VALUES
(1, 'string', 'string', 'string', 'string', 'string', 'string', 'string', 1, 1, '2022-06-14 16:24:49', '2022-06-14 16:24:49'),
(15, 'stringfy', 'string', '$2b$10$WzP2IZmm14Zq7Zw7PsENSO6Z73Dgi9pqXFJ49OfUq8Ed1IT22liM6', 'string@string.es', 'string', 'string', '11', 1, 10, '2022-06-22 12:38:53', '2022-06-22 12:38:53'),
(16, 'Juan Pablo', 'JP', '$2b$10$x3czl2vly0D9S141sIXeP.UN20.43.dl9afog8DTTfri0SsaFZ0Xq', 'riveracepedabrayan@gmail.com', '000000', 'string', '13', 1, 10, '2022-07-14 22:54:08', '2022-07-14 22:54:08'),
(17, 'Juan Pablov', 'JP', '$2b$10$XDPVh/VIIdtX0RGDxkA4h.NuV8moMLIGqxd3KDB/nc.O6DmXqWNcq', 'JP@string.esp', '000000', 'string', '131', 1, 10, '2022-06-22 12:47:58', '2022-06-22 12:47:58'),
(18, 'yo', 'yo', '$2b$10$ubVwM42E6ct60tkQUjWNk.oK3LlmwkwXJNIiZppJgLkPg/q/dwBGC', 'ALESSIOCERCI23@hotmail.com', '369258147', 'manchester', '1312', 1, 9, '2022-07-14 19:46:00', '2022-07-14 19:46:00'),
(19, 'yo1', 'yo1', '$2b$10$UnXia1ABf7i952GTiz2gIeiaiLGZbcUTVtZafwE9UGNOdsXx0rzIW', 'yo1@string.esp', '000000', 'string', '13121', 1, 10, '2022-06-23 20:39:44', '2022-06-23 20:39:44'),
(20, 'yo1a', 'yo1', '$2b$10$5vhE7TOE.T7yGVOexcn9VOTlLSeMW.r2fsT1alf8sjPHYrUGMinEO', 'yo1@string.espa', '000000', 'string', '1312123', 1, 10, '2022-07-03 15:45:40', '2022-07-03 15:45:40'),
(21, 'yo1ab', 'yo1', '$2b$10$STSF55v.LGkjrdiIHkrISOdVvDLFynpfSKDq2a4RgB4gZhrG6kbY2', 'yo1@string.espaa', '000000', 'string', '13125', 1, 10, '2022-07-03 15:50:53', '2022-07-03 15:50:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `superuser`
--

CREATE TABLE `superuser` (
  `id` int(11) NOT NULL,
  `nickname` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `superuser`
--

INSERT INTO `superuser` (`id`, `nickname`, `password`, `created_at`, `updated_at`) VALUES
(1, 'cepe', 'cepe', '2022-06-23 06:28:40', '2022-06-23 06:28:40'),
(2, 'superior', '$2b$10$Bv5SzAstFb/EEh87Y60R3eCICh2F4.4/mmFgAm9Hg6NiScsHW4gka', '2022-06-23 11:44:13', '2022-06-23 11:44:13'),
(3, 'superior1', '$2b$10$Xx3ZDom.X8VO22Y9m8Noze6ChqciO9PCgNXKQY6Thsru4SezPo54u', '2022-06-23 11:50:12', '2022-06-23 11:50:12'),
(5, 'superior2', '$2b$10$IeNMhQkbKcmjKe9O8OBP7OoHS5BlMptdevjxl/TcqbUpm7JBG3RAW', '2022-06-23 12:29:12', '2022-06-23 12:29:12'),
(6, 'superior4', '$2b$10$tc2kD.PzwCx5GuU2gt0dRuAZ..Gmbsqy5ZBW9Kdsw044sOlQ/vsFa', '2022-06-23 13:08:48', '2022-06-23 13:08:48'),
(7, 'superior11', '$2b$10$Vkw6.6a6OmG/fXcckEFuXucX8VZa0I9FPGn65iU3r9xwBQqSEAEOG', '2022-06-23 20:38:36', '2022-06-23 20:38:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `video`
--

CREATE TABLE `video` (
  `id` int(11) NOT NULL,
  `description` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `url` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `video`
--

INSERT INTO `video` (`id`, `description`, `url`, `created_at`, `updated_at`) VALUES
(2, 'aaaaaaaaa', 'aaaaaaaaaaa', '2022-07-14 23:26:03', '2022-07-14 23:26:03'),
(3, 'bbbbbbbbb', 'bbbbbbbbbbbb', '2022-07-14 23:26:09', '2022-07-14 23:26:09'),
(4, 'ccccccc', 'cccccccccc', '2022-07-14 23:26:14', '2022-07-14 23:26:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `workshop`
--

CREATE TABLE `workshop` (
  `id` int(11) NOT NULL,
  `title` varchar(30) NOT NULL,
  `image` varchar(200) NOT NULL,
  `body` varchar(500) NOT NULL,
  `url` varchar(200) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `workshop`
--

INSERT INTO `workshop` (`id`, `title`, `image`, `body`, `url`, `created_at`, `updated_at`) VALUES
(1, 'Test para saber si necesito ir', 'https://www.psicoactiva.com/wp-content/uploads/2022/05/test-conocer-si-necesito-psicologo.png', 'El Cuestionario General de Salud GHQ-12 fue desarrollado por el profesor Sir David Paul Brandes Gold', NULL, '2022-06-10 03:07:31', '2022-06-10 03:07:31'),
(2, 'Test de Ecología de vida', 'https://www.psicoactiva.com/wp-content/uploads/2022/04/test-ecologia-de-vida-768x428.webp', 'La Ecología de vida es una herramienta diseñada por el terapéuta Vicens Olivé Pibernat, socio fundad', NULL, '2022-06-10 03:16:17', '2022-06-10 03:16:17'),
(3, 'Test de personalidad de cinco ', 'https://www.psicoactiva.com/wp-content/uploads/2019/05/test-de-personalidad-de-5-factores-768x264.jpg', 'La Personalidad es el conjunto de características, rasgos y cualidades con base genética, pero tambi', NULL, '2022-06-10 03:16:17', '2022-06-10 03:16:17'),
(4, 'Test de orientación profesiona', 'https://www.psicoactiva.com/wp-content/uploads/2019/05/test-orientacion-profesional-768x213.png', 'Este test de orientación profesional tiene como finalidad orientarte en la elección de tu futura pro', NULL, '2022-06-10 03:16:17', '2022-06-10 03:16:17'),
(5, 'Escala abreviada de sabiduría ', 'https://www.psicoactiva.com/wp-content/uploads/2021/12/escala-abreviada-de-sabiduria-de-san-diego-sd-wise-7-768x447.jpg', 'Este test ha sido desarrollado por un equipo multidisciplinar de la universidad de San Diego con el ', NULL, '2022-06-10 03:16:17', '2022-06-10 03:16:17'),
(6, 'Escala de sabiduría de San Die', 'https://www.psicoactiva.com/wp-content/uploads/2021/12/test-de-sabiduria-de-san-diego-sd-wise-768x432.jpg', 'A diferencia de la inteligencia general (CI), la sabiduría es un concepto superior que se refiere al', NULL, '2022-06-10 03:22:54', '2022-06-10 03:22:54'),
(7, 'Test de los intereses profesio', 'https://www.psicoactiva.com/wp-content/uploads/2021/11/test-orientacion-vocacional-holland-768x397.jpg', 'El test de los intereses profesionales de Holland se basa en el modelo tipológico desarrollado por e', NULL, '2022-06-10 03:22:54', '2022-06-10 03:22:54'),
(8, 'Test: Descubre cómo te ven los', 'https://www.psicoactiva.com/wp-content/uploads/2020/04/como-te-ven-los-demas-768x325.jpg', 'Este es un test que se utiliza habitualmente a nivel empresarial para conocer mejor a los empleados.', NULL, '2022-06-10 03:22:54', '2022-06-10 03:22:54'),
(9, 'Test de evaluación del éxito p', 'https://www.psicoactiva.com/wp-content/uploads/2020/04/test-del-logro-768x360.jpg', 'Las habilidades o competencias profesionales se están convirtiendo cada vez más en un factor determi', NULL, '2022-06-10 03:22:54', '2022-06-10 03:22:54'),
(10, 'Test de depresión confiable. E', 'https://www.psicoactiva.com/wp-content/uploads/2020/04/depresion-test-confiable-escala-de-zung-768x368.jpg', 'Existen más de 300 millones de personas con depresión en el mundo. Es la principal causa de discapac', NULL, '2022-06-10 03:22:54', '2022-06-10 03:22:54'),
(11, 'Test de memoria a corto plazo', 'https://www.psicoactiva.com/wp-content/uploads/2020/05/memoria-768x324.jpg', 'A continuación te presentamos un test que te permitirá evaluar tu memoria. El objetivo es memorizar ', NULL, '2022-06-10 03:44:03', '2022-06-10 03:44:03'),
(12, 'Test de inteligencia (CI) actu', 'https://www.psicoactiva.com/wp-content/uploads/2020/05/test-de-inteligencia-ci-actualizado-768x400.jpg', 'El siguiente test calcula una aproximación del Cociente Intelectual (CI) personal. La puntuación sól', NULL, '2022-06-10 03:44:03', '2022-06-10 03:44:03'),
(13, 'Test de autoconsciencia y auto', 'https://www.psicoactiva.com/wp-content/uploads/2020/03/test-de-autoconsciencia-768x354.jpg', 'En ocasiones no somos realmente conscientes de nosotros mismos, de nuestra existencia personal, nues', NULL, '2022-06-10 03:44:03', '2022-06-10 03:44:03'),
(14, 'Test para descubrir si tienes ', 'https://www.psicoactiva.com/wp-content/uploads/2021/07/test-buena-relacion-con-la-comida-768x443.jpg', 'Para algunas personas, la comida ocupa buena parte de sus pensamientos. Nos preocupa si nos hace sub', NULL, '2022-06-10 03:44:03', '2022-06-10 03:44:03'),
(15, 'Test de actitudes disfuncional', 'https://www.psicoactiva.com/wp-content/uploads/2020/04/test-de-actitudes-disfuncionales-de-weismman-768x413.png', 'Este test es el llamado \"Escala de actitudes disfuncionales de Weismman\", y mide cómo valora una per', NULL, '2022-06-10 03:44:03', '2022-06-10 03:44:03'),
(16, 'ejemplo', 'image.url', 'example !!', NULL, '2022-07-03 16:31:08', '2022-07-03 16:31:08'),
(19, 'ejemplo28', 'image.url', 'exampleee28!!', 'https://url28.com', '2022-07-14 23:30:04', '2022-07-14 23:30:04');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `frequent_questions`
--
ALTER TABLE `frequent_questions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `question` (`question`);

--
-- Indices de la tabla `medical_appointment`
--
ALTER TABLE `medical_appointment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `psycho_id` (`psycho_id`);

--
-- Indices de la tabla `psychology`
--
ALTER TABLE `psychology`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nickname` (`nickname`),
  ADD UNIQUE KEY `code_psychology` (`code_psychology`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nickname` (`nickname`),
  ADD UNIQUE KEY `code_student` (`code_student`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `superuser`
--
ALTER TABLE `superuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nickname` (`nickname`);

--
-- Indices de la tabla `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `workshop`
--
ALTER TABLE `workshop`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `frequent_questions`
--
ALTER TABLE `frequent_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `medical_appointment`
--
ALTER TABLE `medical_appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `psychology`
--
ALTER TABLE `psychology`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `superuser`
--
ALTER TABLE `superuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `video`
--
ALTER TABLE `video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `workshop`
--
ALTER TABLE `workshop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
