'use server';

import type {
  ActionResponse,
  BlockFeedback,
  PageFeedback,
} from '@/components/feedback/schema';
import { onBlockFeedbackAction, onPageFeedbackAction } from '@/lib/github';

export async function handlePageFeedback(
  feedback: PageFeedback,
): Promise<ActionResponse> {
  return onPageFeedbackAction(feedback);
}

export async function handleBlockFeedback(
  feedback: BlockFeedback,
): Promise<ActionResponse> {
  return onBlockFeedbackAction(feedback);
}
