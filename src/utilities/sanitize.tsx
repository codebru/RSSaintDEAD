import DOMPurify from 'dompurify';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

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

type SanitizedHtmlProps<T extends ElementType> = {
  html: string | null | undefined;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'dangerouslySetInnerHTML' | 'as' | 'html'>;

function SanitizedHtml<T extends ElementType = 'div'>({
  html,
  as,
  ...rest
}: SanitizedHtmlProps<T>) {
  const Tag = (as ?? 'div') as ElementType;
  return (
    <Tag
      {...rest}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html ?? '', config) }}
    />
  );
}

export default SanitizedHtml;
