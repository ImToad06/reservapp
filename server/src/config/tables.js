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
    CREATE SEQUENCE employees_employee_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 4 CACHE 1;

    CREATE TABLE "public"."employees" (
        "employee_id" integer DEFAULT nextval('employees_employee_id_seq') NOT NULL,
        "name" text NOT NULL,
        "last_name" text NOT NULL,
        "type" integer NOT NULL,
        "email" text NOT NULL,
        "password" text NOT NULL,
        "status" character(1) NOT NULL,
        CONSTRAINT "employees_pkey" PRIMARY KEY ("employee_id")
    )
    WITH (oids = false);

    CREATE UNIQUE INDEX employees_email ON public.employees USING btree (email);

    INSERT INTO "employees" ("employee_id", "name", "last_name", "type", "email", "password", "status") VALUES
    (1,	'juan',	'reyes',	1,	'juan@reyes.com',	'$2b$10$aRAkgmFItynAqrAh50GLH.//JjyrE9ctvOGJOemb5BpZHZhaDhL7G',	'a'),
    (3,	'jean',	'boom',	2,	'jean@boom.com',	'$2b$10$oRNEw/mpklhNWnCAqGKZa.ZqVNAnYXD4PUs56AF5X0H7sEN/QLKma',	'a');

    CREATE SEQUENCE reserves_reserve_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

    CREATE TABLE "public"."reserves" (
        "reserve_id" integer DEFAULT nextval('reserves_reserve_id_seq') NOT NULL,
        "name" text NOT NULL,
        "last_name" text NOT NULL,
        "persons" integer NOT NULL,
        "table" integer NOT NULL,
        "date" date NOT NULL,
        "status" character(1) NOT NULL,
        CONSTRAINT "reserves_pkey" PRIMARY KEY ("reserve_id")
    )
    WITH (oids = false);


    CREATE SEQUENCE tables_table_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 9 CACHE 1;

    CREATE TABLE "public"."tables" (
        "table_id" integer DEFAULT nextval('tables_table_id_seq') NOT NULL,
        "capacity" integer NOT NULL,
        "status" character(1) NOT NULL,
        CONSTRAINT "tables_pkey" PRIMARY KEY ("table_id")
    )
    WITH (oids = false);

    INSERT INTO "tables" ("table_id", "capacity", "status") VALUES
    (1,	4,	'a'),
    (2,	4,	'a'),
    (3,	4,	'a'),
    (4,	4,	'a'),
    (5,	2,	'a'),
    (6,	2,	'a'),
    (7,	8,	'a'),
    (8,	8,	'a');

    CREATE SEQUENCE type_employees_type_employee_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 3 CACHE 1;

    CREATE TABLE "public"."type_employees" (
        "type_employee_id" integer DEFAULT nextval('type_employees_type_employee_id_seq') NOT NULL,
        "type" text NOT NULL,
        CONSTRAINT "type_employees_pkey" PRIMARY KEY ("type_employee_id")
    )
    WITH (oids = false);

    CREATE UNIQUE INDEX type_employees_type ON public.type_employees USING btree (type);

    INSERT INTO "type_employees" ("type_employee_id", "type") VALUES
    (1,	'admin'),
    (2,	'manager');

    ALTER TABLE ONLY "public"."employees" ADD CONSTRAINT "employees_type_fkey" FOREIGN KEY (type) REFERENCES type_employees(type_employee_id) NOT DEFERRABLE;

    ALTER TABLE ONLY "public"."reserves" ADD CONSTRAINT "reserves_table_fkey" FOREIGN KEY ("table") REFERENCES tables(table_id) NOT DEFERRABLE;
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
