from pathlib import Path
from sentence_transformers import SentenceTransformer

from app.database.mongodb import db

BASE_PATH = Path("../healthcare_data")

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def load_documents():

    documents = []

    diseases = [
        "dengue",
        "diabetes",
        "tuberculosis"
    ]

    for disease in diseases:

        disease_path = BASE_PATH / disease

        for file in disease_path.glob("*.txt"):

            with open(file, "r", encoding="utf-8") as f:

                documents.append({
                    "disease": disease,
                    "file": file.name,
                    "content": f.read()
                })

    return documents


def store_vectors():

    docs = load_documents()

    for doc in docs:

        vector = model.encode(
            doc["content"]
        ).tolist()

        collection_name = f"{doc['disease']}_vectors"

        db[collection_name].insert_one({

            "file": doc["file"],

            "content": doc["content"],

            "embedding": vector

        })

    print("Vectors Stored Successfully")