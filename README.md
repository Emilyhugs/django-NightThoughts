# django-NightThoughts

## Overview
This project is a journal web application built with the python-based framework Django. The front-end is HTML & CSS & also encorporates the Bootstrap 5 framework. (Javascript?). There is full CRUD functionality as users can create, read, update, and delete their thoughts. The application differs from an ordinary journalling app because it is specifically designed to help users clear their mind before sleep in order to encourages mental decluttering, reducing overthinking & nighttime anxiety, but also to have a place for those genius thougts/ideas we seem to get at night-time when our brain enters a more creative mode. 

## UX Design Process - COPIED & NOT EDITED YET
- **Link to User Stories in GitHub Projects:**
  - [GitHub Projects Kanban Board](https://github.com/username/project/kanban)
- **Wireframes:**
  - [Wireframe Designs](https://linktowireframes.com)
  - Wireframes were designed to ensure clarity, intuitive navigation, and compatibility with assistive technologies. High-contrast colours and alt text for images were used to maximise accessibility.
- **Design Rationale:**
  - The layout emphasises simplicity and readability, with Bootstrap 5 providing a responsive design. The colour scheme adheres to WCAG guidelines for contrast, and the typography uses accessible fonts for clarity.
  - Accessibility considerations include keyboard navigation and screen reader support, ensuring usability for users with diverse needs.
- **Reasoning For Any Final Changes:**
  - Based on user feedback, adjustments were made to enhance usability, such as reordering navigation elements for better flow and refining accessibility features. These changes improve the inclusivity of the application.

## Key Features
- **Notice Management:** Create, view, update, and delete notices with ease.

## Key Features
- **Thoughts Management:** Create, view, update, and delete thoughts with ease.
- **User Authentication:** Secure login/logout functionality for managing user access. Obviously, privacy is very important because the users are writing down their personal thoughts.
- **Inclusivity Notes:** 
  - Features include ARIA labels and `alt` attributes on images for screen readers.

## Deployment
- **Platform:** Heroku
- **High-Level Deployment Steps:** 
  1. Clone the repository
  2. Set up the Heroku environment with a PostgreSQL database.
  3. Configure environment variables for sensitive data (e.g., secret keys).
  4. You can eploy using Heroku Git or GitHub integration, but in my case I am using GitHub integration.
- **Verification and Validation:**
  - Tested the deployed application against the development environment for consistent functionality and design.
  - Verified accessibility using tools such as Lighthouse and manual testing.
- **Security Measures:**
  - Sensitive data is stored in environment variables.
  - DEBUG mode is disabled in the production environment to enhance security.

  ## AI Implementation and Orchestration

### Use Cases and Reflections:

AI tools were an invaluable collaborator during the process. Throughout the project, I mainly relied on Chat GPT to develop my ideas and to further streamline development, but I also relied on Copilot to help as it had access to the project in my local environment and was therefore useful because it could directly assist me on my project. 

- **Code Creation:** 
 

- **Debugging:** 


- **Performance and UX Optimization:** 


- **Automated Unit Testing: (If undertaken)**


### Overall Impact:


## Testing Summary - COPIED & NOT EDITED YET
- **Manual Testing:**
  - **Devices and Browsers Tested:** Windows 11 (Chrome, Edge), macOS (Safari), Android, iOS.
  - **Assistive Technologies:** Tested using Lighthouse in the Developer Tools.
  - **Features Tested:** CRUD operations, user authentication, responsive design, and accessibility features.
  - **Results:** All critical features, including accessibility checks, worked as expected.
- **Automated Testing:(If undertaken)**
  - Tools Used: Django TestCase, GitHub Copilot.
  - Features Covered: CRUD operations, user authentication, and accessibility compliance.
  - Adjustments Made: Additional manual modifications to ensure comprehensive test coverage and inclusivity.

## Future Enhancements - COPIED & NOT EDITED YET
- Add a notification feature for upcoming events and deadlines.
- Build multilingual support for non-English-speaking users.
- Learn how to build or integrate analytics for tracking user engagement with notices.

