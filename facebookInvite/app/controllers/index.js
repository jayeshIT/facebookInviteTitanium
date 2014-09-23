
try {

	Ti.include('/lib/constants.js');
	var on_click_flag = false;
	var counter_google = null;
	//------------------Facebook start-------------------------//
	var fb = require('facebook');
	//fb.appid = 505070459561406;
	fb.appid = 230793207000101;
	fb.permissions = ['publish_stream', 'read_stream', 'email', 'user_location', 'user_videos', 'user_birthday', 'user_actions.video', 'user_photos', 'export_stream', 'photo_upload', 'read_friendlists', 'status_update', 'xmpp_login', 'video_upload', 'user_actions.video'];
	fb.forceDialogAuth = true;
	fb.addEventListener('login', function(e) {
		if (e.success) {
			var xhr = Ti.Network.createHTTPClient();
			Titanium.App.Properties.setString('token', fb.getAccessToken());
			xhr.open("GET", 'https://graph.facebook.com/?ids=' + fb.uid + '&access_token=' + Titanium.App.Properties.getString('token'));
			xhr.setTimeout(1000);
			xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
			xhr.onload = function() {
				Titanium.API.info(' autorise success');
				if (this.responseText != null && this.responseText != "") {
					Titanium.API.info("USER DATA:" + this.responseText);
					Titanium.App.Properties.setString('login_user', this.responseText);
					Titanium.App.Properties.setString('image', "https://graph.facebook.com/" + fb.uid + "/picture");
					Titanium.App.Properties.setString('uid', fb.uid);
					var json = JSON.parse(this.responseText);
					var fb_name = json[fb.uid].name;
					alert('Login As \n' + fb_name);
					Alloy.Globals.social = 'facebook';
					$.facebook.enabled = false;
					$.facebook_logout.visible = true;
					var FaceBookMainWin = Alloy.createController('FacebookMain').getView();
					FaceBookMainWin.open();
				}
			};
			xhr.onerror = function() {
				alert("Error while login facebook...Please try again");
			};
			xhr.send();
		} else if (e.cancelled) {
		} else if (e.error) {
			alert("Error while login facebook...Please try again");
		} else {
			alert("Please turn on your internet connection.");
		}
	});
	$.facebook.addEventListener('click', function(e) {
		if (Titanium.Network.online) {
			if (!fb.loggedIn) {
				fb.authorize();
			} else {
				var FaceBookMainWin = Alloy.createController('FacebookMain').getView();
				$.facebook_logout.visible = true;
				FaceBookMainWin.open();
			}
		} else {
			alert("Please turn on your internet connection.");
		}
	});
	//---------Facebook logout---------///
	$.facebook_logout.addEventListener('click', function(e) {
		fblog = true;
		var FB_logout = function(evt) {
			if (fblog == true) {
				fblog = false;
				alert("You successfully logged out from facebook.");
				Titanium.App.Properties.removeProperty('token');
				var client = Titanium.Network.createHTTPClient();
				client.clearCookies('https://login.facebook.com');
				$.facebook.enabled = true;
				$.facebook_logout.visible = false;
			}
		};
		fb.addEventListener('logout', FB_logout);
		fb.logout();
	});

} catch(excption) {
	Titanium.API.info("The Exception:" + excption);
}
$.container.open();
