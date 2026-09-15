-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 16/09/2026 às 01:11
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `tcdiDinoInfo`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `statusDino`
--

CREATE TABLE `statusDino` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `vigor` decimal(5,2) DEFAULT NULL,
  `regemVigor` decimal(5,2) DEFAULT NULL,
  `vigorAgua` decimal(5,2) DEFAULT NULL,
  `vigorAr` decimal(5,2) DEFAULT NULL,
  `regemVida` int(11) DEFAULT NULL,
  `fome` decimal(5,2) DEFAULT NULL,
  `sede` decimal(5,2) DEFAULT NULL,
  `oxigenio` decimal(5,2) DEFAULT NULL,
  `ovo` int(11) DEFAULT NULL,
  `ovoTempo` decimal(5,2) DEFAULT NULL,
  `estomago` int(11) DEFAULT NULL,
  `trote` decimal(5,2) DEFAULT NULL,
  `sono` decimal(5,2) DEFAULT NULL,
  `sonoRegem` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `statusDino`
--

INSERT INTO `statusDino` (`id`, `nome`, `vigor`, `regemVigor`, `vigorAgua`, `vigorAr`, `regemVida`, `fome`, `sede`, `oxigenio`, `ovo`, `ovoTempo`, `estomago`, `trote`, `sono`, `sonoRegem`) VALUES
(1, 'coelo', 1.54, 1.20, 1.38, NULL, 8, 12.23, 30.30, 0.13, 10, 0.50, 59, 2.12, 11.31, 1.24),
(2, 'pachy', 1.54, 1.18, 1.39, NULL, 30, 18.45, 0.06, 0.14, 20, 1.20, 100, 1.28, 11.32, 1.23),
(3, 'pato', 1.20, 1.51, 3.23, NULL, 66, 30.27, 9.33, 1.06, 66, 36.36, 200, 1.00, 11.30, 1.23),
(4, 'cera', 1.20, NULL, 1.07, NULL, 40, 18.14, 7.50, 0.11, 61, 6.15, 86, 1.06, 8.38, 1.04),
(5, 'giga', 2.03, 1.02, 0.54, NULL, 67, 22.50, 13.40, 0.11, 80, 7.30, 286, 0.48, 8.35, 1.04),
(6, 'austro', 1.27, 1.00, 2.07, NULL, 23, 13.03, 10.40, 0.20, 26, 1.42, 77, 1.22, 8.40, 0.45),
(7, 'trice', 1.23, 1.20, 1.10, NULL, NULL, NULL, 19.37, 0.16, NULL, 5.42, NULL, NULL, 11.33, 1.25);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `statusDino`
--
ALTER TABLE `statusDino`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `statusDino`
--
ALTER TABLE `statusDino`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
