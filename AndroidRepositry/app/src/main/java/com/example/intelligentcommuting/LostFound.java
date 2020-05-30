package com.example.intelligentcommuting;

import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

import com.squareup.picasso.Picasso;

import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import okio.Buffer;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

import static android.os.Environment.getExternalStoragePublicDirectory;

public class LostFound extends AppCompatActivity {

    TextView prompt = null;
    Button capture = null;
    Button choose = null;
    ImageView image = null;
    Button submit = null;
    Spinner choice = null;
    EditText feedback = null;
    String picturePath;
    String imageName="";
    String url;
    Intent intent;
    File img;
    Uri photoURI = null;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.lostfound);
        url="http://"+MainActivity.IpAndPort+"/api/";
        choice = (Spinner) findViewById(R.id.choice);
        prompt = (TextView) findViewById(R.id.prompt);
        feedback = (EditText) findViewById(R.id.feedback);
        capture = (Button) findViewById(R.id.capture);
        capture.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent camera_intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                if(camera_intent.resolveActivity(getPackageManager()) != null) {
                    try {
                        img = createImageFile();
                    }
                    catch (IOException ex) {
                        Toast.makeText(LostFound.this, "IOException", Toast.LENGTH_SHORT).show();
                    }
                    if (img != null) {
                        picturePath = img.getAbsolutePath();
                        photoURI = FileProvider.getUriForFile(LostFound.this,"com.example.myapplication.fileprovider", img);
                        camera_intent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI);
                        startActivityForResult(camera_intent, 1);
                    }
                }
            }
        });
        choose = (Button) findViewById(R.id.chooseFile);
        choose.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent gallery = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.INTERNAL_CONTENT_URI);
                gallery.setType("image/*");
                startActivityForResult(gallery, 2);
            }
        });
        image = (ImageView) findViewById(R.id.image);
        submit = (Button) findViewById(R.id.submit);
        ArrayAdapter adapter = ArrayAdapter.createFromResource(this, R.array.lf, R.layout.spinnerlayout);
        adapter.setDropDownViewResource(R.layout.spinnerlayout);
        choice.setAdapter(adapter);
        choice.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                prompt.setText("Enter " + choice.getSelectedItem().toString() + " Description Here");
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                intent = getIntent();
                if(intent.getStringExtra("activityName").contains("NavBarStudent"))
                    StudentLostFound(intent.getStringExtra("token"));
                else
                    DriverLostFound(intent.getStringExtra("token"));
            }
        });
    }

    private void StudentLostFound(String token) {
        RequestBody requestBody = null;
        MultipartBody.Part part = null;
        if(img!=null) {
            requestBody = RequestBody.create(MediaType.parse("image/*"), img);
            part = MultipartBody.Part.createFormData("images", imageName, requestBody);
        }
        final RequestBody type = RequestBody.create(MediaType.parse("multipart/form-data"), choice.getSelectedItem().toString());
        final RequestBody description = RequestBody.create(MediaType.parse("multipart/form-data"), feedback.getText().toString());
        final Buffer buffer = new Buffer();
        try {
            type.writeTo(buffer);
        }
        catch (IOException e){
            Toast.makeText(this, "IOException", Toast.LENGTH_SHORT).show();
        }
        NetworkClient nc = new NetworkClient(url);
        Retrofit retrofit = nc.getRetrofit();
        UploadImageApi uploadImageApi = retrofit.create(UploadImageApi.class);
        if(part!=null) {
            Call<ResponseBody> call = uploadImageApi.StudentLostFound("bearer " + token, type, description, part);
            call.enqueue(new Callback<ResponseBody>() {
                @Override
                public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                    if (response.isSuccessful()) {
                        Toast.makeText(LostFound.this, buffer.readUtf8() + " Successfully Sent To Admin", Toast.LENGTH_SHORT).show();
                    } else {
                        try {
                            JSONObject jObjError = new JSONObject(response.errorBody().string());
                            Toast.makeText(LostFound.this, jObjError.optString("error"), Toast.LENGTH_LONG).show();
                        } catch (Exception e) {
                            Toast.makeText(LostFound.this, "Exception", Toast.LENGTH_LONG).show();
                        }
                    }
                }

                @Override
                public void onFailure(Call<ResponseBody> call, Throwable t) {
                    Toast.makeText(LostFound.this, "Server is not running or slow, Connection Time Out", Toast.LENGTH_SHORT).show();
                }
            });
        }
        else{
            Call<ResponseBody> call = uploadImageApi.StudentLostFound("bearer " + token, type, description);
            call.enqueue(new Callback<ResponseBody>() {
                @Override
                public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                    if (response.isSuccessful()) {
                        Toast.makeText(LostFound.this, buffer.readUtf8() + " Successfully Sent To Admin", Toast.LENGTH_SHORT).show();
                    } else {
                        try {
                            JSONObject jObjError = new JSONObject(response.errorBody().string());
                            Toast.makeText(LostFound.this, jObjError.optString("error"), Toast.LENGTH_LONG).show();
                        } catch (Exception e) {
                            Toast.makeText(LostFound.this, "Exception", Toast.LENGTH_LONG).show();
                        }
                    }
                }

                @Override
                public void onFailure(Call<ResponseBody> call, Throwable t) {
                    Toast.makeText(LostFound.this, "Server is not running or slow, Connection Time Out", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    private void DriverLostFound(String token) {
        RequestBody requestBody = null;
        MultipartBody.Part part = null;
        if(img!=null) {
            requestBody = RequestBody.create(MediaType.parse("image/*"), img);
            part = MultipartBody.Part.createFormData("images", imageName, requestBody);
        }
        final RequestBody type = RequestBody.create(MediaType.parse("multipart/form-data"), choice.getSelectedItem().toString());
        final RequestBody description = RequestBody.create(MediaType.parse("multipart/form-data"), feedback.getText().toString());
        final Buffer buffer = new Buffer();
        try {
            type.writeTo(buffer);
        }
        catch (IOException e){
            Toast.makeText(this, "IOException", Toast.LENGTH_SHORT).show();
        }
        NetworkClient nc = new NetworkClient(url);
        Retrofit retrofit = nc.getRetrofit();
        UploadImageApi uploadImageApi = retrofit.create(UploadImageApi.class);
        if(part!=null) {
            Call<ResponseBody> call = uploadImageApi.DriverLostFound("bearer " + token, type, description, part);
            call.enqueue(new Callback<ResponseBody>() {
                @Override
                public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                    if (response.isSuccessful()) {
                        Toast.makeText(LostFound.this, type + " Successfully Sent To Admin", Toast.LENGTH_SHORT).show();
                    } else {
                        try {
                            JSONObject jObjError = new JSONObject(response.errorBody().string());
                            Toast.makeText(LostFound.this, jObjError.optString("error"), Toast.LENGTH_LONG).show();
                        } catch (Exception e) {
                            Toast.makeText(LostFound.this, "Exception", Toast.LENGTH_LONG).show();
                        }
                    }
                }

                @Override
                public void onFailure(Call<ResponseBody> call, Throwable t) {
                    Toast.makeText(LostFound.this, "Server is not running or slow, Connection Time Out", Toast.LENGTH_SHORT).show();
                }
            });
        }
        else{
            Call<ResponseBody> call = uploadImageApi.DriverLostFound("bearer " + token, type, description);
            call.enqueue(new Callback<ResponseBody>() {
                @Override
                public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                    if (response.isSuccessful()) {
                        Toast.makeText(LostFound.this, type + " Successfully Sent To Admin", Toast.LENGTH_SHORT).show();
                    } else {
                        try {
                            JSONObject jObjError = new JSONObject(response.errorBody().string());
                            Toast.makeText(LostFound.this, jObjError.optString("error"), Toast.LENGTH_LONG).show();
                        } catch (Exception e) {
                            Toast.makeText(LostFound.this, "Exception", Toast.LENGTH_LONG).show();
                        }
                    }
                }

                @Override
                public void onFailure(Call<ResponseBody> call, Throwable t) {
                    Toast.makeText(LostFound.this, "Server is not running or slow, Connection Time Out", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    private File createImageFile() throws IOException {
        String name = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        imageName = "IMG_" + name + ".jpg";
        File storageDir = getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        File image = null;
        try{
            image = File.createTempFile(imageName,".jpg", storageDir);
        }
        catch (IOException e){
            Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
        return image;
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(resultCode==RESULT_OK && requestCode==1) {
            Picasso.with(this).load(photoURI).into(image);
        }
        else if(resultCode==RESULT_OK && requestCode==2){
            Uri imageUri = data.getData();
            Picasso.with(this).load(imageUri).into(image);
            String[] filePathColumn = { MediaStore.Images.Media.DATA };
            Cursor cursor = getContentResolver().query(imageUri, filePathColumn, null, null, null);
            cursor.moveToFirst();
            int columnIndex = cursor.getColumnIndex(filePathColumn[0]);
            String picturePath = cursor.getString(columnIndex);
            cursor.close();
            img = new File(picturePath);
            imageName=img.getName();
        }
    }
}
