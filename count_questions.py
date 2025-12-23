import json

with open(r'D:\Downloads\Thitracnghiem\questions_v2.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

total = len(data)
with_answers = sum(1 for q in data if q["correctAnswer"] != -1)
without_answers = sum(1 for q in data if q["correctAnswer"] == -1)

print(f"Total questions: {total}")
print(f"Questions with correct answers: {with_answers}")
print(f"Questions missing correct answers: {without_answers}")

# Show some examples without correct answers
if without_answers > 0:
    print("\nExamples of questions missing correct answers:")
    count = 0
    for q in data:
        if q["correctAnswer"] == -1 and count < 5:
            print(f"\nQuestion: {q['question'][:80]}...")
            print(f"Answers: {len(q['answers'])}")
            count += 1
