let tarotData = [];

fetch("tarot.json")
  .then(res => res.json())
  .then(data => tarotData = data);

async function drawCard() {
  const user = auth.currentUser;

  if (!user) {
    alert("Please login first");
    return;
  }

  const today = new Date().toISOString().slice(0,10);

  const docRef = db.collection("users").doc(user.uid);

  const doc = await docRef.get();

  if (doc.exists && doc.data().lastDraw === today) {
    document.getElementById("result").innerHTML =
      "You have already drawn today.";
    return;
  }

  const card = tarotData[Math.floor(Math.random() * tarotData.length)];

  document.getElementById("result").innerHTML =
    `<h2>${card.name}</h2>
     <p>${card.meaning}</p>
     <p>${card.desc}</p>`;

  await docRef.set({
    lastDraw: today,
    lastCard: card.name
  }, { merge: true });
}