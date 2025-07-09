const { neon } = require("@neondatabase/serverless");
const { drizzle } = require("drizzle-orm/neon-http");
require('dotenv').config({ path: '.env.local' });

async function checkDatabase() {
  try {
    console.log('Connecting to database...');
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);
    
    // Check if we can connect
    console.log('Testing connection...');
    const result = await sql`SELECT current_database(), current_user`;
    console.log('Connection successful!');
    console.log('Database:', result[0].current_database);
    console.log('User:', result[0].current_user);
    
    // List all tables
    console.log('\nChecking tables...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    console.log('Tables found:', tables.length);
    tables.forEach(table => {
      console.log('-', table.table_name);
    });
    
    // Check if accounts table exists and has data
    if (tables.some(t => t.table_name === 'accounts')) {
      console.log('\nChecking accounts table...');
      const count = await sql`SELECT COUNT(*) as count FROM accounts`;
      console.log('Number of accounts:', count[0].count);
      
      if (count[0].count > 0) {
        const accounts = await sql`SELECT * FROM accounts LIMIT 5`;
        console.log('Sample accounts:');
        accounts.forEach(account => {
          console.log('-', account);
        });
      }
    }
    
  } catch (error) {
    console.error('Database connection error:', error.message);
  }
}

checkDatabase(); 