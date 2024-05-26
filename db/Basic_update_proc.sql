-- Procedure to update customers
CREATE PROCEDURE UpdateCustomer 
    @id INT,
    @name NVARCHAR(50),
    @phone_number VARCHAR(10),
    @address NVARCHAR(50)
AS
BEGIN
    UPDATE customers
    SET 
        name = @name,
        phone_number = @phone_number,
        address = @address,
        updateAt = GETDATE()
    WHERE id = @id;
END;
GO

-- Procedure to update suppliers
CREATE PROCEDURE UpdateSupplier 
    @id INT,
    @name NVARCHAR(50),
    @phone_number VARCHAR(10),
    @address NVARCHAR(50)
AS
BEGIN
    UPDATE suppliers
    SET 
        name = @name,
        phone_number = @phone_number,
        address = @address,
        updateAt = GETDATE()
    WHERE id = @id;
END;
GO

-- Procedure to update brands
CREATE PROCEDURE UpdateBrand 
    @id INT,
    @name NVARCHAR(50)
AS
BEGIN
    UPDATE brands
    SET 
        name = @name,
        updateAt = GETDATE()
    WHERE id = @id;
END;
GO

-- Procedure to update categories
CREATE PROCEDURE UpdateCategory 
    @id INT,
    @name NVARCHAR(50)
AS
BEGIN
    UPDATE categories
    SET 
        name = @name,
        updateAt = GETDATE()
    WHERE id = @id;
END;
GO

-- Procedure to update warehouse
CREATE PROCEDURE UpdateWarehouse 
    @id INT,
    @name NVARCHAR(50),
    @address NVARCHAR(50)
AS
BEGIN
    UPDATE warehouse
    SET 
        name = @name,
        address = @address,
        updateAt = GETDATE()
    WHERE id = @id;
END;
GO

-- Procedure to update shipping_units
CREATE PROCEDURE UpdateShippingUnit 
    @id INT,
    @name NVARCHAR(50),
    @cost DECIMAL(18, 2),
    @method BIT
AS
BEGIN
    UPDATE shipping_units
    SET 
        name = @name,
        cost = @cost,
        method = @method,
        updateAt = GETDATE()
    WHERE id = @id;
END;
GO

-- Procedure to update products
CREATE PROCEDURE UpdateProduct 
    @id INT,
    @name NVARCHAR(50),
    @unit_price DECIMAL(18, 2),
    @state BIT,
    @warranty_period NVARCHAR(10),
    @description NVARCHAR(MAX),
    @supplier_id INT,
    @brand_id INT,
    @category_id INT
AS
BEGIN
    UPDATE products
    SET 
        name = @name,
        unit_price = @unit_price,
        state = @state,
        warranty_period = @warranty_period,
        description = @description,
        supplier_id = @supplier_id,
        brand_id = @
