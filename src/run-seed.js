// Script to run the seed data
const strapi = require('@strapi/strapi');

async function runSeed() {
  try {
    // Start Strapi programmatically
    const app = await strapi({
      autoReload: false,
      serveAdminPanel: false,
    }).load();

    console.log('🚀 Strapi loaded, running seed...');

    // Import and run the seed function
    const seedData = require('./seed-new-structure');
    await seedData(app);

    // Destroy the Strapi instance
    await app.destroy();

    console.log('✅ Seed completed, Strapi instance destroyed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error running seed:', error);
    process.exit(1);
  }
}

runSeed();