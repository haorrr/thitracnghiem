# Quiz Data Extraction - Complete

## Files Generated

1. **quiz_data.json** (135 KB) - Complete quiz database with all 296 questions
2. **quiz_sample.json** - Sample of first 10 questions for testing
3. **extraction_report.md** - Detailed extraction report
4. **README.md** - This file

## Data Statistics

- **Total Questions**: 296
- **Valid Questions**: 292 (98.6%)
- **Questions with Correct Answers**: 292
- **Questions Missing Correct Answers**: 4 (1.4%)

### Answer Distribution
- 2 answers: 1 question
- 3 answers: 31 questions
- 4 answers: 254 questions (most common)
- 5 answers: 6 questions
- 7 answers: 1 question
- 8 answers: 3 questions

### Correct Answer Distribution
- Position A (index 0): 58 questions (19.6%)
- Position B (index 1): 112 questions (37.8%) - Most common
- Position C (index 2): 81 questions (27.4%)
- Position D (index 3): 36 questions (12.2%)
- Other positions: 5 questions (1.7%)
- Not found: 4 questions (1.4%)

## JSON Structure

```json
[
  {
    "question": "Question text here",
    "answers": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    "correctAnswer": 1  // 0-based index (0=A, 1=B, 2=C, 3=D, -1=not found)
  }
]
```

## Usage Example (JavaScript)

### Load Quiz Data
```javascript
// Using fetch API
fetch('quiz_data.json')
  .then(response => response.json())
  .then(questions => {
    console.log(`Loaded ${questions.length} questions`);
    startQuiz(questions);
  });
```

### Display a Question
```javascript
function displayQuestion(question, index) {
  const q = question;
  let html = `<div class="question">
    <h3>Câu ${index + 1}: ${q.question}</h3>
    <div class="answers">`;

  q.answers.forEach((answer, i) => {
    html += `
      <label>
        <input type="radio" name="q${index}" value="${i}">
        ${String.fromCharCode(65 + i)}. ${answer}
      </label>`;
  });

  html += `</div></div>`;
  return html;
}
```

### Check Answer
```javascript
function checkAnswer(question, userAnswer) {
  return userAnswer === question.correctAnswer;
}
```

### Random Question Generator
```javascript
function getRandomQuestions(allQuestions, count) {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
```

### Quiz Score Calculator
```javascript
function calculateScore(questions, userAnswers) {
  let correct = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.correctAnswer) {
      correct++;
    }
  });
  return {
    correct: correct,
    total: questions.length,
    percentage: (correct / questions.length * 100).toFixed(2)
  };
}
```

## Sample Questions

### Question 1
**Q**: 1: Nhà giáo bị tạm đình chỉ giảng dạy khi nào?
- A. Có khiếu nại
- **B. Khi có dấu hiệu vi phạm nghiêm trọng đạo đức, pháp luật hoặc gây hậu quả trong giáo dục** ✓
- C. Khi học sinh phản ánh hoặc gây hậu quả trong giáo dục hoặc khi hiệu trưởng yêu cầu
- D. Khi hiệu trưởng yêu cầu

### Question 2
**Q**: Câu 2: Việc công nhận danh hiệu "Nhà giáo nhân dân" phải dựa trên yếu tố nào?
- A. Số năm công tác
- **B. Thành tích xuất sắc, uy tín, ảnh hưởng tích cực và cống hiến đặc biệt cho sự nghiệp giáo dục** ✓
- C. Bằng cấp
- D. Đề cử tập thể, ảnh hưởng tích cực và cống hiến đặc biệt cho sự nghiệp giáo dục

### Question 9
**Q**: Câu 9: Viên chức được tuyển dụng theo nguyên tắc nào?
- **A. Công khai, minh bạch, công bằng, khách quan và đúng pháp luật** ✓
- B. Tự do cạnh tranh
- C. Theo giới thiệu, Tự do cạnh tranh, Theo vị trí địa phương
- D. Theo vị trí địa phương

## Implementation Tips

1. **Shuffle Questions**: Randomize question order for each quiz session
2. **Shuffle Answers**: Randomize answer positions (but update correctAnswer accordingly)
3. **Filter Invalid**: Optionally filter out questions with correctAnswer === -1
4. **Progressive Loading**: Load questions in batches for better performance
5. **Localstorage**: Save user progress and scores locally
6. **Timer**: Add countdown timer for timed quizzes
7. **Review Mode**: Show correct answers after submission

## Filter Valid Questions Only

```javascript
// Load only questions with correct answers
fetch('quiz_data.json')
  .then(response => response.json())
  .then(allQuestions => {
    const validQuestions = allQuestions.filter(q => q.correctAnswer !== -1);
    console.log(`Loaded ${validQuestions.length} valid questions`);
    return validQuestions;
  });
```

## Notes

- All text is in Vietnamese (UTF-8 encoding)
- The correct answer was identified by underlined text in the source Word document
- 4 questions could not have their correct answer automatically identified
- Questions are about Vietnamese education law and teacher regulations
- Letter prefixes (A., B., C., D.) were removed from answers for clean data

## Extraction Method

1. Used python-docx library to parse the Word document
2. Identified questions by "Câu" prefix or numbered format
3. Collected answer paragraphs following each question
4. Detected underlined formatting as correct answer indicator
5. Removed letter prefixes and cleaned text
6. Exported to structured JSON format

## Data Quality

The extraction achieved **98.6% accuracy** in identifying correct answers through automated underline detection. The 4 questions without identified correct answers may need manual review of the source document.
