# Contributing to MagnetHub SDK

First off, thank you for considering contributing to MagnetHub SDK! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to fostering an open and welcoming environment. Please be respectful and considerate in all interactions.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Your environment (browser, OS, SDK version)
- Code samples or screenshots if applicable

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- A clear and descriptive title
- A detailed description of the proposed functionality
- Examples of how this feature would be used
- Why this enhancement would be useful

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`
3. Make your changes
4. Test your changes thoroughly
5. Submit a pull request

## Development Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A modern web browser for testing

### Setup Steps

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/magnethub-sdk.git
   cd magnethub-sdk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Test locally**
   ```bash
   npx serve examples
   ```
   Then open `http://localhost:3000/parent.html` in your browser.

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
   or
   ```bash
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Write clean, readable code
   - Add JSDoc comments for new functions/classes
   - Update documentation if needed

3. **Test your changes**
   - Ensure the examples still work
   - Test in multiple browsers if possible
   - Verify no console errors

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template with details about your changes

## Style Guidelines

### JavaScript Style Guide

We follow ES6+ standards with the following conventions:

- **Use ES6 classes and modules**
  ```javascript
  class MyClass {
    constructor() {
      // ...
    }
  }
  export default MyClass;
  ```

- **Use const/let instead of var**
  ```javascript
  const immutableValue = 'value';
  let mutableValue = 0;
  ```

- **Use arrow functions for callbacks**
  ```javascript
  array.map(item => item.value);
  ```

- **Add JSDoc comments**
  ```javascript
  /**
   * Sends a message to the target.
   * 
   * @param {string} event - The event name
   * @param {*} data - The data to send
   */
  send(event, data) {
    // ...
  }
  ```

- **Use meaningful variable names**
  ```javascript
  // Good
  const userScore = 100;
  
  // Bad
  const x = 100;
  ```

### Code Formatting

- **Indentation**: 2 spaces (no tabs)
- **Line length**: Aim for 80-100 characters max
- **Semicolons**: Use them
- **Quotes**: Use single quotes for strings
- **Trailing commas**: Use them in multi-line objects/arrays

### File Naming

- Use kebab-case for file names: `magnethub-core.js`
- Use PascalCase for class names: `MagnetHubCore`

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```
feat: add support for custom event validation

fix: resolve iframe communication timeout issue

docs: update API documentation for send() method

refactor: simplify event handler logic
```

## Testing

Currently, we don't have automated tests, but you should:

1. **Manual Testing**: Test your changes with the example files
2. **Browser Testing**: Test in Chrome, Firefox, and Safari if possible
3. **Edge Cases**: Consider what happens with invalid inputs

## Documentation

If you change or add functionality:

1. Update JSDoc comments in the code
2. Update `docs/api.md` if the API changes
3. Update `README.md` if user-facing functionality changes
4. Add examples if introducing new features

## Questions?

Feel free to open an issue with the label `question` if you need help or clarification on anything.

## License

By contributing, you agree that your contributions will be licensed under the Apache 2.0 License.

---

Thank you for contributing to MagnetHub SDK! 🚀
