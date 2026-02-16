const names = [
  "Rosaline","Claudia Grey","Rose Mary","Robinson","Magdalene",
  "Michael","Richard","Jane","Mark","Ann",
  "Madelyn","Alex","Sam","Daniel","Sophia",
  "Ethan","Olivia","Liam","Isabella","Noah"
];

const roles = ["Singer","Composer","Songwriter","DJ","Rapper","Vocalist",
  "Instrumentalist","Producer","Audio Engineer","Studio Musician","Musician",
  "Choreographer","Dancer","Instructor","Freestyle","Classical",
  "Hip Hop","Contemporary","Ballet","Crew Member","Director",
  "Actor","Actress","Assistant Director","Editor",
  "Script Writer","Dialogue Writer","Executive Producer","Art Director",
  "Costume Designer","Makeup Artist","VFX Artist"
];

const genres = ["Pop","Hiphop","EDM","World","Jazz","Folk",
  "R & B","Blues","Country","Audio Engineer","Studio Musician","Musician","Classical","Rock"
];

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

    artists.push({
      id: i + 1,
      name: names[i],
      category:categories[Math.floor(Math.random() * categories.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      genres: getRandomItems(genres, 4),
      city: cities[Math.floor(Math.random() * cities.length)],
      videoCount: Math.floor(Math.random() * 10) + 1,
      age:Math.floor(Math.floor(Math.random() * 56) + 15),
      gender:Math.floor(Math.random()*2)==0?"Male":"Female",
      pickOut: pickOut, 
      contact:  contacts[Math.floor(Math.random() * contacts.length)],
      time: times[ Math.floor(Math.random() * times.length)],
      goal:  getRandomItems(goals, Math.floor(Math.random() * 3) + 1),
      work:  works[Math.floor(Math.random() * works.length)],
      description:descriptions[Math.floor(Math.random()*descriptions.length)],
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
