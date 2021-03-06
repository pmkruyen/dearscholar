# Copyright (c) 2020 P.M. Kruyen, Institute for Management Research, Radboud University, the Netherlands.

# MYSQL database initialization for DearScholar. Consult the installation instructions in the README file for details. In particular, the information about when Part 1 and Part 2 should be run during installation.

#---
# Part 2
#---

# MYSQL table setup (response tables)
# Warning: Set up these tables only after the questionTable has been populated. See samplestudy-part2.sql for a mock survey.
# Warning: When new questions are added to the questionTable afterwards (or question IDs have changed), add new response columns for these questions manually to the table.

# Code adapted from https://stackoverflow.com/users/833073/fthiella
# https://stackoverflow.com/questions/15820082/create-a-table-with-column-names-derived-from-row-values-of-another-table

CREATE TABLE IF NOT EXISTS responseTableModuleA (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timestamp` text COLLATE utf8mb4_unicode_ci,
  `surveydate` text COLLATE utf8mb4_unicode_ci)
   ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SELECT
  CONCAT(
    'ALTER TABLE responseTableModuleA ADD COLUMN (',
    GROUP_CONCAT(DISTINCT
      CONCAT(idq, ' TEXT')
      SEPARATOR ','),
    ');')
FROM
  questionTable WHERE module2 = 'A'
INTO @sql;

PREPARE stmt FROM @sql;
EXECUTE stmt;

CREATE TABLE IF NOT EXISTS responseTableModuleB (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timestamp` text COLLATE utf8mb4_unicode_ci,
  `surveydate` text COLLATE utf8mb4_unicode_ci)
   ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;;

SELECT
  CONCAT(
    'ALTER TABLE responseTableModuleB ADD COLUMN (',
    GROUP_CONCAT(DISTINCT
      CONCAT(idq, ' TEXT')
      SEPARATOR ','),
    ');')
FROM
  questionTable WHERE module2 = 'B'
INTO @sql;

PREPARE stmt FROM @sql;
EXECUTE stmt;

CREATE TABLE IF NOT EXISTS responseTableModuleC (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timestamp` text COLLATE utf8mb4_unicode_ci,
  `surveydate` text COLLATE utf8mb4_unicode_ci)
   ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;;

SELECT
  CONCAT(
    'ALTER TABLE responseTableModuleC ADD COLUMN (',
    GROUP_CONCAT(DISTINCT
      CONCAT(idq, ' TEXT')
      SEPARATOR ','),
    ');')
FROM
  questionTable WHERE module2 = 'C'
INTO @sql;

PREPARE stmt FROM @sql;
EXECUTE stmt;

CREATE TABLE IF NOT EXISTS responseTableModuleD (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timestamp` text COLLATE utf8mb4_unicode_ci,
  `surveydate` text COLLATE utf8mb4_unicode_ci)
   ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;;

SELECT
  CONCAT(
    'ALTER TABLE responseTableModuleD ADD COLUMN (',
    GROUP_CONCAT(DISTINCT
      CONCAT(idq, ' TEXT')
      SEPARATOR ','),
    ');')
FROM
  questionTable WHERE module2 = 'D'
INTO @sql;

PREPARE stmt FROM @sql;
EXECUTE stmt;

CREATE TABLE IF NOT EXISTS responseTableModuleE (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timestamp` text COLLATE utf8mb4_unicode_ci,
  `surveydate` text COLLATE utf8mb4_unicode_ci)
   ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;;

SELECT
  CONCAT(
    'ALTER TABLE responseTableModuleE ADD COLUMN (',
    GROUP_CONCAT(DISTINCT
      CONCAT(idq, ' TEXT')
      SEPARATOR ','),
    ');')
FROM
  questionTable WHERE module2 = 'E'
INTO @sql;

PREPARE stmt FROM @sql;
EXECUTE stmt;

CREATE TABLE IF NOT EXISTS responseTableModuleF (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timestamp` text COLLATE utf8mb4_unicode_ci,
  `surveydate` text COLLATE utf8mb4_unicode_ci)
   ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;;

SELECT
  CONCAT(
    'ALTER TABLE responseTableModuleF ADD COLUMN (',
    GROUP_CONCAT(DISTINCT
      CONCAT(idq, ' TEXT')
      SEPARATOR ','),
    ');')
FROM
  questionTable WHERE module2 = 'F'
INTO @sql;

PREPARE stmt FROM @sql;
EXECUTE stmt;

CREATE TABLE IF NOT EXISTS responseTableModuleG (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timestamp` text COLLATE utf8mb4_unicode_ci,
  `surveydate` text COLLATE utf8mb4_unicode_ci)
   ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;;

SELECT
  CONCAT(
    'ALTER TABLE responseTableModuleG ADD COLUMN (',
    GROUP_CONCAT(DISTINCT
      CONCAT(idq, ' TEXT')
      SEPARATOR ','),
    ');')
FROM
  questionTable WHERE module2 = 'G'
INTO @sql;

PREPARE stmt FROM @sql;
EXECUTE stmt;

#-----------------------
# MYSQL user management
#-----------------------

#-----------------------
#  SET PRIVILEGES FOR THE INDIVIDUAL RESEARCHER, FOR A SPECIFIED PROJECT
#-----------------------

SET @username='researcher';
SET @password='test';
SET @project='project';

SET @createUser = CONCAT
('
   CREATE USER "',@username,'"@"localhost" IDENTIFIED BY "',@password,'"'
);

PREPARE statement FROM @createUser;

EXECUTE statement;

DEALLOCATE PREPARE statement;

# TO MANIPULATE THE REGISTRATION OF RESPONDENTS
SET @query = CONCAT
('
  GRANT INSERT, SELECT, UPDATE ON respondents.authentication TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

# TO MANIPULATE  THE SURVEY SETUP
SET @query = CONCAT
('
  GRANT INSERT, SELECT, DELETE, UPDATE ON ',@project,'.surveyStructure TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT INSERT, SELECT, DELETE, UPDATE ON ',@project,'.moduleStructure TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT INSERT, SELECT, DELETE, UPDATE ON ',@project,'.pageStructure TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT INSERT, SELECT, DELETE, UPDATE ON ',@project,'.questionTable TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

# TO MANIPULATE THE MESSAGES TABLE
SET @query = CONCAT
('
  GRANT INSERT, SELECT, DELETE, UPDATE ON ',@project,'.messages TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

# TO VIEW THE RESULTS OF THE SURVEY
SET @query = CONCAT
('
  GRANT SELECT ON ',@project,'.responseTableModuleA TO "',@username,'"@"localhost"'

);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT SELECT ON ',@project,'.responseTableModuleB TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT SELECT ON ',@project,'.responseTableModuleC TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT SELECT ON ',@project,'.responseTableModuleD TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT SELECT ON ',@project,'.responseTableModuleE TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT SELECT ON ',@project,'.responseTableModuleF TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT SELECT ON ',@project,'.responseTableModuleG TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

# ---
# SET PRIVILEGES FOR THE APP, FOR A SPECIFIED PROJECT
# ---

SET @username='app';
SET @password='test';

SET @createUser = CONCAT
('
   CREATE USER "',@username,'"@"localhost" IDENTIFIED BY "',@password,'"'
);

PREPARE statement FROM @createUser;

EXECUTE statement;

DEALLOCATE PREPARE statement;

# TO VERIFY THE CREDENTIALS AND SET THE SETUP VALUE TO ONE (1)

SET @query = CONCAT
('
  GRANT SELECT, UPDATE ON respondents.authentication TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

# TO REGISTER THE DEVICE FOR RECEIVING PUSH NOTIFICATIONS (AND UPDATE WHEN APPLE OR ANDROID PROVIDES A NEW TOKEN

SET @query = CONCAT
('
  GRANT SELECT, UPDATE ON respondents.registration TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

# TO MANIPULATE THE PIN CODE

SET @query = CONCAT
('
  GRANT INSERT, SELECT, UPDATE ON ',@project,'.pintable TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

# READ THE SURVEY SETUP
SET @query = CONCAT
('
  GRANT SELECT ON ',@project,'.surveyStructure TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT SELECT ON ',@project,'.moduleStructure TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT SELECT ON ',@project,'.pageStructure TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT SELECT ON ',@project,'.questionTable TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

# READ MESSAGES AND SET THE READ VALUE TO ONE (1)

SET @query = CONCAT
('
  GRANT SELECT, UPDATE ON ',@project,'.messages TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

# INSERT (POST) THE DATA (SURVEY RESULTS)
SET @query = CONCAT
('
  GRANT INSERT ON ',@project,'.responseTableModuleA TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT INSERT ON ',@project,'.responseTableModuleB TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT INSERT ON ',@project,'.responseTableModuleC TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT INSERT ON ',@project,'.responseTableModuleD TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT INSERT ON ',@project,'.responseTableModuleE TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT INSERT ON ',@project,'.responseTableModuleF TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;

SET @query = CONCAT
('
  GRANT INSERT ON ',@project,'.responseTableModuleG TO "',@username,'"@"localhost"'
);

PREPARE statement FROM @query;

EXECUTE statement;

DEALLOCATE PREPARE statement;
