$.backbutton.addEventListener('click', function(e) {
	$.FacebookMain.close();
});

var inputData = [{
	title : 'Invite Friends',
	hasChild : true,
	selectedBackgroundColor : "transparent",
	selectionStyle : (Ti.Platform.osname != "android") ? Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE : "",
	backgroundColor : 'white',
	color : 'black',
	font : (Ti.Platform.osname == "android") ? {
		fontSize : 20,
		fontWeight : "bold"
	} : {
		fontSize : 18,
		fontWeight : "bold"
	},
	height : (Ti.Platform.osname == "android") ? 60 : 50
}];

$.tablebview.data = inputData;

$.tablebview.addEventListener('click', function(e) {

	if (Titanium.Network.online) {
		var FacebookInviteFriendsWin = Alloy.createController('FacebookInviteFriends').getView();
		FacebookInviteFriendsWin.open();
	} else {
		alert("Please turn on your internet connection.");
	}
});
