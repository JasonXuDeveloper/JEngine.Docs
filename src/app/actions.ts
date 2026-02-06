'use server';

import {
  onPageFeedbackAction,
  onBlockFeedbackAction,
} from '@/lib/github';
import type {
  PageFeedback,
  BlockFeedback,
  ActionResponse,
} from '@/components/feedback/schema';

export async function handlePageFeedback(
  feedback: PageFeedback
): Promise<ActionResponse> {
  return onPageFeedbackAction(feedback);
}

export async function handleBlockFeedback(
  feedback: BlockFeedback
): Promise<ActionResponse> {
  return onBlockFeedbackAction(feedback);
}
