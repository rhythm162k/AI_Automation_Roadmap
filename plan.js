const sections = {
  decisions: "Engineering decisions",
  cs: "Programming & computer science",
  linux: "Linux & networking",
  testing: "Testing & debugging",
  docker: "Docker",
  actions: "GitHub Actions",
  aws: "AWS & operations",
  security: "Application security",
  design: "System design",
  automation: "AI automation",
  agents: "AI & agents",
  communication: "Communication & productivity",
};

const references = `
adr|Guide|GOV.UK · Architectural Decision Record Framework|https://www.gov.uk/government/publications/architectural-decision-record-framework/architectural-decision-record-framework
discovery|Guide|GOV.UK · How to run a discovery|https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works
sre|Guide|Google SRE · Effective Troubleshooting|https://sre.google/sre-book/effective-troubleshooting/
ts|Docs|TypeScript · Narrowing|https://www.typescriptlang.org/docs/handbook/2/narrowing.html
cs50|Video|Harvard CS50 · 2026 course, lectures 3 and 5|https://www.youtube.com/watch?v=gmuTjeQUbTM
visualgo|Interactive|VisuAlgo · Algorithms and data structures|https://visualgo.net/en
sql|Interactive|SQLBolt · Interactive SQL lessons|https://sqlbolt.com/
pg|Docs|PostgreSQL · Using EXPLAIN|https://www.postgresql.org/docs/18/using-explain.html
transactions|Docs|PostgreSQL · Transactions|https://www.postgresql.org/docs/18/tutorial-transactions.html
mit|Course|MIT Missing Semester · 2026 edition|https://missing.csail.mit.edu/2026/
shell|Video|MIT Missing Semester · Command-line environment|https://www.youtube.com/watch?v=ccBGsPedE9Q
protocol|Interactive|Protocol Explorer · Animated networking lessons|https://protocol-explorer-alpha.vercel.app/
http|Docs|MDN · Overview of HTTP|https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview
node|Docs|Node.js · Debugging|https://nodejs.org/en/learn/getting-started/debugging
devtools|Guide|Chrome for Developers · Debug JavaScript|https://developer.chrome.com/docs/devtools/javascript/
vitest|Docs|Vitest · Guide|https://vitest.dev/guide/
testsize|Guide|Google · Software Engineering at Google, Testing Overview|https://abseil.io/resources/swe-book/html/ch11.html
supertest|Docs|SuperTest · HTTP assertions and examples|https://github.com/forwardemail/supertest
playwright|Docs|Playwright · Best practices|https://playwright.dev/docs/best-practices
debugvideo|Video|MIT Missing Semester · Debugging and Profiling, January 2026|https://www.youtube.com/watch?v=8VYT9TcUmKs
pwvideo|Video|Microsoft · Advanced Playwright debugging and resilience|https://www.youtube.com/watch?v=zyOJfGtJ3Rw
dock|Workshop|Docker · Get Started workshop|https://docs.docker.com/get-started/workshop/
dockbuild|Docs|Docker · Build best practices|https://docs.docker.com/build/building/best-practices/
dockcompose|Docs|Docker · Control Compose startup order|https://docs.docker.com/compose/how-tos/startup-order/
dockdata|Docs|Docker · Volumes|https://docs.docker.com/engine/storage/volumes/
dockvideo|Video|freeCodeCamp · Learn Docker, June 2026, use the image build and Compose chapters|https://www.youtube.com/watch?v=rjjES5IsPdg
hero|Interactive|GitHub Actions Hero · Workflow simulator|https://github-actions-hero.vercel.app/
ghdocs|Docs|GitHub · Workflow syntax|https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax
ghlearn|Lab|GitHub Skills · Hello GitHub Actions|https://github.com/skills/hello-github-actions
ghvideo|Video|GitHub · How to use GitHub Actions|https://www.youtube.com/watch?v=BQrohJ3PT7I
ghoidc|Docs|GitHub · OIDC in AWS|https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws
ghsecurity|Guide|OWASP · GitHub Actions security|https://cheatsheetseries.owasp.org/cheatsheets/GitHub_Actions_Security_Cheat_Sheet.html
awsedu|Lab catalog|AWS Educate · Cloud training and hands-on labs|https://aws.amazon.com/education/awseducate/
ec2|Docs|AWS · EC2 concepts|https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html
ec2video|Video|AWS · Getting Started with EC2, March 2026|https://www.youtube.com/watch?v=nJ-djerESW0
vpc|Docs|AWS · What is Amazon VPC?|https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html
vpcvideo|Video|AWS re:Invent 2025 · Advanced VPC design, selected segments|https://www.youtube.com/watch?v=40QfxdvDGsw
iam|Docs|AWS · IAM best practices|https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
ops|Guide|AWS Well-Architected · Operational Excellence|https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html
owasp|Guide|OWASP · Cheat Sheet Series|https://cheatsheetseries.owasp.org/
threat|Guide|OWASP · Threat modeling|https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html
session|Guide|OWASP · Session management|https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
scale|Interactive|Designed to Scale · Animated system design lessons|https://designed-to-scale.vercel.app/
retry|Guide|Amazon Builders’ Library · Timeouts, retries and backoff|https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/
n8n|Course|n8n · Level One course|https://docs.n8n.io/courses/level-one/
n8nvideo|Video course|n8n · Official video course playlists|https://docs.n8n.io/video-courses/
n8nerrors|Docs|n8n · Error handling|https://docs.n8n.io/build/flow-logic/handle-errors-gracefully.md
webhooks|Docs|GitHub · Webhook best practices|https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks
agents|Course|OpenAI · Building agents|https://developers.openai.com/tracks/building-agents
anthropic|Guide|Anthropic · Building effective agents|https://www.anthropic.com/research/building-effective-agents
codex|Docs|OpenAI · How OpenAI uses Codex to accelerate engineering|https://openai.com/business/learn/how-openai-uses-codex/
codexvideo|Video|OpenAI · Getting started with Codex|https://www.youtube.com/watch?v=px7XlbYgk7I
claude|Video|Anthropic · Introducing Claude Code|https://www.youtube.com/watch?v=AJpK3YTTKZ4
agentvideo|Video|OpenAI · Introducing the Agents API, September 2026|https://www.youtube.com/watch?v=2YHa1vhnmK0
evals|Docs|OpenAI · Evaluation best practices|https://developers.openai.com/api/docs/guides/evaluation-best-practices/
model|Course|Hugging Face · LLM Course, Chapter 1|https://huggingface.co/learn/llm-course/chapter1/1
speaking|Video|Matt Abrahams · Speaking Out, Staying Grounded, and Managing Up, June 2026|https://www.youtube.com/watch?v=lmsCgJEO80w
negotiate|Video|Think Fast, Talk Smart · Stanford’s Top Negotiator Reveals What Most People Get Dead Wrong|https://www.youtube.com/watch?v=63Sv85jlYWg
focus|Video|Cal Newport · How to Gain Control of Your Time, 2026|https://www.youtube.com/watch?v=BUjf7Tv8GDE
`
  .trim()
  .split("\n")
  .map((row) => {
    const [id, kind, title, url] = row.split("|");
    return { id, kind, title, url };
  });

const curriculum = `
decisions|Start with the problem|Stakeholders, current behavior, constraints, unknowns, measurable acceptance criteria|discovery,adr|Turn “Improve EMS leave requests” into a one-page brief. Identify who is affected, ask five questions, and write three acceptance examples covering a normal case and edge cases.|Explain which unanswered question could completely change what you build.
decisions|Compare options and commit|Reversible decisions, trade-offs, evidence, decision records, review triggers|adr,discovery|Compare immediate approval, manager approval, and a staged rollout. Weight effort, user friction, access control and reversibility. Timebox a small experiment, then write an ADR.|Name the evidence that would make you reverse the decision.
cs|Make invalid states harder to express|Discriminated unions, runtime validation, async failures, error boundaries|ts,testsize|Model pending, approved and rejected requests as a TypeScript union. Validate three malformed inputs at the boundary and test a rejected Promise.|Explain what type checking cannot prove about incoming JSON.
cs|Choose data structures by workload|Big O, arrays, maps, sets, queues, trees, graphs, search and sorting|visualgo,cs50|Draw the cost of repeatedly scanning employees. Implement a Map-backed lookup and compare it with an array scan at multiple dataset sizes.|Explain when a linear scan is still a reasonable choice.
cs|Read query plans and protect writes|Joins, indexes, EXPLAIN, transactions, constraints, migrations|sql,pg,transactions|In a local synthetic database, write a staff-count query, compare plans before and after an index, then roll back a deliberately failed two-write transaction.|Explain what the constraint guarantees even if two requests arrive together.
linux|Navigate and inspect like an engineer|Paths, permissions, pipes, redirection, grep, exit codes and environment variables|mit,shell|Find a fake error in a directory of logs, count matching entries, inspect exit statuses and create a small shell script that fails clearly.|Explain why a command that works in your terminal might fail in CI.
linux|Diagnose a service from the shell|Processes, signals, ports, sockets, SSH, service logs and disk usage|mit,shell,sre|Run a local Express process, inspect its listener with lsof, stop it cleanly, then diagnose a port conflict. Compare local commands with journalctl and ss on Linux where available.|Explain how you would distinguish a crashed process, a blocked port and a full disk.
linux|Follow a request through the network|DNS, TCP, TLS, HTTP, proxies, cookies and request timing|protocol,http|Draw the path from a browser to Caddy, Express and PostgreSQL. Use curl and browser DevTools to observe headers, redirects and timing against a local demo.|Explain which layer you would check for a DNS failure, a 502 and a 403.
testing|Classify your existing Vitest tests|Unit vs integration vs end-to-end, mocks, real databases, test boundaries|vitest,testsize,supertest|Inspect five EMS tests and record which boundaries they cross. A standalone validator is a unit test. An Express route exercised with real PostgreSQL is integration. A browser through the running stack is end-to-end.|Explain why Vitest is the runner and why the name of the tool cannot classify a test.
testing|Write tests that prove the rule|Arrange–Act–Assert, fixtures, isolation, regression tests and permission cases|vitest,testsize|Write a failing test for an invalid leave transition, fix it, and prove that reverting the change fails the test. Add one unit case and one route-plus-database case.|Name the real dependencies in each test and the failure each test can detect.
testing|Debug across browser, API and database|Reproduction, hypotheses, breakpoints, logs, request IDs and minimal cases|sre,devtools,node,debugvideo|Introduce a harmless local bug such as an incorrect filter. Reproduce it, trace the browser request, pause in Express and confirm database state before fixing it.|Describe the evidence that ruled out your first plausible hypothesis.
testing|Run an end-to-end test and triage flakes|Browser tests, stable locators, traces, data isolation and repeatable runs|playwright,pwvideo|Exercise a leaf flow such as logging in and viewing a synthetic leave request. Open a trace from a failing run and repeat the test with fresh data.|Explain how you would distinguish an application regression from shared test state.
docker|Build smaller, repeatable images|Layers, build cache, multi-stage builds, build context, pinned dependencies and non-root runtime|dockbuild,dockvideo|Compare two local builds of a sample TypeScript service. Measure image size and rebuild time and explain why cache reuse changed.|Describe why dist scripts are available while dev tooling can be absent in the runtime image.
docker|Understand Compose at runtime|Networks, service discovery, ports, volumes, readiness, health checks and secrets|dockcompose,dockdata,dock|Run a local web/API/database stack. Trigger a startup-order problem, diagnose it with Compose logs and document how readiness and data persistence work.|Explain why a running database container may still reject a connection.
docker|Practice a Docker recovery|Build vs runtime failures, log inspection, image tags, backup and restore verification|dockdata,dockbuild,sre|In a disposable stack, back up synthetic data, change an image tag and rehearse restoring the older image and data into a separate test volume.|Show how you verified both service health and restored records.
actions|Read a workflow end to end|Events, runners, steps, jobs, contexts, expressions and permissions|hero,ghvideo,ghdocs|Simulate a workflow, then annotate EMS CI from trigger through checkout, dependency install, database health and verification.|Predict which workflow runs on a PR and which runs on a push to main.
actions|Build CI for a real test database|Service containers, health checks, job dependencies, matrixes, caches and artifacts|ghlearn,ghdocs|In a practice repo, wire test and build jobs, add PostgreSQL service health, and upload a small report. Intentionally break a test and read the failing job log.|Explain what should be cached and what should be uploaded as an artifact.
actions|Control and secure deployment|PR trust boundaries, minimal permissions, environment gates, concurrency, timeouts and OIDC|ghsecurity,ghoidc,ghdocs|Design a dry-run deployment job with explicit permission scope, serialized deployment and human approval where available. Draw the AWS OIDC trust flow without applying it to live EMS.|Explain why CI and deploy jobs need different access and what an OIDC trust condition restricts.
aws|Map an EC2 deployment|EC2, EBS, VPC, subnets, route tables and security groups|ec2,ec2video,vpc,awsedu|Draw your EMS deployment from internet to app to storage. Use an AWS Educate lab if available or reproduce the routing decisions on paper.|Explain which resource owns compute, storage, routing and inbound access.
aws|Reason about IAM and cloud costs|Roles, policies, trust vs permission, temporary credentials, cost drivers and budget visibility|iam,ghoidc,awsedu|Compare instance and GitHub deploy roles. Identify compute, disk, public IP and data transfer as items to check before launching anything. Draft a dry-run cost inventory.|Explain who can assume the role and what that role can do after assumption.
aws|Operate and recover an application|Health checks, logs, alerts, backup testing, rollbacks and deployment verification|ops,sre,vpcvideo|Use local Compose to simulate a failed deploy. Create a runbook with checks for the proxy, API and database, then roll back and verify the recovery.|State the evidence that would trigger a rollback.
security|Threat-model EMS|Assets, trust boundaries, authentication, authorization, least privilege and abuse cases|threat,owasp|Diagram employee, admin, API and DB boundaries with fake records. List three failure scenarios and pair each with a preventive control and regression test.|Explain where you would enforce employee ownership and how you would test it.
security|Defend sessions, inputs and releases|Cookie flags, CSRF, XSS, parameterized SQL, password hashing, secrets and dependencies|session,owasp,ghsecurity|Audit a local synthetic flow for session and input controls. Add a negative authorization regression test and document the expected blocking behavior.|Explain how a CSRF control and an ownership check protect different parts of the same request.
design|Design for latency and growth|Request paths, load balancing, caching, queues, consistency and observability|scale,protocol,ops|Estimate EMS traffic with stated assumptions. Compare the current request path with a queued import and document when the queue becomes worth its complexity.|Explain what you would measure before adding infrastructure.
design|Design for failure and duplicates|Timeouts, retry budgets, jitter, idempotency, concurrency and backpressure|retry,transactions,scale|Design a duplicate-safe leave request or webhook. Model a timeout after a successful write, then demonstrate one deliberate duplicate in a local fixture.|Explain why blindly retrying a POST can duplicate a side effect.
automation|Map an automation before building it|Triggers, actions, transforms, conditions, schema, APIs and human handoffs|n8n,n8nvideo|Draw an EMS-inspired request-routing workflow. Implement manual trigger, JSON transformation and conditional routing using fake records.|Identify which steps are deterministic and where human judgment is needed.
automation|Build a dependable webhook workflow|JSON contracts, delivery IDs, scheduling, retries, error branches and run logs|webhooks,n8nerrors,retry|Use a local mock webhook to route requests. Replay a duplicate and a transient failure, then record what your flow logged and retried.|Describe how you would replay a failed event safely.
agents|Understand models and choose the simplest tool|Tokens, context limits, sampling, hallucinations, structured outputs, cost and latency|model,agents,anthropic|Run a mock or available model against five request summaries. Compare a rule-based answer, an AI answer and a fallback for invalid JSON.|Explain when a script, a fixed model workflow and a tool-using agent fit.
agents|Direct an AI coding agent|Task framing, relevant repository context, acceptance criteria, permissions, diff and test review|codex,codexvideo,claude|Ask an agent to trace a local EMS feature with file evidence. Give it a bounded test task on a practice branch, review the diff and verify every claimed result independently.|Identify an assumption you checked in code and a decision you kept for yourself.
agents|Build a bounded agent workflow|Tool calling, input validation, read-only access, retrieval, prompt injection resistance and human review|agents,anthropic,agentvideo|Create a mock tool that returns metadata from a synthetic PR. Restrict allowed operations, separate PR text from instructions and check how the workflow handles an unexpected request.|Explain which controls are enforced by code at the tool boundary.
agents|Evaluate AI output systematically|Representative datasets, rubrics, baselines, failure categories, latency and regressions|evals,anthropic,agents|Create ten synthetic PR examples with expected findings. Score summaries and test suggestions against a simple baseline and include missing context and irrelevant text cases.|Explain what your evaluation can prove and what needs human review.
communication|Speak clearly and build confidence|Audience, concise structure, listening, clarifying questions and handling uncertainty|speaking,discovery|Record a 90-second EMS walkthrough with context, decision and evidence. Listen back and redo it. Practice answering one question where you are genuinely uncertain.|Explain a technical choice twice, once for an engineer and once for office staff.
communication|Negotiate scope and set priorities|Interests, alternatives, trade-offs, active listening and clear agreements|negotiate,adr|Role-play a stakeholder asking for urgent work. Ask what outcome matters, propose two scope options, and write a follow-up with ownership and a decision date.|Describe your fallback if the stakeholder declines both options.
communication|Protect attention and show your work|Time blocking, task sizing, feedback, technical writing and sustainable routines|focus,speaking|Time-block five study hours, log planned vs actual time, then write a short PR summary with context, verification and next decision.|Identify one pattern that disrupts your focus and one change you will test tomorrow.
decisions|Make a decision under uncertainty|Impact mapping, assumptions, timeboxed spikes, decision criteria and stopping rules|adr,discovery,sre|Choose the PR assistant scope. Inspect the existing interfaces and Git diff, then compare static rules, fixed model workflow and agent tools. Build a small spike and set explicit go/no-go thresholds.|Justify which feature you deferred and which fact would change your scope.
automation|Capstone · Build the no-AI baseline|Pull-request fixtures, data normalization, triggers, error paths and deterministic output|webhooks,n8n,n8nerrors|Build a local baseline that reads synthetic PR metadata and returns a review brief. Test malformed input and an empty changed-file list.|Demo the baseline and explain which work needs no model.
agents|Capstone · Add AI and evaluate it|Structured output, mock provider, bounded context, rubric and failure fallback|agents,anthropic,evals|Add an optional model adapter and compare it with the baseline. Record results for ten cases and fall back to the baseline when the adapter yields invalid data.|Show two errors the evaluation caught and what you changed.
actions|Capstone · Build, test and package|CI, integration boundaries, image build, artifacts and review evidence|ghdocs,dockbuild,vitest|Wire typecheck, tests and image build in practice CI. Save a test report and verify that a deliberately failing test blocks the pipeline.|Demonstrate a passing and a failing run and describe the approval boundary.
aws|Capstone · Rehearse release and recovery|Deployment diagrams, health checks, least privilege, logs and rollback|ops,iam,dockcompose|Run the assistant locally in Compose, simulate failed readiness and rehearse rollback. Draw a hypothetical AWS deployment with cost drivers and permissions.|Show that you can recover the local service without changing live EMS.
communication|Capstone · Demo and review the decision|Technical storytelling, evidence, retrospective, portfolio and continued learning|speaking,adr,focus|Record a three-minute demo of the read-only assistant. Explain one scope choice, one test, one CI run and one AI failure. Publish a local case study with a ranked backlog for the next 30 days.|Answer what you built, why you chose it, what broke and what you would learn next.
`
  .trim()
  .split("\n");

const plan = {
  sections,
  resources: references,
  days: curriculum.map((row, index) => {
    const [section, title, topics, ids, task, check] = row.split("|");
    return {
      day: index + 1,
      section,
      title,
      topics: topics.split(", "),
      resourceIds: ids.split(","),
      task,
      check,
    };
  }),
  blocks: [
    [
      "Recall and plan",
      30,
      "Recall yesterday’s result. Write today’s question, one unknown and your definition of done.",
    ],
    [
      "Learn",
      60,
      "Use the lesson resources. Pick the relevant chapter or video segment and take short notes.",
    ],
    [
      "Build",
      120,
      "Complete the practical exercise and save a runnable example, diagram or decision record.",
    ],
    [
      "Verify",
      60,
      "Run checks, investigate a failure or test an edge case. Capture the result as evidence.",
    ],
    [
      "Explain and log",
      30,
      "Answer the teach-back question aloud. Record evidence, remaining gaps and the next action.",
    ],
  ],
  decisionQuestions: [
    "What outcome does the user need, and how will we tell it improved?",
    "What does the code or workflow do today? What have I observed directly?",
    "What constraints are fixed? Which assumptions could change the solution?",
    "What is the smallest check or prototype that would reduce uncertainty?",
    "What options do I have, including leaving the behavior as it is?",
    "What could fail, who bears the cost, and how easily can I reverse the choice?",
    "What did I choose, what evidence supports it, and what would make me revisit it?",
  ],
  checklist: [
    "Baseline accepts synthetic PR fixtures and handles invalid inputs.",
    "Optional AI adapter returns validated output and falls back on errors.",
    "Ten cases compare AI output with the baseline using a written rubric.",
    "CI checks types, tests and builds an image in a practice repository.",
    "Local rollback rehearsal includes health checks and recovery evidence.",
    "Demo and case study explain decisions, limitations and next learning goals.",
  ],
};
