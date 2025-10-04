import pool from "./db.js";

export const genTables = async () => {
  let query = `
  SELECT table_name 
  FROM information_schema.tables 
  WHERE table_schema = 'public';
  `;
  const res = await pool.query(query);
  if (res.rows.length < 1) {
    query = `
    CREATE TABLE "public"."order_products" (
        "order" integer NOT NULL,
        "product" integer NOT NULL,
        "amount" integer NOT NULL,
        CONSTRAINT "order_products_order_product" PRIMARY KEY ("order", "product")
    )
    WITH (oids = false);

    CREATE SEQUENCE orders_order_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

    CREATE TABLE "public"."orders" (
        "order_id" integer DEFAULT nextval('orders_order_id_seq') NOT NULL,
        "reserve" integer NOT NULL,
        "status" character(1) NOT NULL,
        CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
    )
    WITH (oids = false);

    CREATE SEQUENCE product_types_product_type_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 5 CACHE 1;

    CREATE TABLE "public"."product_types" (
        "product_type_id" integer DEFAULT nextval('product_types_product_type_id_seq') NOT NULL,
        "type" text NOT NULL,
        CONSTRAINT "product_types_pkey" PRIMARY KEY ("product_type_id")
    )
    WITH (oids = false);

    INSERT INTO "product_types" ("product_type_id", "type") VALUES
    (1,	'drink'),
    (2,	'entree'),
    (3,	'main'),
    (4,	'dessert');

    CREATE SEQUENCE products_product_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 28 CACHE 1;

    CREATE TABLE "public"."products" (
        "product_id" integer DEFAULT nextval('products_product_id_seq') NOT NULL,
        "name" text NOT NULL,
        "type" integer NOT NULL,
        "price" double precision NOT NULL,
        "status" character(1) NOT NULL,
        CONSTRAINT "products_pkey" PRIMARY KEY ("product_id")
    )
    WITH (oids = false);

    INSERT INTO "products" ("product_id", "name", "type", "price", "status") VALUES
    (1,	'Classic Cola',	1,	2.99,	'a'),
    (2,	'Orange Juice',	1,	3.49,	'a'),
    (3,	'Sparkling Water',	1,	1.99,	'a'),
    (4,	'Coffee Americano',	1,	4.25,	'a'),
    (5,	'Green Tea',	1,	2.75,	'a'),
    (6,	'Craft Beer',	1,	5.99,	'a'),
    (7,	'Red Wine Glass',	1,	8.5,	'a'),
    (8,	'Grilled Salmon',	2,	18.95,	'a'),
    (9,	'Chicken Caesar Salad',	2,	12.5,	'a'),
    (10,	'Beef Burger',	2,	14.99,	'a'),
    (11,	'Vegetarian Pasta',	2,	13.75,	'a'),
    (12,	'Fish and Chips',	2,	16.25,	'a'),
    (13,	'BBQ Ribs',	2,	22.5,	'a'),
    (14,	'Mushroom Risotto',	2,	15.99,	'a'),
    (15,	'Ribeye Steak',	3,	28.99,	'a'),
    (16,	'Lobster Thermidor',	3,	35,	'a'),
    (17,	'Roasted Duck',	3,	24.95,	'a'),
    (18,	'Lamb Chops',	3,	26.5,	'a'),
    (19,	'Seafood Platter',	3,	32.99,	'a'),
    (20,	'Prime Rib',	3,	29.95,	'a'),
    (21,	'Chocolate Cake',	4,	6.99,	'a'),
    (22,	'Tiramisu',	4,	7.5,	'a'),
    (23,	'Ice Cream Sundae',	4,	5.25,	'a'),
    (24,	'Apple Pie',	4,	5.99,	'a'),
    (25,	'Crème Brûlée',	4,	8.25,	'a'),
    (26,	'Cheesecake',	4,	6.75,	'a'),
    (27,	'Fruit Tart',	4,	7.99,	'a');

    CREATE SEQUENCE reserves_reserve_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

    CREATE TABLE "public"."reserves" (
        "reserve_id" integer DEFAULT nextval('reserves_reserve_id_seq') NOT NULL,
        "user" integer NOT NULL,
        "table" integer NOT NULL,
        "date" date NOT NULL,
        "status" character(1) NOT NULL,
        CONSTRAINT "reserves_pkey" PRIMARY KEY ("reserve_id")
    )
    WITH (oids = false);


    CREATE SEQUENCE roles_role_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 4 CACHE 1;

    CREATE TABLE "public"."roles" (
        "role_id" integer DEFAULT nextval('roles_role_id_seq') NOT NULL,
        "role" text NOT NULL,
        CONSTRAINT "roles_pkey" PRIMARY KEY ("role_id")
    )
    WITH (oids = false);

    INSERT INTO "roles" ("role_id", "role") VALUES
    (1,	'admin'),
    (2,	'employee'),
    (3,	'user');

    CREATE SEQUENCE tables_table_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 9 CACHE 1;

    CREATE TABLE "public"."tables" (
        "table_id" integer DEFAULT nextval('tables_table_id_seq') NOT NULL,
        "number" integer NOT NULL,
        "capacity" integer NOT NULL,
        "status" character(1) NOT NULL,
        CONSTRAINT "tables_pkey" PRIMARY KEY ("table_id")
    )
    WITH (oids = false);

    INSERT INTO "tables" ("table_id", "number", "capacity", "status") VALUES
    (1,	1,	8,	'a'),
    (2,	2,	8,	'a'),
    (3,	3,	8,	'a'),
    (4,	4,	8,	'a'),
    (5,	5,	4,	'a'),
    (6,	6,	4,	'a'),
    (7,	7,	2,	'a'),
    (8,	8,	2,	'a');

    CREATE SEQUENCE users_user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 7 CACHE 1;

    CREATE TABLE "public"."users" (
        "user_id" integer DEFAULT nextval('users_user_id_seq') NOT NULL,
        "name" text NOT NULL,
        "last_name" text NOT NULL,
        "birthdate" date NOT NULL,
        "email" text NOT NULL,
        "password" text NOT NULL,
        "pfp_url" text,
        "role" integer NOT NULL,
        "status" character(1) NOT NULL,
        CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
    )
    WITH (oids = false);

    CREATE UNIQUE INDEX users_email ON public.users USING btree (email);

    INSERT INTO "users" ("user_id", "name", "last_name", "birthdate", "email", "password", "pfp_url", "role", "status") VALUES
    (1,	'juan',	'reyes',	'2006-05-30',	'juan@reyes.com',	'$2b$10$6ZxN5hQOo21PeBPLpy3C5OjGyDJlQYhRDJv74K6iY029kFqeUwlui',	NULL,	1,	'a'),
    (2,	'jean',	'boom',	'2005-05-28',	'jean@boom.com',	'$2b$10$dCKZxuGuNkaZp4VFeejQXeV2Qwths29C7w1RfXN0eMA54JB25wDPa',	NULL,	1,	'a'),
    (3,	'john',	'doe',	'2002-08-18',	'john@doe.com',	'$2b$10$nSnco6SStvsoGdkk66u.5ukRw6MEpBk.q3QXADw/twnVndHk644LW',	NULL,	2,	'a'),
    (4,	'jane',	'doe',	'2001-11-04',	'jane@doe.com',	'$2b$10$3fpmfWlej0Olyo6s5mw8YO8LRgZWhl8h65Nhw/f2i6f54u1GiA6gO',	NULL,	3,	'a');

    ALTER TABLE ONLY "public"."order_products" ADD CONSTRAINT "order_products_order_fkey" FOREIGN KEY ("order") REFERENCES orders(order_id) NOT DEFERRABLE;
    ALTER TABLE ONLY "public"."order_products" ADD CONSTRAINT "order_products_product_fkey" FOREIGN KEY (product) REFERENCES products(product_id) NOT DEFERRABLE;

    ALTER TABLE ONLY "public"."orders" ADD CONSTRAINT "orders_reserve_fkey" FOREIGN KEY (reserve) REFERENCES reserves(reserve_id) NOT DEFERRABLE;

    ALTER TABLE ONLY "public"."products" ADD CONSTRAINT "products_type_fkey" FOREIGN KEY (type) REFERENCES product_types(product_type_id) NOT DEFERRABLE;

    ALTER TABLE ONLY "public"."reserves" ADD CONSTRAINT "reserves_table_fkey" FOREIGN KEY ("table") REFERENCES tables(table_id) NOT DEFERRABLE;
    ALTER TABLE ONLY "public"."reserves" ADD CONSTRAINT "reserves_user_fkey" FOREIGN KEY ("user") REFERENCES users(user_id) NOT DEFERRABLE;

    ALTER TABLE ONLY "public"."users" ADD CONSTRAINT "users_role_fkey" FOREIGN KEY (role) REFERENCES roles(role_id) NOT DEFERRABLE;
    `;
    try {
      await pool.query(query);
      console.log("Database tables created successfully");
    } catch (error) {
      console.error("Error creating tables:", error);
      throw error;
    }
  }
};
