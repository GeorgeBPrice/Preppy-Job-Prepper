# Preppy-Job-Prepper (AI Feedback)

_Preppy-Job-Prepper_ is a comprehensive **Language Review** app designed to prepare professionals for job interviews in roles such of **Mid-level** to **Senior** level, for Full Stack, Web Developer or Application Developer positions. The app currently only covers core JavaScript concepts via concise lessons, interview focus examples, common interview questions, code challenges, and \*_AI-powered code grading and feedback_. The curriculum is broken down into 10 key sections ranging from fundamentals to advanced topics. There is also an Interview Questions section.

This is a **static application**, meaning it does not require a database to run. The curriculum content is managed through static data files (e.g., `curriculum.js`) or in-memory data structures, simplifying deployment and eliminating the need for backend server setup. User progress and code submissions are stored locally using `localStorage` and cookies.

## Features

- **Interactive Lessons**: Engage with detailed lessons across 10 core JavaScript areas, from fundamentals to advanced concepts.
- **Code Challenges**: Practice your skills with hands-on coding exercises and challenges.
- **Progress Tracking**: Monitor your learning progress with a built-in system using `localStorage` and cookies.
- **AI-Powered Code Grading**: Submit your code for review and receive detailed feedback from various AI providers (e.g., Claude, GPT, Mistral).
- **Multiple AI Providers**: Choose from a range of AI models for code review, including Claude 3.5 Sonnet, GPT-4o, Mistral Large, and more, with configurable API keys and versions.
- **Code Editor**: Write, save, and preview your solutions with syntax highlighting powered by Prism.js.
- **Static Deployment**: Run the app entirely on the client side with no server or database required.

## Key Technologies Used

- **Vue.js**: Frontend framework for building the user interface.
- **Pinia**: State management library for Vue.js to manage progress and AI settings.
- **Prism.js**: Syntax highlighting for code snippets and AI responses.
- **Axios**: Promise-based HTTP client for making API requests to AI providers.
- **Cookies (js-cookie)**: For persisting user data alongside `localStorage`.
- **Markdown Formatting**: Custom utility to render AI responses with styled markdown and code blocks.

## Version

1.0.0

## Known Issues

- **Untested AI Endpoints**: Not all AI provider endpoints (e.g., DeepSeek, Grok-3, LLaMA-3) have been fully tested, which may lead to inconsistent grading results.
- **CORS Issues**: Some AI providers enforce Cross-Origin Resource Sharing (CORS) restrictions, preventing direct browser requests. A temporary workaround is provided below, but a long-term solution (e.g., implementing a proxy server) is recommended.

## Improvements Coming

- **Expanded AI Support**: Add and fully test additional AI providers like DeepSeek and LLaMA-3 for broader grading options.
- **Improved Curriculum/more questions**: The curriculum is very ridgid at the moment, and more a "Review" format, than learning. We will refactor this in the future to improve it.
- **Proxy Server Solution**: Implement a lightweight backend proxy to handle API requests, eliminating CORS issues permanently.
- **Enhanced UI/UX**: Improve the code editor and lesson navigation with features like real-time linting and a progress dashboard.
- **TypeScript Integration**: Gradually migrate the codebase to TypeScript for better type safety and scalability.
- **More Interactive Content**: Introduce quizzes, timed challenges, and gamified elements to enhance engagement.

## Curriculum Overview

The app breaks down JavaScript concepts into 10 core areas crucial for interview success:

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

This curriculum prepares you for roles like Web Developer, Full-Stack Developer, and Software Developer by focusing on practical, interview-relevant skills.

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

- **Navigate Lessons**: Use the sidebar or navigation buttons to explore the 10 sections.
- **Complete Challenges**: Write code in the editor, save your progress, and submit it for AI grading.
- **Configure AI**: Select an AI provider, enter your API key, and optionally specify a version (default is "latest").
- **Review Feedback**: View detailed AI responses with suggestions on correctness, quality, and best practices.
- **Track Progress**: Mark lessons and challenges as completed, with data saved locally.

## Contributing

Contributions are disable for now. Feel free to email me any concearns or suggestions.

## License

This project is licensed under a custom license that allows downloading and using the software but prohibits modification and redistribution. See the [LICENSE](LICENSE) file for details.

---
