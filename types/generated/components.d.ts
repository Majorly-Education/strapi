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

export interface LessonRichTextSection extends Struct.ComponentSchema {
  collectionName: 'components_lesson_rich_text_sections';
  info: {
    description: 'A section with rich text content';
    displayName: 'Rich Text Section';
  };
  attributes: {
    backgroundColor: Schema.Attribute.Enumeration<
      ['white', 'gray-50', 'blue-50']
    > &
      Schema.Attribute.DefaultTo<'white'>;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    sectionTitle: Schema.Attribute.String & Schema.Attribute.Required;
    showInSidebar: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
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
    icon: Schema.Attribute.Media<'images'>;
    templateType: Schema.Attribute.Enumeration<['Purple Card']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Purple Card'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
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
      'lesson.rich-text-section': LessonRichTextSection;
      'lesson.segments': LessonSegments;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
