import { ImageSourcePropType } from "react-native";

export interface IRocket {
  id: string
  title: string
  location: string
  image: ImageSourcePropType
  // imageBig: string
  type: string
  description: string
}

export interface RocketInventory {
  id: string
  active: boolean
  country: string
  name: string
  type: string
  description: string
}

export interface RocketInventoryData {
  rocketInventory: RocketInventory[];
}

const rocketData: IRocket[] = [
  {
      id: 'rocket-1',
      title: 'Amos-17',
      location: 'America',
      image: require('../images/rocket1.png'),
      // imageBig: require('../images/rocket1-big.png'),
      type: "Falcon",
      description:
        "An ideal introduction to sea kayaking around the stunning historical Islands of Tofino's harbour. Come explore the spectacular scenery of the area and learn what makes the area so fascinating.",
  },
  {
      id: 'rocket-2',
      title: 'CRS-16',
      location: 'America',
      image: require('../images/rocket2.png'),
      // imageBig: require('../images/rocket2-big.png'),
      type: "Falcon",
      description:
        "An ideal introduction to sea kayaking around the stunning historical Islands of Tofino's harbour. Come explore the spectacular scenery of the area and learn what makes the area so fascinating.",
  },
  {
      id: 'rocket-3',
      title: 'CRS-17',
      location: 'America',
      image: require('../images/rocket3.png'),
      // imageBig: require('../images/rocket3-big.png'),
      type: "Falcon",
      description:
        "An ideal introduction to sea kayaking around the stunning historical Islands of Tofino's harbour. Come explore the spectacular scenery of the area and learn what makes the area so fascinating.",
  },
  {
      id: 'rocket-4',
      title: 'CRS-18',
      location: 'America',
      image: require('../images/rocket4.png'),
      // imageBig: require('../images/rocket4-big.png'),
      type: "Falcon",
      description:
        "An ideal introduction to sea kayaking around the stunning historical Islands of Tofino's harbour. Come explore the spectacular scenery of the area and learn what makes the area so fascinating.",
  },
  {
    id: 'rocket-5',
    title: 'Amos-17',
    location: 'America',
    image: require('../images/rocket1.png'),
    // imageBig: require('../images/rocket1-big.png'),
    type: "Falcon",
    description:
      "An ideal introduction to sea kayaking around the stunning historical Islands of Tofino's harbour. Come explore the spectacular scenery of the area and learn what makes the area so fascinating.",
  },
  {
      id: 'rocket-6',
      title: 'CRS-16',
      location: 'America',
      image: require('../images/rocket2.png'),
      // imageBig: require('../images/rocket2-big.png'),
      type: "Falcon",
      description:
        "An ideal introduction to sea kayaking around the stunning historical Islands of Tofino's harbour. Come explore the spectacular scenery of the area and learn what makes the area so fascinating.",
  },
  {
      id: 'rocket-7',
      title: 'CRS-17',
      location: 'America',
      image: require('../images/rocket3.png'),
      // imageBig: require('../images/rocket3-big.png'),
      type: "Falcon",
      description:
        "An ideal introduction to sea kayaking around the stunning historical Islands of Tofino's harbour. Come explore the spectacular scenery of the area and learn what makes the area so fascinating.",
  },
  {
      id: 'rocket-8',
      title: 'CRS-18',
      location: 'America',
      image: require('../images/rocket4.png'),
      // imageBig: require('../images/rocket4-big.png'),
      type: "Falcon",
      description:
        "An ideal introduction to sea kayaking around the stunning historical Islands of Tofino's harbour. Come explore the spectacular scenery of the area and learn what makes the area so fascinating.",
  },
]

export default rocketData;