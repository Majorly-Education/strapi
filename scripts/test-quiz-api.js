// Test script to debug quiz API response
const fetch = require('node-fetch');

const strapiUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";
const apiToken = process.env.STRAPI_API_TOKEN ||
  "d8670ca668b7be1d4bb6cd0ed8244b06f219a111bb8c259f916858a5fbaf1d4ee5584109e8cca36052f3589a18d359cbcfc2741ccf2164db4ed39626e9b6015d14abce90dfb4fbf95ef8d7f6a4552644022d42b1d1979b399277cb146e5d57d2ad9be3cf60ea992749080f6b08b8e706bddaf646d47e223117f659d5e3901bc0";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiToken}`,
};

async function testQuizAPI() {
  console.log("=== Testing Quiz API ===\n");

  // First, get the lesson to find its documentId
  const lessonSlug = "positioning-vs-messaging-vs-branding";
  console.log(`1. Fetching lesson: ${lessonSlug}`);

  const lessonResponse = await fetch(
    `${strapiUrl}/api/lessons?filters[slug][$eq]=${lessonSlug}`,
    { headers }
  );

  const lessonData = await lessonResponse.json();
  const lesson = lessonData.data?.[0];

  if (!lesson) {
    console.error("❌ Lesson not found!");
    return;
  }

  console.log(`✅ Found lesson ID: ${lesson.id}, documentId: ${lesson.documentId}`);
  console.log(`   Lesson title: ${lesson.title}\n`);

  // Test different populate strategies
  const testCases = [
    {
      name: "Simple populate[questions]=*",
      url: `${strapiUrl}/api/quizzes?filters[lesson][documentId][$eq]=${lesson.documentId}&populate[questions]=*`
    },
    {
      name: "Deep populate",
      url: `${strapiUrl}/api/quizzes?filters[lesson][documentId][$eq]=${lesson.documentId}&populate=deep`
    },
    {
      name: "Explicit populate with pagination limit",
      url: `${strapiUrl}/api/quizzes?filters[lesson][documentId][$eq]=${lesson.documentId}&populate[questions][populate]=*&populate[questions][pagination][limit]=100`
    },
    {
      name: "Wildcard populate",
      url: `${strapiUrl}/api/quizzes?filters[lesson][documentId][$eq]=${lesson.documentId}&populate=*`
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n2. Testing: ${testCase.name}`);
    console.log(`   URL: ${testCase.url}\n`);

    const response = await fetch(testCase.url, { headers });
    const data = await response.json();

    const quiz = data.data?.[0];
    if (!quiz) {
      console.log("   ❌ No quiz found");
      continue;
    }

    console.log(`   ✅ Found quiz: ${quiz.title}`);
    console.log(`   Quiz ID: ${quiz.id}, documentId: ${quiz.documentId}`);
    console.log(`   Total Questions (from field): ${quiz.totalQuestions}`);

    if (quiz.questions) {
      console.log(`   Questions array length: ${quiz.questions.length}`);
      console.log(`   Question IDs: ${quiz.questions.map(q => q.id).join(', ')}`);
      console.log(`   Question types: ${quiz.questions.map(q => q.questionType).join(', ')}`);
    } else {
      console.log(`   ⚠️  No questions array in response`);
    }

    // Show full response for first test case
    if (testCase === testCases[0]) {
      console.log(`\n   Full quiz response:`);
      console.log(JSON.stringify(quiz, null, 2));
    }
  }

  // Also check questions directly
  console.log(`\n\n3. Checking questions directly from API`);
  const questionsResponse = await fetch(
    `${strapiUrl}/api/questions?pagination[limit]=100`,
    { headers }
  );
  const questionsData = await questionsResponse.json();
  console.log(`   Total questions in system: ${questionsData.data?.length || 0}`);

  // Check if any questions are linked to our quiz
  console.log(`\n4. Looking for questions without quiz link`);
  const unlinkedQuestions = questionsData.data?.filter(q => !q.quiz) || [];
  console.log(`   Unlinked questions: ${unlinkedQuestions.length}`);
  if (unlinkedQuestions.length > 0) {
    console.log(`   Unlinked question IDs: ${unlinkedQuestions.map(q => q.id).join(', ')}`);
  }

  console.log("\n=== Test Complete ===");
}

testQuizAPI().catch(console.error);
