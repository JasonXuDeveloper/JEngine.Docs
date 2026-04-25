import type { FeedbackBlockProps } from 'fumadocs-core/mdx-plugins/remark-feedback-block';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';
import { handleBlockFeedback } from '@/app/actions';
import { FeedbackBlock } from '@/components/feedback/client';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Accordion,
    Accordions,
    Step,
    Steps,
    Tab,
    Tabs,
    File,
    Folder,
    Files,
    FeedbackBlock: ({
      children,
      ...props
    }: FeedbackBlockProps & { children: ReactNode }) => (
      <FeedbackBlock {...props} onSendAction={handleBlockFeedback}>
        {children}
      </FeedbackBlock>
    ),
    ...components,
  };
}
