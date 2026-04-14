import chromadb

client = chromadb.Client()

collection = client.create_collection(name="animals_vehicles_food")

collection.add(
    ids=["cat", "dog", "car", "truck", "pizza"],
    embeddings=[
        [1.0, 0.0, 0.0],
        [0.9, 0.0, 0.1],
        [0.0, 1.0, 0.0],
        [0.1, 0.9, 0.0],
        [0.0, 0.0, 1.0],
    ],
    documents=["cat", "dog", "car", "truck", "pizza"],
)

results = collection.query(
    query_embeddings=[[0.95, 0.05, 0.0]],
    n_results=3,
)

print(results)
