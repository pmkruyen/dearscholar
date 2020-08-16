# Copyright (c) 2020 P.M. Kruyen, Institute for Management Research, Radboud University, the Netherlands.

# MYSQL database initialization for DearScholar. Consult the installation instructions in the README file for details. In particular, the information about when Part 1 and Part 2 should be run during installation.

#---
# Part 1
#---

# MYSQL database setup for respondents

CREATE DATABASE IF NOT EXISTS respondents
	 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# MYSQL table setup (for managing respondents and sending push notifications)

USE respondents;

CREATE TABLE `authentication` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pwd` text COLLATE utf8mb4_unicode_ci,
  `project` text COLLATE utf8mb4_unicode_ci,
  `setup` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `q0_startdate` text COLLATE utf8mb4_unicode_ci,
  `q0_occasions` text COLLATE utf8mb4_unicode_ci,
  `q0_intervaltype` text COLLATE utf8mb4_unicode_ci,
  `q0_interval` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `registration` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `project` text COLLATE utf8mb4_unicode_ci,
  `uname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

# MYSQL database setup for the project.
# Note, if you want to run multiple projects, you can run the code below multiple times, but do not forget to change the database name.

CREATE DATABASE IF NOT EXISTS project
	 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# MYSQL table setup for the project.

USE project;

CREATE TABLE `pintable` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pin` text COLLATE utf8mb4_unicode_ci,
  `code` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `surveyStructure` (
  `consent` text COLLATE utf8mb4_unicode_ci,
  `manual` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `moduleStructure` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `module0` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `page` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mandatory` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` text COLLATE utf8mb4_unicode_ci,
  `imageleft` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imagetop` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `pageStructure` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `module1` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `classp` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `idp` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `header` text CHARACTER SET utf8,
  `backbuttonid` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `backbuttontext` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `backbuttononclick` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `backbuttonhref` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `nextbuttonid` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `nextbuttontext` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `nextbuttononclick` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `nextbuttonhref` varchar(100) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `questionTable` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `module2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tab` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idq` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `question` text COLLATE utf8mb4_unicode_ci,
  `categories` text COLLATE utf8mb4_unicode_ci,
  `footer` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

# MYSQL table setup (in app messages)

CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timestamp` text COLLATE utf8mb4_unicode_ci,
  `message` text COLLATE utf8mb4_unicode_ci,
  `seen` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
