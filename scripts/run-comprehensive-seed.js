// Runner script to execute comprehensive seeding
const seedComprehensiveData = require('./seed-comprehensive');

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();

  strapi.log.level = 'error';

  console.log('🚀 Starting comprehensive seeding process...\n');

  try {
    // Clear existing data (optional - uncomment if you want to start fresh)
    console.log('🗑️  Clearing existing data...');

    // Clear lessons first (due to foreign key constraints)
    await strapi.db.query('api::lesson.lesson').deleteMany({});
    console.log('   ✅ Cleared lessons');

    // Clear quizzes and questions
    await strapi.db.query('api::question.question').deleteMany({});
    await strapi.db.query('api::quiz.quiz').deleteMany({});
    console.log('   ✅ Cleared quizzes and questions');

    // Clear courses
    await strapi.db.query('api::course.course').deleteMany({});
    console.log('   ✅ Cleared courses');

    // Clear tracks
    await strapi.db.query('api::track.track').deleteMany({});
    console.log('   ✅ Cleared tracks');

    // Clear authors
    await strapi.db.query('api::author.author').deleteMany({});
    console.log('   ✅ Cleared authors');

    console.log('\n📊 Starting fresh data seeding...\n');

    // Run the comprehensive seed
    await seedComprehensiveData(strapi);

    console.log('\n🎉 All done! Seeding completed successfully.');

  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }

  // Close the Strapi instance
  await strapi.destroy();
  process.exit(0);
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run the main function
main();