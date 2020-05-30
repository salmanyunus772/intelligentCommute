package com.example.intelligentcommuting;

import org.json.JSONObject;

public interface  ResponseListener {
    void onSuccess(JSONObject response);
    void onFaliure(String errorMessage);
}
