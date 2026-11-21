const plan = {
  "days": [
    {
      "day": 1,
      "date": "2026-11-22",
      "title": "Automation vs AI automation",
      "resource": "R1",
      "task": "Draw two examples from your EMS application."
    },
    {
      "day": 2,
      "date": "2026-11-23",
      "title": "Triggers and actions",
      "resource": "R1",
      "task": "Map a form submission -> notification workflow."
    },
    {
      "day": 3,
      "date": "2026-11-24",
      "title": "Data in / data out",
      "resource": "R2",
      "task": "Write sample JSON for an employee request."
    },
    {
      "day": 4,
      "date": "2026-11-25",
      "title": "Conditions and branching",
      "resource": "R1",
      "task": "Design approved vs rejected request paths."
    },
    {
      "day": 5,
      "date": "2026-11-26",
      "title": "First n8n workflow",
      "resource": "R1",
      "task": "Build a manual-trigger workflow with 2 steps."
    },
    {
      "day": 6,
      "date": "2026-11-27",
      "title": "Working with JSON",
      "resource": "R2",
      "task": "Transform a sample JSON object in a workflow."
    },
    {
      "day": 7,
      "date": "2026-11-28",
      "title": "Review and mini-project",
      "resource": "R1",
      "task": "Finish a no-AI request-routing workflow."
    },
    {
      "day": 8,
      "date": "2026-11-29",
      "title": "HTTP basics",
      "resource": "R3",
      "task": "Explain GET, POST, status codes."
    },
    {
      "day": 9,
      "date": "2026-11-30",
      "title": "Fetch API",
      "resource": "R3",
      "task": "Make a GET request in JS/TS."
    },
    {
      "day": 10,
      "date": "2026-12-01",
      "title": "Async and error paths",
      "resource": "R3",
      "task": "Handle success and failure responses."
    },
    {
      "day": 11,
      "date": "2026-12-02",
      "title": "Webhooks",
      "resource": "R2",
      "task": "Diagram an incoming event -> action."
    },
    {
      "day": 12,
      "date": "2026-12-03",
      "title": "n8n HTTP requests",
      "resource": "R2",
      "task": "Call a public test API from n8n."
    },
    {
      "day": 13,
      "date": "2026-12-04",
      "title": "TypeScript data shapes",
      "resource": "R4",
      "task": "Type your API payloads and responses."
    },
    {
      "day": 14,
      "date": "2026-12-05",
      "title": "Review and mini-project",
      "resource": "R1",
      "task": "Connect an API to your automated workflow."
    },
    {
      "day": 15,
      "date": "2026-12-06",
      "title": "LLMs in a workflow",
      "resource": "R5",
      "task": "Define exactly what AI should decide."
    },
    {
      "day": 16,
      "date": "2026-12-07",
      "title": "Prompt and input design",
      "resource": "R5",
      "task": "Draft reliable classification instructions."
    },
    {
      "day": 17,
      "date": "2026-12-08",
      "title": "API authentication",
      "resource": "R5",
      "task": "Set a key in an environment variable."
    },
    {
      "day": 18,
      "date": "2026-12-09",
      "title": "First AI request",
      "resource": "R5",
      "task": "Send sample text and read the response."
    },
    {
      "day": 19,
      "date": "2026-12-10",
      "title": "Structured response",
      "resource": "R5",
      "task": "Parse JSON and validate the fields."
    },
    {
      "day": 20,
      "date": "2026-12-11",
      "title": "Failure and cost handling",
      "resource": "R5",
      "task": "Add timeout, retry limit and usage notes."
    },
    {
      "day": 21,
      "date": "2026-12-12",
      "title": "Review and mini-project",
      "resource": "R5",
      "task": "Build AI classification with manual fallback."
    },
    {
      "day": 22,
      "date": "2026-12-13",
      "title": "Reusable TypeScript functions",
      "resource": "R4",
      "task": "Separate fetching, parsing, and actions."
    },
    {
      "day": 23,
      "date": "2026-12-14",
      "title": "Validation and safety",
      "resource": "R4",
      "task": "Reject malformed model outputs."
    },
    {
      "day": 24,
      "date": "2026-12-15",
      "title": "Logging",
      "resource": "R10",
      "task": "Track input ID, output and failures."
    },
    {
      "day": 25,
      "date": "2026-12-16",
      "title": "Event-driven automation",
      "resource": "R9",
      "task": "Process a mock GitHub pull-request event."
    },
    {
      "day": 26,
      "date": "2026-12-17",
      "title": "GitHub REST API",
      "resource": "R9",
      "task": "Read metadata from a test repository."
    },
    {
      "day": 27,
      "date": "2026-12-18",
      "title": "GitHub Actions basics",
      "resource": "R7",
      "task": "Run a simple automated check."
    },
    {
      "day": 28,
      "date": "2026-12-19",
      "title": "Review and mini-project",
      "resource": "R8",
      "task": "Make a typed PR-summary script."
    },
    {
      "day": 29,
      "date": "2026-12-20",
      "title": "Workflow vs agent",
      "resource": "R6",
      "task": "Explain fixed vs model-chosen next steps."
    },
    {
      "day": 30,
      "date": "2026-12-21",
      "title": "Tool calling",
      "resource": "R6",
      "task": "Define a safe read-only function."
    },
    {
      "day": 31,
      "date": "2026-12-22",
      "title": "Tool result handling",
      "resource": "R6",
      "task": "Validate and return tool results."
    },
    {
      "day": 32,
      "date": "2026-12-23",
      "title": "Limits and permissions",
      "resource": "R6",
      "task": "Keep repository write operations disabled."
    },
    {
      "day": 33,
      "date": "2026-12-24",
      "title": "Human approval",
      "resource": "R6",
      "task": "Design approval before any external action."
    },
    {
      "day": 34,
      "date": "2026-12-25",
      "title": "Agent testing",
      "resource": "R6",
      "task": "Try missing data and malicious instructions."
    },
    {
      "day": 35,
      "date": "2026-12-26",
      "title": "Review and mini-project",
      "resource": "R6",
      "task": "Build a read-only PR assistant prototype."
    },
    {
      "day": 36,
      "date": "2026-12-27",
      "title": "Project specification",
      "resource": "R9",
      "task": "Define input, output and success criteria."
    },
    {
      "day": 37,
      "date": "2026-12-28",
      "title": "Integrate components",
      "resource": "R5",
      "task": "Connect GitHub fetch -> AI summary."
    },
    {
      "day": 38,
      "date": "2026-12-29",
      "title": "Add quality checks",
      "resource": "R8",
      "task": "Log errors; test valid and invalid PRs."
    },
    {
      "day": 39,
      "date": "2026-12-30",
      "title": "Write documentation",
      "resource": "R7",
      "task": "Create README, setup and limitations."
    },
    {
      "day": 40,
      "date": "2026-12-31",
      "title": "Demo and reflection",
      "resource": "R9",
      "task": "Record a short demo; list next improvements."
    }
  ],
  "resources": [
    {
      "id": "R1",
      "title": "n8n Academy (free video-based lessons)",
      "url": "https://learn.n8n.io/"
    },
    {
      "id": "R2",
      "title": "n8n documentation",
      "url": "https://docs.n8n.io/"
    },
    {
      "id": "R3",
      "title": "MDN: Using Fetch / HTTP requests",
      "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"
    },
    {
      "id": "R4",
      "title": "TypeScript Handbook: Everyday Types",
      "url": "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
    },
    {
      "id": "R5",
      "title": "OpenAI API developer quickstart",
      "url": "https://developers.openai.com/api/docs/quickstart"
    },
    {
      "id": "R6",
      "title": "OpenAI API: Function calling",
      "url": "https://developers.openai.com/api/docs/guides/function-calling"
    },
    {
      "id": "R7",
      "title": "GitHub Actions quickstart",
      "url": "https://docs.github.com/en/actions/get-started/quickstart"
    },
    {
      "id": "R8",
      "title": "GitHub Actions workflow syntax",
      "url": "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax"
    },
    {
      "id": "R9",
      "title": "GitHub REST API documentation",
      "url": "https://docs.github.com/en/rest"
    },
    {
      "id": "R10",
      "title": "n8n error handling / docs search",
      "url": "https://docs.n8n.io/flow-logic/error-handling/"
    }
  ],
  "checklist": [
    "Reads pull-request title, description and file-change metadata from a test repository.",
    "Produces a concise summary, suggested tests, and potential concerns (not definitive security findings).",
    "Handles missing data and AI/API errors without crashing.",
    "Does not publish comments, modify code, merge pull requests or expose secrets without explicit authorization.",
    "Includes a readable README, setup instructions and at least three test scenarios."
  ]
};
