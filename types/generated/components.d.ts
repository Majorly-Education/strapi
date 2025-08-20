import type { Schema, Struct } from '@strapi/strapi';

export interface ContentCta extends Struct.ComponentSchema {
  collectionName: 'components_content_ctas';
  info: {
    description: 'Call-to-action component with up to 2 buttons';
    displayName: 'CTA';
  };
  attributes: {
    primaryButtonAction: Schema.Attribute.Enumeration<
      ['START_LESSON', 'GIVE_FEEDBACK']
    > &
      Schema.Attribute.Required;
    primaryButtonStyle: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'primary'>;
    primaryButtonText: Schema.Attribute.String & Schema.Attribute.Required;
    secondaryButtonAction: Schema.Attribute.Enumeration<
      ['START_LESSON', 'GIVE_FEEDBACK']
    >;
    secondaryButtonStyle: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline']
    > &
      Schema.Attribute.DefaultTo<'secondary'>;
    secondaryButtonText: Schema.Attribute.String;
  };
}

export interface ContentGallery extends Struct.ComponentSchema {
  collectionName: 'components_content_galleries';
  info: {
    description: 'Multiple images in a gallery layout';
    displayName: 'Gallery';
  };
  attributes: {
    caption: Schema.Attribute.String;
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    layout: Schema.Attribute.Enumeration<['grid', 'carousel', 'masonry']> &
      Schema.Attribute.DefaultTo<'grid'>;
  };
}

export interface ContentImage extends Struct.ComponentSchema {
  collectionName: 'components_content_images';
  info: {
    description: 'Single image with optional caption';
    displayName: 'Image';
  };
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.Required;
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface ContentRichText extends Struct.ComponentSchema {
  collectionName: 'components_content_rich_texts';
  info: {
    description: 'Generic rich text content using CKEditor';
    displayName: 'Rich Text';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface ContentVideo extends Struct.ComponentSchema {
  collectionName: 'components_content_videos';
  info: {
    description: 'Video content with optional caption';
    displayName: 'Video';
  };
  attributes: {
    autoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    caption: Schema.Attribute.String;
    controls: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    video: Schema.Attribute.Media<'videos'> & Schema.Attribute.Required;
  };
}

export interface LessonAuthorHeader extends Struct.ComponentSchema {
  collectionName: 'components_lesson_author_headers';
  info: {
    description: 'Lesson author header with template information';
    displayName: 'Author Header';
  };
  attributes: {
    author: Schema.Attribute.Relation<'oneToOne', 'api::author.author'>;
    templateType: Schema.Attribute.Enumeration<['Horizontal Banner']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Horizontal Banner'>;
  };
}

export interface LessonAuthorInfo extends Struct.ComponentSchema {
  collectionName: 'components_lesson_author_infos';
  info: {
    description: 'Author information for lessons';
    displayName: 'Author Info';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images'>;
    bio: Schema.Attribute.Text;
    linkedin: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String;
    twitter: Schema.Attribute.String;
    website: Schema.Attribute.String;
  };
}

export interface LessonCta extends Struct.ComponentSchema {
  collectionName: 'components_lesson_ctas';
  info: {
    description: 'Call-to-action component with up to 2 buttons for lessons';
    displayName: 'CTA';
  };
  attributes: {
    primaryButtonAction: Schema.Attribute.Enumeration<
      ['START_LESSON', 'GIVE_FEEDBACK']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'START_LESSON'>;
    primaryButtonStyle: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'primary'>;
    primaryButtonText: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Start Lesson'>;
    secondaryButtonAction: Schema.Attribute.Enumeration<
      ['START_LESSON', 'GIVE_FEEDBACK']
    > &
      Schema.Attribute.DefaultTo<'GIVE_FEEDBACK'>;
    secondaryButtonStyle: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline']
    > &
      Schema.Attribute.DefaultTo<'secondary'>;
    secondaryButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Give Feedback'>;
  };
}

export interface LessonIntro extends Struct.ComponentSchema {
  collectionName: 'components_lesson_intros';
  info: {
    description: 'Lesson introduction template selector - uses lesson title, description, and module info';
    displayName: 'Intro';
  };
  attributes: {
    introPrefix: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'By the end of this module, learners will be able to:'>;
    showModuleInfo: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    template: Schema.Attribute.Enumeration<
      ['objectives-list', 'goals-grid', 'skills-breakdown', 'outcomes-focus']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'objectives-list'>;
  };
}

export interface LessonLessonPageTemplate1 extends Struct.ComponentSchema {
  collectionName: 'components_lesson_lesson_page_template_1s';
  info: {
    displayName: 'Lesson Page Template 1';
  };
  attributes: {
    author: Schema.Attribute.Relation<'oneToOne', 'api::author.author'>;
    note: Schema.Attribute.Component<'lesson.note', false>;
    sections: Schema.Attribute.Component<'lesson.rich-text-section', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    segments: Schema.Attribute.Component<'lesson.segments', true>;
    shortDescription: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface LessonLessonTemplate1 extends Struct.ComponentSchema {
  collectionName: 'components_lesson_lesson_template_1s';
  info: {
    description: 'Complete template with all sections for segmentation-style lessons';
    displayName: 'Lesson Template 1 - Segmentation Style';
  };
  attributes: {
    ctaButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Take the lesson'>;
    feedbackLinkText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Feedback'>;
    introContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      > &
      Schema.Attribute.DefaultTo<'<p>By the end of this module, learners will be able to:</p>'>;
    learningObjective1: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Explain the importance of aligning business goals with audience segmentation'>;
    learningObjective2: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Differentiate demographic, psychographic, and persona-based segmentation'>;
    learningObjective3: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Develop survey questions to derive actionable insights'>;
    learningObjective4: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Prioritize insights using editorial and strategic lenses'>;
    noteText: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'This step will probably take 30+ minutes for you to complete since you are creating a full resume and incorporating AI-driven feedback, so make sure to leave yourself time, or be willing to finish it in chunks.'>;
    section1Content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      > &
      Schema.Attribute.DefaultTo<'<p>Every successful campaign begins by aligning with a clear business or brand goal.</p><p>For example, in product marketing, your company goal might be to increase user engagement with a specific feature, or boost conversions for a particular product line.</p><p>Your segmentation strategy should directly support these objectives by identifying the most relevant audiences and understanding their unique needs and behaviors.</p>'>;
    section1Title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Starting with business goals'>;
    section2Content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      > &
      Schema.Attribute.DefaultTo<"<p>Effective segmentation is the foundation of personalized marketing that resonates with your audience.</p><p>Without proper segmentation, you're essentially broadcasting the same message to everyone, which often results in lower engagement rates and missed opportunities.</p>">;
    section2Title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Why it matters'>;
    section3Title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'How segmentation connects to your work'>;
    segment1Content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      > &
      Schema.Attribute.DefaultTo<'<p><strong>Definition:</strong></p><p>Users who primarily listen to familiar music, seeking emotional connection, stability, and comfort, often using Spotify during routine activities.</p><p><strong>Behavioral Markers:</strong></p><ul><li>70%+ of listening time spent on previously saved playlists and "liked" songs</li><li>Low Discover Weekly and Release Radar engagement (&lt;1 play per week)</li><li>High repeat listening on the same albums or artist playlists</li><li>Listening concentrated during daily routines: morning prep, commutes, chores</li></ul><p><strong>Psychographics:</strong></p><ul><li>Value consistency, nostalgia, and music as a background companion</li><li>Less risk-taking in music discovery due to cognitive load or emotional preference</li><li>Music as a "safe zone" rather than an exploration tool</li></ul><p><strong>Needs:</strong></p><ul><li>Easy access to "feel-good" familiar tracks</li><li>Low-friction re-engagement with old favorites</li><li>Occasional gentle nudges to rediscover forgotten favorites</li></ul>'>;
    segment1Title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Segment 1: "Comfort-Driven Loyalists"'>;
    segment2Content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      > &
      Schema.Attribute.DefaultTo<'<p><strong>Definition:</strong></p><p>Users who primarily listen to familiar music, seeking emotional connection, stability, and comfort, often using Spotify during routine activities.</p><p><strong>Behavioral Markers:</strong></p><ul><li>70%+ of listening time spent on previously saved playlists and "liked" songs</li><li>Low Discover Weekly and Release Radar engagement (&lt;1 play per week)</li><li>High repeat listening on the same albums or artist playlists</li><li>Listening concentrated during daily routines: morning prep, commutes, chores</li></ul><p><strong>Psychographics:</strong></p><ul><li>Value consistency, nostalgia, and music as a background companion</li><li>Less risk-taking in music discovery due to cognitive load or emotional preference</li><li>Music as a "safe zone" rather than an exploration tool</li></ul><p><strong>Needs:</strong></p><ul><li>Easy access to "feel-good" familiar tracks</li><li>Low-friction re-engagement with old favorites</li><li>Occasional gentle nudges to rediscover forgotten favorites</li></ul>'>;
    segment2Title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Segment 2: "Curious Audio Explorers"'>;
  };
}

export interface LessonNote extends Struct.ComponentSchema {
  collectionName: 'components_lesson_notes';
  info: {
    displayName: 'Note';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Simple Note:'>;
  };
}

export interface LessonRichTextSection extends Struct.ComponentSchema {
  collectionName: 'components_lesson_rich_text_sections';
  info: {
    description: 'A section with rich text content';
    displayName: 'Rich Text Section';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    sectionTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LessonSegmentationTemplate extends Struct.ComponentSchema {
  collectionName: 'components_lesson_segmentation_template';
  info: {
    description: 'Specific data structure for segmentation lessons';
    displayName: 'Segmentation Template';
  };
  attributes: {
    businessGoalsContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      > &
      Schema.Attribute.DefaultTo<'<p>Every successful campaign begins by aligning with a clear business or brand goal.</p><p>For example, in product marketing, your company goal might be to increase user engagement with a specific feature, or boost conversions for a particular product line.</p><p>Your segmentation strategy should directly support these objectives by identifying the most relevant audiences and understanding their unique needs and behaviors.</p>'>;
    learningObjectives: Schema.Attribute.Component<'shared.text-item', true>;
    sampleNote: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'This step will probably take 30+ minutes for you to complete since you are creating a full resume and incorporating AI-driven feedback, so make sure to leave yourself time, or be willing to finish it in chunks.'>;
    segments: Schema.Attribute.Component<'lesson.segments', true>;
    whyItMattersContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      > &
      Schema.Attribute.DefaultTo<"<p>Effective segmentation is the foundation of personalized marketing that resonates with your audience.</p><p>Without proper segmentation, you're essentially broadcasting the same message to everyone, which often results in lower engagement rates and missed opportunities.</p>">;
  };
}

export interface LessonSegments extends Struct.ComponentSchema {
  collectionName: 'components_lesson_segments';
  info: {
    description: 'Complex segment layouts like user personas';
    displayName: 'Segments';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    icon: Schema.Attribute.Component<'content.image', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LessonTemplateData extends Struct.ComponentSchema {
  collectionName: 'components_lesson_template_data';
  info: {
    description: 'Data structure for template-based lessons';
    displayName: 'Template Data';
  };
  attributes: {};
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {};
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTextItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_items';
  info: {
    description: 'Simple text item for lists';
    displayName: 'Text Item';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.cta': ContentCta;
      'content.gallery': ContentGallery;
      'content.image': ContentImage;
      'content.rich-text': ContentRichText;
      'content.video': ContentVideo;
      'lesson.author-header': LessonAuthorHeader;
      'lesson.author-info': LessonAuthorInfo;
      'lesson.cta': LessonCta;
      'lesson.intro': LessonIntro;
      'lesson.lesson-page-template-1': LessonLessonPageTemplate1;
      'lesson.lesson-template-1': LessonLessonTemplate1;
      'lesson.note': LessonNote;
      'lesson.rich-text-section': LessonRichTextSection;
      'lesson.segmentation-template': LessonSegmentationTemplate;
      'lesson.segments': LessonSegments;
      'lesson.template-data': LessonTemplateData;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.text-item': SharedTextItem;
    }
  }
}
