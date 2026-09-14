package com.linguaai.backend.controller;

import com.linguaai.backend.dto.ChatRequest;
import com.linguaai.backend.service.GeminiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody ChatRequest request) {

        try {
            return geminiService.generateResponse(request);
        } catch (Exception e) {
            System.out.println("Gemini API Error: " + e.getMessage());

            return "LinguaAI is temporarily unavailable. Please try again in a moment.";
        }
    }
}