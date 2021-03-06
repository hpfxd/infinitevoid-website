for (let i = 0; i < 10; i++) {
	$("#lb-gexp tbody").append(`
		<tr id="lb-gexp-${i+1}">
			<td class="name"></td>
			<td class="gexp"></td>
		</tr>
	`);
}

$.ajax({
	url: "https://api.hpfxd.nl/iv-leaderboard",
	json: true
}).then((response) => {
	const lbs = response.leaderboards;

	Promise.all(lbs.gexp.map((entry) => {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: `https://hypixel.hpfxd.nl/player/${entry.uuid}?neededGames=null`,
				json: true
			}).then((response) => {
				//$(`#lb-gexp-${entry.place} .place`).html(`<span class="mcfont cblue">#${entry.place}</span>`);
				$(`#lb-gexp-${entry.place} .name`).html(`<span class="mcfont" id="lb-gexp-name-${entry.place}">`);
				$(`#lb-gexp-name-${entry.place}`).append((utils.getRank(response.info.rank) + response.info.username).replace(/&/g, "§").replaceColorCodes());
				$(`#lb-gexp-${entry.place} .gexp`).text(entry.exp.toLocaleString());
				$(`#lb-gexp-${entry.place} .name`).attr("sorttable_customkey", response.info.username);
				//$(`#lb-gexp li:eq(${entry.place-1})`).append(`<span style="margin-left:5px;">${entry.exp.toLocaleString()}</span>`);
				/*$(`#lb-gexp li:eq(${entry.place-1})`).html(`
					<span class="mcfont cblue">${(utils.getRank(response.raw) + response.map.info.username).replace(/&/g, "§").replaceColorCodes().innerHTML}</span> ${entry.exp}
				`);*/
				resolve();
			});
		});
	})).then(() => {
		sorttable.makeSortable($("#lb-gexp")[0]);
		sorttable.innerSortFunction.apply($("#lb-gexp th")[1], []);
	});
});