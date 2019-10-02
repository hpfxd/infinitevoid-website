const utils = {
	getRank: (player) => {
		if (player.prefix) {
			return player.prefix.replace(/§/g, "&") + " ";
		} else if (player.rank) {
			rank = player.rank;
			switch (player.rank) {
				case "ADMIN":
					return "&c[ADMIN] ";
					break;
				case "MODERATOR":
					return "&2[MOD] ";
					break;
				case "HELPER":
					return "&9[HELPER] ";
					break;
				case "YOUTUBER":
					return "&c[&fYOUTUBER&c] ";
					break;
				default:
					return `&7[&c${player.rank}&7] &c`;
			}
		} else if (player.monthlyRank && player.monthlyRank !== "NONE") {
			switch (player.monthlyRank) {
				case "SUPERSTAR":
					return `&6[MVP${utils.getMinecraftColor(player.plusColor)}++&r&6] `;
			}
		} else if (player.packageRank) {
			switch (player.packageRank) {
				case "MVP_PLUS":
					return `&b[MVP${utils.getMinecraftColor(player.plusColor)}+&r&b] `;
					break;
				case "MVP":
					return "&b[MVP] ";
					break;
				case "VIP_PLUS":
					return "&a[VIP&6+&a] ";
					break;
				case "VIP":
					return "&a[VIP] ";
					break;
			}
		}

		return "&7";
	},
	getMinecraftColor: (str) => {
		if (!str) return "&c";
		str = str.toLowerCase();
		switch (str) {
			case "dark_red":
				return "&4";
				break;
			case "red":
				return "&c";
				break;
			case "gold":
				return "&6";
				break;
			case "yellow":
				return "&e";
				break;
			case "dark_green":
				return "&2";
				break;
			case "green":
				return "&a";
				break;
			case "aqua":
				return "&b";
				break;
			case "dark_aqua":
				return "&3";
				break;
			case "dark_blue":
				return "&1";
				break;
			case "blue":
				return "&9";
				break;
			case "light_purple":
				return "&d";
				break;
			case "dark_purple":
				return "&5";
				break;
			case "white":
				return "&f";
				break;
			case "gray":
				return "&7";
				break;
			case "dark_gray":
				return "&8";
				break;
			case "black":
				return "&0";
				break;
			default:
				return "&c";
				break;
		}
	}
};