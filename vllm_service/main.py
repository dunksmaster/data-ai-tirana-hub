"""
API HTTP mínima sobre vLLM (FastAPI).
Carga el modelo al arrancar; expone generación de texto y un endpoint tipo chat.
"""

from __future__ import annotations

import os
from contextlib import asynccontextmanager
from typing import Any

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

_llm: Any = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _llm
    from vllm import LLM

    model_id = os.environ.get("VLLM_MODEL", "meta-llama/Meta-Llama-3-8B-Instruct")
    _llm = LLM(model=model_id)
    yield
    _llm = None


app = FastAPI(
    title="vLLM API",
    description="Generación con vLLM vía HTTP",
    version="0.1.0",
    lifespan=lifespan,
)


class GenerateRequest(BaseModel):
    prompt: str = Field(..., min_length=1)
    max_tokens: int = Field(256, ge=1, le=8192)
    temperature: float = Field(0.7, ge=0.0, le=2.0)
    top_p: float = Field(0.95, ge=0.0, le=1.0)


class GenerateResponse(BaseModel):
    text: str
    finish_reason: str | None = None


class ChatMessage(BaseModel):
    role: str = Field(..., pattern="^(system|user|assistant)$")
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(..., min_length=1)
    max_tokens: int = Field(256, ge=1, le=8192)
    temperature: float = Field(0.7, ge=0.0, le=2.0)


def _messages_to_prompt(messages: list[ChatMessage]) -> str:
    """Usa la plantilla del modelo (p. ej. Llama 3) si el tokenizador la expone."""
    raw = [m.model_dump() for m in messages]
    tokenizer = getattr(_llm, "get_tokenizer", lambda: None)()
    if tokenizer is not None and hasattr(tokenizer, "apply_chat_template"):
        return tokenizer.apply_chat_template(
            raw,
            tokenize=False,
            add_generation_prompt=True,
        )
    parts: list[str] = []
    for m in messages:
        parts.append(f"<|{m.role}|>\n{m.content}\n")
    parts.append("<|assistant|>\n")
    return "".join(parts)


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": _llm is not None}


@app.post("/v1/generate", response_model=GenerateResponse)
def generate(req: GenerateRequest):
    if _llm is None:
        raise HTTPException(503, "Modelo no cargado")

    from vllm import SamplingParams

    sp = SamplingParams(
        max_tokens=req.max_tokens,
        temperature=req.temperature,
        top_p=req.top_p,
    )
    outputs = _llm.generate([req.prompt], sp)
    out = outputs[0].outputs[0]
    return GenerateResponse(text=out.text, finish_reason=out.finish_reason)


@app.post("/v1/chat", response_model=GenerateResponse)
def chat(req: ChatRequest):
    if _llm is None:
        raise HTTPException(503, "Modelo no cargado")

    from vllm import SamplingParams

    prompt = _messages_to_prompt(req.messages)
    sp = SamplingParams(max_tokens=req.max_tokens, temperature=req.temperature)
    outputs = _llm.generate([prompt], sp)
    out = outputs[0].outputs[0]
    return GenerateResponse(text=out.text.strip(), finish_reason=out.finish_reason)
