package com.contactsapp;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.widget.Toast;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    private static final int OVERLAY_PERMISSION_REQ_CODE = 0;
    private static final int PERMISSION_REQ_CODE = 1;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ContactsApp";
    }

    @Override
    public void onCreate (Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Checking permissions on init
        checkPerms();
    }

    String[] perms = {
            "android.permission.READ_CONTACTS",
            "android.permission.WRITE_CONTACTS"
    };

    public void checkPerms() {
        // Checking if device version > 22 and we need to use new permission model
        if(Build.VERSION.SDK_INT>Build.VERSION_CODES.LOLLIPOP_MR1) {
            // Checking if we can draw window overlay
            if (!Settings.canDrawOverlays(this)) {
                // Requesting permission for window overlay(needed for all react-native apps)
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:" + getPackageName()));
                startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE);
            }
            for(String perm : perms){
                // Checking each persmission and if denied then requesting permissions
                if(checkSelfPermission(perm) == PackageManager.PERMISSION_DENIED){
                    requestPermissions(perms, PERMISSION_REQ_CODE);
                    break;
                }
            }
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == OVERLAY_PERMISSION_REQ_CODE) {
            checkPerms();
        }
    }

    @Override
    public void onRequestPermissionsResult(int permsRequestCode, String[] permissions, int[] grantResults){
        if(PERMISSION_REQ_CODE == permsRequestCode) {
            if(grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                super.onRequestPermissionsResult(permsRequestCode, permissions, grantResults);
            } else {
                Toast.makeText(this, "Need permission to acces contacts", Toast.LENGTH_SHORT).show();
            }
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

}
