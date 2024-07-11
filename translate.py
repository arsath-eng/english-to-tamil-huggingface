import sys
import torch
from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
import re

# GPU check
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load model and tokenizer
model_name = "facebook/mbart-large-50-many-to-many-mmt"
model = MBartForConditionalGeneration.from_pretrained(model_name).to(device)
tokenizer = MBart50TokenizerFast.from_pretrained(model_name)

# Set languages
src_lang, tgt_lang = "en_XX", "ta_IN"

# Define technical terms
technical_terms = {
    "machine translation", "natural language processing", "nlp", "transformer architecture",
    "machine learning", "deep learning", "artificial intelligence", "ai", "neural network",
    "algorithm", "data science", "big data", "cloud computing", "internet of things", "iot",
    "blockchain", "cybersecurity", "virtual reality", "vr", "augmented reality", "ar",
    "robotics", "automation", "quantum computing", "5g", "edge computing", "devops",
    "microservices", "api", "serverless", "container", "docker", "kubernetes", "ml",
    "computer vision", "natural language understanding", "nlu", "speech recognition",
    "sentiment analysis", "chatbot", "reinforcement learning", "supervised learning",
    "unsupervised learning", "convolutional neural network", "cnn", "recurrent neural network", "rnn",
    "long short-term memory", "lstm", "generative adversarial network", "gan",
    "transfer learning", "federated learning", "explainable ai", "xai"
}

def preprocess_text(text):
    for term in sorted(technical_terms, key=len, reverse=True):
        pattern = re.compile(r'\b' + re.escape(term) + r'\b', re.IGNORECASE)
        text = pattern.sub(lambda m: f"<keep>{m.group()}</keep>", text)
    return text

def postprocess_text(text):
    return re.sub(r'<keep>(.*?)</keep>', r'**\1**', text)

def translate(text):
    preprocessed_text = preprocess_text(text)
    inputs = tokenizer(preprocessed_text, return_tensors="pt", padding=True, truncation=True, max_length=512)
    inputs = {k: v.to(device) for k, v in inputs.items()}
    translated = model.generate(
        **inputs,
        forced_bos_token_id=tokenizer.lang_code_to_id[tgt_lang],
        max_length=512,
        num_beams=5,
        length_penalty=1.0,
        early_stopping=True
    )
    translated_text = tokenizer.batch_decode(translated, skip_special_tokens=True)[0]
    return postprocess_text(translated_text)

if __name__ == "__main__":
    input_text = sys.argv[1]
    result = translate(input_text)
    print(result)