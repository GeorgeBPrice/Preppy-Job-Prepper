# Preppy-Job-Prepper (AI-Enhanced Learning Platform)

_Preppy-Job-Prepper_ is a comprehensive **AI-enhanced Language Review** app designed to prepare professionals for job interviews in roles such as **Mid-level** to **Senior** level, for Full Stack, Web Developer or Application Developer positions. The app covers multiple programming languages and technologies including JavaScript, TypeScript, React, C#, DevOps, and AI concepts via concise lessons, interview focus examples, common interview questions, code challenges, and **powerful AI-powered code grading and interactive chat assistance**. Each topic curriculum is broken down into key sections ranging from fundamentals to advanced topics, with comprehensive interview questions.

<img width="962" alt="Home - darkmode" src="https://github.com/user-attachments/assets/8a51451d-4e4e-42ad-970f-0eb516d6e693" />

This is a **static application**, meaning it does not require a database to run. The curriculum content is managed through static data files (e.g., `curriculum.js`) or in-memory data structures, simplifying deployment and eliminating the need for backend server setup. User progress and code submissions are stored locally using `localStorage` and cookies.

## AI-Powered Features

### **Preppy Chat Bot Assistant**
- **Context-Aware AI Chat**: Interactive "Ask Preppy" assistant that understands your current topic, section, lesson, and subsection in real time
- **Real-Time Streaming Responses**: Get instant, streaming AI responses as the model generates them (SSE support)
- **Multi-Conversation Management**: Create, switch between, and manage multiple conversation threads
- **Lesson Quick-Action Buttons**: A scoped `Ask Preppy:` row above every lesson subsection with one-click prompts — *Ask questions* (scopes chat to the current block), *Explain simpler* (prose only, no code), *More examples*, *Quiz me*, and *Practice problem*
- **Collapsible User Messages**: Long, context-heavy prompts automatically clamp to ~3 lines with a *Show more / Show less* toggle so the chat UI isn't dominated by walls of injected context
- **Topic-Specific Assistance**: Automatically includes current lesson content and section context in conversations
- **Mobile-Responsive Design**: Expandable chat panel that adapts to desktop, tablet, and mobile screens, with an icon-only *Preppy AI* trigger in the mobile header
- **Customizable System Prompts**: Configure AI behavior with custom system prompts for personalized learning
- **Markdown-Rendered Responses**: Beautifully formatted AI responses with syntax-highlighted code blocks

### **AI-Powered Code Grading**
- **Intelligent Code Review**: Submit your code solutions for comprehensive AI analysis and feedback
- **Multi-Dimensional Feedback**: Receive detailed reviews covering:
  - **Correctness**: Does your solution meet all requirements?
  - **Code Quality**: Structure, efficiency, and readability analysis
  - **Best Practices**: Modern JavaScript/TypeScript standards compliance
  - **Improvement Suggestions**: Actionable recommendations for enhancement
- **Persistent Response Storage**: Save and review AI feedback for all your submissions

### **Extensive AI Provider Support**
Choose from **25+ AI models** across multiple providers:

**Anthropic Claude Models:**
- Claude 3.5 Sonnet, Claude 3.7 Sonnet, Claude 3 Opus, Claude 3 Haiku
- Claude Opus 4, Claude Sonnet 4

**OpenAI GPT Models:**
- GPT-3.5 Turbo, GPT-4 Turbo, GPT-4o, GPT-4o Mini
- GPT-4.5, GPT-o1, GPT-o3, GPT-o4 Mini

**Google Gemini Models:**
- Gemini 1.5 Pro, Gemini 2.5 Pro, Gemini 2.5 Flash

**Other Leading Models:**
- Mistral Large, Mistral Large 2
- DeepSeek Reasoner, DeepSeek R1 Distill
- Grok 3
- Llama 3, Llama 3.1, Llama 3.2 (via Together AI)
- Qwen 2.5
- Cohere Command R+
- Ollama (Local models)

**Custom Provider Support:**
- Configure any custom AI endpoint with custom headers and model specifications

### **Advanced AI Features**
- **Streaming Support**: Real-time response streaming for faster, more interactive experiences
- **Provider-Specific Optimizations**: Model-specific parameter tuning for optimal performance
- **CORS Proxy Integration**: Seamless API integration via Vercel proxy in production
- **Development/Production Modes**: Direct API calls in development, proxy-based in production
- **API Key Validation**: Format validation for different provider API keys
- **Connection Testing**: Test API connectivity before submitting code or chatting
- **Error Handling**: Graceful fallbacks and detailed error messages for troubleshooting

## Learning Features

- **Multi-Language Support**: Learn and practice across JavaScript, TypeScript, React, C#, DevOps, and AI technologies.
- **Interactive Lessons**: Engage with detailed lessons across core areas for each technology, from fundamentals to advanced concepts.
- **Extensive Interview Questions**: Review comprehensive, well-formatted interview questions for each technology, with a mobile-optimized horizontal category strip so questions load in view immediately.
- **Minicourse Recapper**: Compact "essential concepts" review pass for every topic, with a mobile layout tuned so *Jump to* badges wrap cleanly instead of clipping.
- **Code Challenges**: Practice your skills with hands-on coding exercises and challenges.
- **Enhanced Progress Tracking**: Monitor your learning progress with an improved reactive tracking system — now keyed by content-stable IDs so reordering or renaming curriculum sections no longer loses completion state.
- **In-Sidebar Completion Toggles**: Tick any lesson complete directly from the sidebar; the in-lesson *Mark Completed* pill stays in sync.
- **In-Lesson Top Navigation**: Previous / next chevrons plus a *Mark Completed* pill pinned to the top of every lesson for one-tap navigation on mobile.
- **Breadcrumb Navigation**: Topic › Section › Lesson trail in the header replaces raw URLs with human-readable context.
- **Keyboard Shortcuts**: Developer-friendly shortcuts (`Ctrl/⌘ K` search, `Ctrl/⌘ ;` toggle Preppy AI, `j`/`k` lesson nav, `c` toggle complete, `?` cheatsheet) with an in-app help modal.
- **Code Editor**: Write, save, and preview your solutions with syntax highlighting powered by Prism.js — now with full lesson context passed through to AI grading.
- **Static Deployment**: Run the app entirely on the client side with no server or database required.
- **Resilient Storage Layer**: Progress persists via `localStorage` with a size-aware cookie summary fallback so large curriculum state is never silently truncated.

<img width="682" alt="Add you own API key" src="https://github.com/user-attachments/assets/a5a60595-fe68-4ff2-bffe-6a5352de7c9e" />

<img width="1007" alt="AI Code Challenge Review - darkmode" src="https://github.com/user-attachments/assets/b642ac9b-5e3a-4b09-bf3d-c1c8f726cc76" />

## Key Technologies Used

### Frontend Framework & State Management
- **Vue.js 3**: Modern reactive frontend framework for building the user interface
- **Pinia**: State management library for Vue.js managing progress, AI settings, and chat conversations
- **Vue Router**: Client-side routing for navigation between topics and lessons

### AI Integration & HTTP
- **Axios**: Promise-based HTTP client for making API requests to AI providers
- **Fetch API**: Native streaming support for real-time AI responses (Server-Sent Events)
- **Vercel Proxy**: Production CORS proxy solution for seamless AI API integration

### Code & Content Rendering
- **Prism.js**: Syntax highlighting for code snippets, AI responses, and code editor
- **Marked**: Markdown parser for rendering AI responses with formatted text and code blocks
- **Custom Markdown Formatter**: Enhanced markdown rendering with styled code blocks and syntax highlighting

### UI & Styling
- **Bootstrap 5**: Responsive CSS framework for modern, mobile-first design
- **Bootstrap Icons**: Comprehensive icon library for UI elements
- **Bootstrap Vue 3**: Vue 3 integration for Bootstrap components

### Build Tools & Development
- **Vite**: Fast build tool and development server
- **ESLint**: Code linting and quality assurance
- **Prettier**: Code formatting for consistent style

### Data Persistence
- **localStorage**: Client-side storage for user progress and code submissions
- **js-cookie**: Cookie-based persistence for user preferences and settings

## Version

1.2.0

## Known Issues

- **Untested AI Endpoints**: Not all AI provider endpoints (e.g., DeepSeek, Grok-3, LLaMA-3).
- **CORS Issues**: Some AI providers enforce Cross-Origin Resource Sharing (CORS) restrictions, preventing direct browser requests. A solution was implemented, per Vercel guide: https://vercel.com/guides/how-to-enable-cors.

## Improvements Coming

- **Expanded AI Support**: Add and fully test additional AI providers like DeepSeek and LLaMA-3 for broader grading options.
- **More Technologies**: Continue expanding to additional programming languages and frameworks.
- **Proxy Server Solution**: Implement a lightweight backend proxy to handle API requests, eliminating CORS issues permanently.
- **Enhanced UI/UX**: Improve the code editor and lesson navigation with features like real-time linting and a progress dashboard.
- **TypeScript Integration**: Gradually migrate the codebase to TypeScript for better type safety and scalability.
- **More Interactive Content**: Introduce quizzes, timed challenges, and gamified elements to enhance engagement.

## Curriculum Overview

The app includes comprehensive curricula for multiple technologies:

### For example, JavaScript

Breaks down JavaScript concepts into 10 core areas crucial for interview success:

1. **JavaScript Fundamentals**: Variables, data types, operators, control flow, functions, and type conversion.
2. **Objects and Data Structures**: Object manipulation, arrays, Maps, and Sets.
3. **Functional Programming**: Higher-order functions, closures, pure functions, and composition.
4. **Asynchronous JavaScript**: Callbacks, Promises, async/await, and Fetch API.
5. **DOM Manipulation and Events**: DOM selection, event handling, and browser APIs.
6. **ES6+ Features**: Destructuring, template literals, spread/rest operators, and optional chaining.
7. **JavaScript Design Patterns**: Module, Singleton, Observer, and Factory patterns.
8. **Testing and Debugging**: Unit testing, debugging techniques, and common pitfalls.
9. **Modern JavaScript Frameworks**: Component architecture, state management, and routing concepts.
10. **Advanced JavaScript Concepts**: Prototypes, Web Workers, memory management, and TypeScript basics.

## Setup and Installation

To get started with Preppy-Job-Prepper, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/GeorgeBPrice/Preppy-Job-Prepper.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd Preppy-Job-Prepper
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Run the Application**

   ```bash
   npm run serve
   ```

5. **Access the Application**

   Open your browser and navigate to `http://localhost:8080`.

### Temporary Workaround for CORS

Due to CORS restrictions, some AI providers may not allow direct requests from the browser. Here's a temporary solution:

#### Option 1: Chrome with CORS Disabled

1. Create a shortcut to Chrome on your desktop.
2. Right-click the shortcut and select "Properties".
3. In the "Target" field, append the following flags:

   ```
   --disable-web-security --user-data-dir="C:/ChromeDevSession"
   ```

   For example:

   ```
   "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:/ChromeDevSession"
   ```

4. Use this shortcut to launch Chrome when running the application.

**Note**: This workaround disables web security features and should only be used for development purposes. A proxy server is recommended for production use.

## Usage

### Getting Started with AI Features

1. **Configure Your AI Provider**:
   - Click the "Ask Preppy" button or navigate to AI settings
   - Select your preferred AI provider from 25+ available models
   - Enter your API key (provider-specific format validation included)
   - Optionally specify a model version or use the default "latest"
   - Test your connection to ensure everything is working

2. **Use Preppy Chat Assistant**:
   - Click the "Ask Preppy" button (bottom-right on mobile, side panel on desktop)
   - The assistant automatically knows your current topic and lesson context
   - Ask questions about concepts, get explanations, or request code examples
   - Create multiple conversation threads for different topics
   - Enable streaming for real-time responses (default) or disable for traditional responses

3. **Submit Code for AI Review**:
   - Complete a code challenge in the built-in editor
   - Click "Submit for AI Grading"
   - Select your AI provider (can be different from chat provider)
   - Receive comprehensive feedback on correctness, quality, and best practices
   - Review saved responses anytime

### Learning Workflow

- **Select Technology**: Choose from JavaScript, TypeScript, React, C#, DevOps, or AI topics from the main menu.
- **Navigate Lessons**: Use the sidebar or navigation buttons to explore the sections for each technology.
- **Complete Challenges**: Write code in the editor, save your progress, and submit it for AI grading.
- **Review Interview Questions**: Study comprehensive sets of interview questions organized by topic.
- **Track Progress**: Mark lessons and challenges as completed, with data saved locally and visible in the improved progress bar.

## Contributing

Contributions are disabled for now. Feel free to email me any concerns or suggestions.

## License

This project is licensed under a custom license that allows downloading and using the software but prohibits modification and redistribution. See the [LICENSE](LICENSE) file for details.

## Updates

### v1.2.0 - Audit Review UX + AI Overhaul (April 2026)

Delivers the first wave of the Audit Review plan — bug fixes, core UX wins, and lesson-level AI integration.

**Bug fixes (from the audit)**
- **AI grading now knows the lesson**: removed the broken `window.curriculum` escape hatch in `CodeEditor.vue`; section + challenge context is resolved through `curriculumLoader` and passed explicitly into grading prompts.
- **Progress storage no longer silently drops data**: `storage.js` stops blindly writing full progress blobs to a 4 KB cookie; `localStorage` is primary, with a compact cookie summary used only as a size-safe continuity hint.
- **Content-stable progress keys**: every section and lesson now has a stable string ID (`src/utils/curriculumIds.js` + `scripts/validate-curriculum-ids.mjs` CI validator). Progress is keyed by `{ topic, sectionId, lessonId }`, so curriculum reorders no longer wipe or mis-target completion state. A one-time client-side migrator upgrades existing users.

**AI wins**
- **Lesson quick-action buttons**: a compact `Ask Preppy:` row above every lesson subsection with one-click templates — *Ask questions* (primes the chat to stay scoped to the current block), *Explain simpler* (written prose only, no code samples), *More examples*, *Quiz me*, *Practice problem*.
- **Collapsible long user messages**: context-heavy prompts in the chat clamp to ~3 lines with a fade mask and a rounded *Show more / Show less* toggle.
- **Richer context injection**: Preppy chat automatically includes topic, section, lesson, and subsection as a conversation context label.

**UI / UX wins**
- **Preppy AI header button**: primary access from every page, with dark-mode contrast fixed (uses `--primary-color-dark`) and a mobile icon-only variant.
- **Breadcrumb trail**: Topic › Section › Lesson replacing raw URLs (`AppBreadcrumb.vue`).
- **Lesson top navigation**: previous / next chevrons and a consolidated *Mark Completed* pill at the top of every lesson.
- **Sidebar completion ticks**: tick any lesson complete directly from the sidebar; fully synced with the in-lesson toggle.
- **Keyboard shortcuts**: `Ctrl/⌘ K` (search), `Ctrl/⌘ ;` (toggle Preppy AI), `j` / `k` (prev / next lesson), `c` (toggle complete), `?` (shortcut cheatsheet). Implemented once in `useKeyboardShortcuts.js` and mounted in `App.vue`.
- **Topic landing pages** (`TopicHomeView.vue`) with a disabled *Start Learning* button for topics without curriculum yet.
- **Search UX**: search overlay auto-closes on result selection on mobile; expanded to search across all topics.
- **HomeView progress**: All Topics cards now show actual progress and sort in-progress topics first; *Three Ways to Study* cards are compacted with corner-offset icons.
- **Mobile polish**: horizontal scroll strip for Interview Questions categories (so the question list stays visible below); minicourse-recapper lesson card drops its icon on small screens and compacts *Jump to* badges; topic selector widened so options don't clip.
- **Code-example syntax styling**: refreshed Prism theme for in-lesson code blocks across JS, TS, JSX, C#, Python, YAML, CSS, and markup.

### v1.1.0 - Content and UI Overhaul (May 2025)

- **Multi-Language Support**: Added comprehensive curricula and interview questions for TypeScript, React, C#, DevOps, and AI technologies. Full courses coming soon.
- **Preppy Chat Bot Assistant**: Introduced context-aware AI chat assistant with streaming support, multi-conversation management, and topic-specific assistance
- **Expanded AI Provider Support**: Added support for 25+ AI models including Claude 3.7 Sonnet, GPT-o1/o3, Gemini 2.5, DeepSeek Reasoner, and more
- **Streaming AI Responses**: Real-time streaming support for faster, more interactive AI conversations
- **UI Improvements**: Enhanced progress tracking with improved reactivity and visual feedback
- **Interview Questions**: Reformatted AI interview questions with better readability and code highlighting
- **Content Structure**: Organized content with clear sectioning and consistent formatting
- **Performance**: Improved store reactivity for better progress tracking and user experience
- **Mobile Optimization**: Responsive chat interface with mobile-specific layouts and controls

---
