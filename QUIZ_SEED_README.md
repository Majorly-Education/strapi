# Quiz Seeding Guide

## Overview

This script seeds quiz data into Strapi for existing lessons. It creates quizzes with various question types including multiple choice, true/false, multi-select, and drag-and-drop questions.

## Supported Question Types

✅ **Fully Supported:**
- `multipleChoice` - Standard multiple choice with one correct answer
- `trueFalse` - True/false questions with explanations
- `multiSelect` - Multiple correct answers selection
- `dragDropCategorize` - Drag items into categories
- `dragDropRanking` - Drag items to rank/order them

❌ **Not Included:**
- `fillInBlanks` - UI not fully functional yet

## Prerequisites

1. **Strapi must be running** (locally or deployed)
2. **Lessons must exist** - The script links quizzes to existing lessons by slug
3. **API Token required** - Set `STRAPI_API_TOKEN` environment variable

## Configuration

### 1. Upload Quiz Icons (Optional)

1. Go to Strapi Admin → Media Library
2. Upload 4-5 icons/images for quiz questions
3. Note down the media IDs from the URLs

### 2. Update Icon IDs in Script

Edit `scripts/seed-quizzes.js`:

```javascript
const QUIZ_ICON_MEDIA_IDS = [
  1, 2, 3, 4, 5  // Replace with your actual media IDs
];
```

If you skip this step, questions will be created without icons.

## Running the Script

### Local Development

```bash
cd strapi
export STRAPI_API_TOKEN="your-api-token-here"
npm run seed:quizzes
```

### Cloud/Production

```bash
cd strapi
export STRAPI_URL="https://your-strapi-url.com"
export STRAPI_API_TOKEN="your-api-token-here"
npm run seed:quizzes
```

## What Gets Created

The script creates **3 quizzes** for these lessons:

1. **why-positioning-matters**
   - 4 questions (multiple choice, true/false, multi-select, drag-drop ranking)

2. **positioning-vs-messaging-vs-branding**
   - 3 questions (drag-drop categorize, multiple choice, true/false)

3. **positioning-frameworks-overview**
   - 3 questions (multiple choice, multi-select, true/false)

### Question Structure

Each quiz includes:
- ✅ Published immediately (`publishedAt` set)
- ✅ Linked to lesson (oneToOne relation)
- ✅ Multiple question types
- ✅ Proper component structure for dynamic zones
- ✅ Explanations for answers
- ✅ Icons (if media IDs configured)

## Script Behavior

- **Skips existing quizzes** - Won't duplicate if quiz slug already exists
- **Creates questions first** - Then creates quiz and links them
- **Validates lessons** - Checks if lesson exists before creating quiz
- **Auto-publishes** - All quizzes and questions are published immediately
- **Error handling** - Continues with next quiz if one fails

## Output Example

```
🎯 Starting quiz seeding process...

🔍 Finding lesson: why-positioning-matters
✅ Found lesson ID: 123
  📝 Creating question: What is the primary goal of strategic positioning?...
  ✅ Created question ID: 456
  📝 Creating question: Effective positioning helps customers...
  ✅ Created question ID: 457
  ...

📋 Creating quiz: Quiz: Why Positioning Matters
✅ Created quiz ID: 789
✅ Successfully created quiz with 4 questions

==================================================
📊 Quiz Seeding Summary:
==================================================
✅ Created: 3 quizzes
⏭️  Skipped: 0 quizzes
==================================================
```

## Adding More Quizzes

To add quizzes for additional lessons, edit `QUIZ_DATA` array in `scripts/seed-quizzes.js`:

```javascript
const QUIZ_DATA = [
  // ... existing quizzes
  {
    lessonSlug: "your-lesson-slug",
    quiz: {
      title: "Quiz: Your Lesson Title",
      slug: "your-lesson-slug-quiz",
      description: "Test description",
      totalQuestions: 3,
      passingScore: 70,
      timeLimit: 10,
      questions: [
        // Add questions here
      ],
    },
  },
];
```

## Question Type Examples

### Multiple Choice

```javascript
{
  questionText: "What is X?",
  questionType: "multipleChoice",
  order: 1,
  points: 1,
  content: [{
    __component: "question.multiple-choice-content",
    options: [
      createOption("Answer 1", "Description", true, "Explanation"),
      createOption("Answer 2", "Description", false),
    ],
  }],
}
```

### True/False

```javascript
{
  questionText: "Statement is true?",
  questionType: "trueFalse",
  order: 2,
  points: 1,
  content: [{
    __component: "question.true-false-content",
    correctAnswer: true,
    trueExplanation: "Why it's true",
    falseExplanation: "Why this is wrong",
  }],
}
```

### Multi-Select

```javascript
{
  questionText: "Select all that apply",
  questionType: "multiSelect",
  order: 3,
  points: 1,
  instruction: "Select all correct answers",
  content: [{
    __component: "question.multi-select-content",
    minSelections: 2,
    maxSelections: 4,
    selectionType: "minimum",
    options: [
      createOption("Correct 1", "Desc", true),
      createOption("Correct 2", "Desc", true),
      createOption("Wrong", "Desc", false),
    ],
  }],
}
```

### Drag-Drop Categorize

```javascript
{
  questionText: "Categorize these items",
  questionType: "dragDropCategorize",
  order: 4,
  points: 1,
  instruction: "Drag each item to its category",
  content: [{
    __component: "question.drag-drop-content",
    maxSelections: 6,
    validationType: "categorization",
    sourceItems: [
      createDraggableItem("Item 1", "Desc", "category1"),
      createDraggableItem("Item 2", "Desc", "category2"),
    ],
    targetZones: [
      {
        zoneId: "category1",
        label: "Category 1",
        zoneType: "category",
        maxItems: 3,
        order: 0,
        placeholderText: "Drop here",
      },
      {
        zoneId: "category2",
        label: "Category 2",
        zoneType: "category",
        maxItems: 3,
        order: 1,
        placeholderText: "Drop here",
      },
    ],
  }],
}
```

### Drag-Drop Ranking

```javascript
{
  questionText: "Rank in correct order",
  questionType: "dragDropRanking",
  order: 5,
  points: 1,
  instruction: "Drag to put in order",
  content: [{
    __component: "question.drag-drop-content",
    maxSelections: 4,
    validationType: "exact_order",
    sourceItems: [
      createDraggableItem("First", "Desc", null, 0, true),
      createDraggableItem("Second", "Desc", null, 1, true),
      createDraggableItem("Third", "Desc", null, 2, true),
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
  }],
}
```

## Troubleshooting

### Quiz Already Exists
- Script skips existing quizzes by slug
- Delete existing quiz in Strapi admin to re-seed

### Lesson Not Found
- Ensure lesson slug matches exactly
- Check lesson exists in Strapi
- Verify lesson is published

### API Token Error
- Ensure `STRAPI_API_TOKEN` is set correctly
- Token needs write permissions
- Check token hasn't expired

### Question Creation Fails
- Check component structure matches schema
- Verify `__component` names are correct
- Ensure media IDs exist if using icons

## Notes

- All quizzes are published immediately
- Questions are auto-linked to quiz via relations
- Icons are randomly assigned from `QUIZ_ICON_MEDIA_IDS` array
- Script uses REST API (not GraphQL)
- Idempotent - safe to run multiple times (skips duplicates)
