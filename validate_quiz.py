import json

def validate_quiz_data(file_path):
    """Validate the quiz data structure and content."""
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"=" * 60)
    print(f"QUIZ DATA VALIDATION REPORT")
    print(f"=" * 60)
    print(f"\nTotal Questions: {len(data)}\n")

    # Statistics
    answer_counts = {}
    correct_answer_stats = {-1: 0, 0: 0, 1: 0, 2: 0, 3: 0}
    issues = []

    for idx, q in enumerate(data):
        # Count answers
        num_answers = len(q['answers'])
        answer_counts[num_answers] = answer_counts.get(num_answers, 0) + 1

        # Count correct answer positions
        correct_idx = q['correctAnswer']
        if correct_idx in correct_answer_stats:
            correct_answer_stats[correct_idx] += 1
        else:
            correct_answer_stats[correct_idx] = 1

        # Validate structure
        if not q.get('question'):
            issues.append(f"Question {idx + 1}: Empty question text")

        if num_answers < 2:
            issues.append(f"Question {idx + 1}: Less than 2 answers")

        if correct_idx >= num_answers:
            issues.append(f"Question {idx + 1}: Correct answer index out of range")

    print("Answer Distribution:")
    for num, count in sorted(answer_counts.items()):
        print(f"  {num} answers: {count} questions")

    print("\nCorrect Answer Position Distribution:")
    labels = {-1: "Not found", 0: "A", 1: "B", 2: "C", 3: "D"}
    for pos, count in sorted(correct_answer_stats.items()):
        if count > 0:
            percentage = (count / len(data)) * 100
            label = labels.get(pos, f"Position {pos}")
            print(f"  {label}: {count} questions ({percentage:.1f}%)")

    print("\nData Quality:")
    valid_questions = sum(1 for q in data if q['correctAnswer'] != -1 and len(q['answers']) >= 2)
    print(f"  Valid questions: {valid_questions}/{len(data)} ({(valid_questions/len(data)*100):.1f}%)")
    print(f"  Questions with correct answer: {len(data) - correct_answer_stats[-1]}")
    print(f"  Questions missing correct answer: {correct_answer_stats[-1]}")

    if issues:
        print("\nIssues Found:")
        for issue in issues[:10]:  # Show first 10 issues
            print(f"  - {issue}")
        if len(issues) > 10:
            print(f"  ... and {len(issues) - 10} more issues")
    else:
        print("\n✓ No structural issues found!")

    print("\n" + "=" * 60)
    print("Sample Questions:")
    print("=" * 60)

    # Show 3 random samples
    import random
    samples = random.sample([q for q in data if q['correctAnswer'] != -1], min(3, len(data)))

    for i, q in enumerate(samples, 1):
        print(f"\nSample {i}:")
        print(f"Q: {q['question']}")
        for idx, ans in enumerate(q['answers']):
            marker = "✓" if idx == q['correctAnswer'] else " "
            print(f"  {chr(65 + idx)}. [{marker}] {ans[:60]}{'...' if len(ans) > 60 else ''}")

    print("\n" + "=" * 60)
    print("VALIDATION COMPLETE")
    print("=" * 60)

if __name__ == "__main__":
    validate_quiz_data(r'D:\Downloads\Thitracnghiem\quiz_data.json')
