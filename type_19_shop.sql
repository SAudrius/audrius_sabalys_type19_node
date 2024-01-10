-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 10, 2024 at 01:23 AM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `type_19_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `item_types`
--

CREATE TABLE `item_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `item_types`
--

INSERT INTO `item_types` (`id`, `name`) VALUES
(1, 'Food'),
(2, 'Clothing'),
(3, 'Sports'),
(4, 'Electronics');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `shop_item_id` int(10) UNSIGNED NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `shop_item_id`, `quantity`, `total_price`, `status`) VALUES
(1, 1, 1, 1, '299.00', 0),
(2, 1, 1, 1, '299.00', 0),
(3, 1, 1, 1, '299.00', 0),
(4, 1, 1, 1, '299.00', 0),
(5, 2, 1, 1, '299.00', 0),
(6, 2, 1, 1, '299.00', 0),
(7, 3, 7, 1, '2.90', 0),
(8, 3, 6, 1, '40.00', 0),
(9, 1, 5, 1, '2.22', 0),
(10, 3, 8, 1, '15.00', 0),
(11, 3, 1, 1, '299.00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `shop_items`
--

CREATE TABLE `shop_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `item_type_id` int(10) UNSIGNED NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shop_items`
--

INSERT INTO `shop_items` (`id`, `name`, `price`, `description`, `image`, `item_type_id`, `is_deleted`) VALUES
(1, 'Snow board', '299.00', 'Sturdy, lightweight snowboard featuring dynamic flex, advanced grip control, enhanced turn initiation, with a sleek design for superior performance on slopes.', 'https://picsum.photos/seed/picsum/200/300', 3, 0),
(2, 'Snow skies', '150.00', 'Premium skies designed for exhilarating fun, featuring durable construction, smooth gliding performance, precise control, and eye-catching designs for an unforgettable sliding experience.', 'https://picsum.photos/seed/picsum/200/300', 3, 1),
(3, 'Snow suite', '75.00', 'Premium suite designed for exhilarating fun, featuring durable construction, smooth gliding performance, precise control, and eye-catching designs for an unforgettable sliding experience.', 'https://picsum.photos/seed/picsum/200/300', 3, 0),
(4, 'Apple', '1.00', 'Premium Apple', 'https://picsum.photos/seed/picsum/200/300', 1, 0),
(5, 'Kit Kat', '2.22', 'Kit Kat tasty like ..', 'https://picsum.photos/seed/picsum/200/300', 1, 0),
(6, 'Snow bag', '40.00', 'Premium bag designed for exhilarating fun, featuring durable construction, smooth gliding performance, precise control, and eye-catching designs for an unforgettable sliding experience.', 'https://picsum.photos/seed/picsum/200/300', 1, 0),
(7, 'Potato Bag', '2.90', 'Premium bag', 'https://picsum.photos/seed/picsum/200/300', 1, 0),
(8, 'Book', '15.00', 'Premium Book', 'https://picsum.photos/seed/picsum/200/300', 1, 0),
(9, 'Kit Kat', '1.99', 'Very tasty snak', 'https://picsum.photos/seed/picsum/200/300', 1, 0),
(10, 'hot dog', '1.00', 'Tasty food', 'https://picsum.photos/seed/picsum/200/300', 1, 0),
(11, 'SUPER ITEM', '10.99', 'Super item .....', 'https://picsum.photos/23/picsum/200/300', 3, 0),
(12, 'Iphone 0', '0.99', 'Viskas pavargau... ', 'https://picsum.photos/seed/picsum/200/300', 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role_id`) VALUES
(1, 'John Snow', 'john@snow.com', '$2b$10$pOw3.ND8yUgS8wmOQKUkxOnGc4PJqk4jNE8zpg0bzeUIWzg/sNjF6', 1),
(2, 'Tom', 'tom@jerry.com', '$2b$10$xbYTZzomq9pHDlXjTHwS7uUvzYUbchbFCOm.EpHsjwjYb2NlTG5oy', 2),
(3, 'Verstapen', 'guest@example.com', '$2b$10$3EJDThxwmvhbJ9u9C4q8P.uoK.oTvZ0Z7UpZ0i3V6U5P6qnAuNEY6', 3),
(7, 'Jordon', 'example23@example.com', '$2b$10$5RtOe3cDcsjnV6PQeNOAauUJ1TiIi0VXYixb5qG9VUzhmIpMZAobC', 1),
(8, 'Foo', 'guest@guest.com', '$2b$10$c.e2VnvA4G7TJX3PIdMEMeNLANogZH1AahSePQmokdCr1JqoWuzCK', 2),
(9, 'Jonas', 'Jonas@gmail.com', '$2b$10$YyMHwwRDDBrEI/fCZhAVuu3kmS4zZVAoy4K0G1ZvcBKh33utjBvty', 1),
(10, 'Audrius', 'FooBar@example.com', '$2b$10$4zZ.A.D2Z/1ognx58AQD/uuHihfa3RfOy/9kNw0EFdtpVzLLWES1G', 1),
(11, 'Kobe', 'kobe@rip.com', '$2b$10$sKo4v7fZAHSqV0YBovAQnucAFbPLQn1pUtF5/6W.slT3WeyrqXep6', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users_roles`
--

CREATE TABLE `users_roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_roles`
--

INSERT INTO `users_roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'guest');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `item_types`
--
ALTER TABLE `item_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id to users id` (`user_id`),
  ADD KEY `shop_item_id to shop_items id` (`shop_item_id`);

--
-- Indexes for table `shop_items`
--
ALTER TABLE `shop_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_types_id to item_types id` (`item_type_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id to roles table id` (`role_id`);

--
-- Indexes for table `users_roles`
--
ALTER TABLE `users_roles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `item_types`
--
ALTER TABLE `item_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `shop_items`
--
ALTER TABLE `shop_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users_roles`
--
ALTER TABLE `users_roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `shop_item_id to shop_items id` FOREIGN KEY (`shop_item_id`) REFERENCES `shop_items` (`id`),
  ADD CONSTRAINT `user_id to users id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `shop_items`
--
ALTER TABLE `shop_items`
  ADD CONSTRAINT `item_types_id to item_types id` FOREIGN KEY (`item_type_id`) REFERENCES `item_types` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `role_id to roles table id` FOREIGN KEY (`role_id`) REFERENCES `users_roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
