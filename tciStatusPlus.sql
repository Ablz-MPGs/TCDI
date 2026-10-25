-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 17/10/2026
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
-- Banco de dados: `tciStatus`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `ativas`
--

CREATE TABLE `ativas` (
  `id` int(11) NOT NULL,
  `id_especie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ativasEspecie`
--

CREATE TABLE `ativasEspecie` (
  `id` int(11) NOT NULL,
  `nome` int(255) NOT NULL,
  `imagem` varchar(255) NOT NULL,
  `descricao` varchar(510) NOT NULL,
  `id_ativa` int(11) NOT NULL,
  `recarga` int(11) NOT NULL,
  `efeito` varchar(255) NOT NULL,
  `dano` int(11) NOT NULL,
  `duracao` decimal(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `especies`
--

CREATE TABLE `especies` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `hp` int(11) NOT NULL,
  `dano` int(11) NOT NULL,
  `cw` int(11) NOT NULL,
  `velocidade` int(11) NOT NULL,
  `nado` int(11) NOT NULL,
  `voo` int(11) NOT NULL,
  `sangra` int(11) NOT NULL,
  `frat` int(11) NOT NULL,
  `crescimento` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `preco` int(11) NOT NULL,
  `idade` date NOT NULL,
  `skin1` int(11) NOT NULL,
  `skin2` int(11) NOT NULL,
  `avatar` int(11) NOT NULL,
  `slots` decimal(2,1) NOT NULL,
  `tier` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `especies`
--

INSERT INTO `especies` (`id`, `nome`, `hp`, `dano`, `cw`, `velocidade`, `nado`, `voo`, `sangra`, `frat`, `crescimento`, `code`, `preco`, `idade`, `skin1`, `skin2`, `avatar`, `slots`, `tier`) VALUES
(1, 'Allosaurus', 3365, 235, 135, 1540, 520, 0, 32, 0, 38, 'allo', 650, '2026-07-20', 0, 0, 300, 2.0, 3),
(2, 'Amargasaurus', 4000, 250, 150, 1400, 500, 0, 20, 5, 48, 'amarga', 120000, '2026-04-13', 0, 0, 0, 2.5, 4),
(3, 'Ankylosaurus', 4250, 340, 165, 1000, 400, 0, 0, 25, 48, 'anky', 135000, '2026-02-12', 12000, 0, 8000, 2.5, 5),
(4, 'Austroraptor', 1550, 150, 120, 1820, 760, 0, 18, 0, 24, 'austro', 28000, '2025-12-25', 15000, 195, 12000, 2.0, 2),
(5, 'Barbaridactylus', 1000, 120, 100, 1200, 600, 2800, 8, 0, 32, 'barba', 600, '2025-11-12', 20000, 200, 18000, 2.0, 1),
(6, 'Carnotaurus', 3170, 200, 135, 1800, 500, 0, 24, 0, 29, 'carno', 100000, '2025-10-09', 0, 0, 150, 2.0, 3),
(7, 'Ceratosaurus', 2650, 220, 120, 1700, 650, 0, 24, 0, 39, 'cera', 120000, '2025-08-12', 0, 0, 30000, 2.5, 3),
(8, 'Changyuraptor', 400, 60, 75, 2050, 280, 1750, 25, 0, 12, 'chang', 550, '2025-06-27', 25000, 150, 0, 1.0, 1),
(9, 'Cristatusaurus', 3770, 220, 145, 1425, 980, 0, 28, 0, 15, 'crista', 110000, '2025-05-08', 4000, 40, 0, 1.0, 4),
(10, 'Coelophysis', 550, 80, 75, 2050, 350, 0, 28, 0, 32, 'coelo', 0, '2025-05-08', 0, 0, 150, 2.0, 1),
(11, 'Concavenator', 2200, 140, 125, 1720, 630, 0, 25, 0, 42, 'conca', 280, '2025-04-02', 0, 225, 0, 3.0, 2),
(12, 'Deinocheirus', 4375, 250, 165, 1310, 800, 0, 28, 4, 48, 'pato', 800, '2025-02-03', 6500, 50, 0, 1.5, 5),
(13, 'Deinonychus', 850, 120, 95, 1900, 400, 0, 21, 0, 18, 'deino', 0, '2025-02-03', 18000, 180, 120, 2.0, 1),
(14, 'Dilophosaurus', 1800, 160, 120, 1750, 550, 0, 33, 0, 28, 'dilo', 32000, '2024-11-20', 0, 160, 15000, 2.0, 2),
(15, 'Fasolasuchus', 3000, 245, 125, 1500, 625, 0, 12, 15, 30, 'fasola', 500, '2024-11-04', 40000, 300, 40000, 3.0, 3),
(16, 'Giganotosaurus', 4450, 280, 175, 1300, 550, 0, 34, 3, 48, 'giga', 145000, '2024-11-04', 0, 0, 15000, 2.0, 5),
(17, 'Gigantoraptor', 3320, 180, 135, 1700, 480, 0, 15, 0, 28, 'giganto', 55000, '2024-09-27', 8000, 50, 3000, 1.5, 3),
(18, 'Guanlong', 1150, 120, 100, 1880, 500, 0, 24, 0, 39, 'guan', 180, '2024-09-14', 12000, 120, 10000, 2.0, 1),
(19, 'Kentrosaurus', 2700, 250, 150, 1480, 500, 0, 30, 0, 39, 'kentro', 30000, '2024-06-01', 40000, 450, 2000, 2.5, 3),
(20, 'Megaraptor', 2745, 245, 130, 1660, 550, 0, 25, 0, 38, 'mega', 600, '2024-05-22', 5500, 40, 0, 1.0, 3),
(21, 'Ornithomimus', 1200, 100, 90, 2000, 450, 0, 11, 0, 17, 'orni', 0, '2024-03-30', 6000, 80, 5000, 2.0, 1),
(22, 'Pachycephalosaurus', 2000, 185, 110, 1650, 400, 0, 0, 14, 28, 'pachy', 8000, '2024-03-30', 18000, 150, 7000, 2.0, 2),
(23, 'Pachyrhinosaurus', 3600, 250, 150, 1400, 500, 0, 0, 13, 36, 'rhino', 75000, '2024-03-30', 10000, 120, 0, 2.0, 4),
(24, 'Parasaurolophus', 3720, 200, 155, 1500, 500, 0, 0, 9, 29, 'para', 32000, '2024-03-06', 0, 0, 0, 2.0, 4),
(25, 'Psittacosaurus', 980, 110, 100, 1880, 400, 0, 14, 0, 20, 'psitta', 5000, '2024-03-06', 8500, 70, 70, 1.0, 1),
(26, 'Plateosaurus', 3450, 180, 150, 1500, 700, 0, 10, 0, 31, 'plateo', 20500, '2024-02-14', 0, 0, 15000, 3.0, 4),
(27, 'Quetzalcoatlus', 1800, 160, 115, 1400, 600, 2200, 9, 0, 41, 'quetzal', 125000, '2024-02-14', 0, 0, 250, 2.5, 2),
(28, 'Sarcosuchus', 4650, 300, 150, 1100, 2100, 0, 21, 11, 48, 'sarco', 650, '2024-01-25', 50000, 300, 22000, 3.0, 4),
(29, 'Spinosaurus', 4495, 265, 175, 1250, 1250, 0, 29, 1, 48, 'spino', 150000, '2024-01-25', 18000, 120, 60, 3.0, 5),
(30, 'Stegosaurus', 3900, 325, 150, 1310, 500, 0, 22, 10, 48, 'stego', 100000, '2024-01-13', 25000, 250, 10000, 2.0, 4),
(31, 'Styracosaurus', 2925, 235, 140, 1490, 500, 0, 27, 0, 39, 'styra', 55000, '2023-12-21', 0, 0, 15000, 2.5, 3),
(32, 'Therizinosaurus', 3830, 305, 150, 1380, 450, 0, 23, 0, 48, 'theri', 150000, '2023-12-21', 0, 0, 0, 2.5, 4),
(33, 'Triceratops', 4875, 270, 175, 1265, 450, 0, 22, 5, 48, 'trice', 110000, '2023-12-21', 30000, 300, 20000, 3.0, 5),
(34, 'Tyrannosaurus', 4560, 340, 175, 1285, 450, 0, 4, 22, 52, 'trex', 800, '2023-11-30', 40000, 450, 200, 3.0, 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `passivas`
--

CREATE TABLE `passivas` (
  `id` int(11) NOT NULL,
  `id_especie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `passivasEspecie`
--

CREATE TABLE `passivasEspecie` (
  `id` int(11) NOT NULL,
  `nome` int(11) NOT NULL,
  `efeito` int(11) NOT NULL,
  `descricao` int(11) NOT NULL,
  `duracao` decimal(4,2) NOT NULL,
  `recarga` int(11) NOT NULL,
  `id_passiva` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `ativas`
--
ALTER TABLE `ativas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `ativasEspecie`
--
ALTER TABLE `ativasEspecie`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `especies`
--
ALTER TABLE `especies`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `passivas`
--
ALTER TABLE `passivas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `passivasEspecie`
--
ALTER TABLE `passivasEspecie`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `ativas`
--
ALTER TABLE `ativas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `ativasEspecie`
--
ALTER TABLE `ativasEspecie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `especies`
--
ALTER TABLE `especies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de tabela `passivas`
--
ALTER TABLE `passivas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `passivasEspecie`
--
ALTER TABLE `passivasEspecie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `ativas`
--
ALTER TABLE `ativas`
  ADD CONSTRAINT `ativas_ibfk_1` FOREIGN KEY (`id`) REFERENCES `ativasEspecie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `passivas`
--
ALTER TABLE `passivas`
  ADD CONSTRAINT `passivas_ibfk_1` FOREIGN KEY (`id`) REFERENCES `passivasEspecie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

--
-- Comando utilizado para importar via LOAD DATA LOCAL INFILE:
--
-- LOAD DATA LOCAL INFILE '/home/asiury/Downloads/TCIstaus - Página1.csv'
-- INTO TABLE especies
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\r\n'
-- IGNORE 1 ROWS
-- (nome, hp, dano, cw, velocidade, nado, voo, sangra, frat, tier, crescimento, code, @preco_bruto, @idade_bruta, @skin1, @skin2, slots, @avatar)
-- SET 
--     preco = CAST(REGEXP_REPLACE(@preco_bruto, '[^0-9]', '') AS UNSIGNED),
--     idade = STR_TO_DATE(REPLACE(@idade_bruta, ' / ', '/'), '%d/%m/%Y'),
--     skin1 = IF(@skin1 = '' OR @skin1 IS NULL, 0, @skin1),
--     skin2 = IF(@skin2 = '' OR @skin2 IS NULL, 0, @skin2),
--     avatar = IF(@avatar = '' OR @avatar IS NULL, 0, @avatar);
