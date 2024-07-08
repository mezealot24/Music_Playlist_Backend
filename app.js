import express from "express";
import morgan from "morgan";

const playlist = [
	{ id: 1, song: "unstoppable", artist: "sia" },
	{ id: 2, song: "believer", artist: "imagine dragons" },
];

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("combinded"));

let songId = playlist.length;

// Task 1 : Create Middleware for handle GET All song
app.get("/songs", (req, res) => {
	res.json(playlist);
});

// Task 2 : Create Middleware for handle GET song by specific id
app.get("/songs/:id", (req, res) => {
	const songId = parseInt(req.params.id);
	const song = playlist.find((s) => s.id === songId);
	if (song) {
		res.json(song);
	} else {
		res.status(404).json({ message: "404 Song not found" });
	}
});

// Task 3 : Create Middleware for handle CREATE song
app.post("/songs", (req, res) => {
	const { song, artist } = req.body; // Destructuring object
	if (!song || !artist) {
		return res.status(400).json({ error: "Song and artist are required!!" });
	}

	const newSong = {
		id: ++songId,
		song: song,
		artist: artist,
	};

	playlist.push(newSong);

	res.json({
		message: "Song added successfully",
		playlist: playlist,
	});
});

// Task 4 : Create Middleware for handle DELETE song by specific id
app.delete("/songs/:id", (req, res) => {
	const songId = parseInt(req.params.id);
	const songIndex = playlist.findIndex((s) => s.id === songId);

	if (songIndex !== -1) {
		// เช็ค Error ถ้าไม่มีเพลงใน playlist (เมื่อใส่ index ที่ไม่มีใน array มันจะคืนค่ามา = '-1' )
		playlist.splice(songIndex, 1);
		res.json({ message: "Song deleted successfully" });
	} else {
		res.status(404).json({ message: "404 Song not found" });
	}
});

// Task 5 : Create Middleware for handle UPDATE song detail by specific id
app.patch("/songs/:id", (req, res) => {
	const songId = parseInt(req.params.id);
	const songIndex = playlist.findIndex((s) => s.id === songId);

	if (songIndex !== -1) {
		// เช็ค Error ถ้าไม่มีเพลงใน playlist (เมื่อใส่ index ที่ไม่มีใน array มันจะคืนค่ามา = '-1' )
		const { song, artist } = req.body; // Destructuring object ใน if เพื่อไม่ให้ดึง req.body โดยตรง
		if (song) {
			playlist[songIndex].song = song;
		}
		if (artist) {
			playlist[songIndex].artist = artist;
		}
		res.json({
			message: "Song updated successfully",
			song: playlist[songIndex],
		});
	} else {
		res.status(404).json({ message: "404 Song not found" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
