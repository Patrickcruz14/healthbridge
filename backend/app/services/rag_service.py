from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from app.database.mongodb import db

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def retrieve_context(
    disease: str,
    question: str
):

    collection_name = f"{disease.lower()}_vectors"

    collection = db[collection_name]

    docs = list(
        collection.find({})
    )

    if not docs:
        return ""

    question_vector = model.encode(
        question
    ).reshape(1, -1)

    best_score = -1
    best_context = ""

    for doc in docs:

        doc_vector = [doc["embedding"]]

        score = cosine_similarity(
            question_vector,
            doc_vector
        )[0][0]

        if score > best_score:

            best_score = score

            best_context = doc["content"]

    return best_context