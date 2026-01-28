// MongoDB initialization script
// This script runs when the container is first created

db = db.getSiblingDB('rosary-app');

// Create application user with read/write permissions
db.createUser({
  user: 'rosary_user',
  pwd: 'rosary_password_2024',
  roles: [
    {
      role: 'readWrite',
      db: 'rosary-app',
    },
  ],
});

// Create indexes for better performance
db.createCollection('users');
db.createCollection('checkins');

// Users collection indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });

// CheckIns collection indexes
db.checkins.createIndex({ userId: 1, createdAt: -1 });
db.checkins.createIndex({ isPublic: 1, createdAt: -1 });
db.checkins.createIndex({ createdAt: -1 });

print('✅ Database rosary-app initialized successfully!');
print('✅ User rosary_user created');
print('✅ Collections and indexes created');
