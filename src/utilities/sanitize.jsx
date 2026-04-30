import React from 'react';
import DOMPurify from 'dompurify';

const config = {
  ALLOWED_TAGS: [
    'div',
    'h1',
    'p',
    'h2',
    'h3',
    'h4',
    'a',
    'table',
    'strong',
    'tr',
    'td',
    'img',
    'br',
    'span',
  ],
  ALLOWED_ATTR: [
    'alt',
    'src',
    'href',
    'class',
  ],
};

function SanitizedHtml({ html, as: Tag = 'div', ...rest }) {
  return (
    <Tag
      {...rest}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html || '', config) }}
    />
  );
}

export default SanitizedHtml;
