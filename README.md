# django-NightThoughts

# Overview
This project is a journal web application built with the python-based framework Django. The front-end is HTML & CSS, Javascipt & also encorporates the Bootstrap 5 framework. There is full CRUD functionality as users can create, read, update, and delete their thoughts. The application differs from an ordinary journalling app because it is specifically designed to help users clear their mind before sleep in order to encourage mental decluttering, reduce overthinking & nighttime anxiety, but also to have a place for those genius thoughts/ideas we seem to get at night-time when our brain enters a more creative mode.

 I also wanted to address the advice of not looking at your phone before bed - with the ever increasing amount of time we engage with technology I think it's unlikely that people are going to put their phones away before bed. With that being said, I think it is at least better to encourage journalling/reflecting instead of mindlessly scrolling on social media. 

The live project can found here: <a href="https://emily-django-nightthoughts-a6d094866e81.herokuapp.com/" target="_blank">Live Project</a>


<h2 text-align="center" id="TOC">Table of Contents</h2>

- [NightThoughts](#django-NightThoughts)
  - [Overview](#overview)
  - [Table of Contents](#TOC)
  - [UX Design](#ux-design)
    - [User Stories](#user-stories)
    - [Wireframes](#wireframes)
     - [Colors](#colors)
    - [Fonts](#fonts)
    - [Logo Design](#logo-design)
- [Key Features](#key-features)
  - [User Authentication](#user-authentication)
  - [Write Thoughts](#write-thoughts)
  - [Edit and Delete Thoughts](#edit-and-delete-thoughts)
  - [Voice Recording](#voice-recording)
   - [Mood Responsive](#mood-responsive)
  - [Footer](#footer)
- [Deployment](#deployment)
- [AI Implementation and Orchestration](#ai-implementation-and-orchestration)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)
- [Credits](#credits)

<p align="right"><a href="#django-Nightthoughts">Back To Top</a></p>
<br>

## UX Design
# User stories
I used an agile workflow for the project. First I created user stories in the issues in order to set up small, achievable and precise tasks following my project board. Some of them were generated using Co-pilot, Chat GPT, but I also asked family and friends for their input on what they would like to see in a night-time journalling app. The MoSCow system was helpful for me to focus on getting an mvp created by focusing on getting the must-have's done. 

Here are the user stories: (You can also view the user stories in the [GitHub Projects Kanban Board](https://github.com/users/Emilyhugs/projects/10/views/1) for this website.)
1) As a site user, I want to log in so that only I can access my page.

✅ Acceptance Criteria:

Given an email, username & password, a user can register an account.
Then the user can log in.
When the user is logged in they can write their thoughts down.

2) As a site user, I want to write down my thoughts (worries, ideas, to-dos) before bed so that I can clear my mind and sleep more peacefully.

✅ Acceptance Criteria:

I can enter text into a form and categorize it as a worry, idea, or to-do.

3) As a site user, I want to see my past thoughts in an organized way so that I can reflect on them when needed.
As a site user, I can view a paginated list of posts so that I can select which post I want to view.
✅ Acceptance Criteria:

I can see my thoughts listed chronologically.
When I log in, the main page is a form for me to write today's thoughts.
When I open the thoughts page, a list of my thoughts is seen.
Thoughts appear in a calming UI, not just plain text.

4) As a user, I want to edit my past thoughts so that I can take into account any change in my perspective, or if I simply want to rephrase something.

✅ Acceptance Criteria:

-I can update the text of my thoughts.
-I can change the category (e.g., a "worry" might become an "idea").

5) As a site user, I want to remove thoughts I no longer need so that I can declutter my mind and my digital journal.

✅ Acceptance Criteria:

The thought is permanently deleted from the database.

6) As a user, I want there to be a visual cue to show that I’ve clicked on a thought & reflected on it so that I can track my thoughts.

7) As a Site User, I can click on the About link so that I can read about the site.

When the About link is clicked, the about text is visible.

As a Site Admin, I can create or update the about page content so that it is available on the site.

The About app is visible in the admin panel

8) As a site admin, I want to monitor the site so that I can track the amount of users & view/edit/delete their thoughts or even delete their accounts if necessary.

# Wireframes
The wireframes for this project have been created using [Balsamiq](https://balsamiq.com/). They show the key features (the thought list) that guided me when creating the website & ensuring responsiveness across different screen sizes, an especially important feature because it is more likely for users to be accessing the site on their phone before they sleep rather than a tablet or computer. 

![Computer & Mobile phone Wireframe](static/images/NightThoughts.png)

**ERD**
I created the ERD with ([Lucid.app](https://www.lucid.app)).
I actually updated the thought model to include a mood category because I wanted the website to be responsive to the user's moods. 

![ERD](static/images/model-databases.png)



- **Design Rationale:**
  - The layout emphasises simplicity and readability, with Bootstrap 5 providing a responsive design. I didn't want there to be any features that would engage the user too much and distract them from sleep. 
  # Colours
  These are the colours I chose for the project because they are muted and calming for a nighttime journalling app.
  ![Colour palette](static/images/palette.png)
  The colour scheme adheres to WCAG guidelines for contrast. I needed to make sure there was sufficient colour contrast but also not have colours which were too bright and that would keep the users awake.

  To test that the colours are accessible for the users, I checked with [Colour Contrast Checker](https://colourcontrast.cc/)(also available as extension on Chrome Web Store) for the main component of the thought card background colour and the text colour.
   ![Colour Contrast Checker](static/images/colour-contrast.png)

# Fonts
  
   The typography I used for the project are Playfair Display for the headings and Karla for the thought text. Playfair Display is a serif font which is slightly less accessible but it is suitable for a journal project so I think it is a reasonable choice. Karla is a sans-serif font which is easy to read and gentle, allowing for a better & accessible user experience when reading & reflecting on their thoughts. 

  - Accessibility considerations include screen reader support, ensuring usability for users with diverse needs. 

  # Logo Design
  I asked [Canva](https://www.canva.com/) to generate a logo/favicon. Initially my design was too complicated so I had to simplify it. I wanted it to have the appearance of the moon but with lines of a journal on the side. The middle image here is the one I chose because it is more sleek and stands out. However, I had to make the background transparent before using it. 
  ![Logo design](static/images/logo-design-ideas.png)
  
<p align="right"><a href="#django-Nightthoughts">Back To Top</a></p>
<br>


## Key Features

# User Authentication
Obviously, privacy is incredibly important for a journalling app where the user can write their personal thoughts. The purpose of adding user authentication is to ensure that users can securely log in and manage their accounts. It was essential that users were given the option to log in to a personal account so that they can create,review, edit and delete their own thoughts & crucially so that nobody else has access to them (apart from the admin). 


# Write Thoughts 
The main concept of the app is to allow users to write their thoughts down. This is the core functionality and purpose of the site so it is an important feature. The site allows for signed-in users to write their thoughts and choose a content category and mood category. 

# Edit and Delete Thoughts 
The ability to save, update and delete thoughts allows users to reflect on their thoughts over time and make edits to them if they want to. A delete function is incredibly important for allowing the users to write down and get unwanted thoughts out of their system. The edit feature is also useful for half-thought out ideas and for the comfort that whatever they write doesn't have to be final/set in stone. 

# Voice Recording 
This is a really awesome function of speech recognition that converts the users' speech into written text. It uses the inbuilt API called Web Speech API which is compatible for on most modern browsers like Chrome & Firefox. For some people it is easier to verbalise thoughts than to write them down so this function increases accessibility in that regard. It is also suitable for those who are about to go to bed & would prefer to spend less time looking at a phone screen.

# Mood Responsive 
Another additional feature was to make the thought cards' borders glow with different colours depending on the users' selected mood. It adds more dynamicism to the website without being overpowering and it acts as a subtle way for the user to reflect on their mood when they click or touch the card. 

# Footer
The footer includes links to social media (if there were any.)

- **Inclusivity Notes:** 
  - Features include ARIA labels for screen readers. This app doesn't have images so I didn't need to worry about 'alt' tags. 

<p align="right"><a href="#django-Nightthoughts">Back To Top</a></p>
<br>


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

<p align="right"><a href="#django-Nightthoughts">Back To Top</a></p>
<br>


  ## AI Implementation and Orchestration

### Use Cases and Reflections:
AI tools have been an invaluable collaborator during the process because I have been working with relatively new frameworks (eg. django, bootstrap) and new languages like python and javascript. Throughout the project, I mainly relied on Chat GPT and Claude to develop my ideas and to further streamline development, but I also relied on Copilot to help as it had access to the project in my local environment and was therefore useful because it could directly assist me on my project. 

Claude was really useful because it has a beta option to link up to a github project so it could directly access my code via my repo. 

- **Code Creation:** 
Claude and Chat GPT were really invaluable for suggesting/generating code, particularly css designs, javascript functions etc. In particular, the only reason I have the feature to record your thought is because Claude generated that code for me. 
 

- **Debugging:** 
There were times where the css/javascript caused bugs in my code and I used AI tools to help me fix these errors. It was much more efficient than manually trying to find answers to the bugs myself or even find answers on Stack Overflow. However, when there was an accessibility issue with the modal keeping the focus on the button even when the modal is hidden, AI struggled to fix that, so I did need to go to Stack Overflow. Overall though, AI tools massively enhanced the efficiency of the project. 

**Observations on AI Usage**

While AI has been a highly useful tool, it is important that I note its limitations. There are cases where I have used it for quick fixes without understanding in full detail what it is doing - which could cause to problems if it interferes with other code & later down the line when I need to revisit it. It also gave long-winded and overly complicated ways to fix errors which then takes time with processing speeds when the code runs. 
**Conclusion**
Using AI in this project has been beneficial for learning, problem-solving and asking for suggestions or ideas. However, I need to remember to keep critically evaluating AI's suggestions and use them as a supplementary tool rather than relying on them entirely.


<p align="right"><a href="#django-Nightthoughts">Back To Top</a></p>
<br>

# Testing

- **Manual Testing:**
  - **Devices and Browsers Tested:** I tested the site on my macbook pro and my iphone throughout to check that the app was functioning as I wanted it to and to see if there were any obvious bugs I needed to fix. 

  - **Assistive Technologies:** I tested the site using Lighthouse in the Developer Tools. These are the scores that I got. 
  They mostly suffer due to loading times of some of the elements but they are fairly decent. However, given more time I would work on improving the scores.
![Lighthouse scores](static/images/lighthouse-computer.png) 
![Lighthouse scores](static/images/lighthouse-mobile.png)

I also used [HTML validation](https://validator.w3.org/) to check my HTML.
The html-errors are likely because I need to change the thought-id to data-thought-id because it is a data attribute, but I didn't have time to change that and then make the corresponding edit in the javascript file. However, it does seem to be a relatively easy fix. 
![HTML Validation](static/images/html-validation.png)
![HTML Validation](static/images/html-errors.png)

Next I used [CCS validation](https://jigsaw.w3.org/css-validator/)
There were initially some errors but I managed to fix them.
![CSS Validation](static/images/css-validation.png)

I also ran my views.py file through [Code Institute's pep8 standards linter](https://pep8ci.herokuapp.com/)
![Python Lint](static/images/python-lint.png)

  - **Features Tested:** CRUD operations, user authentication, responsive design, and accessibility features.
  - **Results:** All critical features, including accessibility checks, worked as expected.
- **Automated Testing:**
  - Tools Used: Django TestCase & Chat GPT

  I asked CHATGPT to write unit tests for the views which covers the CRUD operations. These can be found in the thoughts/tests.py file. 

## Future Enhancements
- Add an about page where the admin can post blogs about sleeping tips. 
- Build multilingual support for non-English-speaking users.
- Learn how to build or integrate analytics for tracking user's moods.
- Implement open AI to read and summarize the users' thoughts & helping them to reflect. 

## Credits
I would like to credit Code Institute's CodeStar walkthrough blog. It was invaluable for following along and making sure that I set up my project succesfully. 

I also have to credit Chat GPT & Claude for code generation/fixing.
<p align="right"><a href="#django-Nightthoughts">Back To Top</a></p>
<br>
