type Candidate = {
  image: string;
  candidate: string;
  vice: string;
  party: string;
  percentage: string;
  votes: string;
};

const candidates: Candidate[] = [
  {
    image: "https://picsum.photos/id/237/200/300",
    candidate: "Jiji Ping Png",
    vice: "Xinguilingui",
    party: "PCC",
    percentage: "35.2%",
    votes: "3,200,000",
  },
  {
    image: "https://picsum.photos/id/444/200/300",
    candidate: "Vladimir Putin",
    vice: "Zelensky",
    party: "ABC",
    percentage: "28.1%",
    votes: "2,550,000",
  },
  {
    image: "https://picsum.photos/id/398/200/300",
    candidate: "Lulão da massa",
    vice: "Xuxu",
    party: "DEF",
    percentage: "18.4%",
    votes: "1,670,000",
  },
  {
    image: "https://picsum.photos/id/577/200/300",
    candidate: "Biden",
    vice: "Gagá",
    party: "GHI",
    percentage: "12.3%",
    votes: "1,120,000",
  },
  {
    image: "https://picsum.photos/id/610/200/300",
    candidate: "Trump",
    vice: "Bolsonaro",
    party: "JKL",
    percentage: "6.0%",
    votes: "540,000",
  },
];

export function getCandidates() {
  return candidates;
}
