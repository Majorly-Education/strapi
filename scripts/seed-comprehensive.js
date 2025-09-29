// Comprehensive seed script for Track > Course > Lesson structure
const fs = require('fs');
const path = require('path');

// Track data based on the actual structure from the screenshot
const TRACK_DATA = {
  "Aspiring Product Marketer": {
    slug: "aspiring-product-marketer",
    courses: {
      "Strategic Positioning": {
        slug: "strategic-positioning",
        description: "Master the fundamentals of strategic positioning to differentiate your product and create compelling market narratives.",
        xp_value: 140,
        icon_url: "/icons/positioning.svg",
        lessons: [
          {
            title: "Why Positioning Matters",
            slug: "why-positioning-matters",
            duration: 25,
            difficulty: "Beginner",
            xp_value: 20,
            icon_url: "/icons/positioning-matters.svg",
            tags: ["positioning", "fundamentals", "strategy"]
          },
          {
            title: "Positioning vs. Messaging vs. Branding",
            slug: "positioning-vs-messaging-vs-branding",
            duration: 30,
            difficulty: "Beginner",
            xp_value: 25,
            icon_url: "/icons/comparison.svg",
            tags: ["positioning", "messaging", "branding"]
          },
          {
            title: "Positioning Frameworks Overview",
            slug: "positioning-frameworks-overview",
            duration: 35,
            difficulty: "Beginner",
            xp_value: 30,
            icon_url: "/icons/frameworks.svg",
            tags: ["frameworks", "positioning", "methodology"]
          },
          {
            title: "Elements of a Strong Positioning Statement",
            slug: "elements-of-strong-positioning-statement",
            duration: 40,
            difficulty: "Intermediate",
            xp_value: 35,
            icon_url: "/icons/elements.svg",
            tags: ["positioning statement", "elements", "structure"]
          },
          {
            title: "Writing and Refining Your Positioning Statement",
            slug: "writing-refining-positioning-statement",
            duration: 45,
            difficulty: "Intermediate",
            xp_value: 40,
            icon_url: "/icons/writing.svg",
            tags: ["writing", "positioning", "refinement"]
          },
          {
            title: "Analyzing Competitor Positioning",
            slug: "analyzing-competitor-positioning",
            duration: 35,
            difficulty: "Intermediate",
            xp_value: 30,
            icon_url: "/icons/competitor-analysis.svg",
            tags: ["competitive analysis", "positioning", "research"]
          },
          {
            title: "Differentiation Strategies",
            slug: "differentiation-strategies",
            duration: 40,
            difficulty: "Advanced",
            xp_value: 35,
            icon_url: "/icons/differentiation.svg",
            tags: ["differentiation", "strategy", "competitive advantage"]
          },
          {
            title: "Positioning for New Markets",
            slug: "positioning-for-new-markets",
            duration: 35,
            difficulty: "Advanced",
            xp_value: 30,
            icon_url: "/icons/new-markets.svg",
            tags: ["new markets", "positioning", "expansion"]
          }
        ]
      },
      "Compelling Messaging": {
        slug: "compelling-messaging",
        description: "Learn to craft clear, resonant messages that communicate value and drive action across different audiences and channels.",
        xp_value: 110,
        icon_url: "/icons/messaging.svg",
        lessons: [
          {
            title: "What is a Message?",
            slug: "what-is-a-message",
            duration: 20,
            difficulty: "Beginner",
            xp_value: 15,
            icon_url: "/icons/message-basics.svg",
            tags: ["messaging", "fundamentals", "communication"]
          },
          {
            title: "Messaging Frameworks Overview",
            slug: "messaging-frameworks-overview",
            duration: 30,
            difficulty: "Beginner",
            xp_value: 25,
            icon_url: "/icons/messaging-frameworks.svg",
            tags: ["frameworks", "messaging", "structure"]
          },
          {
            title: "Defining Your Value Proposition",
            slug: "defining-your-value-proposition",
            duration: 35,
            difficulty: "Intermediate",
            xp_value: 30,
            icon_url: "/icons/value-prop.svg",
            tags: ["value proposition", "benefits", "messaging"]
          },
          {
            title: "Writing Clear and Resonant Messages",
            slug: "writing-clear-resonant-messages",
            duration: 40,
            difficulty: "Intermediate",
            xp_value: 35,
            icon_url: "/icons/clear-messages.svg",
            tags: ["writing", "clarity", "resonance"]
          },
          {
            title: "Adapting Messages for Different Audiences",
            slug: "adapting-messages-different-audiences",
            duration: 35,
            difficulty: "Advanced",
            xp_value: 30,
            icon_url: "/icons/audience-adaptation.svg",
            tags: ["audience", "adaptation", "personalization"]
          }
        ]
      },
      "Go-To-Market Strategy": {
        slug: "go-to-market-strategy",
        description: "Design comprehensive go-to-market strategies that ensure successful product launches and sustainable growth.",
        xp_value: 130,
        icon_url: "/icons/gtm.svg",
        lessons: [
          {
            title: "What is a GTM Strategy?",
            slug: "what-is-gtm-strategy",
            duration: 25,
            difficulty: "Beginner",
            xp_value: 20,
            icon_url: "/icons/gtm-basics.svg",
            tags: ["GTM", "strategy", "fundamentals"]
          },
          {
            title: "GTM vs. Launch vs. Messaging",
            slug: "gtm-vs-launch-vs-messaging",
            duration: 30,
            difficulty: "Beginner",
            xp_value: 25,
            icon_url: "/icons/gtm-comparison.svg",
            tags: ["GTM", "launch", "messaging", "differences"]
          },
          {
            title: "Components of an Effective GTM Strategy",
            slug: "components-effective-gtm-strategy",
            duration: 40,
            difficulty: "Intermediate",
            xp_value: 35,
            icon_url: "/icons/gtm-components.svg",
            tags: ["GTM", "components", "strategy"]
          },
          {
            title: "Setting GTM Goals and Metrics",
            slug: "setting-gtm-goals-metrics",
            duration: 35,
            difficulty: "Intermediate",
            xp_value: 30,
            icon_url: "/icons/goals-metrics.svg",
            tags: ["goals", "metrics", "KPIs"]
          },
          {
            title: "Identifying Target Customers",
            slug: "identifying-target-customers",
            duration: 30,
            difficulty: "Intermediate",
            xp_value: 25,
            icon_url: "/icons/target-customers.svg",
            tags: ["target customers", "segmentation", "ICP"]
          },
          {
            title: "Channel and Budget Planning",
            slug: "channel-budget-planning",
            duration: 35,
            difficulty: "Advanced",
            xp_value: 30,
            icon_url: "/icons/channel-budget.svg",
            tags: ["channels", "budget", "planning"]
          }
        ]
      }
    }
  },
  "Professional Product Marketer": {
    slug: "professional-product-marketer",
    courses: {
      "Advanced Strategic Positioning": {
        slug: "advanced-strategic-positioning",
        description: "Master sophisticated positioning strategies for complex products, multi-segment markets, and competitive landscapes.",
        xp_value: 160,
        icon_url: "/icons/advanced-positioning.svg",
        lessons: [
          {
            title: "Enterprise Positioning Strategies",
            slug: "enterprise-positioning-strategies",
            duration: 45,
            difficulty: "Advanced",
            xp_value: 40,
            icon_url: "/icons/enterprise.svg",
            tags: ["enterprise", "positioning", "B2B"]
          },
          {
            title: "Multi-Product Portfolio Positioning",
            slug: "multi-product-portfolio-positioning",
            duration: 50,
            difficulty: "Advanced",
            xp_value: 45,
            icon_url: "/icons/portfolio.svg",
            tags: ["portfolio", "positioning", "product suite"]
          },
          {
            title: "International Market Positioning",
            slug: "international-market-positioning",
            duration: 55,
            difficulty: "Advanced",
            xp_value: 50,
            icon_url: "/icons/international.svg",
            tags: ["international", "global markets", "localization"]
          },
          {
            title: "Positioning in Emerging Markets",
            slug: "positioning-emerging-markets",
            duration: 40,
            difficulty: "Advanced",
            xp_value: 35,
            icon_url: "/icons/emerging.svg",
            tags: ["emerging markets", "new categories", "innovation"]
          }
        ]
      },
      "Advanced Messaging Architecture": {
        slug: "advanced-messaging-architecture",
        description: "Build comprehensive messaging systems that work across complex organizations, multiple audiences, and varied channels.",
        xp_value: 140,
        icon_url: "/icons/messaging-architecture.svg",
        lessons: [
          {
            title: "Message Hierarchy and Systems",
            slug: "message-hierarchy-systems",
            duration: 45,
            difficulty: "Advanced",
            xp_value: 40,
            icon_url: "/icons/hierarchy.svg",
            tags: ["message hierarchy", "systems", "architecture"]
          },
          {
            title: "Persona-Based Messaging Strategy",
            slug: "persona-based-messaging-strategy",
            duration: 40,
            difficulty: "Advanced",
            xp_value: 35,
            icon_url: "/icons/persona-messaging.svg",
            tags: ["personas", "messaging", "segmentation"]
          },
          {
            title: "Channel-Specific Message Adaptation",
            slug: "channel-specific-message-adaptation",
            duration: 50,
            difficulty: "Advanced",
            xp_value: 45,
            icon_url: "/icons/channel-adaptation.svg",
            tags: ["channels", "adaptation", "omnichannel"]
          },
          {
            title: "Message Testing and Optimization",
            slug: "message-testing-optimization",
            duration: 45,
            difficulty: "Advanced",
            xp_value: 40,
            icon_url: "/icons/message-testing.svg",
            tags: ["testing", "optimization", "measurement"]
          }
        ]
      },
      "Enterprise GTM Strategy": {
        slug: "enterprise-gtm-strategy",
        description: "Design and execute sophisticated go-to-market strategies for enterprise products, including partner ecosystems and complex sales cycles.",
        xp_value: 180,
        icon_url: "/icons/enterprise-gtm.svg",
        lessons: [
          {
            title: "Enterprise Sales Enablement",
            slug: "enterprise-sales-enablement",
            duration: 50,
            difficulty: "Advanced",
            xp_value: 45,
            icon_url: "/icons/sales-enablement.svg",
            tags: ["sales enablement", "enterprise", "B2B"]
          },
          {
            title: "Partner Ecosystem Strategy",
            slug: "partner-ecosystem-strategy",
            duration: 55,
            difficulty: "Advanced",
            xp_value: 50,
            icon_url: "/icons/partner-ecosystem.svg",
            tags: ["partners", "ecosystem", "channel strategy"]
          },
          {
            title: "Account-Based Marketing",
            slug: "account-based-marketing",
            duration: 45,
            difficulty: "Advanced",
            xp_value: 40,
            icon_url: "/icons/abm.svg",
            tags: ["ABM", "account-based", "enterprise"]
          },
          {
            title: "Complex Deal Strategy",
            slug: "complex-deal-strategy",
            duration: 50,
            difficulty: "Advanced",
            xp_value: 45,
            icon_url: "/icons/complex-deals.svg",
            tags: ["complex sales", "deal strategy", "enterprise"]
          },
          {
            title: "Global Launch Orchestration",
            slug: "global-launch-orchestration",
            duration: 60,
            difficulty: "Advanced",
            xp_value: 55,
            icon_url: "/icons/global-launch.svg",
            tags: ["global launch", "orchestration", "scaling"]
          }
        ]
      }
    }
  }
};

// Create basic lesson content template
function createLessonContent(title, tags = [], authorId = null) {
  return {
    __component: 'lesson.lesson-page-template-1',
    author: authorId,
    shortDescription: `<p>In this lesson on <strong>${title.toLowerCase()}</strong>, you will learn key concepts, practical frameworks, and actionable strategies that you can immediately apply to your work.</p>`,
    sections: [
      {
        __component: 'lesson.rich-text-section',
        sectionTitle: 'Learning Objectives',
        content: `<p>By the end of this lesson on <strong>${title.toLowerCase()}</strong>, you will be able to:</p><ul><li>Understand key concepts and theoretical foundations</li><li>Apply practical frameworks to real-world scenarios</li><li>Implement actionable strategies in your work</li><li>Recognize common pitfalls and how to avoid them</li></ul>`,
      },
      {
        __component: 'lesson.rich-text-section',
        sectionTitle: 'Key Concepts',
        content: '<p>This section covers the fundamental principles and theoretical foundations you need to master. We\'ll explore industry best practices, proven methodologies, and the strategic thinking behind successful implementation.</p>',
      },
      {
        __component: 'lesson.rich-text-section',
        sectionTitle: 'Practical Applications',
        content: '<p>Learn how to apply these concepts in real-world marketing scenarios with hands-on examples and case studies. We\'ll walk through step-by-step processes and demonstrate how theory translates into practice.</p>',
      },
      {
        __component: 'lesson.rich-text-section',
        sectionTitle: 'Best Practices',
        content: '<p>Discover industry best practices and proven strategies that successful marketers use to achieve results. These insights come from years of experience and real-world testing.</p>',
      },
      {
        __component: 'lesson.rich-text-section',
        sectionTitle: 'Common Pitfalls',
        content: '<p>Understand common mistakes to avoid and how to overcome typical challenges in implementation. Learning from others\' mistakes can save you time and resources.</p>',
      },
      {
        __component: 'lesson.rich-text-section',
        sectionTitle: 'Next Steps',
        content: '<p>Action items and resources to continue your learning journey and apply what you\'ve learned. Take these concrete steps to implement your new knowledge.</p>',
      }
    ],
    note: {
      __component: 'lesson.note',
      title: '📝 Key Learning Notes',
      content: `Key Tags: ${tags.join(', ')}\n\n💡 Pro Tip: Practice these concepts with real examples from your own work or industry to solidify your understanding.`
    }
  };
}

// Create quiz questions based on lesson content
function createQuizQuestions(lessonTitle, lessonTags) {
  const questions = [
    {
      questionText: `What is the primary objective of ${lessonTitle.toLowerCase()}?`,
      questionType: 'multipleChoice',
      order: 1,
      answerOptions: [
        { title: 'To understand core principles and frameworks', isCorrect: true },
        { title: 'To memorize industry statistics', isCorrect: false },
        { title: 'To complete the course quickly', isCorrect: false },
        { title: 'To collect certification points', isCorrect: false }
      ]
    },
    {
      questionText: 'Practical application is more important than theoretical knowledge in marketing.',
      questionType: 'trueFalse',
      order: 2,
      answerOptions: [
        { title: 'True', isCorrect: true },
        { title: 'False', isCorrect: false }
      ]
    },
    {
      questionText: 'Which of the following are key success factors? (Select all that apply)',
      questionType: 'multiSelect',
      order: 3,
      answerOptions: [
        { title: 'Clear objectives', isCorrect: true },
        { title: 'Data-driven decisions', isCorrect: true },
        { title: 'Ignoring customer feedback', isCorrect: false },
        { title: 'Continuous optimization', isCorrect: true },
        { title: 'One-size-fits-all approach', isCorrect: false }
      ]
    }
  ];

  return questions;
}

async function seedComprehensiveData(strapi) {
  console.log('🌱 Starting comprehensive seed for Track > Course > Lesson structure...');

  try {
    // First, create a default author that we can use for all lessons
    console.log('👤 Creating default author...');
    const defaultAuthor = await strapi.entityService.create('api::author.author', {
      data: {
        name: 'Sarah Johnson',
        title: 'Senior Marketing Strategist',
        bio: 'Experienced marketing professional with 8+ years in product marketing, growth strategy, and content development.',
        publishedAt: new Date(),
      },
    });
    console.log('✅ Created default author:', defaultAuthor.name);

    let trackOrder = 0;

    // Iterate through each track in the data
    for (const [trackTitle, trackData] of Object.entries(TRACK_DATA)) {
      trackOrder++;

      console.log(`\n📚 Creating track: ${trackTitle}`);

      // Create Track
      const track = await strapi.entityService.create('api::track.track', {
        data: {
          title: trackTitle,
          slug: trackData.slug,
          track_id: `track-${trackData.slug}`,
          publishedAt: new Date(),
        },
      });

      console.log(`✅ Created track: ${track.title}`);

      let courseOrder = 0;

      // Iterate through courses for this track
      for (const [courseTitle, courseData] of Object.entries(trackData.courses)) {
        courseOrder++;

        console.log(`  📖 Creating course: ${courseTitle}`);

        // Create Course
        const course = await strapi.entityService.create('api::course.course', {
          data: {
            title: courseTitle,
            slug: courseData.slug,
            description: courseData.description,
            course_id: `course-${courseData.slug}`,
            order: courseOrder,
            xp_value: courseData.xp_value,
            icon_url: courseData.icon_url,
            track: track.id,
            publishedAt: new Date(),
          },
        });

        console.log(`    ✅ Created course: ${course.title}`);

        let lessonOrder = 0;

        // Iterate through lessons for this course
        for (const lessonData of courseData.lessons) {
          lessonOrder++;

          console.log(`    📝 Creating lesson: ${lessonData.title}`);

          // Create Lesson
          const lesson = await strapi.entityService.create('api::lesson.lesson', {
            data: {
              title: lessonData.title,
              slug: lessonData.slug,
              duration: lessonData.duration,
              difficulty: lessonData.difficulty,
              order: lessonOrder,
              xp_value: lessonData.xp_value,
              icon_url: lessonData.icon_url,
              tags: lessonData.tags,
              course: course.id,
              content: createLessonContent(lessonData.title, lessonData.tags, defaultAuthor.id),
              publishedAt: new Date(),
            },
          });

          console.log(`      ✅ Created lesson: ${lesson.title}`);

          // Create Quiz for the lesson
          const quiz = await strapi.entityService.create('api::quiz.quiz', {
            data: {
              title: `Quiz: ${lessonData.title}`,
              description: `Test your understanding of ${lessonData.title.toLowerCase()} concepts and best practices.`,
              totalQuestions: 3,
              passingScore: 70,
              timeLimit: 5,
              lesson: lesson.id,
              publishedAt: new Date(),
            },
          });

          // Create Questions for the quiz
          const questions = createQuizQuestions(lessonData.title, lessonData.tags);

          for (const questionData of questions) {
            await strapi.entityService.create('api::question.question', {
              data: {
                ...questionData,
                quiz: quiz.id,
                publishedAt: new Date(),
              },
            });
          }

          console.log(`      ✅ Created quiz with questions for: ${lessonData.title}`);
        }
      }
    }

    console.log('\n🎉 Comprehensive seed completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Tracks created: ${Object.keys(TRACK_DATA).length}`);
    console.log(`   - Courses created: ${Object.values(TRACK_DATA).reduce((acc, track) => acc + Object.keys(track.courses).length, 0)}`);
    console.log(`   - Lessons created: ${Object.values(TRACK_DATA).reduce((acc, track) => acc + Object.values(track.courses).reduce((courseAcc, course) => courseAcc + course.lessons.length, 0), 0)}`);

    return true;
  } catch (error) {
    console.error('❌ Comprehensive seed failed:', error);
    throw error;
  }
}

module.exports = seedComprehensiveData;