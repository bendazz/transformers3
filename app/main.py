import numpy as np
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from chromadb.utils import embedding_functions

app = FastAPI()

embedder = embedding_functions.DefaultEmbeddingFunction()

@app.get("/embed")
def embed(text: str):
    vector = embedder([text])[0]
    return {"text": text, "vector": vector.tolist()}

@app.get("/similarity")
def similarity(text1: str, text2: str):
    vector1 = embedder([text1])[0]
    vector2 = embedder([text2])[0]
    cos_sim = np.dot(vector1, vector2) / (np.linalg.norm(vector1) * np.linalg.norm(vector2))
    return {"text1": text1, "text2": text2, "similarity": float(cos_sim)}

app.mount("/", StaticFiles(directory="static", html=True), name="static")