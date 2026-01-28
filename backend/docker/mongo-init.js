// MongoDB initialization script
// This script runs when the container is first created
// When MONGO_INITDB_ROOT_USERNAME is set, this script runs authenticated as root

db = db.getSiblingDB('rosary-app');

// Check if user already exists to avoid errors on restart
var userExists = db.getUsers().users.some(function(u) { return u.user === 'rosary_user'; });

if (!userExists) {

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
  print('User rosary_user created successfully');
} else {
  print('User rosary_user already exists, skipping creation');
}

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
