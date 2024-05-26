use master
go

-- View for customers
CREATE VIEW ViewCustomers AS
SELECT 
    id,
    name,
    phone_number,
    address,
    createAt,
    updateAt
FROM customers;
GO

-- View for suppliers
CREATE VIEW ViewSuppliers AS
SELECT 
    id,
    name,
    phone_number,
    address,
    createAt,
    updateAt
FROM suppliers;
GO

-- View for brands
CREATE VIEW ViewBrands AS
SELECT 
    id,
    name,
    createAt,
    updateAt
FROM brands;
GO

-- View for categories
CREATE VIEW ViewCategories AS
SELECT 
    id,
    name,
    createAt,
    updateAt
FROM categories;
GO

-- View for warehouse
CREATE VIEW ViewWarehouse AS
SELECT 
    id,
    name,
    address,
    createAt,
    updateAt
FROM warehouse;
GO

-- View for shipping_units
CREATE VIEW ViewShippingUnits AS
SELECT 
    id,
    name,
    cost,
    method,
    createAt,
    updateAt
FROM shipping_units;
GO

-- View for products
CREATE VIEW ViewProducts AS
SELECT 
    id,
    name,
    unit_price,
    state,
    warranty_period,
    description,
    supplier_id,
    brand_id,
    category_id,
    createAt,
    updateAt
FROM products;
GO

-- View for product_images
CREATE VIEW ViewProductImages AS
SELECT 
    id,
    image,
    product_id,
    createAt,
    updateAt
FROM product_images;
GO

-- View for orders
CREATE VIEW ViewOrders AS
SELECT 
    id,
    state,
    delivery_date,
    customer_id,
    shipping_unit_id,
    createAt,
    updateAt
FROM orders;
GO

-- View for promotions
CREATE VIEW ViewPromotions AS
SELECT 
    id,
    name,
    accompanying_gifts,
    order_id,
    createAt,
    updateAt
FROM promotions;
GO

-- View for comments
CREATE VIEW ViewComments AS
SELECT 
    id,
    date_created,
    content,
    product_id,
    customer_id,
    createAt,
    updateAt
FROM comments;
GO

-- View for order_detail
CREATE VIEW ViewOrderDetail AS
SELECT 
    id,
    amount,
    product_id,
    order_id,
    createAt,
    updateAt
FROM order_detail;
GO

-- View for products_in_stock
CREATE VIEW ViewProductsInStock AS
SELECT 
    id,
    import_date,
    amount,
    product_id,
    warehouse_id,
    createAt,
    updateAt
FROM products_in_stock;
GO

-- View for products_with_promotions
CREATE VIEW ViewProductsWithPromotions AS
SELECT 
    id,
    product_id,
    promotion_id,
    createAt,
    updateAt
FROM products_with_promotions;
GO

-- View for brand_supplier
CREATE VIEW ViewBrandSupplier AS
SELECT 
    id,
    supplier_id,
    brand_id,
    createAt,
    updateAt
FROM brand_supplier;
GO

-- View for revenue
CREATE VIEW ViewRevenue AS
SELECT 
    id,
    month,
    order_id,
    warehouse_id,
    createAt,
    updateAt
FROM revenue;
GO
