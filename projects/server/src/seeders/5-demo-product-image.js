'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('product_images', [
			{
				"id": 1,
				"product_id": 1,
				"image": "public/1.png"
			},
			{
				"id": 2,
				"product_id": 1,
				"image": "public/2.png"
			},
			{
				"id": 3,
				"product_id": 1,
				"image": "public/3.png"
			},
			{
				"id": 4,
				"product_id": 2,
				"image": "public/4.png"
			},
			{
				"id": 5,
				"product_id": 2,
				"image": "public/5.png"
			},
			{
				"id": 6,
				"product_id": 2,
				"image": "public/6.png"
			},
			{
				"id": 7,
				"product_id": 3,
				"image": "public/7.png"
			},
			{
				"id": 8,
				"product_id": 3,
				"image": "public/8.png"
			},
			{
				"id": 9,
				"product_id": 3,
				"image": "public/9.png"
			},
			{
				"id": 10,
				"product_id": 4,
				"image": "public/10.png"
			},
			{
				"id": 11,
				"product_id": 4,
				"image": "public/11.png"
			},
			{
				"id": 12,
				"product_id": 4,
				"image": "public/12.png"
			},
			{
				"id": 13,
				"product_id": 5,
				"image": "public/13.png"
			},
			{
				"id": 14,
				"product_id": 5,
				"image": "public/14.png"
			},
			{
				"id": 15,
				"product_id": 5,
				"image": "public/15.png"
			},
			{
				"id": 16,
				"product_id": 6,
				"image": "public/16.png"
			},
			{
				"id": 17,
				"product_id": 6,
				"image": "public/17.png"
			},
			{
				"id": 18,
				"product_id": 6,
				"image": "public/18.png"
			},
			{
				"id": 19,
				"product_id": 7,
				"image": "public/19.png"
			},
			{
				"id": 20,
				"product_id": 7,
				"image": "public/20.png"
			},
			{
				"id": 21,
				"product_id": 7,
				"image": "public/21.png"
			},
			{
				"id": 22,
				"product_id": 8,
				"image": "public/22.png"
			},
			{
				"id": 23,
				"product_id": 8,
				"image": "public/23.png"
			},
			{
				"id": 24,
				"product_id": 8,
				"image": "public/24.png"
			},
			{
				"id": 25,
				"product_id": 9,
				"image": "public/25.png"
			},
			{
				"id": 26,
				"product_id": 9,
				"image": "public/26.png"
			},
			{
				"id": 27,
				"product_id": 9,
				"image": "public/27.png"
			},
			{
				"id": 28,
				"product_id": 10,
				"image": "public/28.png"
			},
			{
				"id": 29,
				"product_id": 10,
				"image": "public/29.png"
			},
			{
				"id": 30,
				"product_id": 10,
				"image": "public/30.png"
			},
			{
				"id": 31,
				"product_id": 11,
				"image": "public/31.png"
			},
			{
				"id": 32,
				"product_id": 11,
				"image": "public/32.png"
			},
			{
				"id": 33,
				"product_id": 11,
				"image": "public/33.png"
			},
			{
				"id": 34,
				"product_id": 12,
				"image": "public/34.png"
			},
			{
				"id": 35,
				"product_id": 12,
				"image": "public/35.png"
			},
			{
				"id": 36,
				"product_id": 12,
				"image": "public/36.png"
			},
			{
				"id": 37,
				"product_id": 13,
				"image": "public/37.png"
			},
			{
				"id": 38,
				"product_id": 13,
				"image": "public/38.png"
			},
			{
				"id": 39,
				"product_id": 13,
				"image": "public/39.png"
			},
			{
				"id": 40,
				"product_id": 14,
				"image": "public/40.png"
			},
			{
				"id": 41,
				"product_id": 14,
				"image": "public/41.png"
			},
			{
				"id": 42,
				"product_id": 14,
				"image": "public/42.png"
			},
			{
				"id": 43,
				"product_id": 15,
				"image": "public/43.png"
			},
			{
				"id": 44,
				"product_id": 15,
				"image": "public/44.png"
			},
			{
				"id": 45,
				"product_id": 15,
				"image": "public/45.png"
			},
			{
				"id": 46,
				"product_id": 16,
				"image": "public/46.png"
			},
			{
				"id": 47,
				"product_id": 16,
				"image": "public/47.png"
			},
			{
				"id": 48,
				"product_id": 16,
				"image": "public/48.png"
			},
			{
				"id": 49,
				"product_id": 17,
				"image": "public/49.png"
			},
			{
				"id": 50,
				"product_id": 17,
				"image": "public/50.png"
			},
			{
				"id": 51,
				"product_id": 17,
				"image": "public/51.png"
			},
			{
				"id": 52,
				"product_id": 18,
				"image": "public/52.png"
			},
			{
				"id": 53,
				"product_id": 18,
				"image": "public/53.png"
			},
			{
				"id": 54,
				"product_id": 18,
				"image": "public/54.png"
			},
			{
				"id": 55,
				"product_id": 19,
				"image": "public/55.png"
			},
			{
				"id": 56,
				"product_id": 19,
				"image": "public/56.png"
			},
			{
				"id": 57,
				"product_id": 19,
				"image": "public/57.png"
			},
			{
				"id": 58,
				"product_id": 20,
				"image": "public/58.png"
			},
			{
				"id": 59,
				"product_id": 20,
				"image": "public/59.png"
			},
			{
				"id": 60,
				"product_id": 21,
				"image": "public/60.png"
			},
			{
				"id": 61,
				"product_id": 21,
				"image": "public/61.png"
			},
			{
				"id": 62,
				"product_id": 22,
				"image": "public/62.png"
			},
			{
				"id": 63,
				"product_id": 22,
				"image": "public/63.png"
			},
			{
				"id": 64,
				"product_id": 22,
				"image": "public/64.png"
			},
			{
				"id": 65,
				"product_id": 23,
				"image": "public/65.png"
			},
			{
				"id": 66,
				"product_id": 23,
				"image": "public/66.png"
			},
			{
				"id": 67,
				"product_id": 23,
				"image": "public/67.png"
			},
			{
				"id": 68,
				"product_id": 24,
				"image": "public/68.png"
			},
			{
				"id": 69,
				"product_id": 24,
				"image": "public/69.png"
			},
			{
				"id": 70,
				"product_id": 24,
				"image": "public/70.png"
			},
			{
				"id": 71,
				"product_id": 25,
				"image": "public/71.png"
			},
			{
				"id": 72,
				"product_id": 25,
				"image": "public/72.png"
			},
			{
				"id": 73,
				"product_id": 25,
				"image": "public/73.png"
			},
			{
				"id": 74,
				"product_id": 26,
				"image": "public/74.png"
			},
			{
				"id": 75,
				"product_id": 26,
				"image": "public/75.png"
			},
			{
				"id": 76,
				"product_id": 26,
				"image": "public/76.png"
			},
			{
				"id": 77,
				"product_id": 27,
				"image": "public/77.png"
			},
			{
				"id": 78,
				"product_id": 27,
				"image": "public/78.png"
			},
			{
				"id": 79,
				"product_id": 27,
				"image": "public/79.png"
			},
			{
				"id": 80,
				"product_id": 28,
				"image": "public/80.png"
			},
			{
				"id": 81,
				"product_id": 28,
				"image": "public/81.png"
			},
			{
				"id": 82,
				"product_id": 28,
				"image": "public/82.png"
			},
			{
				"id": 83,
				"product_id": 29,
				"image": "public/83.png"
			},
			{
				"id": 84,
				"product_id": 29,
				"image": "public/84.png"
			},
			{
				"id": 85,
				"product_id": 30,
				"image": "public/85.png"
			},
			{
				"id": 86,
				"product_id": 30,
				"image": "public/86.png"
			},
			{
				"id": 87,
				"product_id": 31,
				"image": "public/87.png"
			},
			{
				"id": 88,
				"product_id": 31,
				"image": "public/88.png"
			},
			{
				"id": 89,
				"product_id": 32,
				"image": "public/89.png"
			},
			{
				"id": 90,
				"product_id": 32,
				"image": "public/90.png"
			},
			{
				"id": 91,
				"product_id": 33,
				"image": "public/91.png"
			},
			{
				"id": 92,
				"product_id": 33,
				"image": "public/92.png"
			},
			{
				"id": 93,
				"product_id": 34,
				"image": "public/93.png"
			},
			{
				"id": 94,
				"product_id": 34,
				"image": "public/94.png"
			},
			{
				"id": 95,
				"product_id": 34,
				"image": "public/95.png"
			},
			{
				"id": 96,
				"product_id": 35,
				"image": "public/96.png"
			},
			{
				"id": 97,
				"product_id": 35,
				"image": "public/97.png"
			},
			{
				"id": 98,
				"product_id": 35,
				"image": "public/98.png"
			},
			{
				"id": 99,
				"product_id": 36,
				"image": "public/99.png"
			},
			{
				"id": 100,
				"product_id": 36,
				"image": "public/100.png"
			},
			{
				"id": 101,
				"product_id": 36,
				"image": "public/101.png"
			},
			{
				"id": 102,
				"product_id": 37,
				"image": "public/102.png"
			},
			{
				"id": 103,
				"product_id": 37,
				"image": "public/103.png"
			},
			{
				"id": 104,
				"product_id": 37,
				"image": "public/104.png"
			},
			{
				"id": 105,
				"product_id": 38,
				"image": "public/105.png"
			},
			{
				"id": 106,
				"product_id": 38,
				"image": "public/106.png"
			},
			{
				"id": 107,
				"product_id": 39,
				"image": "public/107.png"
			},
			{
				"id": 108,
				"product_id": 39,
				"image": "public/108.png"
			},
			{
				"id": 109,
				"product_id": 40,
				"image": "public/109.png"
			},
			{
				"id": 110,
				"product_id": 40,
				"image": "public/110.png"
			},
			{
				"id": 111,
				"product_id": 40,
				"image": "public/111.png"
			},
			{
				"id": 112,
				"product_id": 41,
				"image": "public/112.png"
			},
			{
				"id": 113,
				"product_id": 41,
				"image": "public/113.png"
			},
			{
				"id": 114,
				"product_id": 42,
				"image": "public/114.png"
			},
			{
				"id": 115,
				"product_id": 42,
				"image": "public/115.png"
			},
			{
				"id": 116,
				"product_id": 43,
				"image": "public/116.png"
			},
			{
				"id": 117,
				"product_id": 43,
				"image": "public/117.png"
			},
			{
				"id": 118,
				"product_id": 43,
				"image": "public/118.png"
			},
			{
				"id": 119,
				"product_id": 44,
				"image": "public/119.png"
			},
			{
				"id": 120,
				"product_id": 44,
				"image": "public/120.png"
			},
			{
				"id": 121,
				"product_id": 44,
				"image": "public/121.png"
			},
			{
				"id": 122,
				"product_id": 45,
				"image": "public/122.png"
			},
			{
				"id": 123,
				"product_id": 45,
				"image": "public/123.png"
			},
			{
				"id": 124,
				"product_id": 46,
				"image": "public/124.png"
			},
			{
				"id": 125,
				"product_id": 46,
				"image": "public/125.png"
			},
			{
				"id": 126,
				"product_id": 46,
				"image": "public/126.png"
			},
			{
				"id": 127,
				"product_id": 47,
				"image": "public/127.png"
			},
			{
				"id": 128,
				"product_id": 47,
				"image": "public/128.png"
			},
			{
				"id": 129,
				"product_id": 47,
				"image": "public/129.png"
			},
			{
				"id": 130,
				"product_id": 48,
				"image": "public/130.png"
			},
			{
				"id": 131,
				"product_id": 48,
				"image": "public/131.png"
			},
			{
				"id": 132,
				"product_id": 48,
				"image": "public/132.png"
			},
			{
				"id": 133,
				"product_id": 49,
				"image": "public/133.png"
			},
			{
				"id": 134,
				"product_id": 49,
				"image": "public/134.png"
			},
			{
				"id": 135,
				"product_id": 50,
				"image": "public/135.png"
			},
			{
				"id": 136,
				"product_id": 50,
				"image": "public/136.png"
			},
			{
				"id": 137,
				"product_id": 51,
				"image": "public/137.png"
			},
			{
				"id": 138,
				"product_id": 51,
				"image": "public/138.png"
			},
			{
				"id": 139,
				"product_id": 52,
				"image": "public/139.png"
			},
			{
				"id": 140,
				"product_id": 52,
				"image": "public/140.png"
			},
			{
				"id": 141,
				"product_id": 53,
				"image": "public/141.png"
			},
			{
				"id": 142,
				"product_id": 53,
				"image": "public/142.png"
			},
			{
				"id": 143,
				"product_id": 54,
				"image": "public/143.png"
			},
			{
				"id": 144,
				"product_id": 54,
				"image": "public/144.png"
			},
			{
				"id": 145,
				"product_id": 54,
				"image": "public/145.png"
			},
			{
				"id": 146,
				"product_id": 55,
				"image": "public/146.png"
			},
			{
				"id": 147,
				"product_id": 55,
				"image": "public/147.png"
			},
			{
				"id": 148,
				"product_id": 56,
				"image": "public/148.png"
			},
			{
				"id": 149,
				"product_id": 56,
				"image": "public/149.png"
			},
			{
				"id": 150,
				"product_id": 56,
				"image": "public/150.png"
			},
			{
				"id": 151,
				"product_id": 57,
				"image": "public/151.png"
			},
			{
				"id": 152,
				"product_id": 57,
				"image": "public/152.png"
			},
			{
				"id": 153,
				"product_id": 58,
				"image": "public/153.png"
			},
			{
				"id": 154,
				"product_id": 58,
				"image": "public/154.png"
			},
			{
				"id": 155,
				"product_id": 59,
				"image": "public/155.png"
			},
			{
				"id": 156,
				"product_id": 59,
				"image": "public/156.png"
			},
			{
				"id": 157,
				"product_id": 60,
				"image": "public/157.png"
			},
			{
				"id": 158,
				"product_id": 60,
				"image": "public/158.png"
			},
			{
				"id": 159,
				"product_id": 61,
				"image": "public/159.png"
			},
			{
				"id": 160,
				"product_id": 61,
				"image": "public/160.png"
			},
			{
				"id": 161,
				"product_id": 62,
				"image": "public/161.png"
			},
			{
				"id": 162,
				"product_id": 62,
				"image": "public/162.png"
			},
			{
				"id": 163,
				"product_id": 62,
				"image": "public/163.png"
			},
			{
				"id": 164,
				"product_id": 63,
				"image": "public/164.png"
			},
			{
				"id": 165,
				"product_id": 64,
				"image": "public/165.png"
			},
			{
				"id": 166,
				"product_id": 65,
				"image": "public/166.png"
			},
			{
				"id": 167,
				"product_id": 65,
				"image": "public/167.png"
			},
			{
				"id": 168,
				"product_id": 66,
				"image": "public/168.png"
			},
			{
				"id": 169,
				"product_id": 66,
				"image": "public/169.png"
			},
			{
				"id": 170,
				"product_id": 67,
				"image": "public/170.png"
			},
			{
				"id": 171,
				"product_id": 67,
				"image": "public/171.png"
			},
			{
				"id": 172,
				"product_id": 68,
				"image": "public/172.png"
			},
			{
				"id": 173,
				"product_id": 68,
				"image": "public/173.png"
			}
		], {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('product_images', null, {});
	}
};
