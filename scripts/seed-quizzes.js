// Quiz seed script for creating quizzes linked to existing lessons
const fs = require("fs");

// CONFIGURATION: Update this array with your uploaded media IDs for quiz icons
const QUIZ_ICON_MEDIA_IDS = [
  // Add your media IDs here, e.g.: 1, 2, 3, 4, 5
  // If empty, no icons will be assigned
  10,
];

// CONFIGURATION: Set to true to delete all existing quizzes and questions before seeding
const RESET_BEFORE_SEED = true;

// Helper function to get a random icon ID from the array
function getRandomIcon() {
  if (QUIZ_ICON_MEDIA_IDS.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * QUIZ_ICON_MEDIA_IDS.length);
  return QUIZ_ICON_MEDIA_IDS[randomIndex];
}

// Helper to create option with optional icon
function createOption(title, description, isCorrect, explanation = null) {
  const option = {
    title,
    description,
    isCorrect,
    order: 0,
  };

  const iconId = getRandomIcon();
  if (iconId) {
    option.icon = iconId;
  }

  if (explanation) {
    option.explanation = explanation;
  }

  return option;
}

// Helper to create draggable item with optional icon
function createDraggableItem(
  title,
  description,
  category = null,
  correctPosition = null,
  isCorrectChoice = false
) {
  const item = {
    title,
    description,
  };

  const iconId = getRandomIcon();
  if (iconId) {
    item.icon = iconId;
  }

  if (category) item.category = category;
  if (correctPosition !== null) item.correctPosition = correctPosition;
  if (isCorrectChoice !== false) item.isCorrectChoice = isCorrectChoice;

  return item;
}

// Helper to create blank field with dropdown options
function createBlankField(blankId, options) {
  return {
    blankId,
    dropdownOptions: options.map((opt) => ({
      title: opt.title,
      isCorrect: opt.isCorrect,
    })),
  };
}

// Quiz data for different lessons
const QUIZ_DATA = [
  {
    lessonSlug: "why-positioning-matters",
    quiz: {
      title: "Quiz: Why Positioning Matters",
      slug: "why-positioning-matters-quiz",
      description: "Test your understanding of positioning fundamentals",
      totalQuestions: 5,
      passingScore: 75,
      timeLimit: 12,
      questions: [
        {
          questionText: "What is the primary goal of strategic positioning?",
          questionType: "multipleChoice",
          order: 1,
          points: 1,
          content: [
            {
              __component: "question.multiple-choice-content",
              options: [
                createOption(
                  "To differentiate your product in the market",
                  "Position your product uniquely against competitors",
                  true,
                  "Correct! Strategic positioning is about creating a distinct place in the customer's mind."
                ),
                createOption(
                  "To increase advertising budget",
                  "Spend more on marketing campaigns",
                  false,
                  "Positioning is about perception, not budget size."
                ),
                createOption(
                  "To copy competitor strategies",
                  "Replicate what competitors are doing",
                  false,
                  "Effective positioning requires differentiation, not imitation."
                ),
                createOption(
                  "To lower product prices",
                  "Compete primarily on price",
                  false,
                  "Price is just one element; positioning is about overall value perception."
                ),
              ],
            },
          ],
        },
        {
          questionText:
            "Effective positioning helps customers understand your unique value proposition.",
          questionType: "trueFalse",
          order: 2,
          points: 1,
          content: [
            {
              __component: "question.true-false-content",
              correctAnswer: true,
              trueExplanation:
                "Yes! Positioning clarifies what makes your product uniquely valuable to customers.",
              falseExplanation:
                "Actually, positioning is crucial for communicating your unique value to the market.",
            },
          ],
        },
        {
          questionText:
            "Which of the following are key components of positioning? (Select all that apply)",
          questionType: "multiSelect",
          order: 3,
          points: 1,
          instruction: "Select all correct answers",
          content: [
            {
              __component: "question.multi-select-content",
              minSelections: 1,
              maxSelections: 4,
              selectionType: "minimum",
              options: [
                createOption(
                  "Target audience definition",
                  "Identifying who your product serves",
                  true
                ),
                createOption(
                  "Competitive differentiation",
                  "What makes you different from competitors",
                  true
                ),
                createOption(
                  "Value proposition",
                  "The unique value you deliver",
                  true
                ),
                createOption(
                  "Office location",
                  "Where your company is headquartered",
                  false
                ),
              ],
            },
          ],
        },
        {
          questionText: "Rank these positioning steps in the correct order",
          questionType: "dragDropRanking",
          order: 4,
          points: 1,
          instruction: "Drag items to put them in the correct sequence",
          content: [
            {
              __component: "question.drag-drop-content",
              maxSelections: 4,
              validationType: "exact_order",
              sourceItems: [
                createDraggableItem(
                  "Identify target market",
                  "Define who you're serving",
                  null,
                  0,
                  true
                ),
                createDraggableItem(
                  "Analyze competitors",
                  "Understand the competitive landscape",
                  null,
                  1,
                  true
                ),
                createDraggableItem(
                  "Define differentiation",
                  "Determine what makes you unique",
                  null,
                  2,
                  true
                ),
                createDraggableItem(
                  "Craft positioning statement",
                  "Articulate your position clearly",
                  null,
                  3,
                  true
                ),
              ],
              targetZones: [
                {
                  zoneId: "solution_box",
                  label: "Correct Order",
                  zoneType: "ranking",
                  maxItems: 4,
                  order: 0,
                  placeholderText: "Drag items here in order",
                },
              ],
            },
          ],
        },
        {
          questionText: "Complete the sentence about strategic positioning:",
          questionType: "fillInBlanks",
          order: 5,
          points: 1,
          instruction: "Select the correct words to complete the sentence",
          content: [
            {
              __component: "question.fill-blanks-content",
              sentenceTemplate:
                "Positioning is the process of creating a {{blank1}} place for your product in the {{blank2}} mind. It defines how you want your {{blank3}} to perceive your product relative to {{blank4}}.",
              blanks: [
                createBlankField("blank1", [
                  { title: "temporary", isCorrect: false },
                  { title: "distinct", isCorrect: true },
                  { title: "random", isCorrect: false },
                ]),
                createBlankField("blank2", [
                  { title: "competitor's", isCorrect: false },
                  { title: "customer's", isCorrect: true },
                  { title: "investor's", isCorrect: false },
                ]),
                createBlankField("blank3", [
                  { title: "employees", isCorrect: false },
                  { title: "shareholders", isCorrect: false },
                  { title: "target audience", isCorrect: true },
                ]),
                createBlankField("blank4", [
                  { title: "your pricing", isCorrect: false },
                  { title: "competitors", isCorrect: true },
                  { title: "your costs", isCorrect: false },
                ]),
              ],
            },
          ],
          explanation:
            "Strong positioning creates a unique and distinct place in customers' minds, helping them understand your value relative to alternatives in the market.",
        },
      ],
    },
  },
  {
    lessonSlug: "positioning-vs-messaging-vs-branding",
    quiz: {
      title: "Quiz: Positioning vs. Messaging vs. Branding",
      slug: "positioning-messaging-branding-quiz",
      description:
        "Test your knowledge of the differences between positioning, messaging, and branding",
      totalQuestions: 4,
      passingScore: 70,
      timeLimit: 10,
      questions: [
        {
          questionText:
            "Categorize each element into the correct marketing concept",
          questionType: "dragDropCategorize",
          order: 1,
          points: 1,
          instruction: "Drag each element to its corresponding category",
          content: [
            {
              __component: "question.drag-drop-content",
              maxSelections: 6,
              validationType: "categorization",
              sourceItems: [
                createDraggableItem(
                  "Target audience definition",
                  "Who the product is for",
                  "positioning"
                ),
                createDraggableItem(
                  "Logo design",
                  "Visual identity element",
                  "branding"
                ),
                createDraggableItem(
                  "Key messages for campaigns",
                  "Communication tactics",
                  "messaging"
                ),
                createDraggableItem(
                  "Competitive differentiation",
                  "Market position strategy",
                  "positioning"
                ),
                createDraggableItem(
                  "Brand colors and fonts",
                  "Visual identity system",
                  "branding"
                ),
                createDraggableItem(
                  "Value proposition communication",
                  "How benefits are articulated",
                  "messaging"
                ),
              ],
              targetZones: [
                {
                  zoneId: "positioning",
                  label: "Positioning",
                  zoneType: "category",
                  maxItems: 3,
                  order: 0,
                  placeholderText: "Drop positioning elements here",
                },
                {
                  zoneId: "messaging",
                  label: "Messaging",
                  zoneType: "category",
                  maxItems: 3,
                  order: 1,
                  placeholderText: "Drop messaging elements here",
                },
                {
                  zoneId: "branding",
                  label: "Branding",
                  zoneType: "category",
                  maxItems: 3,
                  order: 2,
                  placeholderText: "Drop branding elements here",
                },
              ],
            },
          ],
        },
        {
          questionText:
            "What is the relationship between positioning, messaging, and branding?",
          questionType: "multipleChoice",
          order: 2,
          points: 1,
          content: [
            {
              __component: "question.multiple-choice-content",
              options: [
                createOption(
                  "Positioning informs messaging, messaging expresses branding",
                  "They work in a sequential flow",
                  false
                ),
                createOption(
                  "Positioning is strategic, messaging is tactical, branding is visual",
                  "Each serves a different but complementary purpose",
                  true,
                  "Exactly! Positioning defines strategy, messaging communicates it, and branding makes it tangible."
                ),
                createOption(
                  "They are all the same thing with different names",
                  "No meaningful difference between them",
                  false
                ),
                createOption(
                  "Branding drives positioning and messaging",
                  "Visual identity comes first",
                  false
                ),
              ],
            },
          ],
        },
        {
          questionText:
            "Messaging should change frequently to stay relevant, while positioning remains more stable.",
          questionType: "trueFalse",
          order: 3,
          points: 1,
          content: [
            {
              __component: "question.true-false-content",
              correctAnswer: true,
              trueExplanation:
                "Correct! Positioning is your strategic foundation and should be stable, while messaging can adapt to different campaigns and audiences.",
              falseExplanation:
                "Actually, positioning should be stable as your strategic foundation, while messaging can be more flexible and tactical.",
            },
          ],
        },
        {
          questionText: "Fill in the blanks to complete this key concept:",
          questionType: "fillInBlanks",
          order: 4,
          points: 1,
          instruction: "Select the correct terms",
          content: [
            {
              __component: "question.fill-blanks-content",
              sentenceTemplate:
                "{{blank1}} defines where you compete, {{blank2}} defines how you communicate, and {{blank3}} defines how you look and feel.",
              blanks: [
                createBlankField("blank1", [
                  { title: "Messaging", isCorrect: false },
                  { title: "Positioning", isCorrect: true },
                  { title: "Branding", isCorrect: false },
                ]),
                createBlankField("blank2", [
                  { title: "positioning", isCorrect: false },
                  { title: "messaging", isCorrect: true },
                  { title: "branding", isCorrect: false },
                ]),
                createBlankField("blank3", [
                  { title: "positioning", isCorrect: false },
                  { title: "messaging", isCorrect: false },
                  { title: "branding", isCorrect: true },
                ]),
              ],
            },
          ],
          explanation:
            "These three elements work together: positioning is strategic (where), messaging is tactical (how to communicate), and branding is expressive (visual identity).",
        },
      ],
    },
  },
  {
    lessonSlug: "positioning-frameworks-overview",
    quiz: {
      title: "Quiz: Positioning Frameworks",
      slug: "positioning-frameworks-quiz",
      description: "Test your understanding of popular positioning frameworks",
      totalQuestions: 4,
      passingScore: 70,
      timeLimit: 10,
      questions: [
        {
          questionText:
            "Which positioning framework focuses on choosing a specific market segment to dominate?",
          questionType: "multipleChoice",
          order: 1,
          points: 1,
          content: [
            {
              __component: "question.multiple-choice-content",
              options: [
                createOption(
                  "Blue Ocean Strategy",
                  "Creating uncontested market space",
                  false
                ),
                createOption(
                  "Niche Positioning",
                  "Focusing on a specific market segment",
                  true,
                  "Right! Niche positioning is about becoming the dominant player in a specific segment."
                ),
                createOption(
                  "Mass Market Positioning",
                  "Appealing to everyone",
                  false
                ),
                createOption(
                  "Cost Leadership",
                  "Being the lowest price option",
                  false
                ),
              ],
            },
          ],
        },
        {
          questionText:
            "Select all frameworks that are commonly used for positioning",
          questionType: "multiSelect",
          order: 2,
          points: 1,
          instruction: "Select all that apply",
          content: [
            {
              __component: "question.multi-select-content",
              minSelections: 2,
              maxSelections: 5,
              selectionType: "minimum",
              options: [
                createOption(
                  "Perceptual Mapping",
                  "Visual positioning analysis",
                  true
                ),
                createOption(
                  "Value Proposition Canvas",
                  "Customer-centric positioning tool",
                  true
                ),
                createOption(
                  "Porter's Five Forces",
                  "Industry analysis framework",
                  false
                ),
                createOption(
                  "Jobs-to-be-Done",
                  "Understanding customer needs",
                  true
                ),
                createOption(
                  "SWOT Analysis",
                  "Strengths, weaknesses, opportunities, threats",
                  false
                ),
              ],
            },
          ],
        },
        {
          questionText:
            "A positioning framework helps you make strategic choices about your market position.",
          questionType: "trueFalse",
          order: 3,
          points: 1,
          content: [
            {
              __component: "question.true-false-content",
              correctAnswer: true,
              trueExplanation:
                "Absolutely! Frameworks provide structure for making strategic positioning decisions.",
              falseExplanation:
                "Frameworks are actually designed to guide strategic positioning choices.",
            },
          ],
        },
        {
          questionText: "Complete the sentence about positioning frameworks:",
          questionType: "fillInBlanks",
          order: 4,
          points: 1,
          instruction: "Choose the correct answers",
          content: [
            {
              __component: "question.fill-blanks-content",
              sentenceTemplate:
                "A good positioning framework helps you identify your {{blank1}}, understand your {{blank2}}, and articulate your unique {{blank3}} in a way that resonates with customers.",
              blanks: [
                createBlankField("blank1", [
                  { title: "competitors", isCorrect: false },
                  { title: "target market", isCorrect: true },
                  { title: "pricing strategy", isCorrect: false },
                ]),
                createBlankField("blank2", [
                  { title: "budget limits", isCorrect: false },
                  { title: "competitive landscape", isCorrect: true },
                  { title: "office location", isCorrect: false },
                ]),
                createBlankField("blank3", [
                  { title: "logo", isCorrect: false },
                  { title: "team size", isCorrect: false },
                  { title: "value proposition", isCorrect: true },
                ]),
              ],
            },
          ],
          explanation:
            "Frameworks guide you through identifying your target market, analyzing competition, and clearly defining what makes your offering valuable and different.",
        },
      ],
    },
  },
];

// Main seed function
async function seedQuizzes() {
  const strapiUrl = process.env.STRAPI_URL || "http://localhost:1337";
  const apiToken =
    process.env.STRAPI_API_TOKEN ||
    "b962ce9a6783e76c0df37f8d662781531c0d87f92094010cc5479415f35f6f0746722efe85a0a4b959a64d620f05265fe5500034274f0a98c2266ec277b56ba74139eda8c721e779a789baa083bb1c0a427e7474cb7deea810579bc29938c5325e11eb11da6b4e1547ad8a6634b86078e0d0a8977b30be0c95171da3bf8551b7";

  if (!apiToken) {
    console.error("❌ STRAPI_API_TOKEN environment variable is required");
    process.exit(1);
  }

  console.log("🎯 Starting quiz seeding process...\n");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiToken}`,
  };

  // Delete all existing quizzes and questions if RESET_BEFORE_SEED is true
  if (RESET_BEFORE_SEED) {
    console.log("🗑️  Cleaning up existing quizzes and questions...\n");

    try {
      // Get all quizzes (including drafts with publicationState=preview)
      const quizzesResponse = await fetch(
        `${strapiUrl}/api/quizzes?pagination[limit]=100&publicationState=preview`,
        { headers }
      );

      if (quizzesResponse.ok) {
        const quizzesData = await quizzesResponse.json();
        const quizzes = quizzesData.data || [];

        console.log(`Found ${quizzes.length} existing quizzes to delete`);

        for (const quiz of quizzes) {
          // First unpublish if published
          if (quiz.attributes?.publishedAt) {
            await fetch(`${strapiUrl}/api/quizzes/${quiz.id}`, {
              method: "PUT",
              headers,
              body: JSON.stringify({
                data: {
                  publishedAt: null,
                },
              }),
            });
          }

          // Then delete
          const deleteResponse = await fetch(
            `${strapiUrl}/api/quizzes/${quiz.id}`,
            {
              method: "DELETE",
              headers,
            }
          );

          if (deleteResponse.ok) {
            console.log(
              `  ✅ Deleted quiz: ${quiz.attributes?.slug || quiz.id}`
            );
          } else {
            const error = await deleteResponse.text();
            console.log(`  ⚠️  Failed to delete quiz ${quiz.id}: ${error}`);
          }
        }
      }

      // Get all questions (including drafts)
      const questionsResponse = await fetch(
        `${strapiUrl}/api/questions?pagination[limit]=200&publicationState=preview`,
        { headers }
      );

      if (questionsResponse.ok) {
        const questionsData = await questionsResponse.json();
        const questions = questionsData.data || [];

        console.log(`Found ${questions.length} existing questions to delete`);

        for (const question of questions) {
          await fetch(`${strapiUrl}/api/questions/${question.id}`, {
            method: "DELETE",
            headers,
          });
          console.log(`  ✅ Deleted question: ${question.id}`);
        }
      }

      console.log("\n✅ Cleanup complete!");
      console.log("⏳ Waiting 3 seconds for database to sync...\n");

      // Wait for database to properly clear unique constraints
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Verify cleanup - check if any quizzes still exist and delete them again
      const verifyResponse = await fetch(
        `${strapiUrl}/api/quizzes?pagination[limit]=100&publicationState=preview`,
        { headers }
      );

      if (verifyResponse.ok) {
        const verifyData = await verifyResponse.json();
        if (verifyData.data && verifyData.data.length > 0) {
          console.log(
            `⚠️  Warning: ${verifyData.data.length} quizzes still exist after cleanup!`
          );
          console.log(
            `   These quizzes have empty slugs. Force deleting them now...`
          );

          // Force delete remaining quizzes by ID
          for (const quiz of verifyData.data) {
            const deleteResp = await fetch(
              `${strapiUrl}/api/quizzes/${quiz.id}`,
              {
                method: "DELETE",
                headers,
              }
            );
            if (deleteResp.ok) {
              console.log(`  ✅ Force deleted quiz ID: ${quiz.id}`);
            }
          }

          console.log("  ⏳ Waiting 2 more seconds...\n");
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else {
          console.log("✅ Verified: All quizzes successfully deleted\n");
        }
      }
    } catch (error) {
      console.error("❌ Error during cleanup:", error.message);
      console.log("Continuing with seeding...\n");
    }
  } else {
    console.log("⏭️  Skipping cleanup (RESET_BEFORE_SEED = false)\n");
  }

  let createdQuizzes = 0;
  let skippedQuizzes = 0;

  for (const quizData of QUIZ_DATA) {
    try {
      // Find the lesson by slug
      console.log(`🔍 Finding lesson: ${quizData.lessonSlug}`);
      const lessonResponse = await fetch(
        `${strapiUrl}/api/lessons?filters[slug][$eq]=${quizData.lessonSlug}`,
        { headers }
      );

      if (!lessonResponse.ok) {
        console.error(`❌ Failed to find lesson: ${quizData.lessonSlug}`);
        skippedQuizzes++;
        continue;
      }

      const lessonResult = await lessonResponse.json();

      if (!lessonResult.data || lessonResult.data.length === 0) {
        console.error(`❌ Lesson not found: ${quizData.lessonSlug}`);
        skippedQuizzes++;
        continue;
      }

      const lessonId = lessonResult.data[0].id;
      const lessonDocumentId = lessonResult.data[0].documentId;
      console.log(
        `✅ Found lesson ID: ${lessonId}, documentId: ${lessonDocumentId}`
      );

      // Check if quiz already exists for this lesson (only if not resetting)
      if (!RESET_BEFORE_SEED) {
        const existingQuizResponse = await fetch(
          `${strapiUrl}/api/quizzes?filters[slug][$eq]=${quizData.quiz.slug}`,
          { headers }
        );

        if (existingQuizResponse.ok) {
          const existingResult = await existingQuizResponse.json();
          if (existingResult.data && existingResult.data.length > 0) {
            console.log(`⏭️  Quiz already exists: ${quizData.quiz.slug}\n`);
            skippedQuizzes++;
            continue;
          }
        }
      }

      // Create questions first
      const questionIds = [];

      console.log(
        `\n  Creating ${quizData.quiz.questions.length} questions for this quiz...`
      );

      for (const questionData of quizData.quiz.questions) {
        console.log(
          `  📝 Creating question: ${questionData.questionText.substring(0, 50)}...`
        );

        const questionPayload = {
          data: {
            questionText: questionData.questionText,
            questionType: questionData.questionType,
            order: questionData.order,
            points: questionData.points,
            instruction: questionData.instruction || null,
            content: questionData.content,
            publishedAt: new Date().toISOString(),
          },
        };

        const questionResponse = await fetch(`${strapiUrl}/api/questions`, {
          method: "POST",
          headers,
          body: JSON.stringify(questionPayload),
        });

        if (!questionResponse.ok) {
          const errorText = await questionResponse.text();
          console.error(`❌ Failed to create question: ${errorText}`);
          continue;
        }

        const questionResult = await questionResponse.json();
        questionIds.push(questionResult.data.documentId);
        console.log(
          `  ✅ Created question ID: ${questionResult.data.id}, documentId: ${questionResult.data.documentId}`
        );
      }

      // Create the quiz with relations
      console.log(`\n📋 Creating quiz: ${quizData.quiz.title}`);

      // Generate slug from title (lowercase, replace spaces with hyphens)
      const generatedSlug = quizData.quiz.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      console.log(
        `  📝 Generated slug: "${generatedSlug}" from title: "${quizData.quiz.title}"`
      );

      // NOTE: Do not include 'questions' array here because the relation is mappedBy Quiz.questions
      // The relation is managed on the Question side (manyToOne), so we link questions to quiz later
      const quizPayload = {
        data: {
          title: quizData.quiz.title,
          slug: generatedSlug,
          description: quizData.quiz.description,
          totalQuestions: quizData.quiz.totalQuestions,
          passingScore: quizData.quiz.passingScore,
          timeLimit: quizData.quiz.timeLimit,
          lesson: lessonDocumentId,
          publishedAt: new Date().toISOString(),
        },
      };

      console.log(`  📦 Sending quiz with slug: "${quizPayload.data.slug}"`);

      const quizResponse = await fetch(`${strapiUrl}/api/quizzes`, {
        method: "POST",
        headers,
        body: JSON.stringify(quizPayload),
      });

      console.log(`  📡 Response status: ${quizResponse.status}`);

      if (!quizResponse.ok) {
        const errorText = await quizResponse.text();
        console.error(`❌ Failed to create quiz: ${errorText}`);
        skippedQuizzes++;
        continue;
      }

      const quizResult = await quizResponse.json();
      const quizDocumentId = quizResult.data.documentId;
      console.log(
        `✅ Created quiz ID: ${quizResult.data.id}, documentId: ${quizDocumentId}`
      );
      console.log(`   Slug: ${generatedSlug}`);
      console.log(`   Question IDs for this quiz: [${questionIds.join(", ")}]`);

      // Update questions to link back to quiz (using documentId for Strapi v5)
      console.log(`  🔗 Linking ${questionIds.length} questions to quiz...`);
      for (const questionDocId of questionIds) {
        const linkResponse = await fetch(
          `${strapiUrl}/api/questions/${questionDocId}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify({
              data: {
                quiz: quizDocumentId,
              },
            }),
          }
        );
        if (!linkResponse.ok) {
          const errorText = await linkResponse.text();
          console.error(
            `  ❌ Failed to link question ${questionDocId} to quiz: ${errorText}`
          );
        } else {
          console.log(`  ✅ Linked question ${questionDocId} to quiz`);
        }
      }
      console.log(
        `  ✅ Finished linking ${questionIds.length} questions to quiz`
      );

      // Update lesson to link to quiz (for the oneToOne relation - using documentId)
      console.log(`  🔗 Linking lesson to quiz...`);

      // First, fetch the current lesson data to preserve existing fields
      const currentLessonResponse = await fetch(
        `${strapiUrl}/api/lessons/${lessonDocumentId}?populate=*`,
        { headers }
      );

      if (!currentLessonResponse.ok) {
        console.error(`  ❌ Failed to fetch current lesson data`);
      } else {
        const currentLessonData = await currentLessonResponse.json();
        const currentLesson = currentLessonData.data?.attributes || {};

        // Prepare update payload with all required fields
        const updatePayload = {
          data: {
            quiz: quizDocumentId,
            // Preserve existing shortDescription or provide default
            shortDescription:
              currentLesson.shortDescription ||
              "This lesson covers important concepts.",
            // Preserve existing media or provide default structure
            media:
              currentLesson.media?.map((item) => ({
                ...item,
                title: item.title || "Media Item",
                shortDescription: item.shortDescription || "Media description",
                transcript: item.transcript || "No transcript available",
              })) || [],
          },
        };

        const lessonLinkResponse = await fetch(
          `${strapiUrl}/api/lessons/${lessonDocumentId}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify(updatePayload),
          }
        );

        if (!lessonLinkResponse.ok) {
          const errorText = await lessonLinkResponse.text();
          console.error(`  ❌ Failed to link lesson to quiz: ${errorText}`);
        } else {
          console.log(`  ✅ Linked lesson to quiz`);
        }
      }

      createdQuizzes++;
      console.log(
        `✅ Successfully created quiz with ${questionIds.length} questions\n`
      );
    } catch (error) {
      console.error(
        `❌ Error creating quiz for ${quizData.lessonSlug}:`,
        error.message
      );
      skippedQuizzes++;
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("📊 Quiz Seeding Summary:");
  console.log("=".repeat(50));
  console.log(`✅ Created: ${createdQuizzes} quizzes`);
  console.log(`⏭️  Skipped: ${skippedQuizzes} quizzes`);
  console.log("=".repeat(50) + "\n");
}

// Run the seed function
seedQuizzes().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
