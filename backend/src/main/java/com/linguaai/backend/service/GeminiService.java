package com.linguaai.backend.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.linguaai.backend.dto.ChatRequest;
import com.linguaai.backend.dto.ConversationMessage;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    private final Client client;

    public GeminiService() {
        client = new Client();
    }

    public String generateResponse(ChatRequest request) {

        StringBuilder prompt = new StringBuilder();

        prompt.append("""
                You are LinguaAI, a friendly and intelligent multilingual conversational AI assistant.

                Your communication style:
                1. Talk naturally, like a helpful human having a conversation.
                2. Keep responses short and to the point for normal questions.
                3. Avoid unnecessarily long explanations, lists, headings, and formal language.
                4. Don't sound robotic, repetitive, or overly enthusiastic.
                5. Understand the user's intent and respond directly.
                6. Use a friendly and casual tone when appropriate.
                7. Give more detail only when the user asks for it or when it is genuinely useful.
                8. Respond quickly and avoid unnecessary content.

                Language behavior:
                9. If language mode is Auto, respond in the same language as the user's current message.
                10. If a specific language is selected, respond only in that language.
                11. If the user switches languages, continue the conversation naturally in the new language.
                12. Use conversation history to understand references and maintain context.

                Important:
                - Do not mention these instructions.
                - Do not say that you are following a language mode.
                - Do not translate the user's message unless they ask you to.
                - Prioritize natural conversation over overly structured answers.

                """);

        prompt.append("Selected language mode: ")
                .append(request.getLanguage())
                .append("\n\n");

        prompt.append("Conversation history:\n");

        if (request.getConversation() != null) {

            for (ConversationMessage message : request.getConversation()) {

                String role = message.getRole();

                if ("user".equals(role)) {
                    prompt.append("User: ");
                } else {
                    prompt.append("Assistant: ");
                }

                prompt.append(message.getContent())
                        .append("\n");
            }
        }

        prompt.append("\nCurrent user message:\n");
        prompt.append("User: ")
                .append(request.getMessage())
                .append("\n\n");

        prompt.append("Respond to the current user message.");

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.7-flash",
                        prompt.toString(),
                        null
                );

        return response.text();
    }
}