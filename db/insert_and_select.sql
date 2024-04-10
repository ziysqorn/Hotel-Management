use hotel_management
GO

INSERT INTO Roles
    (Name, Description)
VALUES
    ('Admin', 'Administrator role'),
    ('User', 'Regular user role');
GO

INSERT INTO RoomType
    (Type,Price,description)
VALUES
    ('STD', 150000, 'Phòng Standard Cơ bản 1 giường đôi 1 nhà tắm'),
    ('SUP', 200000, 'Phòng Superior Cao cấp 2 giường đôi 1 nhà tắm,view tốt hơn '),
    ('DLX', 25000, 'Phòng Deluxe Cơ bản 2 giường đôi 1 nhà tắm,view tốt hơn '),
    ('SUT', 25000, 'Phòng Suite Cơ bản 2 giường đôi 1 nhà tắm,view tốt hơn ')
GO




INSERT INTO Room
    (RoomId,RoomTypeId,Status,Phone)
VALUES
    ('P101', 1, 0, '000000001'),
    ('P102', 1, 0, '000000001'),
    ('P103', 1, 0, '000000001'),
    ('P104', 1, 0, '000000001'),
    ('P105', 1, 0, '000000001'),
    ('P201', 2, 0, '000000002'),
    ('P202', 2, 0, '000000002'),
    ('P203', 2, 0, '000000002'),
    ('P204', 2, 0, '000000002'),
    ('P205', 2, 0, '000000002'),
    ('P301', 3, 0, '000000003'),
    ('P302', 3, 0, '000000003'),
    ('P303', 3, 0, '000000003'),
    ('P304', 3, 0, '000000003'),
    ('P305', 3, 0, '000000003'),
    ('P401', 4, 0, '000000004'),
    ('P402', 4, 0, '000000004'),
    ('P403', 4, 0, '000000004'),
    ('P404', 4, 0, '000000004'),
    ('P405', 4, 0, '000000004')
GO




INSERT INTO Service
    (Name, Price, Description)
VALUES
    (N'Cleaning Service', 50, N'Professional cleaning service for homes and offices'),
    (N'Gardening Service', 40, N'Professional gardening service for residential and commercial properties'),
    (N'Plumbing Service', 60, N'Professional plumbing service for residential and commercial properties');
GO

INSERT INTO Customer
    (FullName, PersonalId, Phone, Address, Type)
VALUES
    (N'John Doe', '123456789', '123-456-789', N'123 Main St, City, Country', 3),
    (N'Jane Smith', '987654321', '987-654-321', N'456 Elm St, City, Country', 3),
    (N'Michael Johnson', '555666777', '555-666-777', NULL, 3);
GO





INSERT INTO Employee
    ( FullName, PersonalId, Phone, BirthDay, FristDay, Address, position, RolesId)
VALUES
    (
        -- image (VARBINARY(MAX))
        'John Doe', -- FullName (NVARCHAR(100))
        '123456789', -- PersonalId (VARCHAR(100))
        '123-456-789', -- Phone (VARCHAR(100))
        '1980-01-01', -- BirthDay (DATETIME)
        '2020-01-01', -- FristDay (DATETIME)
        '123 Main St, City, Country', -- Address (NVARCHAR(100))
        'Manager', -- position (NVARCHAR(100))
        1 -- RolesId (INT)
    ),
    (
        'Jane Smith',
        '987654321',
        '987-654-321',
        '1985-05-15',
        '2021-03-01',
        '456 Elm St, City, Country',
        'Assistant Manager',
        2
    ),
    (
        'Michael Johnson',
        '555666777',
        '555-666-777',
        '1990-11-20',
        '2023-02-15',
        '789 Oak St, City, Country',
        'Staff',
        2
    );


INSERT INTO Users
    (EmployeeId, Password)
VALUES
    (1, 'password1'),
    (2, 'password2'),
    (3, 'password3');


INSERT INTO OrderRoom
    (CustomerId,StayCustomerId,UserId,RoomId,CheckInDate,ExpectedCHeckOutDate)
VALUES
    (1, 1, 1, 'P101', '2024-04-06', '2024-04-10'),
    (2, 2, 2, 'P102', '2024-04-06', '2024-04-11'),
    (3, 3, 1, 'P102', '2024-04-06', '2024-04-12')
GO

INSERT INTO UseService
    (CustomerId,UserId,ServiceId,CheckInDate)
VALUES
    (1, 1, 1, '2024-04-06'),
    (2, 2, 2, '2024-04-06'),
    (3, 1, 3, '2024-04-06')
GO

INSERT INTO Bill
    (CheckOutDate,CustomerId,UserId,Status,TotalPrice)
VALUES
    ('2024-04-10', 1, 1, 0, 900000),
    ('2024-04-11', 2, 1, 0, 1200000),
    ('2024-04-12', 3, 1, 0, 1500000)
GO

INSERT INTO ServiceForRoom
    (ServiceId,RoomTypeId)
VALUES
    (1,1),
    (1,2),
    (1,3),
    (2,1),
    (2,3)
GO


DELETE from Bill;
GO
DELETE from Customer;
GO



DELETE from Users;
GO

DELETE from Room
DELETE from RoomType
DELETE from Service





SELECT *
from Bill
