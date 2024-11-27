"use client";
import React, { useEffect } from "react";

const InstagramPosts = () => {
  // Array of Instagram post URLs
  const instagramPosts = [
    "https://www.instagram.com/p/DCHyQjCTKG6/",
    "https://www.instagram.com/p/DCHuI5GN_fc/",
    "https://www.instagram.com/p/DCFQmfOS22V/",
    "https://www.instagram.com/p/DBrFme8PklY/",
    "https://www.instagram.com/p/DBrFgN8PAct/",
    "https://www.instagram.com/p/DBrFb4hv87A/",
    "https://instagram.com/p/DBrFXmkPXRT/",
    "https://www.instagram.com/p/DBrFSCIv5Vo/",
    // Add more Instagram post URLs here
  ];

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Reload Instagram embeds whenever new posts are added
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="instagram-container"
      style={{
        height: "600px",
        overflowY: "auto",
        padding: "20px",
      }}
    >
      <div
        className="instagram-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
          width: "100%",
        }}
      >
        {instagramPosts.map((postUrl, index) => (
          <div key={index} className="instagram-post">
            <blockquote
              className="instagram-media"
              data-instgrm-captioned
              data-instgrm-permalink={postUrl}
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: "0",
                borderRadius: "3px",
                boxShadow:
                  "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                margin: "1px",
                maxWidth: "540px",
                minWidth: "326px",
                padding: "0",
                width: "99.375%",
              }}
            ></blockquote>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramPosts;
