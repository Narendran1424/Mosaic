const names = [
  "Rosaline","Claudia Grey","Rose Mary","Robinson","Magdalene",
  "Michael","Richard","Jane","Mark","Ann",
  "Madelyn","Alex","Sam","Daniel","Sophia",
  "Ethan","Olivia","Liam","Isabella","Noah"
];

const roles = {
  music: [
    "Singer","Composer","Songwriter","DJ","Rapper","Vocalist",
    "Instrumentalist","Producer","Audio Engineer","Studio Musician","Musician","Other"
  ],
  dance: [
    "Choreographer","Dancer","Instructor","Freestyle",
    "Classical","Hip Hop","Contemporary","Ballet","Crew Member","Director","Other"
  ],
  film: [
    "Actor","Actress","Director","Assistant Director","Editor",
    "Script Writer","Dialogue Writer","Producer","Executive Producer","Art Director",
    "Costume Designer","Makeup Artist","VFX Artist","Other"
  ]
};

const genres = {
  music: [
  "Pop","Hiphop","EDM","World","Jazz","Folk",
  "R & B","Blues","Country","Audio Engineer","Studio Musician","Musician","Classical","Rock" 
],

    dance: [
    "Ballet Dancer","Contemporary","Hip Hop","Kathak",
    "Bharatanatyam","Salsa","Jazz Dance","Folk Dance",
    "Choreographer","Freestyle","Breakdance","Kuchipudi"
  ],

  film: [
    "Actor","Director","Producer","Cinematographer",
    "Screenwriter","Editor","Playback Singer",
    "Stunt Artist","Art Director","Costume Designer",
    "Film Composer","Assistant Director"
  ]
};

const cities = [
  "New York","London","Paris","Tokyo","Sydney","Dubai","Singapore",
  "Toronto","Berlin","Rome","Madrid","Mumbai","Chennai","Bengaluru",
  "Hyderabad","Bangkok","Kuala Lumpur","Istanbul","Los Angeles","Cape Town"
];

const descriptions = [
  "A passionate performer with years of live stage experience, blending technical skill with emotional depth in every performance.",

  "An innovative creative artist known for experimenting with modern sounds while staying rooted in classical foundations.",

  "Dedicated to crafting meaningful musical experiences, collaborating with diverse talents across genres and cultures.",

  "Energetic and versatile, bringing originality and strong stage presence to every project and performance.",

  "Focused on growth and artistic excellence, constantly refining skills while inspiring audiences through authentic expression."
];

const categories=["Music","Dance","Film"]

function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const pickOut=[Math.floor(Math.random()*91)+10,Math.floor(Math.random()*91)+10, Math.floor(Math.random()*91)+10, Math.floor(Math.random()*91)+10,Math.floor(Math.random()*91)+10]

const contacts=["messenger","whatsapp","phone","mail"]; 
const times=["early bird","night","flexible","day and night"]; 
const goals=["Learning something new","Make money","Find a proffessional group/band","Improve skills","Get more exposure","Make friends"]; 
const works=["In person/in studio","Asynchronous","My self","Online zoom call"]


const questions = [
  "I'm looking for..",
  'We"ll get along if...',
  "How do you make people laugh?",
  "Working with me is like...?",
  "What is your example of your project?",
  "Can you share examples of past creative collaborations that were successful?",
  "What are your favorite books, music, movies or art that inspire your creativity?"
];

const answers = [
  "Creative collaborators who are open-minded, reliable, and passionate about pushing artistic boundaries.",
  
  "You value honesty, clear communication, and enjoy experimenting with new ideas without fear of failure.",
  
  "I mix clever wordplay with relatable real-life moments and a bit of unexpected humor.",
  
  "A creative jam session — structured when needed, but always open to spontaneous inspiration.",
  
  "One of my recent projects involved blending classical elements with modern production to create a cross-genre performance piece.",
  
  "I collaborated with a small indie team to produce a live showcase event that combined music, dance, and visual storytelling.",
  
  "I’m inspired by soulful music, thought-provoking films, and books that explore human emotion and creativity."
];


function getRandomPersonality(questions, answers, count = 3) {
  const indices = [...Array(questions.length).keys()]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);

  return indices.map(i => ({
    question: questions[i],
    answer: answers[i]
  }));
}


function generateArtists() {
  const artists = [];

  for (let i = 0; i < 20; i++) {

    const pickOut = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 91) + 10
    );

    const categoryKeys = Object.keys(roles); 
    const categoryKey  = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];

    const category = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);

    const categoryRoles = roles[categoryKey];
    const role = categoryRoles[Math.floor(Math.random() * categoryRoles.length)];

    artists.push({
    id: i + 1,
    name: names[i],
    category,
    role,
    genres: getRandomItems(genres[categoryKey], 4),  
    city: cities[Math.floor(Math.random() * cities.length)],
    videoCount: Math.floor(Math.random() * 10) + 1,
    age: Math.floor(Math.random() * 56) + 15,
    gender: Math.floor(Math.random() * 2) === 0 ? "Male" : "Female",
    pickOut,
    contact: contacts[Math.floor(Math.random() * contacts.length)],
    time: times[Math.floor(Math.random() * times.length)],
    goal: getRandomItems(goals, Math.floor(Math.random() * 3) + 1),
    work: works[Math.floor(Math.random() * works.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    personality: getRandomPersonality(questions, answers, 3)
});
  }

  return artists;
}


let artists = JSON.parse(sessionStorage.getItem("artists"));

if (!artists) {
  artists = generateArtists();
  sessionStorage.setItem("artists", JSON.stringify(artists));
}

//Generate projects
const titles=["Looking for Producer For Hip Hop Track","R&B Singer/Songwriter Wanted","Visual Effects Artists Wanted for Sci-Fi Film","Hiring Music Producer for EDM Collaboration.",
  "Graphic Designer Needed for Album Artwork","Makeup Artist Wanted for Music Video","Choreographer Wanted for Dance Performance","Auditioning Dancers for Music Video Choreography","Voice Actor Wanted for Animated Series",
  "Art Designer Wanted for Advertising Campaign","Live Concert Sound Engineer Wanted","Indie Film Director Needed","ScriptWriter Needed for Podcast Series",
  "Film Editor Needed for Documentary Project" ]
const contents=["I'm a Hip Hop artist looking for a Producer for my next EP. Want Someone with inspiration From J.Cole/Timbaland.",
  "Harmonize with us and create magic! We're looking for a dynamic singer/songwriter to collaborate on a soulful R&B track.",
  "Elevate our film with stunning effects! Seeking a VFX artist to create visual magic for our sci-fi adventure","Join our team and be the beat behind the next EDM sensation! We're seeking a skilled music producer to collaborate on an electrifying EDM project",
  "Bring our music to life visually! Seeking a creative graphic designer to craft captivating album artwork","Set the stage with style! Hiring a makeup artist to bring our music video characters to life with captivating looks",
  "Choreograph the magic of movement! Seeking a talented choreographer to create captivating routines for our dance performance.","Step into the spotlight! We're holding auditions for talented dancers to choreograph in an upcoming music video.",
  "Capture the essence of style! Hiring a skilled photographer to shoot our latest fashion collection.","Design the future of advertising! Seeking an innovative art director to lead our next big campaign","Capture the essence of live music! Hiring a skilled sound engineer to ensure impeccable audio quality for our concert recording.",
  "Calling visionary filmmakers! We're searching for an experienced director to lead our indie short film project to cinematic greatness","Script the next big hit! Seeking a talented scriptwriter to pen captivating stories for our podcast series","Shape the narrativel Hiring a skilled film editor to assemble and refine our documentary project."]

  function generateTime() {
  let hour = Math.floor(Math.random() * 12) + 1;  
  let minute = Math.floor(Math.random() * 60);   
  const ampm = Math.random() < 0.5 ? "AM" : "PM";

  hour = hour.toString().padStart(2, "0");
  minute = minute.toString().padStart(2, "0");

  return `${formattedHour}:${formattedMinute} ${ampm}`;
}
  const descs = [
    "Singer","Composer","Songwriter","DJ","Rapper","Vocalist",
    "Instrumentalist","Producer","Audio Engineer","Studio Musician","Musician",
   "Choreographer","Dancer","Instructor","Freestyle",
    "Classical","Hip Hop","Contemporary","Ballet","Crew Member","Director",
    "Actor","Actress","Director","Assistant Director","Editor",
    "Script Writer","Dialogue Writer","Producer","Executive Producer","Art Director",
    "Costume Designer","Makeup Artist","VFX Artist","Other"
  ]

function generateProjects(){


  const projects=[];
  for (let i = 0; i < 20; i++) {

    const rand=Math.floor(Math.random()*titles.length)

    const shuffledRoles = [...descs].sort(() => 0.5 - Math.random());

    const skillCount = Math.floor(Math.random() * 4) + 1;

    const skill = shuffledRoles.slice(0, skillCount);
    
    projects.push({
      id:i+1,
      img:(i%12)+1,
      title:titles[i % titles.length],
      summary:contents[i % titles.length],
      name:names[rand],
      city:cities[rand],
      skills:skill,
      budget:Math.floor(Math.random()*801)+100,
      date:`${Math.floor(Math.random()*30)+1}/${Math.floor(Math.random()*12)+1}/${Math.floor(Math.random()*11)+2015}`,
      time:generateTime(),
    })
  }
  return projects;
}

let projects = JSON.parse(sessionStorage.getItem("projects"));

if (!projects) {
  projects = generateProjects();
  sessionStorage.setItem("projects", JSON.stringify(projects));
}
