# Preppy-Job-Prepper (AI Feedback)

_Preppy-Job-Prepper_ is a comprehensive **Language Review** app designed to prepare professionals for job interviews in roles such of **Mid-level** to **Senior** level, for Full Stack, Web Developer or Application Developer positions. The app covers multiple programming languages and technologies including JavaScript, TypeScript, React, C#, DevOps, and AI concepts via concise lessons, interview focus examples, common interview questions, code challenges, and \*_AI-powered code grading and feedback_. Each topic curriculum is broken down into key sections ranging from fundamentals to advanced topics, with comprehensive interview questions.

<img width="962" alt="Home - darkmode" src="https://github.com/user-attachments/assets/8a51451d-4e4e-42ad-970f-0eb516d6e693" />

This is a **static application**, meaning it does not require a database to run. The curriculum content is managed through static data files (e.g., `curriculum.js`) or in-memory data structures, simplifying deployment and eliminating the need for backend server setup. User progress and code submissions are stored locally using `localStorage` and cookies.

## Features

- **Multi-Language Support**: Learn and practice across JavaScript, TypeScript, React, C#, DevOps, and AI technologies.
- **Interactive Lessons**: Engage with detailed lessons across core areas for each technology, from fundamentals to advanced concepts.
- **Extensive Interview Questions**: Review comprehensive, well-formatted interview questions for each technology.
- **Code Challenges**: Practice your skills with hands-on coding exercises and challenges.
- **Enhanced Progress Tracking**: Monitor your learning progress with an improved reactive tracking system.
- **AI-Powered Code Grading**: Submit your code for review and receive detailed feedback from various AI providers (e.g., Claude, GPT, Mistral).
- **Multiple AI Providers**: Choose from a range of AI models for code review, including Claude 3.5 Sonnet, GPT-4o, Mistral Large, and more, with configurable API keys and versions.
- **Code Editor**: Write, save, and preview your solutions with syntax highlighting powered by Prism.js.
- **Static Deployment**: Run the app entirely on the client side with no server or database required.

<img width="682" alt="Add you own API key" src="https://github.com/user-attachments/assets/a5a60595-fe68-4ff2-bffe-6a5352de7c9e" />

<img width="1007" alt="AI Code Challenge Review - darkmode" src="https://github.com/user-attachments/assets/b642ac9b-5e3a-4b09-bf3d-c1c8f726cc76" />

## Key Technologies Used

- **Vue.js**: Frontend framework for building the user interface.
- **Pinia**: State management library for Vue.js to manage progress and AI settings.
- **Prism.js**: Syntax highlighting for code snippets and AI responses.
- **Axios**: Promise-based HTTP client for making API requests to AI providers.
- **Cookies (js-cookie)**: For persisting user data alongside `localStorage`.
- **Markdown Formatting**: Custom utility to render AI responses with styled markdown and code blocks.

## Version

1.1.0

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

- **Select Technology**: Choose from JavaScript, TypeScript, React, C#, DevOps, or AI topics from the main menu.
- **Navigate Lessons**: Use the sidebar or navigation buttons to explore the sections for each technology.
- **Complete Challenges**: Write code in the editor, save your progress, and submit it for AI grading.
- **Review Interview Questions**: Study comprehensive sets of interview questions organized by topic.
- **Configure AI**: Select an AI provider, enter your API key, and optionally specify a version (default is "latest").
- **Review Feedback**: View detailed AI responses with suggestions on correctness, quality, and best practices.
- **Track Progress**: Mark lessons and challenges as completed, with data saved locally and visible in the improved progress bar.

## Contributing

Contributions are disabled for now. Feel free to email me any concerns or suggestions.

## License

This project is licensed under a custom license that allows downloading and using the software but prohibits modification and redistribution. See the [LICENSE](LICENSE) file for details.

## Updates

### v1.1.0 - Content and UI Overhaul (May 2025)

- **Multi-Language Support**: Added comprehensive curricula and interview questions for TypeScript, React, C#, DevOps, and AI technologies. Full courses coming soon.
- **UI Improvements**: Enhanced progress tracking with improved reactivity and visual feedback
- **Interview Questions**: Reformatted AI interview questions with better readability and code highlighting
- **Content Structure**: Organized content with clear sectioning and consistent formatting
- **Performance**: Improved store reactivity for better progress tracking and user experience

---
