import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js'; // Ensure this path matches your User model

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // 1. Check if the admin already exists
    const adminExists = await User.findOne({ email: 'admin@smuc.com' });
    if (adminExists) {
      console.log('⚠️ Admin already exists in the database.');
      process.exit();
    }

    // 2. Hash the password "admin123"
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // 3. Create the Admin user
    await User.create({
      email: 'admin@smuc.com',
      
      password: hashedPassword,
      role: 'ADMIN'
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@smuc.com');
    console.log('🔑 Password: admin123');
    process.exit();
  } catch (error) {
    console.error(`❌ Error seeding admin: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();