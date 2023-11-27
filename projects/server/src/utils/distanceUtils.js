function calculateDistance(lat1, lon1, lat2, lon2) {
	const R = 6371; // Earth's radius in kilometers
	const dLat = (lat2 - lat1) * (Math.PI / 180);
	const dLon = (lon2 - lon1) * (Math.PI / 180);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * (Math.PI / 180)) *
			Math.cos(lat2 * (Math.PI / 180)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c; // Distance in kilometers
	return distance;
}

function findNearestWarehouse(originLat, originLon, warehouses) {
	let nearestWarehouse = null;
	let minDistance = Number.MAX_VALUE;
	for (const warehouse of warehouses) {
		const distance = calculateDistance(
			Number(originLat),
			Number(originLon),
			Number(warehouse.latitude),
			Number(warehouse.longitude)
		);
		if (distance < minDistance) {
			minDistance = distance;
			nearestWarehouse = warehouse;
		}
	}
	return nearestWarehouse;
}

function findNearestWarehouses(originLat, originLon, warehouses) {
	const warehousesWithDistance = warehouses.map((warehouse) => {
		const distance = calculateDistance(
			Number(originLat),
			Number(originLon),
			Number(warehouse.latitude),
			Number(warehouse.longitude)
		);
		return { warehouse, distance };
	});

	const sortedWarehouses = warehousesWithDistance.sort(
		(a, b) => a.distance - b.distance
	);

	const sortedWarehousesId = sortedWarehouses.map(
		(value) => value.warehouse.id
	);

	return { sortedWarehouses, sortedWarehousesId };
}

module.exports = {
	calculateDistance,
	findNearestWarehouse,
	findNearestWarehouses,
};

const orderItems = [
	{
		item_id: 54,
		product_id: 1,
		quantity: 24,
	},
	{
		item_id: 55,
		product_id: 24,
		quantity: 15,
	},
	{
		item_id: 56,
		product_id: 9,
		quantity: 12,
	},
];

const warehouses = [
	{
		id: 1,
		warehouse_name: "Warehouse JAKPUS",
	},
	{
		id: 2,
		warehouse_name: "Warehouse JAKTIM",
	},
	{
		id: 3,
		warehouse_name: "Warehouse JAKBAR",
	},
];

const stocks = [
	{
		stocks: 10,
		product_id: 1,
		warehouse_id: 1,
	},
	{
		stocks: 10,
		product_id: 1,
		warehouse_id: 2,
	},
	{
		stocks: 10,
		product_id: 1,
		warehouse_id: 3,
	},
	{
		stocks: 10,
		product_id: 24,
		warehouse_id: 1,
	},
	{
		stocks: 10,
		product_id: 24,
		warehouse_id: 2,
	},
	{
		stocks: 10,
		product_id: 24,
		warehouse_id: 3,
	},
	{
		stocks: 10,
		product_id: 9,
		warehouse_id: 1,
	},
	{
		stocks: 10,
		product_id: 9,
		warehouse_id: 2,
	},
	{
		stocks: 10,
		product_id: 9,
		warehouse_id: 3,
	},
];
