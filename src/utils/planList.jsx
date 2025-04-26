import React from "react";

const planList = {
  mobile: {
    "Monthly price": "N2,200",
    "Video and sound quality": "Fair",
    Resolution: "480p",
    "Supported devices": "Mobile phone, tablet",
    "Devices your household can watch at the same time": 1,
    "Downloaded devices": 1,
    selected: "Mobile",
    pixel: "480p",
    // bg: "#160353",
  },
  basic: {
    "Monthly price": "N3,500",
    "Video and sound quality": "Good",
    Resolution: "720 (HD)",
    "Supported devices": "TV, computer, mobile phone, tablet",
    "Devices your household can watch at the same time": 1,
    "Downloaded devices": 1,
    selected: "Basic",
    pixel: "720p",
    // bg: "#250258",
    // bg: "#360258",
  },

  standard: {
    "Monthly price": "N5,500",
    "Video and sound quality": "Great",
    Resolution: "1080p (Full HD)",
    "Supported devices": "TV, computer, mobile phone, tablet",
    "Devices your household can watch at the same time": 2,
    "Downloaded devices": 2,
    selected: "Standard",
    pixel: "1080p",
    // bg: "#3a1639",
  },
  premium: {
    "Monthly price": "N7,000",
    "Video and sound quality": "Best",
    Resolution: "4K (Ultra HD) + HDR",
    "Spatial audio (Immersive sound)": "Included",
    "Supported devices": "TV, computer, mobile phone, tablet",
    "Devices your household can watch at the same time": 4,
    "Downloaded devices": 6,
    selected: "Premium",
    pixel: "4K + HDR",
    // bg: "#950779",
  },
};

export const planPixel = {};

export default planList;
