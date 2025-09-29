// views/VideoCall.jsx
import React, { useEffect, useRef } from "react";

const VideoCall = () => {
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: "MindMendTherapyRoom" + Date.now(), // Unique room
      parentNode: jitsiContainerRef.current,
      width: "100%",
      height: 600,
      userInfo: {
        displayName: JSON.parse(localStorage.getItem("user"))?.name || "Therapist"
      }
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => api?.dispose?.(); // Clean up on component unmount
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-purple-700">Live Therapy Session</h2>
      <div ref={jitsiContainerRef} />
    </div>
  );
};

export default VideoCall;
