export const withoutCardsEditorial = {
  headline: "Drinking Games Without Cards",
  title: "Drinking Games Without Cards — Easy Games for Groups",
  description: "Choose eight drinking games without a physical deck: clear group rules, materials, round endings and small optional sip rules, with alcohol-free play.",
  // Planned publication date. Reconfirm before deployment; this is not a live-release claim.
  datePublished: "2026-10-29",
};

export const withoutCardsGames = [
  {
    id: "never-have-i-ever", name: "Never Have I Ever", players: "3–10", materials: "None", style: "Personal stories, if volunteered",
    setup: "Sit where everyone can hear. Agree on topics to leave out, then choose a first reader. Each person thinks of something they have never done. Keep statements about everyday experiences rather than trying to expose someone else's private life.",
    play: "The reader says a statement, such as ‘Never have I ever missed my stop on a train.’ Anyone who has done it can raise a hand. A response is enough: stories are welcome only when volunteered. Move clockwise to a new reader after each statement. If nobody responds, simply move on. Anyone can pass on reading or responding without explaining why.",
    ending: "Finish after everyone has had one opportunity to read. Start another round only if the group wants one. If a statement is unclear, let the reader clarify it once; each person decides whether it applies to them.",
    sip: "After a statement, people who choose to acknowledge that experience may take one small optional sip. A hand signal or no response is equally valid; nobody checks who drank.",
  },
  {
    id: "truth-or-dare", name: "Truth or Dare", players: "3–8", materials: "None; phone optional", style: "Questions and light challenges",
    setup: "Choose a starting player and agree on boundaries. Leave dangerous tasks, physical contact and revealing someone else's information out. No cards are needed: the next person clockwise supplies a question or a short challenge.",
    play: "The active player chooses Truth or Dare. Their neighbour offers one prompt: ‘What harmless habit do your friends tease you about?’ or ‘Describe your day as a weather forecast.’ The player can answer, try the dare or pass. Keep dares achievable from your seat. If a prompt crosses a boundary, discard it without a debate. The active role moves clockwise whether the player participates or passes.",
    ending: "End when everyone has had a turn. There is no winner and no requirement to explain an answer. Agree together before starting another round.",
    sip: "At the end of the whole round, offer a small optional toast to everyone, regardless of their choices. Declining a question or dare never triggers drinking.",
  },
  {
    id: "most-likely-to", name: "Most Likely To", players: "4–10", materials: "None", style: "Group voting; use kind prompts",
    setup: "Form a circle and pick a first reader. Agree to use playful situations, not insults or sensitive assumptions. Everyone may sit out any vote. Choose whether pointing feels comfortable; saying a name works too.",
    play: "The reader asks, ‘Who is most likely to befriend a stranger's dog?’ Count ‘three, two, one’ together, then everyone who wants to vote points at one other player. Count the votes once. The person with the most votes is the group's pick. A tie stays a tie, with no runoff or forced explanation. The next reader clockwise supplies a new situation.",
    ending: "Stop after each person has offered one prompt. If a prompt makes someone uncomfortable, drop it and move to the next reader. There is no overall ranking to announce.",
    sip: "The group's pick may take one small optional sip. Tied players can each choose the same invitation. Vote counts never become quantities to drink.",
  },
  {
    id: "two-truths-and-a-lie", name: "Two Truths and a Lie", players: "3–8", materials: "None; notes optional", style: "Listen and guess",
    setup: "Give everyone a quiet minute to prepare two true statements and one invented statement about themselves. Notes on paper or a phone are optional. Choose a first speaker; they privately decide the order and label the statements A, B and C.",
    play: "The speaker reads all three before anyone guesses. For example: ‘A: I have slept in a tent. B: I can juggle. C: I once owned a rabbit.’ Each listener names the letter they think is the lie, without changing their answer after hearing others. The speaker reveals the invented statement. Nobody has to prove the truths or provide a longer story. The next person clockwise becomes speaker.",
    ending: "Finish when everyone has had an opportunity to speak. There is no elimination. If two statements turn out to be invented by mistake, cancel that turn and continue rather than arguing over points.",
    sip: "After the reveal, listeners who guessed incorrectly may take one small optional sip. Guessing has no other consequence, and sitting out is always fine.",
  },
  {
    id: "categories", name: "Categories", players: "3–10", materials: "None", style: "Wordplay without personal questions",
    setup: "Pick a first caller, who names a category with plenty of answers, such as things in a kitchen. Agree that answers must be recognisable examples, not invented names. Play clockwise and allow about five seconds of thinking time per turn.",
    play: "The caller gives the first answer: ‘kettle.’ The next player might say ‘spoon,’ then the next ‘oven.’ Each answer must be new within that round. A repeated answer, an answer outside the category or running out of thinking time ends the chain. Passing also ends the chain, with no penalty. For a disputed answer, accept it if someone can briefly explain the connection; if the group cannot agree, restart with a clearer category.",
    ending: "Reset all answers after a break in the chain. The next caller clockwise chooses a new category. Finish the game after three categories rather than keeping people out of later rounds.",
    sip: "Someone whose attempted answer repeats, misses the category or arrives too late may take one small optional sip. A voluntary pass never triggers the invitation.",
  },
  {
    id: "rhyme-round", name: "Rhyme Round", players: "3–8", materials: "None", style: "Spoken wordplay",
    setup: "The first caller chooses a short word with several rhymes, such as ‘light.’ Agree to use ordinary words rather than names or made-up words. Move clockwise, allowing about five seconds to think. Listen to sound, not spelling.",
    play: "The next person says ‘night,’ followed by ‘bright’ and ‘kite.’ Each word must rhyme with the original word and be new in this round. Reusing a word, offering a non-rhyme or running out of time ends the chain. Anyone may also pass. Accents can change what rhymes: if a pronunciation causes disagreement, accept it for this round and choose a less ambiguous starting word next time.",
    ending: "Start fresh with a new word from the next caller clockwise. Forget the previous round's used words. Stop after three starting words, or sooner if the group wants a different game.",
    sip: "A player who attempts a word but breaks the chain may take one small optional sip. Passing is separate and has no consequence.",
  },
  {
    id: "memory-chain", name: "Memory Chain", players: "3–8", materials: "None", style: "Cooperative recall",
    setup: "Sit in a circle. Choose a starter and a simple theme, such as packing for a picnic. Begin with single objects; everyone should be able to hear each contribution. Do not use a timer.",
    play: "The starter says, ‘I'm packing apples.’ The next player repeats apples and adds bread. The third repeats apples, bread and adds cheese. Continue clockwise, repeating the full list in order before adding exactly one new item. A missing item, changed order or repeated contribution is an error. Allow one group reminder per chain; if nobody remembers the sequence, reset instead of reconstructing it through an argument. A pass resets the chain without penalty.",
    ending: "Aim for eight items together. On reaching eight, celebrate and either finish or start a new chain with a ten-item target. After an uncorrected error, the next player starts a fresh list. Keep the target manageable rather than adding extra tasks.",
    sip: "After an attempted sequence has an uncorrected error, that player may take one small optional sip. Do not link sip size to the length of the list.",
  },
  {
    id: "medusa", name: "Medusa", players: "4–12", materials: "None; clear sightlines", style: "Eye contact, little talking",
    setup: "Sit or stand in a circle where everyone can see each other's faces without moving around. Choose a caller. This game relies on eye contact, so choose another game if that feels uncomfortable or is not accessible for someone.",
    play: "Everyone looks down. The caller says ‘three, two, one, look.’ Each participating player looks directly at one chosen person's face. If two people are looking at each other, they have a match and raise a hand. Looking at someone who chose a different person is not a match. Hold the choice briefly, then look down again; do not scan around for another target. If a match is uncertain, count neither person as matched.",
    ending: "Nobody is eliminated. Reset everyone's gaze down and repeat, changing the caller after each reveal. Stop after five reveals. Anyone can sit out a reveal or leave the game without giving a reason.",
    sip: "Players in a confirmed mutual match may each take one small optional sip before the next reveal. Stay at your own pace; sitting out never triggers drinking.",
  },
] as const;

export const withoutCardsFaqs = [
  { q: "Can we play without cards or dice?", a: "Yes. All eight core games here work without cards or dice. Optional notes can help with Two Truths and a Lie, and a phone can supply Truth or Dare prompts. Medusa needs clear sightlines between faces." },
  { q: "Which games suit a group that does not know each other well?", a: "Start with Categories, Rhyme Round or Memory Chain: they do not ask for personal disclosures. Use Most Likely To only when the group is comfortable voting about one another. Anyone can pass or suggest a different game." },
] as const;
