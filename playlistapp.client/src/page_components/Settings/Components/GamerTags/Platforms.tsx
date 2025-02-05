export interface Platform {
  id: number;
  name: string;
  logoURL: string;
}

const platforms: Platform[] = [
  { id: 3, name: "Epic Games", logoURL: "" },
  { id: 130, name: "Nintendo", logoURL: "" },
  { id: 11, name: "Xbox", logoURL: "" },
  { id: 7, name: "PlayStation", logoURL: "" },
  { id: 163, name: "Steam", logoURL: "" },
];

export default platforms;
