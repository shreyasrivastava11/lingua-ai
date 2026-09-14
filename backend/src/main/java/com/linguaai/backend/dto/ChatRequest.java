package com.linguaai.backend.dto;

import java.util.List;

public class ChatRequest {

    private String message;
    private String language;
    private List<ConversationMessage> conversation;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public List<ConversationMessage> getConversation() {
        return conversation;
    }

    public void setConversation(List<ConversationMessage> conversation) {
        this.conversation = conversation;
    }
}