import React, { useEffect, useState } from 'react';

const InputSelect = () => {
	const [audioDevices, setDevices] = useState([]);

	useEffect(() => {
		(async () => {
			const devices = await navigator.mediaDevices.enumerateDevices();

			const audioInput = devices.filter(
				(device) => device.kind === 'audioinput'
			);

			setDevices(audioInput);
		})();
	}, []);

	return (
		<div className="w-75 mx-auto">
			<label htmlFor="inputSource">Select Input: </label>
			<select name="inputSource" id="inputSource">
				{audioDevices.map((device, index) => (
					<option key={index}>{device.label}</option>
				))}
			</select>
		</div>
	);
};

export default InputSelect;
