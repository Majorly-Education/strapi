// Seed script for new Track > Course > Lesson structure
const fs = require('fs');
const path = require('path');

async function seedData(strapi) {
  console.log('🌱 Starting seed for new structure...');

  try {
    // Create Tracks
    const productMarketingTrack = await strapi.entityService.create('api::track.track', {
      data: {
        title: 'Product Marketing',
        slug: 'product-marketing',
        track_id: 'track-pm-001',
        publishedAt: new Date(),
      },
    });

    const growthMarketingTrack = await strapi.entityService.create('api::track.track', {
      data: {
        title: 'Growth Marketing',
        slug: 'growth-marketing',
        track_id: 'track-gm-001',
        publishedAt: new Date(),
      },
    });

    console.log('✅ Created tracks');

    // Create Course under Product Marketing track
    const storytellingCourse = await strapi.entityService.create('api::course.course', {
      data: {
        title: 'Mastering earned storytelling for marketing impact',
        slug: 'mastering-earned-storytelling',
        course_id: 'course-mes-001',
        order: 1,
        track: productMarketingTrack.id,
        publishedAt: new Date(),
      },
    });

    console.log('✅ Created course:', storytellingCourse.title);

    // Create Lessons for the course
    const lessons = [
      {
        title: 'Module 1: Introduction to earned storytelling',
        slug: 'module-1-introduction-to-earned-storytelling',
        duration: 20,
        difficulty: 'Beginner',
        order: 1,
        tags: ['storytelling', 'marketing', 'introduction'],
      },
      {
        title: 'Module 2: Frameworks for success: RISC and beyond',
        slug: 'module-2-frameworks-for-success',
        duration: 20,
        difficulty: 'Beginner',
        order: 2,
        tags: ['frameworks', 'RISC', 'methodology'],
      },
      {
        title: 'Module 3: Segmentation and insight development',
        slug: 'module-3-segmentation-and-insight-development',
        duration: 20,
        difficulty: 'Intermediate',
        order: 3,
        tags: ['segmentation', 'insights', 'analysis'],
      },
      {
        title: 'Module 4: Discuss insight development with a VP from Meta',
        slug: 'module-4-discuss-insight-development',
        duration: 15,
        difficulty: 'Intermediate',
        order: 4,
        tags: ['interview', 'Meta', 'insights'],
      },
      {
        title: 'Module 5: From insight to creative campaigns',
        slug: 'module-5-from-insight-to-creative-campaigns',
        duration: 20,
        difficulty: 'Advanced',
        order: 5,
        tags: ['campaigns', 'creative', 'execution'],
      },
      {
        title: 'Module 6: Pitching, activation, and measurement',
        slug: 'module-6-pitching-activation-measurement',
        duration: 20,
        difficulty: 'Advanced',
        order: 6,
        tags: ['pitching', 'measurement', 'ROI'],
      },
    ];

    for (const lessonData of lessons) {
      const lesson = await strapi.entityService.create('api::lesson.lesson', {
        data: {
          ...lessonData,
          course: storytellingCourse.id,
          publishedAt: new Date(),
          // Adding basic content structure
          content: {
            __component: 'lesson.lesson-page-template-1',
            author: {
              name: 'Melody Koh',
              title: 'VP of Marketing',
              bio: 'Experienced marketing leader with expertise in earned storytelling and brand narrative development.',
            },
            sections: [
              {
                title: 'Introduction',
                content: `Welcome to ${lessonData.title}. In this lesson, we'll explore key concepts and practical applications.`,
              },
              {
                title: 'Key Concepts',
                content: 'This section covers the main ideas and frameworks you need to understand.',
              },
              {
                title: 'Practical Applications',
                content: 'Learn how to apply these concepts in real-world marketing scenarios.',
              },
            ],
          },
        },
      });

      console.log(`✅ Created lesson: ${lesson.title}`);

      // Create quiz for each lesson
      const quiz = await strapi.entityService.create('api::quiz.quiz', {
        data: {
          title: `Quiz: ${lessonData.title}`,
          description: `Test your understanding of ${lessonData.title.toLowerCase()}`,
          totalQuestions: 5,
          passingScore: 70,
          timeLimit: 10,
          lesson: lesson.id,
          publishedAt: new Date(),
        },
      });

      // Create sample questions for the quiz
      const questions = [
        {
          questionText: 'What is the primary goal of earned storytelling?',
          questionType: 'multipleChoice',
          order: 1,
          quiz: quiz.id,
        },
        {
          questionText: 'RISC framework stands for Relevance, Impact, Simplicity, and Consistency',
          questionType: 'trueFalse',
          order: 2,
          quiz: quiz.id,
        },
        {
          questionText: 'Which of the following is NOT a component of effective storytelling?',
          questionType: 'multipleChoice',
          order: 3,
          quiz: quiz.id,
        },
        {
          questionText: 'Earned media is more credible than paid media',
          questionType: 'trueFalse',
          order: 4,
          quiz: quiz.id,
        },
        {
          questionText: 'Select all the key elements of a successful campaign:',
          questionType: 'multiSelect',
          order: 5,
          quiz: quiz.id,
        },
      ];

      for (const questionData of questions) {
        const question = await strapi.entityService.create('api::question.question', {
          data: {
            ...questionData,
            publishedAt: new Date(),
            // Add answer options based on question type
            answerOptions: questionData.questionType === 'trueFalse'
              ? [
                  { title: 'True', isCorrect: true },
                  { title: 'False', isCorrect: false }
                ]
              : questionData.questionType === 'multiSelect'
              ? [
                  { title: 'Clear objectives', isCorrect: true },
                  { title: 'Target audience understanding', isCorrect: true },
                  { title: 'Large budget', isCorrect: false },
                  { title: 'Measurable outcomes', isCorrect: true },
                  { title: 'Complex messaging', isCorrect: false }
                ]
              : [
                  { title: 'Build authentic brand narratives', isCorrect: true },
                  { title: 'Increase advertising spend', isCorrect: false },
                  { title: 'Create viral content only', isCorrect: false },
                  { title: 'Generate quick sales', isCorrect: false }
                ]
          },
        });
      }

      console.log(`✅ Created quiz with questions for: ${lessonData.title}`);
    }

    // Create additional courses for variety
    const additionalCourses = [
      {
        title: 'Strategic Product Positioning',
        slug: 'strategic-product-positioning',
        course_id: 'course-spp-001',
        order: 2,
        track: productMarketingTrack.id,
      },
      {
        title: 'Market Research Fundamentals',
        slug: 'market-research-fundamentals',
        course_id: 'course-mrf-001',
        order: 3,
        track: productMarketingTrack.id,
      },
      {
        title: 'Growth Hacking Essentials',
        slug: 'growth-hacking-essentials',
        course_id: 'course-ghe-001',
        order: 1,
        track: growthMarketingTrack.id,
      },
    ];

    for (const courseData of additionalCourses) {
      await strapi.entityService.create('api::course.course', {
        data: {
          ...courseData,
          publishedAt: new Date(),
        },
      });
      console.log(`✅ Created course: ${courseData.title}`);
    }

    console.log('🎉 Seed completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

module.exports = seedData;