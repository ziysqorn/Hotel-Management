USE hotel_management

-- auto set password cho user = password + id
CREATE PROCEDURE CreateUserForEmployee
    @EmployeeId INT
AS
BEGIN
    DECLARE @Password VARCHAR(100);
    
    -- Tạo mật khẩu dựa trên EmployeeId
    SET @Password = 'password' + CAST(@EmployeeId AS VARCHAR(10));
    
    -- Chèn dữ liệu vào bảng Users
    INSERT INTO Users (EmployeeId, Password)
    VALUES (@EmployeeId, @Password);
END;
GO
