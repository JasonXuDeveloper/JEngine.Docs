import { z } from 'zod/mini';
import {
  blockFeedback,
  pageFeedback,
} from '../../src/components/feedback/schema';
import {
  onBlockFeedbackAction,
  onPageFeedbackAction,
} from '../../src/lib/github';

interface Env {
  GITHUB_APP_ID?: string;
  GITHUB_APP_PRIVATE_KEY?: string;
  GITHUB_APP_INSTALLATION_ID?: string;
  APP_ID?: string;
  APP_PRIVATE_KEY?: string;
  APP_INSTALLATION_ID?: string;
}

const feedbackPayload = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('page'),
    feedback: pageFeedback,
  }),
  z.object({
    type: z.literal('block'),
    feedback: blockFeedback,
  }),
]);

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const contentType = request.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    return Response.json({ githubUrl: undefined }, { status: 415 });
  }

  const result = feedbackPayload.safeParse(await request.json());
  if (!result.success) {
    return Response.json({ githubUrl: undefined }, { status: 400 });
  }

  const response =
    result.data.type === 'page'
      ? await onPageFeedbackAction(result.data.feedback, env)
      : await onBlockFeedbackAction(result.data.feedback, env);

  return Response.json(response);
};

export const onRequest: PagesFunction<Env> = () =>
  Response.json({ githubUrl: undefined }, { status: 405 });
