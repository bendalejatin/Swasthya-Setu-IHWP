const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: String
});

const Admin = mongoose.model('Admin', adminSchema);

async function createAdmin() {
  try {
    await mongoose.connect('mongodb://localhost:27017/SwasthyaSetu');
    console.log('Connected to MongoDB');
    
    await Admin.deleteMany({});
    console.log('Cleared existing admins');
    
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    console.log('Password hashed');
    
    const admin = new Admin({
      username: 'admin',
      password: hashedPassword,
      email: 'admin@swasthyasetu.com',
      role: 'admin'
    });
    
    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createAdmin();