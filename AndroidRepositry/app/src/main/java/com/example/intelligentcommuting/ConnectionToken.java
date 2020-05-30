//package com.example.intelligentcommuting;
//
//import android.content.Context;
//import android.content.Intent;
//import android.content.SharedPreferences;
//import android.net.ConnectivityManager;
//import android.util.Log;
//import android.widget.Toast;
//
//import com.android.volley.AuthFailureError;
//import com.android.volley.Request;
//import com.android.volley.RequestQueue;
//import com.android.volley.Response;
//import com.android.volley.VolleyError;
//import com.android.volley.toolbox.JsonObjectRequest;
//import com.android.volley.toolbox.Volley;
//
//import org.json.JSONObject;
//
//import java.util.HashMap;
//import java.util.Map;
//
//public class ConnectionToken {
//    public String URL;
//    private String token;
//    private RequestQueue queue ;
//    private Context context;
//    private ResponseListener responseListener;
//
//    public ConnectionToken(Context context, ResponseListener responseListener, String url, String token){
//        this.token = token;
//        this.URL = url;
//        this.context = context;
//        this.responseListener = responseListener;
//        queue = Volley.newRequestQueue(context);
//    }
//
//    public void send(String method){
//        final String token=this.token;
//        if(isNetworkConnected()) {
//            int met = method.equals("post") ? Request.Method.POST : Request.Method.GET;
//            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
//                    (met, URL, new Response.Listener<JSONObject>() {
//                        @Override
//                        public void onResponse(JSONObject response) {
//                            responseListener.onSuccess(response);
//                        }
//                    }, new Response.ErrorListener() {
//
//                        @Override
//                        public void onErrorResponse(VolleyError error) {
//                            responseListener.onFaliure(error.getMessage());
//                        }
//                    }){
//
//                @Override
//                public Map<String, String> getHeaders() throws AuthFailureError {
//                    Map<String, String> params = new HashMap<String, String>();
//                    params.put("Authorization", "bearer " + token);
//                    return params;
//                }
//            };
//
//            queue.add(jsonObjectRequest);
//        }else{
//            Toast toast = Toast.makeText(context,
//                    "No internet connection",
//                    Toast.LENGTH_SHORT);
//            toast.show();
//        }
//    }
//    private boolean isNetworkConnected() {
//        ConnectivityManager cm = (ConnectivityManager) context.getSystemService(context.CONNECTIVITY_SERVICE);
//
//        return cm.getActiveNetworkInfo() != null && cm.getActiveNetworkInfo().isConnected();
//    }
//}