from chromadb.utils import embedding_functions

embedder = embedding_functions.DefaultEmbeddingFunction()

vectors = embedder(["a cat sat on a mat"])

print(vectors)
