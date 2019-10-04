$.ajax({
	url: "https://hypixel.hpfxd.nl/guild/5600a8930cf2327fbd41a18f",
	json: true
}).then((response) => {
	const members = response.members;

	for (let i = 0; i < members.length; i++) {
		$("#members tbody").append(`
			<tr id="members-${i+1}">
				<td class="name"></td>
			</tr>
		`);
	}

	let i = 0;
	Promise.all(members.map((member) => {
		return new Promise((resolve, reject) => {
			const cacheid = `hypixel-cache-${member.uuid}`;

			let cache = localStorage.getItem(cacheid);
			try {
				if (cache) {
					cache = JSON.parse(cache);
					if ((Date.now() - cache.time) > 24 * 60 * 60 * 1000) { // 24 hour cache
						localStorage.removeItem(cacheid);
					} else {
						i++;
						$("#loading-progress-count").text(`${i}/${members.length}`);
						return resolve([i, cache.response]);
					}
				}
			} catch (e) {
				localStorage.removeItem(cacheid);
			}

			$.ajax({
				url: `https://hypixel.hpfxd.nl/player/${member.uuid}?neededGames=null`,
				json: true
			}).then((response) => {
				localStorage.setItem(cacheid, JSON.stringify({
					time: Date.now(),
					response: response
				}));
				i++;
				$("#loading-progress-count").text(`${i}/${members.length}`);
				resolve([i, response]);
			});
		});
	})).then((responses) => {

		for (let r of responses) {
			const i = r[0];
			const response = r[1];
			$(`#members-${i} .name`).html(`<span class="mcfont" id="members-name-${i}">`);
			$(`#members-name-${i}`).append((utils.getRank(response.info.rank) + response.info.username).replace(/&/g, "§").replaceColorCodes());
			$(`#members-${i} .name`).attr("sorttable_customkey", response.info.username);
		}

		$("#loading-progress").hide();
		sorttable.makeSortable($("#members")[0]);
		sorttable.innerSortFunction.apply($("#members th")[0], []);
	});
});