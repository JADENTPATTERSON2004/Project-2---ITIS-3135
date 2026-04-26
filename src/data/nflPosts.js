export const nflPosts = [
  {
    id: 1,
    category: "Game Recap",
    title: "Bears Edge Rival in Thrilling Monday Night Showdown",
    excerpt: "Clutch plays and a fierce defensive front helped Chicago finish a statement win.",
    body:
      "Chicago leaned on a hard-hitting defense, timely third-down throws, and a late red-zone stand to close out a prime-time win. The offense did not need to be perfect because the defense kept flipping field position and forcing long possessions into punts.",
    author: "Patterhorn Staff",
    team: "Chicago Bears",
    date: "May 20, 2024",
    readTime: "5 min read",
    comments: [
      {
        name: "Maya",
        text: "That fourth-quarter stop felt like the whole game turning at once.",
      },
      {
        name: "Jordan",
        text: "The pass rush finally looked like it could take over when it mattered.",
      },
    ],
  },
  {
    id: 2,
    category: "Analysis",
    title: "Top 5 Defensive Players to Watch This Season",
    excerpt: "A breakdown of the most disruptive defenders who could tilt every matchup.",
    body:
      "Elite defenses are built on players who can erase a play before it develops. This watch list focuses on pass rush pressure, coverage range, tackling reliability, and how each player changes an opponent's game plan.",
    author: "Avery Brooks",
    team: "Seattle Seahawks",
    date: "May 19, 2024",
    readTime: "6 min read",
    comments: [
      {
        name: "Chris",
        text: "Love seeing defensive analysis get the spotlight for once.",
      },
    ],
  },
  {
    id: 3,
    category: "NFL News",
    title: "Free Agency Buzz: Biggest Moves So Far",
    excerpt: "Tracking the signings and trades that could reshape the playoff picture.",
    body:
      "The biggest free-agency wins are not always the loudest contracts. Depth signings, scheme fits, and smart veteran additions can matter just as much when injuries hit and November football starts separating contenders from hopefuls.",
    author: "Patterhorn Staff",
    team: "NFL",
    date: "May 18, 2024",
    readTime: "4 min read",
    comments: [],
  },
  {
    id: 4,
    category: "Film Room",
    title: "How Seattle's Secondary Can Control Tempo",
    excerpt: "The Seahawks have the range and physicality to make quarterbacks hesitate.",
    body:
      "Seattle's defensive backs are at their best when the front and coverage work together. Press looks, late rotations, and clean tackling after the catch can shrink windows and force offenses into safer, shorter throws.",
    author: "Taylor Reed",
    team: "Seattle Seahawks",
    date: "May 17, 2024",
    readTime: "7 min read",
    comments: [],
  },
];

export const featuredPosts = nflPosts.slice(0, 3);
