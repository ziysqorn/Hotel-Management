CREATE DATABASE hotel_management
Drop DATABASE hotel_management

GO
USE hotel_management
GO


CREATE TABLE Roles
(
    RolesId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    DESCRIPTION NVARCHAR(100) NOT NULL
)
GO

CREATE TABLE Employee
(
    EmployeeId INT IDENTITY(1,1) PRIMARY KEY,
    image VARBINARY(MAX),
    FullName NVARCHAR(100) NOT NULL,
    PersonalId VARCHAR(100) NOT NULL,
    Phone VARCHAR(100) NOT NULL,
    BirthDay DATETIME NOT NULL,
    FristDay DATETIME NOT NULL,
    Address NVARCHAR(100) NOT NULL,
    position NVARCHAR(100) NOT NULL,
    RolesId INT NOT NULL,
    FOREIGN KEY (RolesId) REFERENCES Roles(RolesId)
)
GO


CREATE TABLE Customer
(
    CustomerId INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
<<<<<<< HEAD
    PersonalId VARCHAR(100) UNIQUE NOT NULL,
    Phone VARCHAR(100) NOT NULL,
=======
    PersonalId VARCHAR(100) NOT NULL,
    Phone VARCHAR(100) ,
>>>>>>> Hung
    Address NVARCHAR(255),
    Type INT NOT NULL
)
GO




CREATE TABLE Users
(
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeId INT NOT NULL,
    Password VARCHAR(100) NOT NULL,
    FOREIGN KEY (EmployeeId) REFERENCES Employee(EmployeeId),
)
GO


CREATE TABLE Service
(
    ServiceId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Price INT NOT NULL,
    Description NVARCHAR(100) NOT NULL
)
GO

CREATE TABLE UseService
(
    ServiceId INT NOT NULL,
    CustomerId INT NOT NULL,
    UserId INT NOT NULL,
    CheckInDate DATETIME NOT NULL,
    FOREIGN KEY (ServiceId) REFERENCES Service(ServiceId),
    FOREIGN KEY (CustomerId) REFERENCES Customer(CustomerId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
)
Go




CREATE TABLE RoomType
(
    RoomTypeId INT IDENTITY(1,1) PRIMARY KEY,
    Type NVARCHAR(255) NOT NULL,
    Price INT NOT NULL,
    Description NVARCHAR(MAX) NOT NULL
)
GO

CREATE TABLE Room
(
    RoomId VARCHAR(100) PRIMARY KEY,
    RoomTypeId INT NOT NULL,
    Status bit NOT NULL,
    Phone VARCHAR(100) NOT NULL,
    FOREIGN KEY (RoomTypeId) REFERENCES RoomType(RoomTypeId)
)
go


CREATE TABLE OrderRoom
(
    CustomerId INT NOT NULL,
    StayCustomerId INT NOT NULL,
    UserId INT NOT NULL,
    RoomId VARCHAR(100) NOT NULL,
    CheckInDate DATETIME NOT NULL,
    ExpectedCHeckOutDate DATETIME NOT NULL,
    FOREIGN KEY (CustomerId) REFERENCES Customer(CustomerId),
    FOREIGN KEY (StayCustomerId) REFERENCES Customer(CustomerId),
    FOREIGN KEY (RoomId) REFERENCES Room(RoomId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
)
GO


CREATE TABLE Bill
(
    BillId INT IDENTITY(1,1) PRIMARY KEY,
    CheckOutDate DATETIME NOT NULL,
    CustomerId INT NOT NULL,
    UserId INT NOT NULL,
    Status BIT NOT NULL,
    TotalPrice INT NOT NULL,
    FOREIGN KEY (CustomerId) REFERENCES Customer(CustomerId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
)
GO

CREATE TABLE ServiceForRoom
(
    ServiceId INT NOT NULL,
    RoomTypeId INT NOT NULL,
    FOREIGN KEY (ServiceId) REFERENCES Service(ServiceId),
    FOREIGN KEY (RoomTypeId) REFERENCES RoomType(RoomTypeId),
)
GO



<<<<<<< HEAD
=======
ALTER TABLE Customer
ADD COLUMN Type INT NOT NULL;
GO 
>>>>>>> Hung
