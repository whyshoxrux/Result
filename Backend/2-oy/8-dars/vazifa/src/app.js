import { connectToDatabase, pool } from "./common/database/database.service.js";

async function init() {
  try {
    await connectToDatabase();

    const createDepartmentsTableQuery = `
      CREATE TABLE IF NOT EXISTS departments (
        department_id SERIAL PRIMARY KEY,
        department_name VARCHAR(50),
        manager_id INTEGER
      );
    `;

    const createProjectsTableQuery = `
      CREATE TABLE IF NOT EXISTS projects (
        project_id SERIAL PRIMARY KEY,
        project_name VARCHAR(50),
        start_date DATE,
        end_date DATE
      );
    `;

    const createSalariesTableQuery = `
      CREATE TABLE IF NOT EXISTS salaries (
        employee_id SERIAL PRIMARY KEY,
        salary NUMERIC(10, 2),
        effective_date DATE
      );
    `;

    const createVendorsTableQuery = `
      CREATE TABLE IF NOT EXISTS vendors (
        vendor_id SERIAL PRIMARY KEY,
        vendor_name VARCHAR(50),
        contact_number VARCHAR(20)
      );
    `;

    const createInventoryTableQuery = `
      CREATE TABLE IF NOT EXISTS inventory (
        inventory_id SERIAL PRIMARY KEY,
        product_name VARCHAR(50),
        quantity INTEGER,
        warehouse_location VARCHAR(50)
      );
    `;

    await pool.query(createDepartmentsTableQuery);
    console.log("Table 'departments' created successfully");

    await pool.query(createProjectsTableQuery);
    console.log("Table 'projects' created successfully");

    await pool.query(createSalariesTableQuery);
    console.log("Table 'salaries' created successfully");

    await pool.query(createVendorsTableQuery);
    console.log("Table 'vendors' created successfully");

    await pool.query(createInventoryTableQuery);
    console.log("Table 'inventory' created successfully");

    const insertDepartmentQuery = `
      INSERT INTO departments (department_name, manager_id)
      VALUES ('IT', 3);
    `;

    const insertProjectQuery = `
      INSERT INTO projects (project_name, start_date, end_date)
      VALUES ('Website Redesign', '2024-08-01', '2024-12-31');
    `;

    const insertSalaryQuery = `
      INSERT INTO salaries (employee_id, salary, effective_date)
      VALUES (2, 7500.00, '2024-07-01');
    `;

    const insertVendorQuery = `
      INSERT INTO vendors (vendor_name, contact_number)
      VALUES ('Tech Supplies Inc', '+998948878888');
    `;

    const insertInventoryQuery = `
      INSERT INTO inventory (product_name, quantity, warehouse_location)
      VALUES ('Monitor', 50, 'A1');
    `;

    await pool.query(insertDepartmentQuery);
    console.log("New department 'IT' added successfully");

    await pool.query(insertProjectQuery);
    console.log("New project 'Website Redesign' added successfully");

    await pool.query(insertSalaryQuery);
    console.log("New salary entry added successfully");

    await pool.query(insertVendorQuery);
    console.log("New vendor 'Tech Supplies Inc' added successfully");

    await pool.query(insertInventoryQuery);
    console.log("New inventory 'Monitor' added successfully");

    const selectDepartmentsQuery = `
      SELECT * FROM departments;
    `;

    const select2024ProjectsQuery = `
      SELECT * FROM projects WHERE start_date >= '2024-01-01' AND start_date < '2025-01-01';
    `;

    const selectEmployee3SalariesQuery = `
      SELECT * FROM salaries WHERE employee_id = 3;
    `;

    const selectVendorQuery = `
      SELECT * FROM vendors WHERE vendor_name = 'Tech Supplies Inc';
    `;

    const selectInventoryQuery = `
      SELECT * FROM inventory WHERE quantity > 100;
    `;

    const [departments, projects2024, employee3Salaries, vendor, inventory] = await Promise.all([
      pool.query(selectDepartmentsQuery),
      pool.query(select2024ProjectsQuery),
      pool.query(selectEmployee3SalariesQuery),
      pool.query(selectVendorQuery),
      pool.query(selectInventoryQuery)
    ]);

    console.log("Departments:", departments.rows);
    console.log("2024 Projects:", projects2024.rows);
    console.log("Employee 3 Salaries:", employee3Salaries.rows);
    console.log("Vendor 'Tech Supplies Inc':", vendor.rows);
    console.log("Inventory with quantity > 100:", inventory.rows);

    const updateDepartmentQuery = `
      UPDATE departments
      SET manager_id = 4
      WHERE department_id = 2;
    `;

    const updateProjectQuery = `
      UPDATE projects
      SET end_date = '2025-01-31'
      WHERE project_id = 3;
    `;

    const updateSalaryQuery = `
      UPDATE salaries
      SET salary = 8000.00
      WHERE employee_id = 2;
    `;

    const updateVendorQuery = `
      UPDATE vendors
      SET contact_number = '+998903710000'
      WHERE vendor_id = 1;
    `;

    const updateInventoryQuery = `
      UPDATE inventory
      SET quantity = 75
      WHERE inventory_id = 5;
    `;

    await Promise.all([
      pool.query(updateDepartmentQuery),
      pool.query(updateProjectQuery),
      pool.query(updateSalaryQuery),
      pool.query(updateVendorQuery),
      pool.query(updateInventoryQuery)
    ]);

    console.log("Updates applied successfully");

    const deleteDepartmentQuery = `
      DELETE FROM departments
      WHERE department_id = 3;
    `;

    const deleteProjectQuery = `
      DELETE FROM projects
      WHERE end_date < '2024-01-01';
    `;

    const deleteSalaryQuery = `
      DELETE FROM salaries
      WHERE effective_date < '2024-01-01';
    `;

    const deleteVendorQuery = `
      DELETE FROM vendors
      WHERE vendor_id = 2;
    `;

    await Promise.all([
      pool.query(deleteDepartmentQuery),
      pool.query(deleteProjectQuery),
      pool.query(deleteSalaryQuery),
      pool.query(deleteVendorQuery)
    ]);

    console.log("Deletions applied successfully");

  } catch (err) {
    console.error(err.message);
  } finally {
    await pool.end();
  }
}

init();


