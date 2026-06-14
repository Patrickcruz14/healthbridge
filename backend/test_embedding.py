from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

vector = model.encode(
    "What are the symptoms of dengue?"
)

print("Vector Length:", len(vector))
print(vector[:5])