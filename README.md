# **Project Overview: Accessible Recipes**

## **Introduction**
The goal of this project is to take an existing drink recipe website and rebuild it following best practices for accessibility. The original site, created in a previous course, is currently inaccessible for screen readers and lacks responsiveness. Our work will focus on transforming this site into a fully accessible and inclusive experience for all users.

---

## **Project Objectives**
Our primary focus is to adapt the existing site to meet modern accessibility standards. Specifically, we aim to address the following:

1. **Keyboard Navigation:**
   - Ensure the site structure allows seamless tabbing through all elements.
   
2. **Screen Reader Compatibility:**
   - Use HTML elements effectively to support assistive technologies.
   - Enable smooth interaction with features such as search fields, navigation, and recipe reading.

3. **Zoom and Magnification:**
   - Ensure that the site functions properly at various levels of zoom and magnification, meeting standards discussed in the course workshops.

4. **Mobile-First Design:**
   - Guarantee accessibility across all screen sizes, with a focus on responsive design.

---

## **Approach**
Our work will include:

- **Research:** Investigating accessibility best practices and exploring relevant HTML elements and principles outlined in WCAG 2.1.
- **Iterative Development:** Continuously implementing and refining features to ensure the site maintains its form and function while improving accessibility.
- **Testing:** Conducting user testing with accessibility tools, such as screen readers and keyboard navigation, to validate our implementation.

---

## **Key Principles**
We will apply the knowledge gained during the course and build upon it through further exploration of accessibility standards. Our efforts will focus on:

- Structuring content for assistive technologies.
- Ensuring compatibility with both desktop and mobile devices.
- Prioritizing a user-friendly experience for all individuals, including those with disabilities.

---

**Project Team:**  
- Carl Rikner  
- André Roxhage  

**Date:**  
November 1, 2024
## Run and build project
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


# Summary of Feedback from User Tests

## **Aphasia**

**Feedback:**

- Difficulty remembering drink names. Suggested adding filters for color and glass type.
- Instructions were easy to read, but symbols for measurements (e.g., 1, 2, 3 cl) could be helpful.
- Ingredient images could enhance the experience.

**Action Items:**

- Implement visual filters for color and glass type.
- Add symbols and images for ingredients.

---

## **Cognitive Difficulties (ADHD)**

**Feedback:**

- Company name in the navbar is unclear. Footer text is too small.
- A short introduction on the homepage and an "About Us" page is needed.
- Filters need an improved user experience and clearer "All" state.
- Drink cards should include more information (e.g., descriptions and instructions).
- FAQ with measurement explanations and tools, such as tooltips, would be helpful.

**Action Items:**

- Improve clarity in the navbar and footer.
- Add a short introduction and an "About Us" page.
- Enhance filter feedback and create detailed drink cards.
- Add a FAQ with interactive tools.

---

## **Dyslexia and Difficulty with English**

**Feedback:**

- The "Explore" button could be misunderstood.
- "Collins glass" was misread as "cold glass."
- Different glasses should be visualized with icons.

**Action Items:**

- Clarify button text and implement localization.
-
