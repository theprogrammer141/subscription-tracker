import { Client as Workflow } from "@upstash/workflow";

import { QSTASH_TOKEN, QSTASH_URL } from "./env.js";

export const workflow = new Workflow({
  baseUrl: QSTASH_URL,
  token: QSTASH_TOKEN,
});
