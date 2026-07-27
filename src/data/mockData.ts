import type { 
  User,
  MetricCardData, 
  RecentSession, 
  InterviewQuestion, 
  EvaluationReport,
  QuestionFeedback
} from '../types';

export const mockUser: User = {
  id: 'usr_9982',
  name: 'Akhil',
  email: 'akhil@nexusai.dev',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  title: 'Full Stack AI Engineer',
  totalInterviews: 28,
  completedInterviews: 24,
  averageScore: 88,
  highestScore: 98,
  totalPracticeTime: '18h 45m'
};

export const mockMetrics: MetricCardData[] = [
  {
    id: 'total-interviews',
    label: 'Total Interviews',
    value: '28',
    numericValue: 28,
    change: '+4 this week',
    isPositive: true,
    iconName: 'Briefcase',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent'
  },
  {
    id: 'completed-interviews',
    label: 'Completed Interviews',
    value: '24',
    numericValue: 24,
    change: '85.7% finish rate',
    isPositive: true,
    iconName: 'CheckCircle2',
    gradient: 'from-green-500/20 via-emerald-500/10 to-transparent'
  },
  {
    id: 'average-score',
    label: 'Average Score',
    value: '88%',
    numericValue: 88,
    change: '+5% vs last month',
    isPositive: true,
    iconName: 'Award',
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent'
  },
  {
    id: 'highest-score',
    label: 'Highest Score',
    value: '98%',
    numericValue: 98,
    change: 'System Architecture',
    isPositive: true,
    iconName: 'Sparkles',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent'
  },
  {
    id: 'total-practice-time',
    label: 'Total Practice Time',
    value: '18h 45m',
    numericValue: 1125,
    change: '+2h 30m this week',
    isPositive: true,
    iconName: 'Clock',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent'
  }
];

export const mockRecentSessions: RecentSession[] = [
  {
    id: 'ses-101',
    role: 'Java Backend',
    level: '3–5 Years',
    difficulty: 'Hard',
    date: '2 hours ago',
    duration: '45 Minutes',
    score: 94,
    status: 'Completed',
    accuracy: '96%'
  },
  {
    id: 'ses-102',
    role: 'Python Backend',
    level: '5+ Years',
    difficulty: 'Hard',
    date: 'Yesterday',
    duration: '60 Minutes',
    score: 91,
    status: 'Completed',
    accuracy: '92%'
  },
  {
    id: 'ses-103',
    role: 'Frontend',
    level: '3–5 Years',
    difficulty: 'Medium',
    date: '3 days ago',
    duration: '30 Minutes',
    score: 88,
    status: 'Completed',
    accuracy: '89%'
  },
  {
    id: 'ses-104',
    role: 'DevOps Engineer',
    level: '1–2 Years',
    difficulty: 'Medium',
    date: 'July 24',
    duration: '30 Minutes',
    score: 84,
    status: 'Completed',
    accuracy: '85%'
  },
  {
    id: 'ses-105',
    role: 'Machine Learning',
    level: '5+ Years',
    difficulty: 'Hard',
    date: 'July 21',
    duration: '45 Minutes',
    score: 96,
    status: 'Completed',
    accuracy: '97%'
  },
  {
    id: 'ses-106',
    role: 'Flutter',
    level: 'Fresher',
    difficulty: 'Easy',
    date: 'July 18',
    duration: '15 Minutes',
    score: 79,
    status: 'Needs Review',
    accuracy: '78%'
  },
  {
    id: 'ses-107',
    role: 'Android',
    level: '1–2 Years',
    difficulty: 'Medium',
    date: 'July 15',
    duration: '30 Minutes',
    score: 90,
    status: 'Completed',
    accuracy: '91%'
  },
  {
    id: 'ses-108',
    role: 'Full Stack',
    level: '3–5 Years',
    difficulty: 'Hard',
    date: 'July 12',
    duration: '45 Minutes',
    score: 86,
    status: 'Completed',
    accuracy: '87%'
  }
];

export const roleQuestionsMap: Record<string, InterviewQuestion[]> = {
  'Java Backend': [
    {
      id: 'jb-q1',
      number: 1,
      text: 'Explain how the JVM Garbage Collector handles generational objects, specifically contrasting G1GC with ZGC in low-latency microservices.',
      category: 'JVM Memory Management',
      difficulty: 'Hard',
      expectedKeyPoints: ['Young vs Old Generation heap regions', 'Evacuation pauses and concurrent marking', 'ZGC load barriers and colored pointers', 'Tail latency SLA trade-offs'],
      timeLimitSeconds: 180,
      aiHint: 'Mention how ZGC avoids stop-the-world pauses during compaction using colored pointers.',
      modelAnswer: 'In modern Java microservices, G1GC partitions the heap into equal regions and performs concurrent marking with incremental stop-the-world evacuation pauses. While effective for general workloads, G1GC can suffer from tail latency spikes under heavy allocation. Conversely, ZGC achieves sub-millisecond pauses by using colored pointers and load barriers, performing marking, relocation, and reference processing concurrently with application threads.'
    },
    {
      id: 'jb-q2',
      number: 2,
      text: 'How do you design a distributed transaction across three Spring Boot microservices using the SAGA pattern without locks?',
      category: 'Distributed Systems',
      difficulty: 'Hard',
      expectedKeyPoints: ['Choreography vs Orchestration SAGA', 'Compensating transactions for rollback', 'Idempotency in event consumers', 'Outbox pattern for guaranteed delivery'],
      timeLimitSeconds: 180,
      aiHint: 'Discuss compensating transactions and the Transactional Outbox pattern.',
      modelAnswer: 'We implement the Orchestration SAGA pattern using a central state machine (like Temporal or Axon). Each service performs local transactions and publishes domain events. If a step fails, the orchestrator triggers asynchronous compensating transactions in reverse order. To guarantee event delivery without distributed locks, we use the Transactional Outbox pattern, atomically saving events to the local database before publishing to Kafka.'
    }
  ],
  'Python Backend': [
    {
      id: 'py-q1',
      number: 1,
      text: 'Explain how Python\'s Global Interpreter Lock (GIL) impacts multi-threaded CPU-bound workloads, and contrast asyncio with multiprocessing.',
      category: 'Concurrency & Internals',
      difficulty: 'Medium',
      expectedKeyPoints: ['GIL mutex preventing simultaneous bytecode execution', 'I/O bound vs CPU bound performance', 'asyncio event loop and coroutines', 'multiprocessing memory isolation and IPC'],
      timeLimitSeconds: 150,
      aiHint: 'Contrast I/O bound concurrency with CPU bound parallelism.',
      modelAnswer: 'The GIL is a mutex that allows only one thread to execute Python bytecode at a time, rendering threading ineffective for CPU-bound tasks. For I/O-bound tasks (network, disk), the GIL is released during blocking calls, making `asyncio` cooperative multitasking ideal due to low context-switching overhead. For CPU-bound tasks, `multiprocessing` spawns separate OS processes with independent memory spaces and GILs, utilizing multi-core architectures via inter-process communication.'
    },
    {
      id: 'py-q2',
      number: 2,
      text: 'How do you optimize a FastAPI endpoint that queries PostgreSQL with SQLAlchemy and processes 10,000 JSON records per second?',
      category: 'Performance Optimization',
      difficulty: 'Hard',
      expectedKeyPoints: ['Asyncpg database driver', 'SQLAlchemy async sessions and eager loading (joinedload)', 'Pydantic v2 Rust serialization speedups', 'Connection pooling and read replicas'],
      timeLimitSeconds: 180,
      aiHint: 'Focus on asyncpg, N+1 query prevention, and Pydantic v2.',
      modelAnswer: 'To achieve 10k RPS in FastAPI, we use `asyncpg` as the underlying non-blocking PostgreSQL driver paired with SQLAlchemy 2.0 async sessions. We eliminate N+1 query problems by strictly using `selectinload` or `joinedload` for relational fetching. Furthermore, we leverage Pydantic v2 (built in Rust) for zero-copy schema validation and JSON serialization, and configure PgBouncer for efficient connection pooling across read replicas.'
    }
  ],
  'Frontend': [
    {
      id: 'fe-q1',
      number: 1,
      text: 'Explain the difference between Server-Side Rendering (SSR), Static Site Generation (SSG), and Incremental Static Regeneration (ISR) in Next.js App Router.',
      category: 'Modern Framework Architecture',
      difficulty: 'Medium',
      expectedKeyPoints: ['Request-time vs Build-time HTML generation', 'React Server Components (RSC) vs Client Components', 'Stale-while-revalidate caching strategies', 'Time-To-First-Byte (TTFB) and SEO impact'],
      timeLimitSeconds: 150,
      aiHint: 'Discuss when to use dynamic rendering versus cached revalidation.',
      modelAnswer: 'In Next.js App Router, SSR generates HTML on each incoming request, ideal for personalized dynamic feeds where real-time data is mandatory. SSG pre-renders HTML at build time, offering sub-10ms CDN delivery and optimal SEO for blogs and docs. ISR bridges the gap by serving cached static pages while asynchronously revalidating data in the background based on a cache tag or timer, providing instant loads without rebuilding the entire site.'
    },
    {
      id: 'fe-q2',
      number: 2,
      text: 'How do you diagnose and prevent memory leaks caused by closures and event listeners in a complex single-page application?',
      category: 'DOM & Memory Management',
      difficulty: 'Hard',
      expectedKeyPoints: ['Chrome DevTools Heap Snapshot comparison', 'Detached DOM trees and dangling event listeners', 'AbortController for cleanup in useEffect', 'WeakMap and WeakRef for cache referencing'],
      timeLimitSeconds: 180,
      aiHint: 'Mention AbortController and Heap Snapshot allocation timelines.',
      modelAnswer: 'We diagnose memory leaks by taking sequential Heap Snapshots in Chrome DevTools and filtering for detached DOM trees and retained closure scopes. Common culprits include unremoved `window` or `document` event listeners and uncleared timers. In React, we prevent this by returning cleanup functions in `useEffect` or passing an `AbortController.signal` to fetch requests and event listeners, ensuring references are garbage collected when components unmount.'
    }
  ]
};

// Fallback questions for any other role
export const defaultMockQuestions: InterviewQuestion[] = [
  {
    id: 'gen-q1',
    number: 1,
    text: 'Walk me through your approach to designing a fault-tolerant, highly available distributed system capable of handling 50,000 requests per second.',
    category: 'System Architecture',
    difficulty: 'Hard',
    expectedKeyPoints: ['Global DNS load balancing and edge caching (CDN)', 'Stateless API tier with horizontal auto-scaling', 'Database sharding and read replicas with eventual consistency', 'Asynchronous processing via message queues (Kafka/RabbitMQ)'],
    timeLimitSeconds: 180,
    aiHint: 'Consider traffic ingestion, caching layers, and database scaling bottlenecks.',
    modelAnswer: 'We architecture the system in decoupled tiers: Cloudflare CDN handles static caching and DDoS protection at the edge. Traffic enters through AWS ALB distributing load across stateless Kubernetes pods auto-scaled via HPA. For persistence, we use PostgreSQL with read replicas and Redis cluster for hot-key caching (99% hit rate). Writes are ingested asynchronously into Apache Kafka, decoupling burst traffic from downstream worker services.'
  },
  {
    id: 'gen-q2',
    number: 2,
    text: 'How do you ensure zero-downtime deployments and handle backward-compatible database schema migrations in a CI/CD pipeline?',
    category: 'DevOps & Reliability',
    difficulty: 'Medium',
    expectedKeyPoints: ['Blue-Green or Canary deployment strategies', 'Expand and Contract (Parallel Change) DB migration pattern', 'Readiness and liveness health probes in Kubernetes', 'Automated canary rollback metrics (5xx error rates)'],
    timeLimitSeconds: 150,
    aiHint: 'Describe the Expand and Contract database migration strategy.',
    modelAnswer: 'Zero-downtime requires decoupling code deployments from schema changes. We use the "Expand and Contract" pattern: step 1 expands the DB schema (adding nullable columns or triggers), step 2 deploys new application code via Canary or Blue-Green release, and step 3 contracts old columns once all traffic is migrated. Kubernetes readiness probes ensure pods only receive traffic once fully initialized, and automated alarms rollback on 5xx latency spikes.'
  },
  {
    id: 'gen-q3',
    number: 3,
    text: 'Tell me about a time you had to resolve a critical production SEV-1 outage under intense pressure. What was the root cause and remediation?',
    category: 'Behavioral & Leadership',
    difficulty: 'Medium',
    expectedKeyPoints: ['STAR structure (Situation, Task, Action, Result)', 'Clear communication with stakeholders and incident commander role', 'Immediate mitigation vs long-term preventative fix', 'Blameless post-mortem and actionable action items'],
    timeLimitSeconds: 180,
    aiHint: 'Use the STAR method and emphasize blameless post-mortem culture.',
    modelAnswer: 'During Black Friday, our payment gateway experienced a SEV-1 cascade due to thread pool exhaustion caused by a downstream vendor timeout. As Incident Commander, I immediately enacted our mitigation runbook: rerouting 50% of traffic to our secondary backup provider and applying a circuit breaker with exponential backoff. Latency recovered within 8 minutes. We later held a blameless post-mortem, adding automated chaos tests and stricter fallback timeouts.'
  }
];

export const getQuestionsForRole = (role: string): InterviewQuestion[] => {
  return roleQuestionsMap[role] || defaultMockQuestions;
};

export const generateImmediateFeedback = (question: InterviewQuestion, answerText: string): QuestionFeedback => {
  const words = answerText.trim().split(/\s+/).length;
  const score = words > 40 ? Math.floor(Math.random() * 8) + 91 : words > 15 ? Math.floor(Math.random() * 12) + 78 : 65;
  
  return {
    score,
    feedback: words > 30 
      ? `Excellent response! You clearly articulated the core architectural mechanics of ${question.category}. Your technical vocabulary and structure align closely with L5/L6 engineering expectations.`
      : `Good foundational attempt. You touched upon the high-level concepts of ${question.category}, but providing more concrete implementation details and edge-case trade-offs would elevate this to a top-tier answer.`,
    strengths: [
      `Accurately identified key mechanics of ${question.category}`,
      'Clear, logical progression of technical concepts',
      'Demonstrated practical production awareness'
    ],
    improvement: words > 30
      ? 'Consider mentioning specific monitoring metrics (like p99 tail latency or GC pause durations) to quantify your impact.'
      : 'Expand on the exact failure modes and how your design mitigates distributed race conditions or memory bottlenecks.',
    keyPointsMatched: question.expectedKeyPoints.slice(0, words > 30 ? 3 : 2)
  };
};

export const mockHistoricalScores = [
  { session: 'Ses 1', score: 72, avg: 72 },
  { session: 'Ses 2', score: 78, avg: 75 },
  { session: 'Ses 3', score: 81, avg: 77 },
  { session: 'Ses 4', score: 86, avg: 79 },
  { session: 'Ses 5', score: 83, avg: 80 },
  { session: 'Ses 6', score: 91, avg: 82 },
  { session: 'Ses 7', score: 94, avg: 84 },
  { session: 'Ses 8', score: 92, avg: 85 }
];

export const mockTopicMastery = [
  { topic: 'System Architecture & Scalability', mastery: 94, questionsAnswered: 42 },
  { topic: 'Data Structures & Algorithms', mastery: 88, questionsAnswered: 35 },
  { topic: 'Concurrency & Multi-threading', mastery: 86, questionsAnswered: 28 },
  { topic: 'Database Design & Sharding', mastery: 91, questionsAnswered: 31 },
  { topic: 'DevOps & CI/CD Pipelines', mastery: 84, questionsAnswered: 19 },
  { topic: 'Behavioral & Leadership (STAR)', mastery: 95, questionsAnswered: 24 }
];

export const mockEvaluationReport: EvaluationReport = {
  sessionId: 'ses-9982-final',
  role: 'Frontend Architect',
  level: 'Senior',
  date: 'Today, 2026',
  timeTaken: '28m 42s',
  overallScore: 92,
  technicalScore: 94,
  communicationScore: 91,
  confidenceScore: 93,
  problemSolvingScore: 90,
  summary: 'Akhil demonstrated exceptional competency across frontend architectural patterns, state management at scale, and performance profiling. Responses showed deep familiarity with modern React Server Components, memory leak mitigation, and web vitals optimization.',
  competencyScores: [
    { subject: 'Technical Accuracy', score: 94, fullMark: 100 },
    { subject: 'Communication', score: 91, fullMark: 100 },
    { subject: 'System Structure', score: 95, fullMark: 100 },
    { subject: 'Problem Solving', score: 90, fullMark: 100 },
    { subject: 'Confidence & Pace', score: 93, fullMark: 100 }
  ],
  strengths: [
    'Deep understanding of browser rendering engines and DOM reconciliation',
    'Clear, articulate STAR-structured answers with quantifiable metrics',
    'Proactive discussion of security trade-offs (XSS, CSP, CORS) without being prompted',
    'Exemplary code structuring and component boundary design'
  ],
  weaknesses: [
    'Could elaborate slightly more on edge serverless database connection pooling',
    'Minor hesitation when discussing advanced WebAssembly integration patterns'
  ],
  actionableSuggestions: [
    'Review edge-runtime caching headers and stale-while-revalidate nuances for hybrid rendering',
    'Practice explaining complex state synchronization across Web Workers using SharedArrayBuffers',
    'Continue leveraging real-world metrics when describing past production bug remediations'
  ],
  recommendedTopics: [
    'Advanced Web Workers & Off-main-thread Architecture',
    'Edge Serverless Rendering & Cloudflare Workers',
    'Micro-frontends with Module Federation at Enterprise Scale',
    'WebAudio API & Canvas 60FPS High-Performance Visualizations'
  ],
  questionBreakdown: [
    {
      questionNumber: 1,
      questionText: 'How would you architect a 60 FPS real-time collaborative Figma clone using Canvas and WebSockets in React?',
      userScore: 95,
      aiFeedback: 'Flawless answer. Accurately highlighted off-screen canvas rendering, spatial indexing (Quadtrees), and operational transformation (OT) / CRDTs for real-time conflict resolution.',
      keyPointsCovered: 4,
      totalKeyPoints: 4
    },
    {
      questionNumber: 2,
      questionText: 'Describe your strategy for migrating a legacy 500k LOC monolithic SPA to a micro-frontend architecture without downtime.',
      userScore: 89,
      aiFeedback: 'Strong practical approach using Strangler Fig pattern and Module Federation. Missed a minor detail regarding shared singleton dependencies like React Router across boundaries.',
      keyPointsCovered: 3,
      totalKeyPoints: 4
    },
    {
      questionNumber: 3,
      questionText: 'How do you diagnose and eliminate Core Web Vitals (LCP, INP, CLS) regressions in a high-traffic e-commerce funnel?',
      userScore: 92,
      aiFeedback: 'Excellent breakdown of INP (Interaction to Next Paint) optimization using `startTransition` and yielding to main thread via `setTimeout` or `scheduler.postTask`.',
      keyPointsCovered: 4,
      totalKeyPoints: 4
    }
  ]
};
