package com.example.intelligentcommuting;

import java.util.List;

public class LostFoundResponseModel {

    private List lostFoundReplies;

    public LostFoundResponseModel(List lostFoundReplies) {
        this.lostFoundReplies = lostFoundReplies;
    }

    public List getLostFoundReplies() {
        return lostFoundReplies;
    }
}
