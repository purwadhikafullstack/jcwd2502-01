"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"products",
			[
				{
					id: 1,
					product_name:
						"PRO X SUPERLIGHT 2 LIGHTSPEED Wireless Gaming Mouse",
					product_desc:
						"The next evolution of our champion mouse. Welcome the new weapon of choice for the world's top esports athletes. Tenkeyless design inspired by pro players LIGHTSYNC RGB lighting Advanced features require Logitech G HUB software. Download at LogitechG.com/GHUB Onboard lighting profile 2Advanced features require Logitech G HUB software. Download at LogitechG.com/GHUB 6ft detachable data and charging cable Report rate 1 ms. PACKAGING CONTENTS PRO X SUPERLIGHT 2 Wireless Gaming Mouse LIGHTSPEED USB Adapter USB A to C data/charging cable Adapter extension Optional grip tape Optional aperture door with PTFE backing User documentation.",
					product_price: "2399000",
					brand_id: 1,
					category_id: 1,
					weight: 60,
				},
				{
					id: 2,
					product_name: "G102 LIGHTSYNC",
					product_desc:
						"Optimize play time with G102, a gaming mouse in a variety of cheerful colors. With LIGHTSYNC technology, a gaming-grade sensor, and a classic 6-button design, you'll brighten up your gaming and your desk. ",
					product_price: "309000",
					brand_id: 1,
					category_id: 1,
					weight: 85,
				},
				{
					id: 3,
					product_name: "G304 LIGHTSPEED Wireless Gaming Mouse",
					product_desc:
						"LIGHTSPEED wireless gaming mouse is designed for serious performance with the latest technological innovations. Impressive 250 hour battery life. Now available in a variety of cheerful colors. ",
					product_price: "599000",
					brand_id: 1,
					category_id: 1,
					weight: 99,
				},
				{
					id: 4,
					product_name: "PRO X TKL LIGHTSPEED Gaming Keyboard",
					product_desc:
						"A trusted championship wireless gaming keyboard designed for the highest level of competition. Designed with pro players in mind, built to win. Tenkeyless design inspired by pro players LIGHTSYNC RGB lighting Advanced features require Logitech G HUB software Wireless range maximum 10 m.PC with Windows® 10 or later and USB 2.0 port Internet access for Logitech G HUB Software. Internet access for Logitech G HUB Software. . Download at LogitechG.com/GHUB Onboard lighting profile Advanced features require Logitech G HUB software. Download at LogitechG.com/GHUB 6ft detachable data and charging cable Report rate 1 ms",
					product_price: "3299000",
					brand_id: 1,
					category_id: 2,
					weight: 600,
				},
				{
					id: 5,
					product_name: "G213 PRODIGY RGB Gaming Keyboard",
					product_desc:
						"Durable with gaming grade performance. The Tactile Mech-Dome Keyswitch is spill-resistant. Customizable LIGHTSYNC RGB lighting Integrated palm rest and adjustable base Indicator Light (LED) Backlight RGB (5 Zones). Custom media controls. Windows® 7 or later USB ports (Optional) Internet Connection for Logitech G HUB : Advanced settings require Logitech G HUB which can be downloaded at logitech.com/downloads",
					product_price: "729000",
					brand_id: 1,
					category_id: 2,
					weight: 1000,
				},
				{
					id: 6,
					product_name: "G413 Mechanical Backlit Gaming Keyboard",
					product_desc:
						"Designed for top performance with the right feature set. Its blade-like chassis is made of high-strength aluminum alloy with USB passthrough, backlit buttons, Romer-G tactile mechanical switches, and more. DURABILITY 70 million keystrokes Actuation distance : 1.5 mm Actuation force : 45 g Total distance traveled : 3.2 mm. Windows® 10, Windows 8.1, Windows 8 or Windows 7 USB port (for keyboard) Second USB port (for USB passthrough port) (Optional) Internet access for Logitech G HUB",
					product_price: "949000",
					brand_id: 1,
					category_id: 2,
					weight: 1105,
				},
				{
					id: 7,
					product_name:
						"PRO X 2 LIGHTSPEED LIGHTSPEED Wireless Gaming Headset",
					product_desc:
						"Designed with pro players for the highest level of competition. These headphones use a 50 mm Graphene driver with a Neodymium magnet. They have a frequency response between 20 Hz and 20 KHz and an impedance of 38 Ohms. With a sensitivity of 87.8 dB SPL at 1 mW and 1 cm, they're quite responsive. The headphones feature an aluminium fork, steel headband, and memory foam leatherette pads. There are also additional cloth memory foam pads. The microphone is Cardioid (Unidirectional), with a type of Electret Condenser, measuring 6 mm, and has a frequency response from 100 Hz to 10 KHz PC with Windows® 10 or later and USB 2.0 port Internet access for Logitech G HUB Software. PlayStation® 5 and PlayStation 4 (USB wireless stereo sound only)",
					product_price: "3999000",
					brand_id: 1,
					category_id: 4,
					weight: 345,
				},
				{
					id: 8,
					product_name: "G735 Wireless Gaming Headset",
					product_desc:
						"From the Aurora Collection, the G735 maximizes comfort and fit for all gamers including gamers with smaller head sizes. Play comfortably with an ultra-soft headband and rotating ear cups. Perfect for PCs and mobile devices with LIGHTSPEED and Bluetooth® wireless. Comes in White Mist pattern. Colored accessories sold separately. These headphones offer a frequency response between 20 Hz and 20 KHz with an impedance of 38 Ohm. They are compatible with both Dolby Atmos and Windows Sonic Spatial Sound and accept an analog audio input through a 3.5 mm cable, which isn't included. The boom microphone has a Cardioid (unidirectional) pickup pattern with a frequency response ranging from 100 Hz to 10 KHz. The headphones use wireless technology that provides a maximum range of 20 meters, either via the LIGHTSPEED USB receiver or Bluetooth. They come equipped with a rechargeable battery that offers 16 hours of playtime at 50% volume with lights on and extends up to 56 hours with the lights off. Charging is done via a USB-C port. The audio driver is 40mm in size. With RGB lights off, the playtime reaches up to 56+ hours. Weighing at just 273 grams, they are lightweight for prolonged comfort and maintain a connection for up to a distance of 20 meters.",
					product_price: "3399000",
					brand_id: 1,
					category_id: 4,
					weight: 273,
				},
				{
					id: 9,
					product_name:
						"ASTRO A50 WIRELESS + BASE STATION Wireless Gaming Headset for Xbox, PlayStation, and PC MAC",
					product_desc:
						"With revolutionary design, superior acoustics and ergonomic comfort, the A50 Wireless + Base Station delivers an unforgettable gaming experience. *A50 for Xbox is compatible with Xbox Series X|S and PC/MAC The headphones come with a 6 mm uni-directional microphone that offers sound isolation. Designed for over-ear comfort, they are powered by 40 mm drivers with a Neodymium magnet. Their wireless range is up to 15 meters, and they operate on a 2.4 GHz frequency. You can expect about 20 months of standby battery life, thanks to the Lithium Polymer single cell battery. Weighing 380 grams without the cable, they have dimensions of 185 mm in length, 88.4 mm in width, and 182.2 mm in height. They use the Open Air transducer principle and provide a frequency response from 20Hz to 20,000Hz. Impressively, they can achieve 118 dB at 1kHz. A50 for PlayStation is compatible with PlayStation 4 and PC/MAC. HDMI adapter available for PlayStation 5 compatibility.",
					product_price: "2930000",
					brand_id: 1,
					category_id: 4,
					weight: 380,
				},
				{
					id: 10,
					product_name: "F310 Game pads",
					product_desc:
						"Four-switch D-pad for smooth control and a familiar console layout. Plug-and-play on PC. Windows® 11, Windows 10, Windows 8, Windows 7, or Windows Vista, ChromeOS™ Internet connection for optional software downloads",
					product_price: "339000",
					brand_id: 1,
					category_id: 3,
					weight: 380,
				},
				{
					id: 11,
					product_name: "F710 Wireless Gamepad",
					product_desc:
						"D-pad four switches for accurate control. Fast 2.4 GHz wireless via USB nano receiver. Dual-motor vibration feedback. PC compatible. Windows® 11, Windows 10, Windows 8, Windows 7, or Windows Vista, ChromeOS™ Internet connection for optional software downloads",
					product_price: "749000",
					brand_id: 1,
					category_id: 3,
					weight: 380,
				},
				{
					id: 12,
					product_name: "G440 Hard Gaming Mouse Pad",
					product_desc:
						"The hard surface provides low friction and fast, smooth mouse movement. The rubber base stays in place for thrilling gaming. The surface texture is optimized for Logitech G mice and peak gaming performance.",
					product_price: "329000",
					brand_id: 1,
					category_id: 6,
					weight: 229,
				},
				{
					id: 13,
					product_name: "G640 Large Cloth Gaming Mouse Pad",
					product_desc:
						"Large size, 400 x 460 mm, for more space and greater mouse movement. The rubber base stays in place for thrilling gaming. The surface texture is optimized for Logitech G mice and peak gaming performance.",
					product_price: "469000",
					brand_id: 1,
					category_id: 6,
					weight: 352,
				},
				{
					id: 14,
					product_name: "G840 XL Gaming Mouse Pad",
					product_desc:
						"Full desktop gaming mouse pad with space to configure the setup to your liking. The surface texture is tuned for Logitech G mice. The rubber device stays in place so you can focus and control the game.",
					product_price: "629000",
					brand_id: 1,
					category_id: 6,
					weight: 550,
				},
				{
					id: 15,
					product_name: "Razer Viper V2 Pro - Black",
					product_desc:
						"Ultra-lightweight, Ultra-fast Wireless Esports Mouse ,Razer™ Optical Mouse Switches Gen-3, Razer™ HyperSpeed Wireless In the box, you'll find the Razer Viper V2 Pro mouse, a wireless USB dongle with its adapter, a Type-A to Type-C Speedflex cable, Razer Mouse Grip Tape, and an important product information guide. While this model doesn't feature RGB lighting, it's equipped with a Focus Pro 30K Optical Sensor. It boasts a maximum sensitivity of 30,000 DPI, speeds up to 750 IPS, and a 70G acceleration. You'll have 6 programmable buttons, built with the third-generation Optical Mouse Switches, which are designed for up to 90-million clicks. It has a single on-board memory profile and the mouse feet are made of 100% PTFE. Lastly, it comes with a Razer™ Speedflex Type-C USB cable.",
					product_price: "2350000",
					brand_id: 2,
					category_id: 1,
					weight: 58,
				},
				{
					id: 16,
					product_name: "Razer Naga V2 HyperSpeed",
					product_desc:
						"Ergonomic Wireless MMO Gaming Mouse with 19 Programmable Buttons ",
					product_price: "1500000",
					brand_id: 2,
					category_id: 1,
					weight: 95,
				},
				{
					id: 17,
					product_name: "Razer Naga V2 HyperSpeed",
					product_desc:
						"Ultra-lightweight Ergonomic Esports Mouse This mouse, with its refined ergonomic design, is powered by the Razer™ Focus Pro 30K Optical Sensor. It can reach speeds up to 750 IPS and has a 70G acceleration. The mouse offers 6 programmable buttons, constructed with third-generation Optical Mouse Switches, designed for a lifespan of up to 90-million clicks. Users can benefit from 5 on-board memory profiles, and the mouse feet are made entirely of PTFE. For connectivity, it comes with a Razer™ Speedflex Cable.",
					product_price: "1100000",
					brand_id: 2,
					category_id: 1,
					weight: 59,
				},
				{
					id: 18,
					product_name: "Razer BlackWidow V4 75 Percent - US - Black",
					product_desc:
						"Ultra-lightweight Ergonomic Esports Mouse This mouse, with its refined ergonomic design, is powered by the Razer™ Focus Pro 30K Optical Sensor. It can reach speeds up to 750 IPS and has a 70G acceleration. The mouse offers 6 programmable buttons, constructed with third-generation Optical Mouse Switches, designed for a lifespan of up to 90-million clicks. Users can benefit from 5 on-board memory profiles, and the mouse feet are made entirely of PTFE. For connectivity, it comes with a Razer™ Speedflex Cable. This keyboard features a hot-swappable design and a compact 75% layout encased in aluminum. It provides an optimized typing experience with Razer™ Mechanical Switches that are tactile in nature. The keyboard connects via a detachable Type C cable and comes with durable doubleshot ABS keycaps. It's Razer™ Synapse enabled and constructed with a 5052 Aluminum Alloy top case. Enhancements include sound dampening foam for both the PCB & case, non-conductive tape for the PCB, and additional holes for screw-in stabilizer modifications (though modifications could void the warranty). Stabilizers are lubricated, and there's added aesthetic appeal with 2-side underglow strips. The keyboard supports an impressive 8,000 Hz polling rate and features N-key rollover & anti-ghosting.",
					product_price: "3000000",
					brand_id: 2,
					category_id: 2,
					weight: 747,
				},
				{
					id: 19,
					product_name: "Razer Pro Type Ultra - US",
					product_desc:
						"This full-sized keyboard features Razer™ Yellow Mechanical Switches that are linear and silent. Designed with ergonomics in mind, it has a soft-touch coating and includes a plush leatherette wrist rest for comfort. The keys are backlit with white LEDs. Connectivity options include wired USB-C, wireless Bluetooth®, and Razer™ HyperSpeed at 2.4GHz. The keycaps are made of ABS plastic and have a soft touch coating. Unique features include multi-host connection for up to four devices, fully programmable keys, and a Razer™ Productivity Dongle that allows this keyboard and compatible mice to connect to the same wireless dongle. It supports 10-key rollover and boasts a battery life of approximately 214 hours without back-lighting on Bluetooth® and 207 hours on 2.4GHz, or roughly 13 hours with full brightness back-lighting on both connections. The keyboard is capped with a metal top and is Razer Synapse 3 enabled. The approximate dimensions are 439 mm x 131 mm x 40 mm and it weighs about 1038 g, including the cable.",
					product_price: "2500000",
					brand_id: 2,
					category_id: 2,
					weight: 747,
				},
				{
					id: 20,
					product_name: "Razer Cynosa V2 - US",
					product_desc:
						"With premium per-key lighting that offers a greater depth of RGB customization, each keystroke you make on the Razer Cynosa V2 is also quiet and cushioned, making it super comfortable to use for long hours of gaming. Personalize this RGB gaming keyboard with over 16.8 million colors and a suite of effects to choose from. Enjoy greater immersion with dynamic lighting effects that occur as you game on over 150 Chroma-integrated titles such as Fortnite, Apex Legends, Warframe, and more. This full-sized keyboard features soft cushioned gaming-grade keys, offering a soft and cushioned feel. It boasts Razer Chroma™ RGB customizable backlighting, providing a vibrant palette of 16.8 million colors. The keyboard has an attached wired connectivity and comes with regular ABS keycaps. Unique features include individually customizable backlit keys, underglow lighting with 22 zones, 10 key roll-over with anti-ghosting, and a spill-resistant design. It also offers fully programmable keys with on-the-fly macro recording, a dedicated gaming mode, and a fast 1000Hz ultrapolling rate.",
					product_price: "1000000",
					brand_id: 2,
					category_id: 2,
					weight: 822,
				},
				{
					id: 21,
					product_name: "Razer BlackShark V2 Pro - Black",
					product_desc:
						"This device boasts the Razer™ HyperClear Super Wideband Mic and Razer™ TriForce Titanium 50mm Drivers, supported by Razer™ HyperSpeed Wireless Technology. The microphone is detachable and offers a unidirectional pick-up pattern. Its frequency response ranges from 100 Hz to 10 kHz with a sensitivity of -42 ± 3 dBV at 1 kHz. The headset features THX Spatial Audio for surround sound, and controls include volume adjustments, toggles for 2.4 GHz wireless/Bluetooth, mic muting, and an audio profile switcher. It has a battery life of up to 70 hours, and while it doesn't feature any lighting, it's compatible with PCs, PlayStation, and mobile devices via Type A 2.4 GHz or Bluetooth 5.2.",
					product_price: "1000000",
					brand_id: 2,
					category_id: 4,
					weight: 320,
				},
				{
					id: 22,
					product_name:
						"Razer BlackShark V2 Pro (2020) - Six Siege Special Edition",
					product_desc:
						"This headset integrates Razer™ HyperSpeed Wireless technology, Razer™ TriForce Titanium 50mm Drivers, and a Razer™ HyperClear Supercardioid Mic. Weighing approximately 320g or 0.71 lbs, it comes with a unidirectional supercardioid microphone that has a frequency response between 100 Hz to 10 kHz and a sensitivity of -42 ± 3 dB at 1 kHz. The device provides THX Spatial Audio for a virtual surround experience. On-earcup controls allow for volume adjustments and mic muting. The battery life extends up to 24 hours, and it doesn't feature any external lighting. This headset is compatible with PCs, Macs, PS4s, and the Nintendo Switch.",
					product_price: "3100000",
					brand_id: 2,
					category_id: 4,
					weight: 320,
				},
				{
					id: 23,
					product_name: "Razer Kraken V3 X",
					product_desc:
						"This headset is equipped with Razer™ TriForce 40mm Drivers and a bendable Razer™ HyperClear Cardioid Mic. For comfort, it features hybrid fabric and memory foam ear cushions. The microphone is unidirectional with a frequency response of 100 Hz to 10 kHz and a sensitivity of -42 ± 3 dB at 1 kHz. Surround sound is available exclusively on Windows 10 64-bit systems. You can adjust the volume directly on the headset and toggle the microphone on and off. While there's no battery life to consider, it does come with Razer Chroma RGB lighting. This headset is compatible with both PCs and the PS4.",
					product_price: "900000",
					brand_id: 2,
					category_id: 4,
					weight: 285,
				},
				{
					id: 24,
					product_name: "Razer Wolverine V2 Pro - Black",
					product_desc:
						"This controller features Razer™ HyperSpeed Wireless technology, Mecha-Tactile Action Buttons, and an 8-Way Microswitch D-Pad. It can connect via HyperSpeed Wireless using the included dongle or through a wired connection. It's designed for the PS5™ console or PCs with Windows, and there's a Razer™ Controller app available for iOS and Android that requires an internet connection. The controller boasts Razer Chroma lighting and six remappable multi-function buttons. The D-Pad is interchangeable, and it comes with two additional thumbstick caps, one tall and concave and the other short and convex. The Razer™ HyperTrigger enhances the trigger stops. Both microphone input and audio output are facilitated through a 3.5 mm analog audio port compatible with PS5™ and PCs. The battery lasts approximately 10 hours with Chroma on, and around 28 hours without Chroma. There's also a configuration app available for personalized settings.",
					product_price: "4000000",
					brand_id: 2,
					category_id: 3,
					weight: 279,
				},
				{
					id: 25,
					product_name:
						"Razer Wireless Controller & Quick Charging Stand for Xbox Razer Limited Edition",
					product_desc:
						"This controller boasts a custom Razer design and offers universal wireless connectivity. It's compatible with Bluetooth for xCloud Gaming, Android, and iOS. Players can easily capture and share content with a dedicated Share button on connected platforms. While it doesn't have mechanical action buttons, interchangeable D-Pads, thumbsticks, or trigger stops, it does allow for custom button mapping via the Xbox Accessories App. The controller provides both microphone input and audio output through a 3.5 mm analog audio port that's compatible with Xbox and PC. Its battery lasts up to 12 hours, and you can personalize settings via the Xbox Accessories App. The controller is adorned with a custom Razer design.",
					product_price: "2500000",
					brand_id: 2,
					category_id: 3,
					weight: 1005,
				},
				{
					id: 26,
					product_name:
						"Razer Universal Quick Charging Stand for Xbox - Forza Horizon 5 Limited Edition",
					product_desc:
						"This product features a race-inspired design that matches your Xbox controller. It offers a speedy refueling option with its quick charge capability and is universally compatible. The magnetic contact system enables easy one-handed navigation and ensures a secure connection. It's powered by a USB connection. Inside the package, you'll find a rechargeable battery, battery covers for both Xbox Series X|S and Xbox One, and a Type C to Type A cable.",
					product_price: "700000",
					brand_id: 2,
					category_id: 3,
					weight: 805,
				},
				{
					id: 27,
					product_name: "RIVAL 3",
					product_desc:
						"This mouse is crafted from hyper-durable materials and comes with mechanical switches that guarantee up to 60 million clicks. It's designed to be lightweight and ergonomic, ensuring comfort during use. The device boasts brilliant Prism lighting across three zones, displaying 16.8 million vivid colors. Its TrueMove Core optical gaming sensor ensures precise 1-to-1 tracking.",
					product_price: "600000",
					brand_id: 3,
					category_id: 1,
					weight: 88,
				},
				{
					id: 28,
					product_name: "RIVAL 5",
					product_desc:
						"This mouse is ideal for Battle Royale, FPS, MOBA, MMO, and other high-speed games. It features the TrueMove Air optical gaming sensor for precise 1-to-1 tracking. With an ergonomic design, it offers nine programmable buttons, including five quick-action side buttons. Weighing in at a competitive 85g, it's both lightweight and highly durable. The next-generation Golden Micro IP54 Switches ensure longevity, and the PrismSync lighting illuminates 10 zones with 16.8 million vibrant colors.",
					product_price: "1100000",
					brand_id: 3,
					category_id: 1,
					weight: 85,
				},
				{
					id: 29,
					product_name: "PRIME MINI",
					product_desc:
						"Breaking ground in esports, the Prestige Optical Magnetic Switches offer unmatched consistency and reliability for competitive gamers. Weighing just 61g, this ultra-lightweight mouse has a mini form factor co-designed with top esports professionals. It provides pro-grade accuracy with the TrueMove Pro gaming sensor. Users can personalize settings with on-board preset polling rates and CPI profiles. Additionally, the detachable super mesh cable ensures swift movements and a feather-light feel during gameplay.",
					product_price: "1000000",
					brand_id: 3,
					category_id: 1,
					weight: 61,
				},
				{
					id: 30,
					product_name: "APEX PRO TKL WIRELESS (2023)",
					product_desc:
						"This keyboard employs OmniPoint 2.0 Adjustable HyperMagnetic Switches, ensuring a whopping 100 million presses. With a 32-bit ARM processor and on-board memory, users can save up to 5 custom profiles. These switches enable adjustable actuation points between 0.1 mm to 4.0 mm and boast a swift response time of 0.7 ms. Connectivity options include wired, 2.4 GHz wireless, and Bluetooth. The battery life stretches to 37.5 hours in wireless mode and 45 hours via Bluetooth with default lighting. Thanks to the OmniPoint 2.0 switches, this keyboard offers unmatched customization and boasts being the world's fastest, offering actuation 20 times quicker and a response 11 times faster than traditional keyboards. The dynamic activation eradicates latency, providing control over 40 levels of per-key actuation. Users can program two actions on a single key for nuanced control. With the Quantum 2.0 Dual Wireless, it offers lag-free connections on both 2.4GHz and Bluetooth 5.0. Designed for esports, it retains a tenkeyless form yet provides full-size functionality, adorned with a premium aluminum top plate and a detachable USB-C connection.",
					product_price: "4500000",
					brand_id: 3,
					category_id: 2,
					weight: 1070,
				},
				{
					id: 31,
					product_name: "APEX 7 TKL GHOST",
					product_desc:
						"This unique, limited edition keyboard is perfect for a distinctive setup. Its OLED Smart Display provides direct information from games and apps. Crafted for durability, it incorporates mechanical gaming switches and double shot PBT pudding keycaps. The structure is reinforced by a Series 5000 aircraft-grade aluminum frame. For added comfort, it comes with a detachable, soft touch magnetic wrist rest.",
					product_price: "2800000",
					brand_id: 3,
					category_id: 2,
					weight: 780,
				},
				{
					id: 32,
					product_name: "APEX 7 TKL",
					product_desc:
						"This keyboard features an OLED Smart Display that provides direct updates from games and apps, including instant notifications from Discord, Tidal, and various games. Designed for durability, it's equipped with mechanical gaming switches and is built with a sturdy Series 5000 aircraft-grade aluminum frame. For enhanced comfort during use, a detachable soft-touch magnetic wrist rest is included.",
					product_price: "2200000",
					brand_id: 3,
					category_id: 2,
					weight: 780,
				},
				{
					id: 33,
					product_name: "ARCTIS NOVA 7X WIRELESS",
					product_desc:
						"This headset incorporates the Nova Acoustic System, boasting High Fidelity Drivers that ensure top-notch audio and an immersive 360° Spatial Audio, further enhanced by a pioneering Parametric EQ. It supports simultaneous 2.4GHz wireless and Bluetooth connections, allowing for mixing game and mobile audio. The battery can last up to 38 hours, with a quick charge feature via USB-C providing 6 hours of use from just a 15-minute charge. The AI-Powered noise-canceling mic, powered by Sonar ClearCast AI, filters out background noises, ensuring clear communication. A ChatMix Dial is conveniently located on the headset. Its multi-platform USB-C dongle is versatile, compatible with numerous platforms from Xbox to Meta Quest 2. The ComfortMAX system ensures a perfect fit, supported by a durable PVD-coated steel headband. The Sonar feature enables gamers to detect enemies acoustically before visually spotting them.",
					product_price: "3450000",
					brand_id: 3,
					category_id: 4,
					weight: 379,
				},
				{
					id: 34,
					product_name: "ARCTIS NOVA 1P",
					product_desc:
						"Equipped with the Nova Acoustic System and custom-designed High Fidelity Drivers, this headset ensures top-tier audio quality. It's ultra-lightweight with the ComfortMAX System offering four adjustment points for optimal fit. The ClearCast Gen 2 mic, utilizing AI algorithms, effectively minimizes background noise, ensuring crisp communication. The headset is versatile, compatible with any PC, console, and mobile devices using a 3.5mm jack. Onboard controls, including a volume dial and a voice mute button, add to its convenience. Additionally, the Sonar feature provides an auditory advantage, allowing gamers to detect adversaries acoustically before they appear visually.",
					product_price: "1100000",
					brand_id: 3,
					category_id: 4,
					weight: 236,
				},
				{
					id: 35,
					product_name: "ARCTIS 9X",
					product_desc:
						"Equipped with the Nova Acoustic System and custom-designed High Fidelity Drivers, this headset ensures top-tier audio quality. It's ultra-lightweight with the ComfortMAX System offering four adjustment points for optimal fit. The ClearCast Gen 2 mic, utilizing AI algorithms, effectively minimizes background noise, ensuring crisp communication. The headset is versatile, compatible with any PC, console, and mobile devices using a 3.5mm jack. Onboard controls, including a volume dial and a voice mute button, add to its convenience. Additionally, the Sonar feature provides an auditory advantage, allowing gamers to detect adversaries acoustically before they appear visually.",
					product_price: "3400000",
					brand_id: 3,
					category_id: 4,
					weight: 60,
					weight: 370,
				},
				{
					id: 36,
					product_name: "STRATUS+",
					product_desc:
						"This gaming tool lets you play on Android™ or Chromebook devices. It comes with a slim phone mount that adjusts to fit Android smartphones. You can enjoy over 90 hours of mobile gaming, and it recharges quickly. The high-quality hardware includes ALPS thumbsticks and Hall Effect triggers for an enhanced gaming experience.",
					product_price: "1100000",
					brand_id: 3,
					category_id: 3,
					weight: 244,
				},
				{
					id: 37,
					product_name: "NIMBUS+",
					product_desc:
						"This is an official Apple-licensed controller, ensuring wireless compatibility with all Apple devices, from iOS and iPadOS to tvOS. It features a built-in battery that offers up to 50 hours of gameplay on a single charge. Beyond being compatible with Apple Arcade, it works with numerous titles on the App Store. The controller boasts tactile D-pad buttons, new Hall Effect magnetic triggers, and clickable L3/R3 joysticks. An included Nimbus+ iPhone Mount lets you attach your iPhone directly to the Nimbus+. To ensure optimal compatibility across all iOS devices, it's recommended to update the controller using the SteelSeries Engine.",
					product_price: "1250000",
					brand_id: 3,
					category_id: 3,
					weight: 243,
				},
				{
					id: 38,
					product_name: "STRATUS DUO",
					product_desc:
						"This gaming tool allows effortless play on any Android or Windows device. It requires no software, supporting direct pairing and play on various platforms like Windows, Android, Oculus Go, and Samsung Gear VR through Bluetooth or the USB Wireless Adapter. It's also Steam-enabled, making over 5000 controller-compatible Steam games accessible. Its lithium-ion battery promises over 20 hours of gameplay, and you can even charge while gaming.",
					product_price: "1150000",
					brand_id: 3,
					category_id: 3,
					weight: 245,
				},
				{
					id: 39,
					product_name: "QCK HEAVY XXL: DIABLO® IV EDITION",
					product_desc:
						"The QCK HEAVY XXL: DIABLO® IV EDITION comes in a limited edition design themed around Diablo® IV. It boasts an extra-thick, non-slip rubber base to prevent unwanted shifts. Crafted with the exclusive QcK micro-woven cloth, it provides ultimate control, optimized for both low and high CPI movements. Additionally, it's both durable and washable, making maintenance easy. Its dimensions are 900 mm x 400 mm x 4 mm.",
					product_price: "700000",
					brand_id: 3,
					category_id: 6,
					weight: 300,
				},
				{
					id: 40,
					product_name: "QCK HEAVY XXL",
					product_desc:
						"The QCK is a low-profile mousepad designed with an easily portable micro-woven surface. Made from the exclusive QcK micro-woven cloth, it offers optimal control, tailored for both low and high CPI movements. It's durable, washable, and has been the preferred choice of esports professionals for over 15 years. Its dimensions are 1600 mm x 800 mm x 3 mm.",
					product_price: "1400000",
					brand_id: 3,
					category_id: 6,
					weight: 500,
				},
				{
					id: 41,
					product_name: "QCK L BLOODSPORT EDITION",
					product_desc:
						"The QCK L BLOODSPORT EDITION is a limited edition gaming mousepad inspired by the streetwise CS:GO skin. Crafted with the exclusive QcK micro-woven cloth, it offers superior control and is optimized for both low and high CPI movements. The mousepad is both durable and washable, ensuring longevity and easy maintenance. It measures 450 mm x 400 mm x 2 mm.",
					product_price: "300000",
					brand_id: 3,
					category_id: 6,
					weight: 100,
				},
				{
					id: 42,
					product_name: "KATAR ELITE WIRELESS Gaming Mouse",
					product_desc:
						"The CORSAIR KATAR ELITE WIRELESS gaming mouse is lightweight at only 69g, offering impressive performance in a small size, making it perfect for those who prefer claw and fingertip grips.",
					product_price: "1100000",
					brand_id: 4,
					category_id: 1,
					weight: 69,
				},
				{
					id: 43,
					product_name: "NIGHTSABRE RGB Wireless Gaming Mouse",
					product_desc:
						"The NIGHTSABRE RGB Wireless Gaming Mouse offers robust performance, making it ideal for FPS, MOBA, Battle Royale, and more with its sturdy and symmetric design. It features 11 customizable buttons, including a tilt scroll wheel, for tailored gameplay. Its CORSAIR MARKSMAN optical sensor ensures precision with a 26,000 DPI, 650 IPS tracking, and up to 50G acceleration. The mouse boasts up to 100 hours of battery life on a single charge, with a rapid recharge that provides 20 hours of gameplay from just a 15-minute charge. Enhance your gaming aesthetics with its dynamic seven-zone RGB backlighting, customizable through iCUE.",
					product_price: "2600000",
					brand_id: 4,
					category_id: 1,
					weight: 99,
				},
				{
					id: 44,
					product_name: "HARPOON RGB PRO FPS/MOBA Gaming Mouse",
					product_desc:
						"The NIGHTSABRE RGB Wireless Gaming Mouse offers robust performance, making it ideal for FPS, MOBA, Battle Royale, and more with its sturdy and symmetric design. It features 11 customizable buttons, including a tilt scroll wheel, for tailored gameplay. Its CORSAIR MARKSMAN optical sensor ensures precision with a 26,000 DPI, 650 IPS tracking, and up to 50G acceleration. The mouse boasts up to 100 hours of battery life on a single charge, with a rapid recharge that provides 20 hours of gameplay from just a 15-minute charge. Enhance your gaming aesthetics with its dynamic seven-zone RGB backlighting, customizable through iCUE.",
					product_price: "2600000",
					brand_id: 4,
					category_id: 1,
					weight: 80,
				},
				{
					id: 45,
					product_name:
						"K65 PRO Mini RGB 65 Percent Optical-Mechanical Wired Gaming Keyboard",
					product_desc:
						"The K65 PRO Mini RGB is a 65% wired gaming keyboard with a compact layout that includes essential arrow and utility keys, enhanced with convenient secondary functions. It employs CORSAIR OPX optical-mechanical switches, ensuring smooth and responsive keystrokes durable up to 150 million presses. With CORSAIR AXON Hyper-Processing Technology, this keyboard delivers inputs up to 8x faster than typical gaming keyboards and can display up to 20 RGB lighting layers. Two layers of sound dampening provide a gratifying typing experience. The package includes the K65 PRO MINI RGB keyboard, a detachable USB Type-C to Type-A cable, a radiant spacebar, and safety information.",
					product_price: "2000000",
					brand_id: 4,
					category_id: 2,
					weight: 600,
				},
				{
					id: 46,
					product_name:
						"K70 CORE RGB Mechanical Gaming Keyboard — Steel Grey",
					product_desc:
						"The CORSAIR K70 CORE RGB is a full-size mechanical gaming keyboard in gray, sporting vibrant RGB lighting. With wired connectivity using a USB Type A (USB 3.0 Gen2) and a 6-foot detachable cable, it ensures quick response times. It's designed for gaming, featuring linear key switches that require a 1.9mm actuation distance and 45g of force. The keyboard offers 104 keys, including dedicated macro and multimedia keys. It can store up to five memory profiles, uses ABS for keycap material, and supports full-key rollover. Notably, it doesn't come with a touchpad or palm rest.",
					product_price: "1500000",
					brand_id: 4,
					category_id: 2,
					weight: 600,
				},
				{
					id: 47,
					product_name: "K55 RGB PRO Gaming Keyboard",
					product_desc:
						"The CORSAIR K55 RGB Pro is a full-size wired gaming keyboard in black, featuring vibrant RGB lighting. Designed for gaming with a tactile feel from its membrane keyboard technology, it provides quick response times through its wired USB Type A (USB 2.0 Gen1) connection and a non-detachable 6-foot cable. This keyboard boasts 110 keys, which include a numeric keypad, dedicated macro, and multimedia keys. It's made with ABS keycap material and supports 12-key rollover. Notably, it comes with a palm rest, is spill-resistant, and has Elgato Stream Deck software integration. It's compatible with Windows operating systems and offers plug and play operation.",
					product_price: "900000",
					brand_id: 4,
					category_id: 2,
					weight: 750,
				},
				{
					id: 48,
					product_name: "HS80 MAX WIRELESS Gaming Headset, White",
					product_desc:
						"The HS80 MAX Wireless Gaming Headset offers low-latency 2.4Ghz wireless audio with a 50ft range and twice the sound clarity of typical gaming headsets. It's also Bluetooth compatible, with multiplatform support for PC, Mac, PlayStation, and mobile devices. The battery can last up to 65 hours on 2.4GHz wireless or up to 130 hours with Bluetooth, though usage with RGB lighting reduces this. It boasts memory foam ear pads, a cloth fabric finish, and a floating headband design for maximum comfort, reinforced with lightweight aluminum for durability. The package includes the headset in white, a wireless USB receiver, a USB charging cable, and other essential documents.",
					product_price: "3000000",
					brand_id: 4,
					category_id: 4,
					weight: 300,
				},
				{
					id: 49,
					product_name: "HS80 MAX WIRELESS Gaming Headset, red",
					product_desc:
						"The HS80 MAX Wireless Gaming Headset offers low-latency 2.4Ghz wireless audio with a 50ft range and twice the sound clarity of typical gaming headsets. It's also Bluetooth compatible, with multiplatform support for PC, Mac, PlayStation, and mobile devices. The battery can last up to 65 hours on 2.4GHz wireless or up to 130 hours with Bluetooth, though usage with RGB lighting reduces this. It boasts memory foam ear pads, a cloth fabric finish, and a floating headband design for maximum comfort, reinforced with lightweight aluminum for durability. The package includes the headset in white, a wireless USB receiver, a USB charging cable, and other essential documents.",
					product_price: "2800000",
					brand_id: 4,
					category_id: 4,
					weight: 310,
				},
				{
					id: 50,
					product_name: "HS55 STEREO Wired Gaming Headset",
					product_desc:
						"The HS55 Stereo Gaming Headset is designed for all-day gaming comfort, featuring adjustable memory foam ear cups, a lightweight build at just 273g, and an adaptable headband. It boasts 50mm neodymium drivers for impressive audio quality and supports Tempest 3D AudioTech for the PS5. The headset also has an omni-directional microphone with a flip-to-mute feature and is Discord-certified for clear communication. You can use it on various platforms, including PC, Mac, PlayStation, Xbox, Nintendo Switch, and mobiles, thanks to a 3.5mm connector and a Y-cable adapter for enhanced PC compatibility.",
					product_price: "1200000",
					brand_id: 4,
					category_id: 4,
					weight: 350,
				},
				{
					id: 51,
					product_name:
						"MM200 PRO Premium Spill-Proof Cloth Gaming Mouse Pad — Heavy XL, Black",
					product_desc:
						"The MM200 PRO is a premium gaming mouse pad designed for durability and performance. It features a spill-proof and stain-resistant surface, ensuring easy clean-ups after accidents. With a micro-weave fabric, the mouse pad provides a smooth glide for faster mouse movements. It's extra thick at 6mm, offering cushioned comfort for extended gaming, and boasts a generous size of 450mm x 400mm. Additionally, its anti-skid rubber base ensures the pad remains stable during intense gameplay.",
					product_price: "500000",
					brand_id: 4,
					category_id: 6,
					weight: 100,
				},
				{
					id: 52,
					product_name:
						"MM200 PRO Premium Spill-Proof Cloth Gaming Mouse Pad — Heavy XL, Black",
					product_desc:
						"The MM200 PRO is a premium gaming mouse pad designed for durability and performance. It features a spill-proof and stain-resistant surface, ensuring easy clean-ups after accidents. With a micro-weave fabric, the mouse pad provides a smooth glide for faster mouse movements.A huge 930mm x 400mm (36.6” x 15.7”) surface provides ample room for your gaming mouse, keyboard, and more, while 4mm-thick plush rubber construction provides the comfort to play for hours. Additionally, its anti-skid rubber base ensures the pad remains stable during intense gameplay.",
					product_price: "800000",
					brand_id: 4,
					category_id: 6,
					weight: 100,
				},
				{
					id: 53,
					product_name: "MM150 Ultra-Thin Gaming Mouse Pad – Medium",
					product_desc:
						"The MM150 is an ultra-thin gaming mouse pad designed for a seamless gaming experience. Its 0.5 mm thickness keeps your mouse almost flush with your desk on its 350 x 260 mm surface. Made with a tear-resistant polycarbonate surface, it's built to withstand daily use. Plus, its anti-skid silicone base ensures stability during intense gaming, and the wear-resistant graphics keep your setup looking stylish and fresh.",
					product_price: "850000",
					brand_id: 4,
					category_id: 6,
					weight: 100,
				},
				{
					id: 54,
					product_name: "Fantech Mouse Gaming X9 THOR Standart Macro",
					product_desc:
						"The X9 mouse offers 12 adjustable DPI levels from 200 to 4800, with up to 6 savable gears. Its ergonomic design fits comfortably in your hand, reducing strain and making it ideal for long gaming sessions. Enhanced with Chroma RGB backlighting and customizable settings using Fantech X9 software, this mouse is durable with a 10-million-click lifespan and a 6-foot braided cable. Compatible with Windows PC 7/8/10/XP and more, it's perfect for both beginners and seasoned gamers. Should you have any questions, we're here to help, just reach out to us.",
					product_price: "99000",
					brand_id: 5,
					category_id: 1,
					weight: 281,
				},
				{
					id: 55,
					product_name: "Fantech Mouse Gaming RHASTA II G13",
					product_desc:
						"ADVANCED GAMING SENSOR Equipped with an advanced gaming sensor, with up to 2,400 DPI that can be adjusted quickly. Make the right moves in any game situation. RGB ILLUMINATION With RGB Lighting, it will make your gaming time more vibrant as you light up your opponents. Anti-Slip Grip Special textured plastic anti-slip side grips keep the RhastaII G13 firmly in your hand and increase its durability.",
					product_price: "89000",
					brand_id: 5,
					category_id: 1,
					weight: 200,
				},
				{
					id: 56,
					product_name: "FANTECH Helios UX3 Wired RGB Gaming Mouse",
					product_desc:
						"The FANTECH Helios UX3 is a wired gaming mouse equipped with a top-notch PixArt 3389 optical sensor, offering precision tracking from 16,000 DPI down to 400 DPI. This mouse features six customizable buttons, with the ability to save up to 3 profiles, including advanced settings like left-click scripts. Its symmetrical design suits both palm and claw grips, and the mouse's shape promotes easy lifting. It weighs just 69g and boasts a flexible cable, giving users near-wireless freedom. The mouse lights up with 16.8 million RGB colors across three zones and offers 10 lighting effects. The package includes the mouse, additional skates, a user manual, and comes with a 1-year warranty.",
					product_price: "150000",
					brand_id: 5,
					category_id: 1,
					weight: 69,
				},
				{
					id: 57,
					product_name: "FANTECH Maxfit70 MK911",
					product_desc:
						"The MAXFIT70 keyboard offers a retro typing feel with its transparent upper case. It features a unique programmable encoder knob that, besides volume control, can be adjusted for other tasks like scrolling or changing music. The hot-swappable switch feature facilitates easy installation and switch replacement. With its tri-mode connection, it supports strikespeed wireless, Bluetooth, and wired connections, and can be linked to up to five devices. Notably, it's the first local keyboard to provide multiple mounting styles. You can experience a bouncy typing feel with its gasket mounting style, or opt for the top mounting style for a mix of stiffness and bounce. It offers two switch options: Maxfit Milky Brown and Maxfit Yellow. Lastly, it incorporates a USB Type-C port using a daughter board, minimizing potential damage from typing and ensuring a comfortable typing experience.",
					product_price: "999000",
					brand_id: 5,
					category_id: 2,
					weight: 700,
				},
				{
					id: 58,
					product_name: "Fantech K801 Keyboard Numeric",
					product_desc:
						"The Fantech Numeric Keyboard Office K801, also known as FTK801, is a wired numeric keypad specifically designed for office laptops or for those in need of a practical and compact additional NumPad.",
					product_price: "49000",
					brand_id: 5,
					category_id: 2,
					weight: 100,
				},
				{
					id: 59,
					product_name:
						"Fantech ATOM96 MK890 RGB Keyboard Gaming Mechanical Full Size",
					product_desc:
						"The Fantech Numeric Keyboard Office K801, also known as FTK801, is a wired numeric keypad specifically designed for office laptops or for those in need of a practical and compact additional NumPad.",
					product_price: "279000",
					brand_id: 5,
					category_id: 2,
					weight: 720,
				},
				{
					id: 60,
					product_name:
						"Fantech Gamepad Wireless Hall Effect NOVA WGP14",
					product_desc:
						"The Fantech Numeric Keyboard Office K801, also known as FTK801, is a wired numeric keypad specifically designed for office laptops or for those in need of a practical and compact additional NumPad.",
					product_price: "279000",
					brand_id: 5,
					category_id: 3,
					weight: 253,
				},
				{
					id: 61,
					product_name:
						"Fantech REVOLVER GP12 Gaming Controller Gamepad Joystick USB",
					product_desc:
						"The REVOLVER GP12 is a dedicated gaming controller designed for both PC and PS3 platforms. Here's a consolidated description: The REVOLVER GP12 is a dynamic gaming controller, tailor-made for PC and PS3 enthusiasts. What sets it apart is its vibration feature, enhancing the immersive experience of gameplay. This plug & play controller ensures easy installation and immediate gameplay without the need for intricate setups. With its familiar layout, players can effortlessly transition into using the GP12, especially if they've used other mainstream controllers. Furthermore, its design emphasizes ergonomics. The comfortable grip ensures that extended gaming sessions remain enjoyable and free from hand fatigue.",
					product_price: "165000",
					brand_id: 5,
					category_id: 3,
					weight: 170,
				},
				{
					id: 62,
					product_name: "Fantech SHOOTER GP11",
					product_desc:
						"Introducing the SHOOTER GP11 Gaming Controller, specially designed for both PC and PS3 gaming platforms. Apart from its vibration feature that elevates the gameplay experience, the GP11 ensures hassle-free connections through its plug & play design. Designed with the esports professional in mind, the SHOOTER GP11 boasts of ULTIMATE CONTROL. It’s not just about the gameplay; it's about having a controller that melds seamlessly with the player's instincts. To achieve this, the GP11 has been optimized for comfort and integrated with a plethora of advanced features. For those keen on aesthetics, it comes in a sleek black color. Its top cover is crafted from steel with a magnetic PVC filter, ensuring durability. The front panel is made from sturdy plastic while the left panel flaunts a tempered glass finish, offering a sneak peek into your gaming rig. The right panel, however, is made from steel. One of the notable features is the inclusion of a dust filter at the bottom. The chassis is constructed from SPCC 0.45mm in a black finish. Its input/output panel is equipped with a 3.5mm audio jack, a 3.5mm mic jack, an RGB controller, a USB 2.0 port, and a USB 3.0 port. The SHOOTER GP11 supports a bottom-mounted ATX power supply, inclusive of a PSU cover. For those looking to further customize, it can house multiple fans, though they are not included.",
					product_price: "350000",
					brand_id: 5,
					category_id: 3,
					weight: 280,
				},
				{
					id: 63,
					product_name: "Fantech SHOOTER GP11",
					product_desc:
						"Introducing the SHOOTER GP11 Gaming Controller, specially designed for both PC and PS3 gaming platforms. Apart from its vibration feature that elevates the gameplay experience, the GP11 ensures hassle-free connections through its plug & play design. Designed with the esports professional in mind, the SHOOTER GP11 boasts of ULTIMATE CONTROL. It’s not just about the gameplay; it's about having a controller that melds seamlessly with the player's instincts. To achieve this, the GP11 has been optimized for comfort and integrated with a plethora of advanced features. For those keen on aesthetics, it comes in a sleek black color. Its top cover is crafted from steel with a magnetic PVC filter, ensuring durability. The front panel is made from sturdy plastic while the left panel flaunts a tempered glass finish, offering a sneak peek into your gaming rig. The right panel, however, is made from steel. One of the notable features is the inclusion of a dust filter at the bottom. The chassis is constructed from SPCC 0.45mm in a black finish. Its input/output panel is equipped with a 3.5mm audio jack, a 3.5mm mic jack, an RGB controller, a USB 2.0 port, and a USB 3.0 port. The SHOOTER GP11 supports a bottom-mounted ATX power supply, inclusive of a PSU cover. For those looking to further customize, it can house multiple fans, though they are not included.",
					product_price: "350000",
					brand_id: 5,
					category_id: 3,
					weight: 600,
				},
				{
					id: 64,
					product_name: "Fantech ATO MP905 DESK MAT (AQUA)",
					product_desc:
						"Introducing the ATO MP905 Japanese Art Desk Mat in Aqua: a sublime fusion of form and function. Drawing inspiration from the tranquil simplicity of Japanese minimalist designs, this desk mat is not just a treat for the eyes but also exceptionally functional. Its surface, water-proof and silky smooth, ensures that accidental spills won't be a cause for panic and offers a frictionless glide for your devices. With dimensions of 900 x 400 x 4mm, it provides ample space for your keyboard, mouse, and other essentials.",
					product_price: "270000",
					brand_id: 5,
					category_id: 6,
					weight: 600,
				},
				{
					id: 65,
					product_name: "Fantech MP64 XL BASIC",
					product_desc:
						"Introducing the MP64 XL Basic Desk Mat: the perfect blend of design and functionality. This extra-large desk mat, sized at a generous 900 x 400 x 4mm, ensures you have ample space for your keyboard, mouse, and other essential accessories. Whether you're engaged in intensive gaming sessions or tackling crucial work assignments, this mat provides a stable foundation for your devices. Its surface isn't just expansive but is also crafted with a water-proof and silky-smooth finish, ensuring both protection from accidental spills and a seamless glide for your devices. This combination ensures an optimum experience, be it for work or play.",
					product_price: "180000",
					brand_id: 5,
					category_id: 6,
					weight: 600,
				},
				{
					id: 66,
					product_name:
						"Fantech ATO GEO Deskmat MP905 GE01 Mousepad XL",
					product_desc:
						"Presenting the ATO GEO Series Desk Mat (MP905 GE01) – where impeccable design meets performance. The ATO GEO Series Desk Mat is not just about size, though its expansive 900 x 400 x 4mm dimensions ensure ample space for all your devices. It's about optimizing your experience. Whether you’re an avid gamer or a professional seeking precision, this mat caters to both speed and control. Its surface has been meticulously crafted to provide a balanced platform, allowing swift mouse movements while retaining enough resistance for precise control.",
					product_price: "270000",
					brand_id: 5,
					category_id: 6,
					weight: 600,
				},
				{
					id: 67,
					product_name:
						"Monitor AOC Gaming 24G2Z 24 inch IPS 1080 240Hz 0.5ms",
					product_desc:
						"The AOC 24G2Z is a 23.8-inch Full HD gaming monitor with a rapid 0.5ms response time and 240Hz refresh rate. It boasts an IPS panel for wide viewing angles, supports multiple color gamuts for accurate color representation, and offers a dynamic contrast ratio of 80 million:1. Its ergonomic stand provides tilt, swivel, rotate, and height adjustments, and it's equipped with HDMI 2.0 and DisplayPort 1.2 ports for connectivity. Ideal for both gaming and professional tasks.",
					product_price: "3600000",
					brand_id: 6,
					category_id: 5,
					weight: 5000,
				},
				{
					id: 68,
					product_name:
						"Monitor AOC 24B1XH2 LED Slim 24 inch 1080 IPS 100Hz",
					product_desc:
						"The AOC 24B1XH2 is a sleek 23.8-inch Full HD IPS monitor with a 100Hz refresh rate and near-borderless design, allowing for seamless multi-monitor setups. With a 1920x1080 resolution, it offers wide 178° viewing angles, a rapid 4ms response time, and a contrast ratio of 20 million:1. It supports HDMI at 100Hz and VGA at 60Hz inputs and boasts a brightness of 250 cd/m². This monitor provides vibrant visuals with 16.7 million colors and covers 72% of the NTSC color gamut.",
					product_price: "1800000",
					brand_id: 6,
					category_id: 5,
					weight: 5000,
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("products", null, {});
	},
};
