import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';

dotenv.config();

const checkDatabase = async () => {
  try {
    await connectDB();
    console.log('🔍 Checking database...');

    const count = await Product.countDocuments();
    console.log(`📊 Total products in database: ${count}`);

    if (count > 0) {
      const products = await Product.find().limit(3);
      console.log('\n📦 Sample products:');
      products.forEach((product, index) => {
        console.log(`\nProduct ${index + 1}:`);
        console.log(JSON.stringify(product, null, 2));
      });
    } else {
      console.log('❌ No products found in database');
    }

    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkDatabase(); 