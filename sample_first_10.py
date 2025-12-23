import json

with open(r'D:\Downloads\Thitracnghiem\quiz_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Get first 10 questions
sample = data[:10]

# Save to sample file
with open(r'D:\Downloads\Thitracnghiem\quiz_sample.json', 'w', encoding='utf-8') as f:
    json.dump(sample, f, ensure_ascii=False, indent=2)

print(f"Created sample file with {len(sample)} questions")
print("\nSample data:")
print(json.dumps(sample, ensure_ascii=False, indent=2))
