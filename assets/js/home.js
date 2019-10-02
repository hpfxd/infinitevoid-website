$(document).ready(() => {
	$.ajax({
		url: "https://hypixel.hpfxd.nl/guild/5600a8930cf2327fbd41a18f",
		json: true
	}).then((response) => {
		$("#memberCount").text(response.members.length);
		$("#guildLevel").text(getGuildLevelFromXp(response.info.experience));
		if (response.members.length === 125) {
			$("#joinmsg").hide();
		} else {
			$("#joinfull").hide();
			$("#openslots").text(125 - response.members.length);
		}
	});
});

function getGuildLevelFromXp(exp) {
	const EXP_NEEDED = [
		100000,
		150000,
		250000,
		500000,
		750000,
		1000000,
		1250000,
		1500000,
		2000000,
		2500000,
		2500000,
		2500000,
		2500000,
		2500000,
		3000000,
	];

	let level = 0;

	for (let i = 0; i <= 100; i += 1) {
		let need = 0;
		if (i >= EXP_NEEDED.length) {
			need = EXP_NEEDED[EXP_NEEDED.length - 1];
		} else {
			need = EXP_NEEDED[i];
		}

		if ((exp - need) < 0) {
			return Math.round((level + (exp / need)) * 100) / 100;
		}
		level += 1;
		exp -= need;
	}

	return 100;
}