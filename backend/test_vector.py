from app.database.vector_store import load_documents

docs = load_documents()

print(f"Loaded {len(docs)} documents")

for doc in docs:
    print(doc["disease"], "-", doc["file"])