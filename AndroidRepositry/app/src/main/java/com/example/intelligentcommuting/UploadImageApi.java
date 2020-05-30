package com.example.intelligentcommuting;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.Header;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

public interface UploadImageApi {

    @Multipart
    @POST("student/lostWithoutImage")
    Call<ResponseBody> StudentLostFound
            (@Header("Authorization") String token ,
             @Part("type") RequestBody type,
             @Part("description") RequestBody description);

    @Multipart
    @POST("student/lostWithImage")
    Call<ResponseBody> StudentLostFound
    (@Header("Authorization") String token ,
     @Part("type") RequestBody type,
     @Part("description") RequestBody description, @Part MultipartBody.Part file);

    @Multipart
    @POST("driver/lostWithoutImage")
    Call<ResponseBody> DriverLostFound
            (@Header("Authorization") String token ,
             @Part("type") RequestBody type,
             @Part("description") RequestBody description);

    @Multipart
    @POST("driver/lostWithImage")
    Call<ResponseBody> DriverLostFound
    (@Header("Authorization") String token ,
     @Part("type") RequestBody type,
     @Part("description") RequestBody description, @Part MultipartBody.Part file);

    @POST("student/viewyourlostfound")
    Call<LostFoundModel> StudentViewYourLostFoundPosts(@Header("Authorization") String token);

    @POST("student/viewotherslostfound")
    Call<LostFoundModel> StudentViewOthersLostFoundPosts(@Header("Authorization") String token);

    @POST("driver/viewyourlostfound")
    Call<LostFoundModel> DriverViewYourLostFoundPosts(@Header("Authorization") String token);

    @POST("driver/viewotherslostfound")
    Call<LostFoundModel> DriverViewOthersLostFoundPosts(@Header("Authorization") String token);

    @Multipart
    @POST("student/replylostfoundwithoutimage")
    Call<ResponseBody> StudentSendLostFoundResponse(@Header("Authorization") String token, @Part("id") RequestBody id, @Part("reply") RequestBody reply);

    @Multipart
    @POST("student/replylostfoundwithimage")
    Call<ResponseBody> StudentSendLostFoundResponse(@Header("Authorization") String token, @Part("id") RequestBody id, @Part("reply") RequestBody reply, @Part MultipartBody.Part file);

    @Multipart
    @POST("driver/replylostfoundwithoutimage")
    Call<ResponseBody> DriverSendLostFoundResponse(@Header("Authorization") String token, @Part("id") RequestBody id, @Part("reply") RequestBody reply);

    @Multipart
    @POST("driver/replylostfoundwithimage")
    Call<ResponseBody> DriverSendLostFoundResponse(@Header("Authorization") String token, @Part("id") RequestBody id, @Part("reply") RequestBody reply, @Part MultipartBody.Part file);

    @FormUrlEncoded
    @POST("student/viewLostFoundReply")
    Call<LostFoundResponseModel> StudentViewLostFoundResponses(@Field("id") String id);

    @FormUrlEncoded
    @POST("driver/viewLostFoundReply")
    Call<LostFoundResponseModel> DriverViewLostFoundResponses(@Field("id") String id);

}
