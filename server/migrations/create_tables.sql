CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(15) NOT NULL,
    last_name VARCHAR(15) NOT NULL,
    email VARCHAR(20) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    user_address VARCHAR(255) NOT NULL,
    is_shop_enabled BOOLEAN DEFAULT FALSE,
    account_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shops (
    shop_id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    shop_name VARCHAR(100) NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    phone_number VARCHAR,
    map_location VARCHAR NOT NULL,
    shop_type VARCHAR(100) NOT NULL,
    shop_description VARCHAR(500) NOT NULL,
    city VARCHAR NOT NULL,
    country VARCHAR NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    shop_id INTEGER NOT NULL,
    product_type VARCHAR(100),
    product_condition VARCHAR(20),
    price MONEY,
    original_purchased_date DATE,
    original_purchasing_receipt_no VARCHAR,
    product_description VARCHAR(1000),
    FOREIGN KEY (shop_id) REFERENCES shops(shop_id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    from_map_location VARCHAR NOT NULL,
    to_map_location VARCHAR NOT NULL,
    last_stop_map_location VARCHAR NOT NULL,
    order_status VARCHAR(10) NOT NULL,
    payment_status VARCHAR NOT NULL,
    product_id INTEGER NOT NULL,
    buyer_id INTEGER NOT NULL,
    shop_id INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (buyer_id) REFERENCES users(user_id),
    FOREIGN KEY (shop_id) REFERENCES shops(shop_id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
