# Seeding Scripts

This directory contains scripts to populate your Strapi instance with sample product marketing course data.

## Scripts Available

### 1. Local Seeding (`seed-comprehensive.js`)
**Use this for local development**

```bash
npm run seed:comprehensive
```

This script directly connects to your local Strapi instance and populates the database. Use this when developing locally.

### 2. Cloud Seeding via REST API (`seed-via-rest-api.js`)
**Use this for Strapi Cloud deployment**

```bash
npm run seed:cloud
```

This script uses REST API calls to populate your Strapi Cloud instance. Perfect for production deployments where you can't run database scripts directly.

## Cloud Seeding Setup

### Step 1: Upload Icons to Strapi Media Library

1. **Upload 2-3 icons** to your Strapi Media Library (JPG, PNG, SVG)
2. **Note the media IDs** from the URLs (e.g., if URL is `/uploads/icon_123.png`, the ID is `123`)
3. **Update the ICON_MEDIA_IDS array** in both seeding scripts

### Step 2: Get Your Strapi Cloud Details

1. **URL**: Your Strapi Cloud URL (e.g., `https://your-app-name.strapiapp.com`)
2. **API Token**: Create a full-access API token in your Strapi Cloud admin panel

### Step 3: Configure the Script

Option A: **Edit the script directly**
```javascript
// In scripts/seed-via-rest-api.js
const CONFIG = {
  STRAPI_URL: 'https://your-app-name.strapiapp.com',
  API_TOKEN: 'your-full-access-api-token-here',
};

// Update this with your uploaded media IDs
const ICON_MEDIA_IDS = [
  1, 2, 3  // Replace with your actual media IDs
];
```

Option B: **Use environment variables** (recommended)
```bash
export STRAPI_CLOUD_URL="https://your-app-name.strapiapp.com"
export STRAPI_CLOUD_API_TOKEN="your-full-access-api-token-here"
npm run seed:cloud
```

### Step 3: Creating API Token in Strapi Cloud

1. Go to your Strapi Cloud admin panel
2. Navigate to **Settings > API Tokens**
3. Click **Create new API Token**
4. Name: `Seeding Script`
5. Token duration: `Unlimited` (or set expiry as needed)
6. Token type: `Full access`
7. Copy the generated token (you won't see it again!)

### Step 4: Run the Seeding

```bash
# Method 1: With environment variables
STRAPI_CLOUD_URL="https://your-app.strapiapp.com" STRAPI_CLOUD_API_TOKEN="your-token" npm run seed:cloud

# Method 2: After editing the script
npm run seed:cloud
```

## What Gets Created

Both scripts create the same content structure:

### Tracks (2)
- **Aspiring Product Marketer**
- **Professional Product Marketer**

### Courses (6 total)
**Aspiring Track:**
- Strategic Positioning (8 lessons)
- Compelling Messaging (5 lessons)
- Go-To-Market Strategy (6 lessons)

**Professional Track:**
- Advanced Strategic Positioning (4 lessons)
- Advanced Messaging Architecture (4 lessons)
- Enterprise GTM Strategy (5 lessons)

### Total Content
- ✅ **2 Tracks**
- ✅ **6 Courses**
- ✅ **32 Lessons** with rich content
- ✅ **96 Quiz questions** (3 per lesson)
- ✅ **1 Author** (Sarah Johnson)

## Troubleshooting

### Common Issues

**1. Authentication Errors (401/403)**
- Check your API token has full access permissions
- Verify the token hasn't expired
- Make sure you're using the correct Strapi Cloud URL

**2. Connection Errors**
- Verify your Strapi Cloud URL is correct and accessible
- Check your internet connection
- Ensure Strapi Cloud instance is running

**3. Data Already Exists**
- The script automatically clears existing data before seeding
- If you get conflicts, manually delete content types in Strapi admin

**4. Rate Limiting**
- Strapi Cloud may rate limit API requests
- The script includes error handling and will retry failed requests

### Debug Mode

Add console logging for debugging:

```bash
# Enable verbose logging
DEBUG=* npm run seed:cloud
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit API tokens to git**
2. **Use environment variables for production**
3. **Rotate API tokens regularly**
4. **Use limited-scope tokens when possible**
5. **Remove or disable seeding tokens after use**

## Data Structure

The seeding creates content that matches the exact structure shown in the product requirements, with:

- Proper Track > Course > Lesson hierarchy
- Rich HTML content using CKEditor components
- Comprehensive quiz system with multiple question types
- Proper tagging and metadata
- XP values and duration for gamification
- Author attribution and content structure

Perfect for getting your Strapi Cloud instance populated with realistic product marketing curriculum data!