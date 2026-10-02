// Published history stays fixed; modification dates record real editorial work.
export const drinkingGamesForTwoEditorial = {
  title: "Drinking Games for 2 — 10 Easy Games",
  headline: "10 Drinking Games for 2, With or Without Alcohol",
  description: "10 drinking games for 2 with no-equipment, card and dice options. Clear rules for friends or couples, with small optional sips and non-alcoholic alternatives.",
  datePublished: "2026-09-23" as string | null,
  dateModified: "2026-10-02",
};

export const drinkingGamesForTwoGames = [
  {
    id: "categories", name: "Categories", group: "without-cards",
    equipment: "Nothing. Pick a category you both know, such as pizza toppings or things in a kitchen.",
    play: "Alternate naming one example. Answers must fit the category and cannot repeat an earlier answer. Take your time. A repeat, an answer that does not fit, or running out of ideas ends the round. Either person can also pass to end it.",
    sip: "The person who misses may take one small sip as the round closes. Passing carries no penalty and never creates a sip you owe.",
    ending: "Play three categories, swapping who starts. Agree together on debatable answers. For an alcohol-free version, count how many examples you found together.",
  },
  {
    id: "rhyme-round", name: "Rhyme Round", group: "without-cards",
    equipment: "Nothing. Choose a word with several rhymes, such as light. Decide whether near rhymes count.",
    play: "Take turns adding a new rhyme: night, bright, kite. Repeating a word or breaking the rhyme ends that chain. There is no countdown, and a pass can end the round too.",
    sip: "If you break the rhyme or repeat a word, a small sip is optional before you choose a new starting word. A pass needs no explanation or drink.",
    ending: "Try three starting words, alternating who goes first. Turn your favorite chain into two silly lines of verse if you want a different finish.",
  },
  {
    id: "two-truths-and-a-lie", name: "Two Truths and a Lie", group: "without-cards",
    equipment: "Three everyday statements about yourself: two true and one invented. Use details you are comfortable sharing.",
    play: "Say all three statements. The other person may ask one question, then guesses the lie. Reveal which statement was invented and swap roles. You can replace a statement or pass instead of sharing anything personal.",
    sip: "An incorrect guess invites the guesser to take one small sip. A correct guess ends the turn without a sip invitation. Passing is separate from guessing and has no consequence.",
    ending: "Take three turns each. Food, trips and hobbies make useful themes, even if you know each other well. Stop after the reveal on the final turn.",
  },
  {
    id: "never-have-i-ever", name: "Never Have I Ever", group: "without-cards",
    equipment: "Nothing. Agree on light topics and choose who speaks first.",
    play: "Alternate statements beginning with Never have I ever. For example: Never have I ever baked bread. Each person can say whether it applies, offer a story, or pass. No one has to explain their answer.",
    sip: "If you have done the thing mentioned, you may take one small sip as your response. A nod or raised finger works instead. If it does not apply, move on; a pass never calls for a drink.",
    ending: "Try three statements each, then stop or switch games. Keep the topics about everyday experiences rather than secrets or uncomfortable disclosures.",
  },
  {
    id: "truth-or-dare", name: "Truth or Dare", group: "without-cards",
    equipment: "Agreed boundaries and three turns each. Questions and dares should be comfortable for both people.",
    play: "One person chooses Truth or Dare; the other offers a question or light challenge. Answer or try it, ask for another option, or pass without a penalty. Swap roles after each turn. An invented slogan for an object makes an easy creative dare.",
    sip: "After both people have had all three turns, you can each mark the end of the round with one small optional sip. This round-end toast happens regardless of answers or passes. Declining a truth or dare never triggers drinking.",
    ending: "Finish after six turns total, or stop sooner with no toast required. The sip invitation is separate from individual prompts and is not a do-the-dare-or-drink rule.",
  },
  {
    id: "would-you-rather", name: "Would You Rather Match", group: "without-cards",
    equipment: "Nothing. Think of two harmless options, such as a beach picnic or a movie night.",
    play: "Take turns offering a choice. Each person silently picks an option, then both say their choices together on a count of three. Discuss your reasons if you feel like it. Skip any question that makes either person uncomfortable.",
    sip: "Keep track of matching choices. If at least one choice matched during the round, you may each take one small sip in a closing toast. There is only one sip invitation for the whole round, even if every choice matched.",
    ending: "Ask three questions each, then compare how many choices matched. Different answers are conversation starters, not mistakes or reasons to drink.",
  },
  {
    id: "memory-chain", name: "Memory Chain", group: "without-cards",
    equipment: "Nothing. Start a pretend picnic list with one item, such as bread.",
    play: "The other person repeats the list and adds one item. Keep alternating, repeating everything in order before adding something new. If an item is forgotten or the order changes, the chain ends. You can pass at any point.",
    sip: "The person who loses the chain may take one small sip when it ends. Choosing to pass ends it without any drinking consequence.",
    ending: "Play two chains and swap who starts. Compare your shared chain lengths rather than counting drinks. Use silly items to make the second chain memorable.",
  },
  {
    id: "higher-or-lower", name: "Higher or Lower", group: "card-game",
    equipment: "A shuffled 52-card deck without jokers. Reveal one reference card. Rank Ace low, then 2–10, Jack, Queen and King; ignore suits.",
    play: "Predict whether the next card is higher or lower and reveal it. A correct prediction earns one point; a wrong prediction or equal rank earns zero. That card becomes the new reference, and the other person predicts next.",
    sip: "A wrong prediction offers you one small optional sip. Equal ranks are neutral: no point and no sip invitation. A correct prediction simply earns its point.",
    ending: "Make ten predictions total, five each. The higher score wins and a tie stays a tie. Reshuffle before another game; no extra sip comes from the final score.",
  },
  {
    id: "roll-keep-or-reroll", name: "Roll, Keep or Reroll", group: "dice-game",
    equipment: "One standard six-sided die and a flat place to roll. Start both scores at zero.",
    play: "Roll once, then keep the result or reroll once. A second roll replaces the first, even if lower. The other person does the same. Compare final values: the higher earns one point; a tie gives neither a point.",
    sip: "The lower final roll invites that player to take one small sip, optionally. A tie has no sip invitation. The number on the die never tells you how many sips to take.",
    ending: "Play three rounds, alternating who rolls first. Compare points at the end, with no additional drinking for the final winner or loser.",
  },
  {
    id: "movie-tv-cue", name: "Movie or TV Cue", group: "screen-game",
    equipment: "A movie or episode you already have access to and a shared screen. No new account is needed.",
    play: "Choose one specific, uncommon cue together, such as a character opening a letter. Watch a ten-minute segment. The first time the cue appears, pause and mark it off. Do not count later appearances in that segment.",
    sip: "That first cue is an invitation for each of you to take one small optional sip. The cue is then inactive for the rest of the segment. If it never appears, there is no sip invitation.",
    ending: "At ten minutes, end the game and discuss the scene. You can keep watching without a drinking rule. Avoid frequent cues such as every spoken name or every scene change.",
  },
] as const;

export const drinkingGamesForTwoFaqs = [
  { id: "faq-two-people", q: "What drinking games work with just two people?", a: "All 10 here work with exactly two. Categories and Memory Chain need nothing, Higher or Lower uses a deck, and Roll, Keep or Reroll needs one die. Choose conversation, memory or chance based on your mood." },
  { id: "faq-no-equipment", q: "What can two people play without cards or dice?", a: "Categories, Rhyme Round, Two Truths and a Lie, Never Have I Ever, Truth or Dare, Would You Rather Match and Memory Chain need no equipment. Each has a short round and an optional sip rule." },
  { id: "faq-no-alcohol", q: "Can we play these games without alcohol?", a: "Yes. Water, soda or a mocktail can replace alcohol in every sip rule. You can also leave drinks out and use the questions, scores or shared goals. Changing your drink or declining a sip never changes your turn." },
  { id: "faq-low-pressure", q: "How do we keep drinking games low-pressure?", a: "Agree on topics and short rounds, use small optional sips, and set your own limits. Skip any question, challenge or sip without making it up later. Pause or stop whenever you want; do not track drinks as a score." },
  { id: "faq-friends-couples", q: "Are these games suitable for couples or friends?", a: "Both. You do not need romantic questions or personal disclosures. Try wordplay for a light start, conversation when you want stories, or cards and dice when you would rather let chance decide." },
  { id: "faq-one-phone", q: "Can we play online using one phone?", a: "Yes. Share this guide for instructions, or open the linked Truth or Dare or King's Cup game for two-player play on one screen. The guide itself is an article, not an interactive game." },
] as const;
