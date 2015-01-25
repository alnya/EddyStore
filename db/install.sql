CREATE USER 'EddyStore'@'localhost' IDENTIFIED BY 'XEFQ12ab';
GRANT ALL PRIVILEGES ON *.* TO 'EddyStore'@'localhost' WITH GRANT OPTION;
CREATE USER 'EddyStore'@'%' IDENTIFIED BY 'XEFQ12ab';
GRANT ALL PRIVILEGES ON *.* TO 'EddyStore'@'%' WITH GRANT OPTION;

CREATE DATABASE EddyStore;

CREATE TABLE `metadata` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `Timestamp_Refers_To` tinyint(4) NOT NULL DEFAULT '0',
  `File_Duration` int(11) NOT NULL,
  `Acquisition_Frequency` int(11) NOT NULL,
  `Canopy_Height` decimal(10,0) NOT NULL,
  `Displacement_Height` decimal(10,0) NOT NULL,
  `Roughness_Length` decimal(10,0) NOT NULL,
  `Altitude` decimal(10,0) NOT NULL,
  `Latitude` decimal(10,0) NOT NULL,
  `Longitude` decimal(10,0) NOT NULL,
  `Created` datetime NOT NULL,
  `CreatedBy` varchar(45) NOT NULL,
  `Field_Separator_Character` char(1) DEFAULT NULL,
  `Number_Of_Header_Rows` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `metadata_instrument` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `Metadata_Id` int(10) NOT NULL,
  `Instrument_Type` tinyint(4) NOT NULL,
  `Manufacturer` varchar(45) NOT NULL,
  `Model` varchar(45) NOT NULL,
  `Instrument_Id` varchar(45) DEFAULT NULL,
  `Height` decimal(10,0) DEFAULT NULL,
  `Wind_Data_Format` char(1) DEFAULT NULL,
  `North_Alignment` tinyint(4) DEFAULT NULL,
  `North_Offset` varchar(45) DEFAULT NULL,
  `Northward_Separation` decimal(10,0) DEFAULT NULL,
  `Eastward_Separation` decimal(10,0) DEFAULT NULL,
  `Vertical_Separation` decimal(10,0) DEFAULT NULL,
  `Longitudinal_Path_Length` decimal(10,0) DEFAULT NULL,
  `Transversal_Path_Length` decimal(10,0) DEFAULT NULL,
  `Tube_Length` decimal(10,0) DEFAULT NULL,
  `Tube_Inner_Diameter` decimal(10,0) DEFAULT NULL,
  `Nominal_Tube_Flow_Rate` varchar(45) DEFAULT NULL,
  `Extinction_Coefficient_In_Water_KW` varchar(45) DEFAULT NULL,
  `Extinction_Coefficient_In_Water_KO` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (Metadata_Id) REFERENCES metadata(id)
);

CREATE TABLE `metadata_column` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `Metadata_Id` int(10) NOT NULL,
  `Metadata_Instrument_Id` int(10) NOT NULL,
  `Column_Number` int(11) NOT NULL,
  `Ignore` tinyint(4) NOT NULL DEFAULT '0',
  `Numeric` tinyint(4) NOT NULL DEFAULT '0',
  `Variable` varchar(45) DEFAULT NULL,
  `Measurement_Type` varchar(45) DEFAULT NULL,
  `Input_Unit` varchar(45) DEFAULT NULL,
  `Linear_Scaling` varchar(45) DEFAULT NULL,
  `Output_Unit` varchar(45) DEFAULT NULL,
  `Gain_Value` varchar(45) DEFAULT NULL,
  `Offset_Value` varchar(45) DEFAULT NULL,
  `Nominal_Time_Lag` decimal(10,0) DEFAULT NULL,
  `Minimum_Time_Lag` decimal(10,0) DEFAULT NULL,
  `Maximum_Time_Lag` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (Metadata_Id) REFERENCES metadata(id),
  FOREIGN KEY (Metadata_Instrument_Id) REFERENCES metadata_instrument(id)
);

CREATE TABLE `system_user` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
);


