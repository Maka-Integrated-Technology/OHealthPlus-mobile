import { labAssets } from "../assets";
import type { Lab } from "../types";

export const labsData: Lab[] = [
  {
    id: "1",
    name: "Synlab Diagnostics",
    image: labAssets.images.synlab,
    rating: 4.8,
    distanceKm: 1.2,
    isOpenNow: true,
    closesAtLabel: "Closes 8:00 PM",
    waitTimeLabel: "Wait: 10 mins",
    offersHomeCollection: true,
    address: "144 Healthcare Ave, Medical District",
    about:
      "Premium accredited laboratory offering state-of-the-art diagnostics and rapid reporting with a focus on patient care.",
    services: ["Home Collection", "Digital Reports", "ISO Certified"],
    price: 1000,
  },
  {
    id: "2",
    name: "Synlab Diagnostics",
    image: labAssets.images.synlab,
    rating: 4.8,
    distanceKm: 1.2,
    isOpenNow: false,
    waitTimeLabel: "Wait: 10 mins",
    offersHomeCollection: false,
    address: "144 Healthcare Ave, Medical District",
    about:
      "Premium accredited laboratory offering state-of-the-art diagnostics and rapid reporting with a focus on patient care.",
    services: ["Digital Reports", "ISO Certified"],
    price: 1000,
  },
  {
    id: "3",
    name: "Synlab Diagnostics",
    image: labAssets.images.synlab,
    rating: 4.8,
    distanceKm: 1.2,
    isOpenNow: true,
    closesAtLabel: "Closes 8:00 PM",
    waitTimeLabel: "Wait: 10 mins",
    offersHomeCollection: true,
    address: "144 Healthcare Ave, Medical District",
    about:
      "Premium accredited laboratory offering state-of-the-art diagnostics and rapid reporting with a focus on patient care.",
    services: ["Home Collection", "Digital Reports", "ISO Certified"],
    price: 1000,
  },
];
