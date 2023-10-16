-- Create the 'users' table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    role TEXT CHECK (role IN ('customer', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'addresses' table
CREATE TABLE addresses (
    address_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    zip_code VARCHAR(20),
    address_type TEXT DEFAULT 'other' CHECK (address_type IN ('home', 'work', 'other')),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'menu_categories' table
CREATE TABLE menu_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'menu_items' table
CREATE TABLE menu_items (
    item_id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES menu_categories(category_id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) CHECK (price > 0),
    image_url TEXT,
    is_vegetarian BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'orders' table
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    address_id INTEGER REFERENCES addresses(address_id),
    total_price DECIMAL(10, 2) CHECK (total_price >= 0),
    status TEXT CHECK (status IN ('pending', 'preparing', 'dispatched', 'delivered', 'cancelled')),
    payment_status TEXT CHECK (payment_status IN ('paid', 'pending', 'failed')),
    delivery_time_estimation TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'order_items' table
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id),
    item_id INTEGER REFERENCES menu_items(item_id),
    quantity INTEGER CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) CHECK (unit_price >= 0),
    subtotal DECIMAL(10, 2) CHECK (subtotal >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'reviews' table (Optional)
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    item_id INTEGER REFERENCES menu_items(item_id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5), -- Assuming a rating out of 5
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'payments' table (Additional Feature)
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id),
    transaction_id VARCHAR(255),
    amount DECIMAL(10, 2) CHECK (amount >= 0),
    status  VARCHAR(255),
    CHECK (status IN ('successful', 'failed', 'pending')),
    payment_method VARCHAR(255),
    CHECK (payment_method IN ('credit_card', 'debit_card', 'paypal')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'promotions' table (Additional Feature)
CREATE TABLE promotions (
    promo_id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_amount DECIMAL(10, 2),
    discount_percentage INTEGER CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    start_date DATE,
    end_date DATE
);

CREATE TABLE order_details (
    detail_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id),
    menu_item_id INTEGER REFERENCES menu_items(item_id),
    quantity INTEGER NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);
