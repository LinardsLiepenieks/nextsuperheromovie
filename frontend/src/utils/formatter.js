export const formatDate = (dateString) => {
	const options = { month: "long", day: "numeric", year: "numeric" };
	const date = new Date(dateString);
	const formattedDate = date.toLocaleDateString("en-US", options);

	const day = date.getDate();
	const suffix = getDaySuffix(day);

	return formattedDate.replace(/\b(\d{1,2})\b/, `$1${suffix}`);
};

export const formatDateShort = (dateString) => {
	const options = { day: "2-digit", month: "2-digit", year: "numeric" };
	return new Date(dateString).toLocaleDateString("en-GB", options);
};

const getDaySuffix = (day) => {
	if (day >= 11 && day <= 13) {
		return "th";
	}
	switch (day % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
};
