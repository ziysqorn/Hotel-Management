USE hotel_management
GO

CREATE PROCEDURE CreateUserForEmployee
    @EmployeeId INT
AS
BEGIN
    -- Kiểm tra xem EmployeeId đã tồn tại trong bảng Users chưa
    IF EXISTS (SELECT 1 FROM Users WHERE EmployeeId = @EmployeeId)
    BEGIN
        -- Nếu đã tồn tại, trả về một thông báo lỗi
        PRINT 'EmployeeId already exists';
        RETURN;
    END

    DECLARE @Password VARCHAR(100);
    
    -- Tạo mật khẩu dựa trên EmployeeId
    SET @Password = 'password' + CAST(@EmployeeId AS VARCHAR(10));
    
    -- Chèn dữ liệu vào bảng Users
    INSERT INTO Users (EmployeeId, Password)
    VALUES (@EmployeeId, @Password);
END;
GO
