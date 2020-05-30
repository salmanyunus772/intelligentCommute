package com.example.intelligentcommuting;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class NetworkClient {

    private static Retrofit retrofit;

    String baseURL;

    OkHttpClient.Builder httpClient = new OkHttpClient.Builder()
            .connectTimeout(10, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS);

    public NetworkClient(String baseURL) {
        this.baseURL = baseURL;
    }

    public Retrofit getRetrofit(){
        if(retrofit == null)
            retrofit = new Retrofit.Builder().baseUrl(this.baseURL).addConverterFactory(GsonConverterFactory.create()).client(httpClient.build()).build();
        return retrofit;
    }

}
