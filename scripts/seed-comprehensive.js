// Comprehensive seed script for Track > Course > Lesson structure
const fs = require("fs");
const path = require("path");

// CONFIGURATION: Update this array with your uploaded media IDs
// Upload 2-3 icons in Strapi Media Library and get their IDs
const ICON_MEDIA_IDS = [
  // Add your media IDs here, e.g.:
  // 1, 2, 3
  // If empty, no icons will be assigned
  16, 15, 13, 14,
];

// Helper function to get a random icon ID from the array
function getRandomIcon() {
  if (ICON_MEDIA_IDS.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * ICON_MEDIA_IDS.length);
  return ICON_MEDIA_IDS[randomIndex];
}

// Track data based on the actual structure from the screenshot
const TRACK_DATA = {
  "Aspiring Product Marketer": {
    slug: "aspiring-product-marketer",
    courses: {
      "Strategic Positioning": {
        slug: "strategic-positioning",
        description:
          "Master the fundamentals of strategic positioning to differentiate your product and create compelling market narratives.",
        xp_value: 140,
        lessons: [
          {
            title: "Why Positioning Matters",
            slug: "why-positioning-matters",
            duration: 25,
            difficulty: "Beginner",
            xp_value: 20,
            tags: ["positioning", "fundamentals", "strategy"],
          },
          {
            title: "Positioning vs. Messaging vs. Branding",
            slug: "positioning-vs-messaging-vs-branding",
            duration: 30,
            difficulty: "Beginner",
            xp_value: 25,
            tags: ["positioning", "messaging", "branding"],
          },
          {
            title: "Positioning Frameworks Overview",
            slug: "positioning-frameworks-overview",
            duration: 35,
            difficulty: "Beginner",
            xp_value: 30,
            tags: ["frameworks", "positioning", "methodology"],
          },
          {
            title: "Elements of a Strong Positioning Statement",
            slug: "elements-of-strong-positioning-statement",
            duration: 40,
            difficulty: "Intermediate",
            xp_value: 35,
            tags: ["positioning statement", "elements", "structure"],
          },
          {
            title: "Writing and Refining Your Positioning Statement",
            slug: "writing-refining-positioning-statement",
            duration: 45,
            difficulty: "Intermediate",
            xp_value: 40,
            tags: ["writing", "positioning", "refinement"],
          },
          {
            title: "Analyzing Competitor Positioning",
            slug: "analyzing-competitor-positioning",
            duration: 35,
            difficulty: "Intermediate",
            xp_value: 30,
            tags: ["competitive analysis", "positioning", "research"],
          },
          {
            title: "Differentiation Strategies",
            slug: "differentiation-strategies",
            duration: 40,
            difficulty: "Advanced",
            xp_value: 35,
            tags: ["differentiation", "strategy", "competitive advantage"],
          },
          {
            title: "Positioning for New Markets",
            slug: "positioning-for-new-markets",
            duration: 35,
            difficulty: "Advanced",
            xp_value: 30,
            tags: ["new markets", "positioning", "expansion"],
          },
        ],
      },
      "Compelling Messaging": {
        slug: "compelling-messaging",
        description:
          "Learn to craft clear, resonant messages that communicate value and drive action across different audiences and channels.",
        xp_value: 110,
        lessons: [
          {
            title: "What is a Message?",
            slug: "what-is-a-message",
            duration: 20,
            difficulty: "Beginner",
            xp_value: 15,
            tags: ["messaging", "fundamentals", "communication"],
          },
          {
            title: "Messaging Frameworks Overview",
            slug: "messaging-frameworks-overview",
            duration: 30,
            difficulty: "Beginner",
            xp_value: 25,
            tags: ["frameworks", "messaging", "structure"],
          },
          {
            title: "Defining Your Value Proposition",
            slug: "defining-your-value-proposition",
            duration: 35,
            difficulty: "Intermediate",
            xp_value: 30,
            tags: ["value proposition", "benefits", "messaging"],
          },
          {
            title: "Writing Clear and Resonant Messages",
            slug: "writing-clear-resonant-messages",
            duration: 40,
            difficulty: "Intermediate",
            xp_value: 35,
            tags: ["writing", "clarity", "resonance"],
          },
          {
            title: "Adapting Messages for Different Audiences",
            slug: "adapting-messages-different-audiences",
            duration: 35,
            difficulty: "Advanced",
            xp_value: 30,
            tags: ["audience", "adaptation", "personalization"],
          },
        ],
      },
      "Go-To-Market Strategy": {
        slug: "go-to-market-strategy",
        description:
          "Design comprehensive go-to-market strategies that ensure successful product launches and sustainable growth.",
        xp_value: 130,
        lessons: [
          {
            title: "What is a GTM Strategy?",
            slug: "what-is-gtm-strategy",
            duration: 25,
            difficulty: "Beginner",
            xp_value: 20,
            tags: ["GTM", "strategy", "fundamentals"],
          },
          {
            title: "GTM vs. Launch vs. Messaging",
            slug: "gtm-vs-launch-vs-messaging",
            duration: 30,
            difficulty: "Beginner",
            xp_value: 25,
            tags: ["GTM", "launch", "messaging", "differences"],
          },
          {
            title: "Components of an Effective GTM Strategy",
            slug: "components-effective-gtm-strategy",
            duration: 40,
            difficulty: "Intermediate",
            xp_value: 35,
            tags: ["GTM", "components", "strategy"],
          },
          {
            title: "Setting GTM Goals and Metrics",
            slug: "setting-gtm-goals-metrics",
            duration: 35,
            difficulty: "Intermediate",
            xp_value: 30,
            tags: ["goals", "metrics", "KPIs"],
          },
          {
            title: "Identifying Target Customers",
            slug: "identifying-target-customers",
            duration: 30,
            difficulty: "Intermediate",
            xp_value: 25,
            tags: ["target customers", "segmentation", "ICP"],
          },
          {
            title: "Channel and Budget Planning",
            slug: "channel-budget-planning",
            duration: 35,
            difficulty: "Advanced",
            xp_value: 30,
            tags: ["channels", "budget", "planning"],
          },
        ],
      },
    },
  },
  "Professional Product Marketer": {
    slug: "professional-product-marketer",
    courses: {
      "Advanced Strategic Positioning": {
        slug: "advanced-strategic-positioning",
        description:
          "Master sophisticated positioning strategies for complex products, multi-segment markets, and competitive landscapes.",
        xp_value: 160,
        lessons: [
          {
            title: "Enterprise Positioning Strategies",
            slug: "enterprise-positioning-strategies",
            duration: 45,
            difficulty: "Advanced",
            xp_value: 40,
            tags: ["enterprise", "positioning", "B2B"],
          },
          {
            title: "Multi-Product Portfolio Positioning",
            slug: "multi-product-portfolio-positioning",
            duration: 50,
            difficulty: "Advanced",
            xp_value: 45,
            tags: ["portfolio", "positioning", "product suite"],
          },
          {
            title: "International Market Positioning",
            slug: "international-market-positioning",
            duration: 55,
            difficulty: "Advanced",
            xp_value: 50,
            tags: ["international", "global markets", "localization"],
          },
          {
            title: "Positioning in Emerging Markets",
            slug: "positioning-emerging-markets",
            duration: 40,
            difficulty: "Advanced",
            xp_value: 35,
            tags: ["emerging markets", "new categories", "innovation"],
          },
        ],
      },
      "Advanced Messaging Architecture": {
        slug: "advanced-messaging-architecture",
        description:
          "Build comprehensive messaging systems that work across complex organizations, multiple audiences, and varied channels.",
        xp_value: 140,
        lessons: [
          {
            title: "Message Hierarchy and Systems",
            slug: "message-hierarchy-systems",
            duration: 45,
            difficulty: "Advanced",
            xp_value: 40,
            tags: ["message hierarchy", "systems", "architecture"],
          },
          {
            title: "Persona-Based Messaging Strategy",
            slug: "persona-based-messaging-strategy",
            duration: 40,
            difficulty: "Advanced",
            xp_value: 35,
            tags: ["personas", "messaging", "segmentation"],
          },
          {
            title: "Channel-Specific Message Adaptation",
            slug: "channel-specific-message-adaptation",
            duration: 50,
            difficulty: "Advanced",
            xp_value: 45,
            tags: ["channels", "adaptation", "omnichannel"],
          },
          {
            title: "Message Testing and Optimization",
            slug: "message-testing-optimization",
            duration: 45,
            difficulty: "Advanced",
            xp_value: 40,
            tags: ["testing", "optimization", "measurement"],
          },
        ],
      },
      "Enterprise GTM Strategy": {
        slug: "enterprise-gtm-strategy",
        description:
          "Design and execute sophisticated go-to-market strategies for enterprise products, including partner ecosystems and complex sales cycles.",
        xp_value: 180,
        lessons: [
          {
            title: "Enterprise Sales Enablement",
            slug: "enterprise-sales-enablement",
            duration: 50,
            difficulty: "Advanced",
            xp_value: 45,
            tags: ["sales enablement", "enterprise", "B2B"],
          },
          {
            title: "Partner Ecosystem Strategy",
            slug: "partner-ecosystem-strategy",
            duration: 55,
            difficulty: "Advanced",
            xp_value: 50,
            tags: ["partners", "ecosystem", "channel strategy"],
          },
          {
            title: "Account-Based Marketing",
            slug: "account-based-marketing",
            duration: 45,
            difficulty: "Advanced",
            xp_value: 40,
            tags: ["ABM", "account-based", "enterprise"],
          },
          {
            title: "Complex Deal Strategy",
            slug: "complex-deal-strategy",
            duration: 50,
            difficulty: "Advanced",
            xp_value: 45,
            tags: ["complex sales", "deal strategy", "enterprise"],
          },
          {
            title: "Global Launch Orchestration",
            slug: "global-launch-orchestration",
            duration: 60,
            difficulty: "Advanced",
            xp_value: 55,
            tags: ["global launch", "orchestration", "scaling"],
          },
        ],
      },
    },
  },
};

// Create basic lesson content template
function createLessonContent(title, tags = [], authorId = null) {
  return {
    __component: "lesson.lesson-page-template-1",
    author: authorId,
    shortDescription: `<p>In this lesson on <strong>${title.toLowerCase()}</strong>, you will learn key concepts and strategies.</p>`,
    sections: [
      {
        __component: "lesson.rich-text-section",
        sectionTitle: "Learning Objectives",
        content: `<p>By the end of this lesson on <strong>${title.toLowerCase()}</strong>, you will understand key concepts and practical applications.</p>`,
      }
    ],
    note: {
      __component: "lesson.note",
      title: "Key Learning Notes",
      content: `Key Tags: ${tags.join(", ")}`,
    },
  };
}

// Create quiz questions based on lesson content
function createQuizQuestions(lessonTitle, lessonTags) {
  const questions = [
    {
      questionText: `What is the primary objective of ${lessonTitle.toLowerCase()}?`,
      questionType: "multipleChoice",
      order: 1,
      answerOptions: [
        {
          title: "To understand core principles and frameworks",
          isCorrect: true,
        },
        { title: "To memorize industry statistics", isCorrect: false },
        { title: "To complete the course quickly", isCorrect: false },
        { title: "To collect certification points", isCorrect: false },
      ],
    },
    {
      questionText:
        "Practical application is more important than theoretical knowledge in marketing.",
      questionType: "trueFalse",
      order: 2,
      answerOptions: [
        { title: "True", isCorrect: true },
        { title: "False", isCorrect: false },
      ],
    },
    {
      questionText:
        "Which of the following are key success factors? (Select all that apply)",
      questionType: "multiSelect",
      order: 3,
      answerOptions: [
        { title: "Clear objectives", isCorrect: true },
        { title: "Data-driven decisions", isCorrect: true },
        { title: "Ignoring customer feedback", isCorrect: false },
        { title: "Continuous optimization", isCorrect: true },
        { title: "One-size-fits-all approach", isCorrect: false },
      ],
    },
  ];

  return questions;
}

async function seedComprehensiveData(strapi) {
  console.log(
    "🌱 Starting comprehensive seed for Track > Course > Lesson structure..."
  );

  try {
    // First, create a default author that we can use for all lessons
    console.log("👤 Creating default author...");
    const defaultAuthor = await strapi.entityService.create(
      "api::author.author",
      {
        data: {
          name: "Sarah Johnson",
          title: "Senior Marketing Strategist",
          bio: "Experienced marketing professional with 8+ years in product marketing, growth strategy, and content development.",
          publishedAt: new Date(),
        },
      }
    );
    console.log("✅ Created default author:", defaultAuthor.name);

    let trackOrder = 0;

    // Iterate through each track in the data
    for (const [trackTitle, trackData] of Object.entries(TRACK_DATA)) {
      trackOrder++;

      console.log(`\n📚 Creating track: ${trackTitle}`);

      // Create Track
      const track = await strapi.entityService.create("api::track.track", {
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
      for (const [courseTitle, courseData] of Object.entries(
        trackData.courses
      )) {
        courseOrder++;

        console.log(`  📖 Creating course: ${courseTitle}`);

        // Create Course
        const courseCreateData = {
          title: courseTitle,
          slug: courseData.slug,
          description: courseData.description,
          course_id: `course-${courseData.slug}`,
          order: courseOrder,
          xp_value: courseData.xp_value,
          track: track.id,
          publishedAt: new Date(),
        };

        const randomIcon = getRandomIcon();
        if (randomIcon) {
          courseCreateData.icon = randomIcon;
        }

        const course = await strapi.entityService.create("api::course.course", {
          data: courseCreateData,
        });

        console.log(`    ✅ Created course: ${course.title}`);

        let lessonOrder = 0;

        // Iterate through lessons for this course
        for (const lessonData of courseData.lessons) {
          lessonOrder++;

          console.log(`    📝 Creating lesson: ${lessonData.title}`);

          // Create Lesson
          const lessonCreateData = {
            title: lessonData.title,
            slug: lessonData.slug,
            duration: lessonData.duration,
            difficulty: lessonData.difficulty,
            order: lessonOrder,
            xp_value: lessonData.xp_value,
            tags: lessonData.tags,
            course: course.documentId,
            content: createLessonContent(
              lessonData.title,
              lessonData.tags,
              defaultAuthor.id
            ),
            publishedAt: new Date(),
          };

          const randomIcon = getRandomIcon();
          if (randomIcon) {
            lessonCreateData.icon = randomIcon;
          }

          const lesson = await strapi.entityService.create(
            "api::lesson.lesson",
            {
              data: lessonCreateData,
            }
          );

          console.log(`      ✅ Created lesson: ${lesson.title}`);

          // Create Quiz for the lesson
          const quiz = await strapi.entityService.create("api::quiz.quiz", {
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
          const questions = createQuizQuestions(
            lessonData.title,
            lessonData.tags
          );

          for (const questionData of questions) {
            await strapi.entityService.create("api::question.question", {
              data: {
                ...questionData,
                quiz: quiz.id,
                publishedAt: new Date(),
              },
            });
          }

          console.log(
            `      ✅ Created quiz with questions for: ${lessonData.title}`
          );
        }
      }
    }

    console.log("\n🎉 Comprehensive seed completed successfully!");
    console.log(`📊 Summary:`);
    console.log(`   - Tracks created: ${Object.keys(TRACK_DATA).length}`);
    console.log(
      `   - Courses created: ${Object.values(TRACK_DATA).reduce((acc, track) => acc + Object.keys(track.courses).length, 0)}`
    );
    console.log(
      `   - Lessons created: ${Object.values(TRACK_DATA).reduce((acc, track) => acc + Object.values(track.courses).reduce((courseAcc, course) => courseAcc + course.lessons.length, 0), 0)}`
    );

    return true;
  } catch (error) {
    console.error("❌ Comprehensive seed failed:", error);
    throw error;
  }
}

module.exports = seedComprehensiveData;
