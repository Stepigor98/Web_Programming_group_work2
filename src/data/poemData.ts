import { PoemLine } from '../types';

export const POEM_ID = 'hamlet-act3-scene1-to-be-or-not-to-be';

export const POEM_METADATA = {
  id: POEM_ID,
  title: 'Hamlet, Act III, Scene I [To be, or not to be]',
  author: 'William Shakespeare',
  authorLifespan: '1564 – 1616',
  play: 'The Tragedy of Hamlet, Prince of Denmark',
  sceneContext: 'Act III, Scene 1 — A room in Elsinore Castle. King Claudius and Polonius withdraw as Prince Hamlet enters, debating existence, despair, moral consequence, and the unknown afterlife.',
  publicationYear: 'ca. 1599–1601',
  firstFolioDate: 'First Folio 1623 / Second Quarto 1604',
};

export const POEM_LINES: PoemLine[] = [
  {
    lineNum: 1,
    text: 'To be, or not to be: that is the question:',
  },
  {
    lineNum: 2,
    text: 'Whether ’tis nobler in the mind to suffer',
  },
  {
    lineNum: 3,
    text: 'The slings and arrows of outrageous fortune,',
    annotations: [
      {
        term: 'outrageous fortune',
        definition: 'Violent, cruel, or uncontrollable destiny and fate.',
        context: 'Fortune is personified as a fickle and hostile assailant launching missiles against human endurance.',
      },
    ],
  },
  {
    lineNum: 4,
    text: 'Or to take arms against a sea of troubles,',
    annotations: [
      {
        term: 'sea of troubles',
        definition: 'An overwhelming deluge or overwhelming onslaught of suffering.',
        context: 'A famous mixed metaphor: taking weapons into combat against an uncontrollable ocean.',
      },
    ],
  },
  {
    lineNum: 5,
    text: 'And by opposing end them? To die: to sleep;',
  },
  {
    lineNum: 6,
    text: 'No more; and by a sleep to say we end',
  },
  {
    lineNum: 7,
    text: 'The heart-ache and the thousand natural shocks',
  },
  {
    lineNum: 8,
    text: 'That flesh is heir to, ’tis a consummation',
    annotations: [
      {
        term: 'consummation',
        definition: 'Ultimate completion, crowning fulfillment, or final settlement.',
        context: 'Here meaning a devoutly sought closure to worldly pain.',
      },
    ],
  },
  {
    lineNum: 9,
    text: 'Devoutly to be wish’d. To die, to sleep;',
  },
  {
    lineNum: 10,
    text: 'To sleep: perchance to dream: ay, there’s the rub;',
    annotations: [
      {
        term: 'the rub',
        definition: 'The obstacle or impediment.',
        context: 'Derived from lawn bowling (bowls), where an uneven patch of ground deflects the bowl.',
      },
    ],
  },
  {
    lineNum: 11,
    text: 'For in that sleep of death what dreams may come',
  },
  {
    lineNum: 12,
    text: 'When we have shuffled off this mortal coil,',
    annotations: [
      {
        term: 'mortal coil',
        definition: 'The turmoil, distress, and entrapment of earthly mortal life.',
        context: '"Coil" in Elizabethan English meant commotion, noise, or entanglement; also evokes shedding a mortal skin.',
      },
    ],
  },
  {
    lineNum: 13,
    text: 'Must give us pause: there’s the respect',
    annotations: [
      {
        term: 'respect',
        definition: 'The consideration or motive.',
        context: 'The reflective reason that restrains us from taking our own life.',
      },
    ],
  },
  {
    lineNum: 14,
    text: 'That makes calamity of so long life;',
  },
  {
    lineNum: 15,
    text: 'For who would bear the whips and scorns of time,',
  },
  {
    lineNum: 16,
    text: 'The oppressor’s wrong, the proud man’s contumely,',
    annotations: [
      {
        term: 'contumely',
        definition: 'Insolent, humiliating, or scornful reproach.',
        context: 'Pronounced con-TOO-mlee or CON-tyoo-mee, the insolent arrogance of the high and mighty.',
      },
    ],
  },
  {
    lineNum: 17,
    text: 'The pangs of despised love, the law’s delay,',
  },
  {
    lineNum: 18,
    text: 'The insolence of office and the spurns',
    annotations: [
      {
        term: 'insolence of office',
        definition: 'The arrogance and abuse of power exhibited by bureaucratic officials.',
        context: 'Hamlet catalogs the perennial indignities of human civil society.',
      },
    ],
  },
  {
    lineNum: 19,
    text: 'That patient merit of the unworthy takes,',
  },
  {
    lineNum: 20,
    text: 'When he himself might his quietus make',
    annotations: [
      {
        term: 'quietus',
        definition: 'Final settlement, acquittal, or release from an account or debt.',
        context: 'From legal Latin "quietus est" (he is at peace / debt discharged), signifying death clearing life’s ledger.',
      },
    ],
  },
  {
    lineNum: 21,
    text: 'With a bare bodkin? who would fardels bear,',
    annotations: [
      {
        term: 'bare bodkin',
        definition: 'An unsheathed dagger or small stiletto weapon.',
        context: 'A plain dagger or stylus sufficient to pierce and end life.',
      },
      {
        term: 'fardels',
        definition: 'Burdens, heavy packages, or travel packs.',
        context: 'The exhausting load that travelers or laborers carry on their backs.',
      },
    ],
  },
  {
    lineNum: 22,
    text: 'To grunt and sweat under a weary life,',
  },
  {
    lineNum: 23,
    text: 'But that the dread of something after death,',
  },
  {
    lineNum: 24,
    text: 'The undiscover’d country from whose bourn',
    annotations: [
      {
        term: 'bourn',
        definition: 'Boundary, frontier, or realm.',
        context: 'The perimeter of the afterlife from which no traveler has ever returned to speak.',
      },
    ],
  },
  {
    lineNum: 25,
    text: 'No traveller returns, puzzles the will',
  },
  {
    lineNum: 26,
    text: 'And makes us rather bear those ills we have',
  },
  {
    lineNum: 27,
    text: 'Than fly to others that we know not of?',
  },
  {
    lineNum: 28,
    text: 'Thus conscience does make cowards of us all;',
    annotations: [
      {
        term: 'conscience',
        definition: 'Conscious introspection, reflection, and moral awareness.',
        context: 'Not only moral guilt, but the paralyzing faculty of over-thinking and contemplating consequence.',
      },
    ],
  },
  {
    lineNum: 29,
    text: 'And thus the native hue of resolution',
    annotations: [
      {
        term: 'native hue',
        definition: 'Natural, vigorous, ruddy complexion of boldness.',
        context: 'The healthy red blood of decisive action before doubt sets in.',
      },
    ],
  },
  {
    lineNum: 30,
    text: 'Is sicklied o’er with the pale cast of thought,',
    annotations: [
      {
        term: 'pale cast',
        definition: 'A sickly, wan shade or pallor.',
        context: 'The pallid cast of introspective paralysis draining the vitality of action.',
      },
    ],
  },
  {
    lineNum: 31,
    text: 'And enterprises of great pith and moment',
    annotations: [
      {
        term: 'pith and moment',
        definition: 'Vital marrow, substantial weight, and immense consequence.',
        context: 'Grand, weighty undertakings that require immediate bravery.',
      },
    ],
  },
  {
    lineNum: 32,
    text: 'With this regard their currents turn awry,',
  },
  {
    lineNum: 33,
    text: 'And lose the name of action.—Soft you now!',
  },
  {
    lineNum: 34,
    text: 'The fair Ophelia! Nymph, in thy orisons',
    annotations: [
      {
        term: 'orisons',
        definition: 'Prayers or devotional petitions.',
        context: 'Hamlet sees Ophelia holding her prayer book and begs her to intercede for his sins in her devotions.',
      },
    ],
  },
  {
    lineNum: 35,
    text: 'Be all my sins remember’d.',
  },
];

export const DEFAULT_ANTHOLOGIES = [
  {
    id: 'renaissance-tragedies',
    title: 'Renaissance Tragedies & Soliloquies',
    description: 'A curated compendium of monologues exploring mortality, statecraft, and human doubt.',
    createdAt: '2026-01-15',
    poemIds: [POEM_ID],
    themeColor: '#78350f',
  },
  {
    id: 'existential-verse',
    title: 'Meditations on Being & Nothingness',
    description: 'Philosophical verse pondering consciousness, fear of the unknown, and quietus.',
    createdAt: '2026-02-01',
    poemIds: [POEM_ID],
    themeColor: '#1e3a8a',
  },
  {
    id: 'study-favorites',
    title: 'Personal Study & Memorization',
    description: 'Lines and passages selected for close rhetorical analysis and staging practice.',
    createdAt: '2026-03-10',
    poemIds: [],
    themeColor: '#14532d',
  },
];
