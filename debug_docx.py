import sys
from docx import Document

def debug_docx(file_path):
    """Debug the structure of the Word document."""
    try:
        doc = Document(file_path)

        print("=== DOCUMENT STRUCTURE ===\n")

        for i, para in enumerate(doc.paragraphs[:50]):  # First 50 paragraphs
            text = para.text.strip()
            if not text:
                continue

            print(f"\n--- Paragraph {i} ---")
            print(f"Text: {text[:100]}..." if len(text) > 100 else f"Text: {text}")

            # Check runs for formatting
            has_underline = False
            underlined_text = []
            for run in para.runs:
                if run.underline or run.font.underline:
                    has_underline = True
                    underlined_text.append(run.text)

            if has_underline:
                print(f"HAS UNDERLINE: {', '.join(underlined_text)}")

            print(f"Number of runs: {len(para.runs)}")

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)

if __name__ == "__main__":
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer)

    file_path = r"D:\Downloads\Thitracnghiem\cauhoi.docx"
    debug_docx(file_path)
