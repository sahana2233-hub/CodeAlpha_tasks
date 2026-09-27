import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load FAQ data
with open("faq_data.json", "r") as file:
    faq_data = json.load(file)

questions = list(faq_data.keys())

# TF-IDF Vectorization
vectorizer = TfidfVectorizer()
question_vectors = vectorizer.fit_transform(questions)

print("================================")
print("      FAQ CHATBOT")
print("================================")
print("Type 'exit' to quit\n")

while True:
    user_input = input("You: ")

    if user_input.lower() == "exit":
        print("Bot: Thank you!")
        break

    user_vector = vectorizer.transform([user_input])

    similarity_scores = cosine_similarity(
        user_vector,
        question_vectors
    )

    best_match = similarity_scores.argmax()

    print("Bot:", faq_data[questions[best_match]])