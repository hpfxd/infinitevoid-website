$(document).ready(() => {
	$.ajax({
		url: "https://hypixel.hpfxd.nl/guild/5600a8930cf2327fbd41a18f",
		json: true
	}).then((response) => {
		$("#memberCount").text(response.members.length);

		if (response.members.length === 125) {
			$("#joinmsg").hide();
		} else {
			$("#joinfull").hide();
			$("#openslots").text(125 - response.members.length);
		}
	});
});