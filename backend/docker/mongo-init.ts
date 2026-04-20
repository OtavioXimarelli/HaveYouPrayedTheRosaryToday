// MongoDB initialization script
// This script runs when the container is first created
// When MONGO_INITDB_ROOT_USERNAME is set, this script runs authenticated as root

type IndexDirection = 1 | -1;

interface MongoUser {
  user: string;
}

interface MongoUsersResult {
  users: MongoUser[];
}

interface MongoCollection {
  createIndex(spec: Record<string, IndexDirection>, options?: { unique?: boolean }): void;
}

interface MongoDatabase {
  getSiblingDB(name: string): MongoDatabase;
  getUsers(): MongoUsersResult;
  createUser(config: { user: string; pwd: string; roles: Array<{ role: string; db: string }> }): void;
  createCollection(name: string): void;
  users: MongoCollection;
  checkins: MongoCollection;
}

declare const db: MongoDatabase;
declare function print(message: string): void;

const appDb = db.getSiblingDB(`rosary-app`);

// Check if user already exists to avoid errors on restart
const userExists = appDb.getUsers().users.some((u: MongoUser) => u.user === `rosary_user`);

if (!userExists) {
  // Create application user with read/write permissions
  appDb.createUser({
    user: `rosary_user`,
    pwd: `rosary_password_2024`,
    roles: [
      {
        role: `readWrite`,
        db: `rosary-app`,
      },
    ],
  });
  print(`User rosary_user created successfully`);
} else {
  print(`User rosary_user already exists, skipping creation`);
}

// Create indexes for better performance
appDb.createCollection(`users`);
appDb.createCollection(`checkins`);

// Users collection indexes
appDb.users.createIndex({ email: 1 }, { unique: true });
appDb.users.createIndex({ createdAt: -1 });

// CheckIns collection indexes
appDb.checkins.createIndex({ userId: 1, createdAt: -1 });
appDb.checkins.createIndex({ isPublic: 1, createdAt: -1 });
appDb.checkins.createIndex({ createdAt: -1 });

print(`✅ Database rosary-app initialized successfully!`);
print(`✅ User rosary_user created`);
print(`✅ Collections and indexes created`);