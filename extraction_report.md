# Quiz Extraction Report

## Summary
- **Source File**: cauhoi.docx
- **Output File**: quiz_data.json
- **Total Questions Extracted**: 296
- **Questions with Correct Answers**: 292 (98.6%)
- **Questions Missing Correct Answers**: 4 (1.4%)

## Data Structure
Each question in the JSON file follows this format:
```json
{
  "question": "Question text here",
  "answers": ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  "correctAnswer": index_of_correct_answer (0-based, -1 if not found)
}
```

## Extraction Method
1. Parsed the Word document using python-docx library
2. Identified questions starting with "Câu" or numbered format
3. Collected answer paragraphs following each question
4. Detected underlined text as the correct answer indicator
5. Removed letter prefixes (A., B., C., D.) from answers

## Sample Questions

### Question 1:
**Q**: 1: Nhà giáo bị tạm đình chỉ giảng dạy khi nào?
**Answers**:
- A. Có khiếu nại
- B. Khi có dấu hiệu vi phạm nghiêm trọng đạo đức, pháp luật hoặc gây hậu quả trong giáo dục ✓
- C. Khi học sinh phản ánh hoặc gây hậu quả trong giáo dục hoặc khi hiệu trưởng yêu cầu
- D. Khi hiệu trưởng yêu cầu

### Question 2:
**Q**: Câu 2: Việc công nhận danh hiệu "Nhà giáo nhân dân" phải dựa trên yếu tố nào?
**Answers**:
- A. Số năm công tác
- B. Thành tích xuất sắc, uy tín, ảnh hưởng tích cực và cống hiến đặc biệt cho sự nghiệp giáo dục ✓
- C. Bằng cấp
- D. Đề cử tập thể, ảnh hưởng tích cực và cống hiến đặc biệt cho sự nghiệp giáo dục

### Question 3:
**Q**: Câu 3: "Vị trí việc làm" được hiểu là gì theo Điều 7 Luật viên chức?:
**Answers**:
- A. Tên gọi công việc trong đơn vị
- B. Công việc gắn với chức danh nghề nghiệp ✓
- C. Khối lượng nhiệm vụ của cá nhân
- D. Danh mục nhiệm vụ theo năm

## Usage in JavaScript
You can load and use this data in your JavaScript code:

```javascript
// Load the quiz data
fetch('quiz_data.json')
  .then(response => response.json())
  .then(questions => {
    console.log(`Loaded ${questions.length} questions`);

    // Example: Display first question
    const q = questions[0];
    console.log(q.question);
    q.answers.forEach((answer, index) => {
      const marker = index === q.correctAnswer ? '✓' : '';
      console.log(`${String.fromCharCode(65 + index)}. ${answer} ${marker}`);
    });
  });
```

## Notes
- The correctAnswer field uses 0-based indexing (0 = A, 1 = B, 2 = C, 3 = D)
- Questions with correctAnswer = -1 did not have a clearly underlined answer in the source document
- All Vietnamese characters are properly encoded in UTF-8
