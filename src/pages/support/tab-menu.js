export const tabs = [
	{
		"title": "Breastpumps",
		"id": "Breastpumps",
	},
	{
		"title": "Supplies",
		"id": "Supplies",
	},
	{
		"title": "Articles",
		"id": "Articles",
	},
	{
		"title": "Contact Us",
		"id": "Contact Us",
	},
];

export function getInitialScrollOffset(initialTab) {
	let filteredData = tabs.filter(function(item) {
		return item.id.includes(initialTab);
	});
	return filteredData[0].width;
}

export function getActiveIndex(initialTab) {
	return tabs.findIndex((item) => item.id === initialTab);
}

export function getIndexData(index) {
	return tabs[index];
}

export default tabs;