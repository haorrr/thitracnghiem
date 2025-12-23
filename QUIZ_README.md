# Quiz Website

A simple and clean quiz website built with HTML, CSS, and JavaScript.

## Features

- **292 Valid Questions**: Extracted from cauhoi.docx file
- **Interactive UI**: Clean and modern interface with gradient design
- **Instant Feedback**:
  - Correct answers turn GREEN
  - Wrong answers turn RED, with correct answer shown in GREEN
- **Score Tracking**: Real-time score display
- **Navigation**: Move between questions with Previous/Next buttons
- **Results Summary**: Final score with percentage at the end
- **Responsive Design**: Works on desktop and mobile devices

## Files Structure

```
Thitracnghiem/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling
├── quiz.js            # JavaScript logic
├── quiz_data.json     # Quiz questions and answers (292 questions)
└── cauhoi.docx        # Original source file
```

## How to Use

1. **Open the quiz**: Simply open `index.html` in your web browser
2. **Answer questions**: Click on any answer option
   - If correct → Answer turns GREEN
   - If wrong → Your answer turns RED, correct answer turns GREEN
3. **Navigate**: Use Previous/Next buttons to move between questions
4. **View results**: After answering all questions, see your final score
5. **Restart**: Click "Restart Quiz" to try again

## Technical Details

### Data Structure

Questions are stored in JSON format:
```json
{
  "question": "Question text",
  "answers": ["Answer A", "Answer B", "Answer C", "Answer D"],
  "correctAnswer": 1  // 0-based index (0=A, 1=B, 2=C, 3=D)
}
```

### Answer Validation

- Questions with `correctAnswer: -1` are filtered out (4 questions)
- Total valid questions: 292
- Answers are validated instantly on click
- Once answered, questions cannot be changed

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Notes

- The quiz loads data from `quiz_data.json` - ensure it's in the same directory as `index.html`
- Vietnamese characters are properly encoded in UTF-8
- No server required - runs completely in the browser
