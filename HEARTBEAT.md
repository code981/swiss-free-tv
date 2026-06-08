# Heartbeat tasks

- Every heartbeat: check current OpenClaw usage with `session_status`.
  - Warn Joschka if the 5h window drops below 15% remaining, weekly usage drops below 20%, or any provider reports a hard/near quota limit.
  - Stay quiet if usage is healthy.
- Every ~30 minutes when heartbeat wakes arrive: check `/home/node/.openclaw/workspace/swiss-tv-app`.
  - Run `npm run ci` if files changed or dependencies changed.
  - Review `reports/continuous-improvement.md` and act on one small improvement opportunity: channel catalog, UI, legal-source notes, performance, onboarding, SEO/provider comparison, or deploy readiness.
  - Do not add pirated streams, bypass ads/paywalls/geoblocks, or scrape protected broadcaster content.
  - Only notify Joschka for meaningful progress, blockers, build failures, or deployment decisions.
- Rotate agent-system maintenance when there is no more urgent work:
  - Promote useful daily notes into `MEMORY.md`; keep durable facts only.
  - Convert repeated workflows into skills/SOPs after they recur 3+ times.
  - Review `.learnings/` for corrections, failures, and better patterns; promote proven tool gotchas to `TOOLS.md` and workflows to `AGENTS.md`.
  - Check for brittle automations, missing verification gates, cost/usage risks, and over-broad permissions.
  - Keep Memory Wiki healthy after memory changes: run wiki status/compile when the plugin is available, and only surface real errors or useful new synthesized pages.
  - Use `AI_AGENT_LESSONS.md` as the operating checklist; update it only when a genuinely new durable lesson appears.
- **Status (2026-06-09)**: Swiss TV app at commit `e8f1482`. All heartbeat tasks completed. HLS audit finalized. CI passes, build successful.
