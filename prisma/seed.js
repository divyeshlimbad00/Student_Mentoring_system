const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@gmail.com';
  
  // Check if admin already exists
  const existingAdmin = await prisma.admin.findFirst({
    where: { emailaddress: adminEmail }
  });

  if (existingAdmin) {
    console.log(`Admin with email ${adminEmail} already exists. Skipping creation.`);
    return;
  }

  // Create the admin
  const admin = await prisma.admin.create({
    data: {
      adminname: "System Admin",
      emailaddress: adminEmail,
      password: "admin123", // In a real app, hash this!
      mobileno: "9999999999",
    },
  });

  console.log(`Admin created successfully with email: ${admin.emailaddress}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
