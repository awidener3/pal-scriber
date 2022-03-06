import React from 'react';
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';

// Example from docs
const Dictaphone = () => {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}

	return (
		<div className="text-center">
			<p className="display-5">Microphone: {listening ? 'on' : 'off'}</p>
			{/* start listening, continuously */}
			<button
				className="btn btn-success m-2"
				onClick={() =>
					SpeechRecognition.startListening({ continuous: true })
				}
			>
				Start
			</button>
			{/* stop listening */}
			<button
				className="btn btn-danger m-2"
				onClick={SpeechRecognition.stopListening}
			>
				Stop
			</button>
			{/* reset button */}
			<button className="btn btn-primary m-2" onClick={resetTranscript}>
				Reset
			</button>
			{/* output of microphone */}
			<p>{transcript}</p>
		</div>
	);
};
export default Dictaphone;
