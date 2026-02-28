import React, { useRef, useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }) => {
	const [isSplitting, setIsSplitting] = useState(false);
	const videoRef = useRef(null);

	useEffect(() => {
		const video = videoRef.current;
		if (video) {
			// Start at normal speed
			video.playbackRate = 1.0;

			// Ensure video plays
			video.play().catch(e => console.error("Video play failed", e));

			const handleTimeUpdate = () => {
				// Change speed halfway through
				if (video.duration && video.currentTime > video.duration / 4) {
					// FAST FORWARD SPEED (Adjust this value: 2.0 = 2x, 3.0 = 3x, etc.)
					video.playbackRate = 2.0;
				}
			};

			const handleEnded = () => {
				setIsSplitting(true);
				// Wait for animation to finish before removing
				setTimeout(() => {
					if (onComplete) onComplete();
				}, 1500); // 1.5s matches css animation duration
			};

			video.addEventListener("timeupdate", handleTimeUpdate);
			video.addEventListener("ended", handleEnded);

			return () => {
				video.removeEventListener("timeupdate", handleTimeUpdate);
				video.removeEventListener("ended", handleEnded);
			};
		}
	}, [onComplete]);

	return (
		<div className={`loading-screen fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black ${isSplitting ? "splitting" : ""}`}>
			{!isSplitting && (
				<video
					ref={videoRef}
					className="w-full h-full max-w-none object-cover"
					muted
					autoPlay
					playsInline
					src="/assets/intro-video.mov"
				/>
			)}
		</div>
	);
};

export default LoadingScreen;
