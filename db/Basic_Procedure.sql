CREATE PROCEDURE AddCustomer 
    @name NVARCHAR(50),
    @phone_number VARCHAR(10),
    @address NVARCHAR(50)
AS
BEGIN
    INSERT INTO customers (name, phone_number, address)
    VALUES (@name, @phone_number, @address);
END;
GO

CREATE PROCEDURE AddSupplier 
    @name NVARCHAR(50),
    @phone_number VARCHAR(10),
    @address NVARCHAR(50)
AS
BEGIN
    INSERT INTO suppliers (name, phone_number, address)
    VALUES (@name, @phone_number, @address);
END;
GO

CREATE PROCEDURE AddBrand 
    @name NVARCHAR(50)
AS
BEGIN
    INSERT INTO brands (name)
    VALUES (@name);
END;
GO

CREATE PROCEDURE AddCategory 
    @name NVARCHAR(50)
AS
BEGIN
    INSERT INTO categories (name)
    VALUES (@name);
END;
GO

CREATE PROCEDURE AddWarehouse 
    @name NVARCHAR(50),
    @address NVARCHAR(50)
AS
BEGIN
    INSERT INTO warehouse (name, address)
    VALUES (@name, @address);
END;
GO

CREATE PROCEDURE AddShippingUnit 
    @name NVARCHAR(50),
    @cost DECIMAL(18, 2),
    @method BIT
AS
BEGIN
    INSERT INTO shipping_units (name, cost, method)
    VALUES (@name, @cost, @method);
END;
GO

CREATE PROCEDURE AddProduct 
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
    INSERT INTO products (name, unit_price, state, warranty_period, description, supplier_id, brand_id, category_id)
    VALUES (@name, @unit_price, @state, @warranty_period, @description, @supplier_id, @brand_id, @category_id);
END;
GO

CREATE PROCEDURE AddProductImage 
    @image NVARCHAR(MAX),
    @product_id INT
AS
BEGIN
    INSERT INTO product_images (image, product_id)
    VALUES (@image, @product_id);
END;
GO

CREATE PROCEDURE AddOrder 
    @state BIT,
    @delivery_date DATE,
    @customer_id INT,
    @shipping_unit_id INT
AS
BEGIN
    INSERT INTO orders (state, delivery_date, customer_id, shipping_unit_id)
    VALUES (@state, @delivery_date, @customer_id, @shipping_unit_id);
END;
GO

CREATE PROCEDURE AddPromotion 
    @name NVARCHAR(50),
    @accompanying_gifts NVARCHAR(50),
    @order_id INT
AS
BEGIN
    INSERT INTO promotions (name, accompanying_gifts, order_id)
    VALUES (@name, @accompanying_gifts, @order_id);
END;
GO

CREATE PROCEDURE AddComment 
    @date_created DATE,
    @content NVARCHAR(MAX),
    @product_id INT,
    @customer_id INT
AS
BEGIN
    INSERT INTO comments (date_created, content, product_id, customer_id)
    VALUES (@date_created, @content, @product_id, @customer_id);
END;
GO

CREATE PROCEDURE AddOrderDetail 
    @amount INT,
    @product_id INT,
    @order_id INT
AS
BEGIN
    INSERT INTO order_detail (amount, product_id, order_id)
    VALUES (@amount, @product_id, @order_id);
END;
GO

CREATE PROCEDURE AddProductInStock 
    @import_date DATE,
    @amount INT,
    @product_id INT,
    @warehouse_id INT
AS
BEGIN
    INSERT INTO products_in_stock (import_date, amount, product_id, warehouse_id)
    VALUES (@import_date, @amount, @product_id, @warehouse_id);
END;
GO

CREATE PROCEDURE AddProductWithPromotion 
    @product_id INT,
    @promotion_id INT
AS
BEGIN
    INSERT INTO products_with_promotions (product_id, promotion_id)
    VALUES (@product_id, @promotion_id);
END;
GO

CREATE PROCEDURE AddBrandSupplier 
    @supplier_id INT,
    @brand_id INT
AS
BEGIN
    INSERT INTO brand_supplier (supplier_id, brand_id)
    VALUES (@supplier_id, @brand_id);
END;
GO

CREATE PROCEDURE AddRevenue 
    @month INT,
    @order_id INT,
    @warehouse_id INT
AS
BEGIN
    INSERT INTO revenue (month, order_id, warehouse_id)
    VALUES (@month, @order_id, @warehouse_id);
END;
GO



-- Example for AddCustomer
EXEC AddCustomer @name = N'Nguyen Van A', @phone_number = '0123456789', @address = N'123 Street, City';

-- Example for AddSupplier
EXEC AddSupplier @name = N'Supplier A', @phone_number = '0987654321', @address = N'456 Avenue, City';

-- Example for AddBrand
EXEC AddBrand @name = N'Brand A';

-- Example for AddCategory
EXEC AddCategory @name = N'Electronics';

-- Example for AddWarehouse
EXEC AddWarehouse @name = N'Warehouse A', @address = N'789 Boulevard, City';

-- Example for AddShippingUnit
EXEC AddShippingUnit @name = N'Express Shipping', @cost = 10.00, @method = 1;

-- Example for AddProduct
EXEC AddProduct 
    @name = N'Smartphone X', 
    @unit_price = 299.99, 
    @state = 1, 
    @warranty_period = N'12 months', 
    @description = N'Latest smartphone with advanced features', 
    @supplier_id = 1, 
    @brand_id = 1, 
    @category_id = 1;

-- Example for AddProductImage
EXEC AddProductImage @image = N'https://example.com/image.jpg', @product_id = 1;

-- Example for AddOrder
EXEC AddOrder @state = 0, @delivery_date = '2024-05-25', @customer_id = 1, @shipping_unit_id = 1;

-- Example for AddPromotion
EXEC AddPromotion @name = N'Summer Sale', @accompanying_gifts = N'Free Case', @order_id = 1;

-- Example for AddComment
EXEC AddComment @date_created = '2024-05-23', @content = N'Great product!', @product_id = 1, @customer_id = 1;

-- Example for AddOrderDetail
EXEC AddOrderDetail @amount = 2, @product_id = 1, @order_id = 1;

-- Example for AddProductInStock
EXEC AddProductInStock @import_date = '2024-05-20', @amount = 100, @product_id = 1, @warehouse_id = 1;

-- Example for AddProductWithPromotion
EXEC AddProductWithPromotion @product_id = 1, @promotion_id = 1;

-- Example for AddBrandSupplier
EXEC AddBrandSupplier @supplier_id = 1, @brand_id = 1;

-- Example for AddRevenue
EXEC AddRevenue @month = 5, @order_id = 1, @warehouse_id = 1;
