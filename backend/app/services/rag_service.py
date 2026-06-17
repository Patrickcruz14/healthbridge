from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from app.database.mongodb import db

model = SentenceTransformer("all-MiniLM-L6-v2")

def retrieve_context(disease: str, question: str):
    collection_name = f"{disease.lower()}_vectors"
    collection = db[collection_name]
    docs = list(collection.find({}))

    if not docs:
        return ""

    question_vector = model.encode(question).reshape(1, -1)

    scored = []
    for doc in docs:
        score = cosine_similarity(question_vector, [doc["embedding"]])[0][0]
        scored.append((score, doc["content"]))

    scored.sort(key=lambda x: x[0], reverse=True)

    threshold = 0.3
    top3 = [content for score, content in scored[:3] if score >= threshold]

    return "\n\n".join(top3)